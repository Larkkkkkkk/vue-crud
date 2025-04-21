<script setup>
import {ref,reactive} from "vue";
import{Search} from "@element-plus/icons-vue";

const data=reactive({
  name:null,
  tableData:[{date:'2016-05-02',name:'宋亚翔',state:'陕西省',city:'西安市',address:'未央区'},
    {date:'2025-04-02',name:'宋亚翔',state:'陕西省',city:'西安市',address:'未央区'},
    {date:'2020-11-12',name:'宋亚翔',state:'陕西省',city:'西安市',address:'未央区'}
  ],
  pageNum:1,
  pageSize:10,
  total:47,
});
</script>

<template>
  <div>
    <div class="card" style="margin-buttom:10px">
      <el-input v-model="data.name" placeholder="请输入名称查询" prefix-icon="Search" style="width:240px"></el-input>
      <el-button type="primary">查 询</el-button>
      <el-button type="warning">重 置</el-button>
    </div>
    <div>
      <el-button type="primary">新 增</el-button>
      <el-button type="warning">批量删除</el-button>
      <el-button type="info">导入</el-button>
      <el-button type="success">导出</el-button>
    </div>
    <div>
      <el-table :data="data.tableData" :default-sort="{prop: 'date',order:'descending'}" stripe border height="250" sytle="width:100%" max-height="250">
        <el-table-column fixed type="selection" :selectable="selectable" width="55"></el-table-column>
        <el-table-column prop="name" label="Name" width="120"></el-table-column>
        <el-table-column prop="state" label="State" width="120"></el-table-column>
        <el-table-column prop="city" label="City" width="120"></el-table-column>
        <el-table-column sortable prop="date" label="Date" width="120"></el-table-column>
        <el-table-column show-overflow-tooltip prop="address" label="Address" width="120"></el-table-column>
        <el-table-column fixed="right" label="具体操作" min-width="80">
          <template #default>
            <el-button type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:15px">
      <el-pagination
        v-model:current-page="data.pageNum"
        v-model:page-size="data.pageSize"
        :pageSizes="[5,10,15,20]"
        background
        layout="total, sizes,prev,pager,next,jumper"
        :total="data.total"
      />
    </div>
  </div>
</template>


<style scoped>
</style>
