<script setup>
import router from '../router/index.js'
import img from '../assets/logo.svg'
import {reactive} from "vue"
const data=reactive({
  user:JSON.parse(localStorage.getItem('xm-pro-user'))
})

const logout = () =>{
  localStorage.removeItem('xm-pro-user')  //清除当前登录用户的信息
  location.href='/login'  //退出到登录页面
}

</script>

<template>
  <!--1.头部开始-->
  <div style="height: 60px; background-color: #0742b1;display: flex; align-content: center">
    <div style="width: 200px; display: flex; align-items: center; font-size: 20px; color: white">
      <el-icon><House/></el-icon>后台管理系统
    </div>
    <div style="flex: 1"></div>
    <div style="width: fit-content; display: flex; align-items: center;padding-right: 10px">
      <el-image :src="data.user.avatar" style="width: 40px; height: 40px"></el-image>
      <span style="color: white; margin-left: 5px">{{data.user.name}}</span>
    </div>
  </div>
  <!--2.下面部分-->
  <div style="display:flex">
    <!--2.1左侧菜单导航-->
    <div style="width:200px; border-right:1px solid #ddd; min-height:calc(100vh - 60px)">
      <el-menu router :default-activce="router.currentRoute.value.path" style="border: 0" :default-openeds="['1']">
        <el-menu-item index="/manager/home"><el-icon><House/></el-icon>系统首页</el-menu-item>
        <el-menu-item index="/manager/data"><el-icon><DataAnalysis/></el-icon>数据统计</el-menu-item>
        <el-sub-menu index="1">
          <template #title><el-icon><User/></el-icon><span>用户管理</span></template>
          <el-menu-item index="/manager/admin">管理员信息</el-menu-item>
          <el-menu-item index="/manager/employee">员工信息</el-menu-item>
        </el-sub-menu>
        <el-menu-item @click="logout"><el-icon><Back/></el-icon>退出登录</el-menu-item>
        <el-menu-item index="/manager/person"><el-icon><UserFilled/></el-icon>个人信息</el-menu-item>
      </el-menu>
    </div>
    <!--2.2右侧主体区域-->
    <div style="flex: 1; width:0; background-color: #f8f8ff; padding:10px">
      <RouterView></RouterView>
    </div>
  </div>
</template>

