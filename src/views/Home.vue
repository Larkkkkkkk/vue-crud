<script setup>
import {ref,reactive} from "vue";
import router from '../router/index.js'
const data=reactive({
  id: router.currentRoute.value.query.id,
  name: router.currentRoute.value.query.name,
})
console.log("路由传参过来的："+data.id)
console.log("路由传参过来的："+data.name)
</script>
<template>
  <!--路由传参-->
  <div>
    <!--①第一种-->
    <el-button type="primary" @click="router.push('/manager/test?id=1')">路由传参[单参数]</el-button>  <!--跳转后可以返回-->
    <el-button type="primary" @click="router.push('/manager/test?id=1&name=宋亚翔')">路由传参[多参数]</el-button>  <!--跳转后可以返回-->
    <!--②第二种-->
    <el-button type="primary" @click="router.push({path: '/manager/test',query: {id:1,name:'宋亚翔'}})">路由传参</el-button>  <!--跳转后可以返回-->
  </div>
</template>
