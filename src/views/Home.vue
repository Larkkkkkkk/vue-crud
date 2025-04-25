<script setup>
import {ref,reactive} from "vue";
import router from '../router/index.js'

const data=reactive({
  id: router.currentRoute.value.query.id,
  name: router.currentRoute.value.query.name,
  employeeList:[],
})

import request from "@/assets/utils/request.js";
request.get('/employee/selectAll').then(res =>{ //res是整个请求[res.data是出来的结果]
  data.employeeList=res.data
})


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
