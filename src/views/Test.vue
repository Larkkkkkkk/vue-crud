<script setup>
import {reactive,ref,onMounted} from "vue";
import {Search} from "@element-plus/icons-vue";
import router from "@/router/index.js";
const data=reactive({
  a: 123,
  b: "我真的爱学vue",
  c: "123123123123",
  d: false,
  name: '佩奇',
  arr: [7,8,9,10],
  fruits:['香蕉','苹果','梨'],
  box:{
    width:'35px',
    height:'55px',
    backgroundColor:'blue'
  },
  img:'https://www.runoob.com/wp-content/uploads/2017/01/vue.png',
})
const clickSyx=()=>{
  alert("我当前用的是Element-Plus组件的点击事件")
}
const data2=reactive({
  id: router.currentRoute.value.query.id,
  name: router.currentRoute.value.query.name,
})
console.log("路由传参过来的："+data2.id)
console.log("路由传参过来的："+data2.name)
</script>
<template>
  <div>
    <div>
      <el-button type="primary" @click="router.back()">通过router.back返回</el-button>
    </div>
    <div class="mb-4">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary1</el-button>
      <el-button type="success" round>Success1</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </div>

    <div>
      <el-icon :size="50" color="#777">
        <Edit />
      </el-icon>
      <span>
          <el-icon :size="50" color="#666">
            <View />
          </el-icon>
          200
        </span>
      <el-input v-model="data.a" style="width: 240px" placeholder="Type something" :prefix-icon="Search"/>
      <el-input v-model="data.a" style="width: 240px" placeholder="Type something" prefix-icon="Search"/>
    </div>
  </div>
</template>
