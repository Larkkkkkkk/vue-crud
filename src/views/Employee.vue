<script setup>
import {ref,reactive} from "vue";
const data=reactive({
  name:null,
  tableData:[],
  pageNum:1,
  pageSize:10,
  total:0,
  formVisible:false,
  form:{},
  ids:[],
  id:null,
  rules:{
    username:[{required:true,message:'请输入账号',trigger:'blur'}],
    name:[{required:true,message:'请输入名称',trigger:'blur'}],
    no:[{required:true,message:'请输入工号',trigger:'blur'}]
  }
});
import request from "@/assets/utils/request.js";
import {ElMessage} from "element-plus";
//加载数据
const load = () => {
  request.get('/employee/selectPage', {params:{pageNum:data.pageNum, pageSize:data.pageSize,name:data.name}}).then(res =>{ //res是整个请求[res.data是出来的结果]
        // console.log(res)
    data.tableData=res.data.list
    data.total=res.data.total
  })
}
//调用函数【保证点击本页就按照默认值显示所有数据】
load()
//按钮-置空数据
const reset = () => {
  data.name=null  //清空输入框的名字
  load()  //重新加载
}
//按钮-新增数据
const handleAdd = () => {
  data.formVisible=true;  //设置true就可以打开
  data.form={}  //清空列表
}
const save = () => {
  //增加校验
  formRef.value.validate((valid)=>{
    if(valid){
      data.form.id ? update():add()
    }
  })
  //原来逻辑 data.form.id ? update():add()
}
//新增员工数据
const add= () => {
  request.post('/employee/add',data.form)
      .then(res => { //res是整个请求[res.data是出来的结果]
        if(res.code ==='200'){
          data.formVisible=false //关闭新增窗口
          ElMessage.success('新增员工信息操作成功')
          load() //新增成功后重新加载数据
        }else {
          ElMessage.error(res.msg)
        }
      })
}
//按钮-编辑数据
const handleUpdate = (row) => {  //row是行对象
  //这种方式修改之后，点击取消会立即修改【浅拷贝】：data.form=row  //清空列表
  data.form=JSON.parse(JSON.stringify(row))  //【深拷贝】一个新的对象，用于编辑，不会影响行对象
  data.formVisible=true;  //设置true就可以打开
}
//修改员工数据
const update= () => {
  request.post('/employee/update',data.form).then(res => { //res是整个请求[res.data是出来的结果]
        if(res.code ==='200'){
          data.formVisible=false //关闭新增窗口
          ElMessage.success('修改员工信息操作成功')
          load() //修改成功后重新加载数据
        }else {
          ElMessage.error(res.msg)
        }
      })
}
//删除员工数据
const del= (row) => {
  ElMessageBox.confirm('删除员工数据后无法恢复，确认是否删除？','删除确认',{type:'warning'}).then(()=>{
    //1. request.delete(`/employee/delete?id=${row.id}`).then()
    request.delete(`/employee/delete`,{params:{id:row.id}}).then(res => { //res是整个请求[res.data是出来的结果]`
      if(res.code ==='200'){
        ElMessage.success('删除员工信息操作成功')
        load() //删除成功后重新加载数据
      }else {
        ElMessage.error(res.msg)
      }
    })
  }).catch()
}
//删除多个员工数据
const handleSelectionChange = (rows) => {  //返回所有选中的行对象数组
  //从选中行的数组里面取出所有行的id组成一个新的数组
  data.ids=rows.map(row => row.id)  //将对应行的id拿到赋值到ids
}
const delAll= () => {
  ElMessageBox.confirm('删除员工数据后无法恢复，确认是否删除？','删除确认',{type:'warning'}).then(()=>{
    request.delete(`/employee/deleteAll`,{data:data.ids}).then(res => { //res是整个请求[res.data是出来的结果]`
      if(res.code ==='200'){
        ElMessage.success('删除所选多个员工信息操作成功')
        load() //删除成功后重新加载数据
      }else{
        ElMessage.error(res.msg)
      }
    })
  }).catch()
}
//表单校验
const formRef=ref()

</script>

<template>
  <div>
    <div class="card" style="margin-buttom:10px">
      <el-input v-model="data.name" placeholder="请输入名称查询" prefix-icon="Search" style="width:240px"></el-input>
      <el-button type="primary" @click="load">查 询</el-button>
      <el-button type="warning" @click="reset">重 置</el-button>
    </div>
    <div>
      <el-button type="primary" @click="handleAdd">新 增</el-button>
      <el-button type="warning" @click="delAll">批量删除</el-button>
      <el-button type="info">导入</el-button>
      <el-button type="success">导出</el-button>
    </div>
    <div>
      <el-table :data="data.tableData" @selection-change="handleSelectionChange" stripe border height="1000" sytle="width:200%" max-height="1000">
        <el-table-column fixed type="selection" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名称" width="120"></el-table-column>
        <el-table-column prop="role" label="角色" width="120"></el-table-column>
        <el-table-column prop="name" label="名称" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="no" label="工号" width="120"></el-table-column>
        <el-table-column prop="age" label="年龄" width="60"></el-table-column>
        <el-table-column show-overflow-tooltip prop="description" label="个人介绍" width="300"></el-table-column>
        <el-table-column prop="departmentName" label="部门名称" width="120"></el-table-column>
        <el-table-column fixed="right" label="具体操作" min-width="50">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:15px">
      <el-pagination
          @current-change="load"  #保证页面变化，数据跟着变化
          @size-change="load"  #保证每页个数变化，数据跟着变化
          v-model:current-page="data.pageNum"
          v-model:page-size="data.pageSize"
          :pageSizes="[5,10,15,20]"
          background
          layout="total, sizes,prev,pager,next,jumper"
          :total="data.total"
      />
    </div>
    <!--新增页面的弹出框-->
    <el-dialog v-model="data.formVisible" title="员工信息" width="500" destroy-on-close>
      <el-form ref="formRef" :rules="data.rules" :model="data.form">  <!--ref表单校验-->
        <el-form-item label="账号" label-width="60px" prop="username">
          <el-input v-model="data.form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="名称" label-width="60px" prop="name">
          <el-input v-model="data.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" label-width="60px">
          <el-select v-model="data.form.sex" placeholder="选择性别">
            <el-option label="女" value="女" />
            <el-option label="男" value="男" />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" label-width="60px" prop="no">
          <el-input v-model="data.form.no" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年龄" label-width="60px">
          <el-input v-model="data.form.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="个人介绍" label-width="80px">
          <el-input v-model="data.form.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.formVisible = false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
