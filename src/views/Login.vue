<script setup>
import {ref,reactive} from "vue";
import request from "@/assets/utils/request.js";
import {ElMessage} from "element-plus";
const data=reactive({
  form:{role:'ADMIN'},
  rules:{
    username:[{required:true,message:'请输入账号',trigger:'blur'}],
    password:[{required:true,message:'请输入密码',trigger:'blur'},{min:3,message:'密码长度必须大于等于3',trigger:'blur'}],
    role:[{required:true,message:'请选择角色',trigger:'blur'}],
  }
})
//登录校验
const formRef=ref()
const login = () => {
  formRef.value.validate((valid)=>{
    if(valid){
      request.post('/login',data.form).then(res=>{
        if(res.code==='200'){  //登录成功
          ElMessage.success('登录成功')
          //登陆成功跳转主页
          setTimeout(() => {location.href='/manager/home'},500)
          //存储后台发送过来的信息[json对象转为json字符串]
          localStorage.setItem('xm-pro-user',JSON.stringify(res.data))  //例如：某某人登录就可以知道对应某某人信息
        }else{  //登录失败
          ElMessage.error(res.msg)
        }
      })
    }
  })
}

</script>
<template>
  <div class="login-container" >
    <div class="login-box">
      <div style="padding: 20px;background-color: white;margin-left: 200px">
        <el-form ref="formRef" :rules="data.rules" :model="data.form" style="width: 400px">
          <div style="margin-bottom: 50px;text-align: center;font-size: 30px">欢迎登录后台管理系统</div>
          <el-form-item prop="username">
            <el-input size="large" v-model="data.form.username" placeholder="请输入账号" prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="large" v-model="data.form.password" placeholder="请输入密码" prefix-icon="Lock"></el-input>
          </el-form-item>
          <el-form-item prop="role">
            <el-select v-model="data.form.role" placeholder="请选择角色" size="large">
              <el-option value="ADMIN" label="管理员"></el-option>
              <el-option value="EMP" label="员工"></el-option>
            </el-select>
          </el-form-item>
          <div style="margin-bottom: 20px">
            <el-button size="large" style="width:100%" type="primary" @click="login">登录</el-button>
          </div>
          <div style="text-align: right">还没有账号？请<a style="color:#0742b1;text-decoration: none" href="/register">注册</a>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<!--scoped表示本页有效-->
<style scoped>
.login-container{
 height: 100vh;
  overflow: hidden;
  background-image: url("../assets/huanying.jpg");
  background-size: cover;
  background-position: 20px -70px;
}
.login-box{
  width: 50%;
  height: 100%;
  display:flex;
  align-items: center;
  right:0;
  position: absolute;
}
</style>

