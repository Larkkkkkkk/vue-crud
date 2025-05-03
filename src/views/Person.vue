<script setup>
import {ref,reactive} from "vue";
import request from "@/assets/utils/request.js";
import {ElMessage} from "element-plus";
const validatePass = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请再次确认密码'))
  } else if (value !== data.form.newPassword) {
    callback(new Error("两次输入的密码不一致!"))
  } else {
    callback()
  }
}

//上传头像
const handleAvatarSuccess= (res) =>{
  data.form.avatar=res.data
}

const data=reactive({
  form:{},
  rules:{
    username:[{required:true,message:'请输入账号',trigger:'blur'}],
    name:[{required:true,message:'请输入名称',trigger:'blur'}],
    password:[{required:true,message:'请输入旧密码',trigger:'blur'}],
    newPassword:[{required:true,message:'请输入新密码',trigger:'blur'}],
    confirmPassword:[{validator:validatePass,trigger:'blur'}],
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
  if(data.form.role==='EMP'){
    request.post('/employee/update',data.form).then(res => { //res是整个请求[res.data是出来的结果]
      if(res.code ==='200'){
        ElMessage.success('修改个人信息操作成功')
        localStorage.setItem('xm-pro-user',JSON.stringify(data.form))  //重新设置
        location.reload()  //重新刷新页面[其实不用做load()，因为刷新页面之后本页面有load()]
      }else {
        ElMessage.error(res.msg)
      }
    })
  }
  if(data.form.role==='ADMIN'){
    request.post('/admin/update',data.form).then(res => { //res是整个请求[res.data是出来的结果]
      if(res.code ==='200'){
        ElMessage.success('修改个人信息操作成功')
        localStorage.setItem('xm-pro-user',JSON.stringify(data.form))  //重新设置
        location.reload()  //重新刷新页面[其实不用做load()，因为刷新页面之后本页面有load()]
      }else {
        ElMessage.error(res.msg)
      }
    })
  }
}
//修改密码
const updatePassword= () => {
  if(data.form.role==='EMP'){
    formRef.value.validate((valid)=>{
      if(valid){
        const url = `/employee/updatePassword?id=${data.user.id}&password=${data.form.newPassword}`;  //拼接路径
        request.post(url).then(res => { //res是整个请求[res.data是出来的结果]
          if(res.code ==='200'){
            ElMessage.success('修改密码操作成功')
            localStorage.removeItem('xm-pro-user')  //清除当前登录用户的信息
            location.href='/login'  //退出到登录页面
          }else {
            ElMessage.error(res.msg)
          }
        })
      }
    })
  }else if(data.form.role==='ADMIN'){
    formRef.value.validate((valid)=>{
      if(valid){
        const url = `/admin/updatePassword?id=${data.user.id}&password=${data.form.newpassword}`;  //拼接路径
        request.post(url).then(res => { //res是整个请求[res.data是出来的结果]
          if(res.code ==='200'){
            ElMessage.success('修改密码操作成功')
            localStorage.removeItem('xm-pro-user')  //清除当前登录用户的信息
            location.href='/login'  //退出到登录页面
          }else {
            ElMessage.error(res.msg)
          }
        })
      }
    })
  }
}

</script>

<template>
  <div class="card" style="width: 50%">
    <el-form ref="formRef" :rules="data.rules" :model="data.form">  <!--ref表单校验-->
      <!--上传文件-->
      <el-form-item label="头像" >
        <el-upload class="avatar-uploader" action="http://localhost:8080/files/upload" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="data.form.avatar" :src="data.form.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!--其余数据库信息-->
      <el-form-item label="账号" label-width="60px" prop="username">
        <el-input disabled v-model="data.form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="名称" label-width="60px" prop="name">
        <el-input v-model="data.form.name" autocomplete="off" />
      </el-form-item>
      <div v-if="data.form.role==='EMP'">  <!--只有普通员工才展示下面字段-->
        <el-form-item label="性别" label-width="60px">
          <el-select v-model="data.form.sex" placeholder="选择性别">
            <el-option label="女" value="女" />
            <el-option label="男" value="男" />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" label-width="60px" prop="no">
          <el-input disabled v-model="data.form.no" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年龄" label-width="60px">
          <el-input v-model="data.form.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="个人介绍" label-width="80px">
          <el-input v-model="data.form.description" autocomplete="off" />
        </el-form-item>
      </div>
      <el-button size="large" style="width:20%" type="primary" @click="updatePersonInfo">修改个人信息</el-button>
    </el-form>
  </div>
  <div  style="width: 50%">
    修改密码：
    <div>
      <el-form ref="formRef" :rules="data.rules" :model="data.form">  <!--ref表单校验-->
        <el-form-item label="原密码" label-width="80px" prop="password">
          <el-input v-model="data.form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" label-width="80px" prop="newPassword">
          <el-input v-model="data.form.newPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px" prop="confirmPassword">
          <el-input v-model="data.form.confirmPassword" autocomplete="off" />
        </el-form-item>
        <el-button size="large" style="width:20%" type="primary" @click="updatePassword">修改密码</el-button>
      </el-form>
    </div>
  </div>
</template>

<!--上传文件-->
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>