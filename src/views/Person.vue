<script setup>
import {ref,reactive} from "vue";
import request from "@/assets/utils/request.js";
import {ElMessage} from "element-plus";
const data=reactive({
  form:{},
  rules:{
    username:[{required:true,message:'请输入账号',trigger:'blur'}],
    name:[{required:true,message:'请输入名称',trigger:'blur'}],
    password:[{required:true,message:'请输入密码',trigger:'blur'}],
    newpassword:[{required:true,message:'请输入密码',trigger:'blur'}],
    no:[{required:true,message:'请输入工号',trigger:'blur'}],
  },
  user:JSON.parse(localStorage.getItem('xm-pro-user')),
});
//表单校验
const formRef=ref()
//加载用户对应个人所有信息
const load = () => {
  if(data.user.role==='ADMIN'){
    request.get('/admin/selectById/'+data.user.id).then(res =>{ //res是整个请求[res.data是出来的结果]
      data.form=res.data
    })
  }else if(data.user.role==='EMP'){
    request.get('/employee/selectById/'+data.user.id).then(res =>{ //res是整个请求[res.data是出来的结果]
      data.form=res.data
    })
  }
}
//调用函数【保证点击本页就按照默认值显示所有数据】
load()
//修改个人信息
const updatePersonInfo= () => {
  request.post('/employee/update',data.form).then(res => { //res是整个请求[res.data是出来的结果]
    if(res.code ==='200'){
      ElMessage.success('修改个人信息操作成功')
      location.reload()  //重新刷新页面[其实不用做load()，因为刷新页面之后本页面有load()]
    }else {
      ElMessage.error(res.msg)
    }
  })
}
//修改密码
const updatePassword= () => {
  const url = `/employee/updatePassword?id=${data.user.id}&password=${data.form.newpassword}`;  //拼接路径
  request.post(url).then(res => { //res是整个请求[res.data是出来的结果]
    if(res.code ==='200'){
      ElMessage.success('修改密码操作成功')
      location.href='/login'  //退出到登录页面
    }else {
      ElMessage.error(res.msg)
    }
  })
}

</script>

<template>
  <div class="card">
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
      <el-button size="large" style="width:20%" type="primary" @click="updatePersonInfo">修改个人信息</el-button>
    </el-form>
  </div>
  <div>
    修改密码：
    <div>
      <el-form ref="formRef" :rules="data.rules" :model="data.form">  <!--ref表单校验-->
        <el-form-item label="原密码" label-width="80px" prop="password">
          <el-input v-model="data.form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" label-width="80px" prop="newpassword">
          <el-input v-model="data.form.newpassword" autocomplete="off" />
        </el-form-item>
<!--        <el-form-item label="确认密码" label-width="80px" prop="password">-->
<!--          <el-input v-model="data.form.password" autocomplete="off" />-->
<!--        </el-form-item>-->
        <el-button size="large" style="width:20%" type="primary" @click="updatePassword">修改密码</el-button>
      </el-form>
    </div>
  </div>
</template>
