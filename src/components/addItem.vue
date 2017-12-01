<template>
<div>
  <el-row>
    <el-col :span="8">
      物品名称过滤器:
      <el-input style="padding:15px 0" width="200" placeholder="请输入物品名称或id(回车查询)" v-model="queryName" @keyup.enter.native="handleSearch">
      </el-input>
      <!-- 点击选择常用筛选: -->
      <el-button v-for="item in itemm" type="text" @click.native = "handleOfenSearch(item.value)">{{item.value}}</el-button>
    </el-col>
  </el-row>
  <el-table :data="items" stripe border max-height="600" style="width:800px;">
    <el-table-column prop="itemId" label="ItemId" width="250"> </el-table-column>
    <el-table-column prop="name" label="名称" width="250"> </el-table-column>
    <el-table-column label="操作" width="300">
      <template slot-scope="scope">
					<el-input
						placeholder="输入数量 (回车添加) "
						v-model="scope.num"
						@keyup.enter.native="onAdd(scope.row, $event.target.value)"
						class="el_input_in_tbl">
					</el-input>
				</template>
    </el-table-column>
  </el-table>

  <el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page.sync="currentPage"
  :page-size="100"
  layout="total, prev, pager, next"
  :total="originItems.length">
  </el-pagination>
</div>
</template>

<script>
// import TabAddItemAction from "./TabAddItemAction"
export default {
  data() {
    return {
      queryName: "",
      currentPage: 1,
      itemm: [
        {value: "蓝"},
        {value: "紫"},
        {value: "橙"},
        {value: "武器20"},
        {value: "武器50"},
        {value: "武器100"}
      ],
      addNum: 0
    }
  },
  methods: {
    handleSearch(ev) {
      this.doSearch();
    },
    handleOfenSearch(e) {
      this.queryName = e;
      this.doSearch();
    },
    //每页显示数据量变更
    handleSizeChange: function(val) {
      this.pagesize = val;
      // this.loadData(this.criteria, this.currentPage, this.pagesize);
      console.log("fangzide");
    },

    //页码变更
    handleCurrentChange: function(val) {
      console.log("fangzide+===" + this.currentPage);
      // this.currentPage = val;
      this.$store.commit("INIT_PAGRINFO", this.currentPage);
      // this.loadData(this.criteria, this.currentPage, this.pagesize);
    },

    doSearch() {
      var server = this.$store.state.app.serverAddress;
      if (!server) {
        this.$message.error("请先选择可用的服务器");
        return;
      }
      this.$store.commit("FILTER_ITEMS", this.queryName);
    },
    onAdd(row, num) {
      var nickName = this.$store.state.app.nickName;
      var server = this.$store.state.app.serverAddress;
      if (!server || server.length <= 0) {
        this.$message.error("请先选择可用的服务器");
        return;
      }
      if (nickName == undefined || nickName.length <= 0) {
        this.$message.error("请填写昵称");
        return;
      }
      var uri = server.split("_")[1] + "admin/additem?nickname=" + encodeURI(nickName) + "&itemId=" + row.itemId + "&itemCount=" + num;
      this.$http.get(uri).then(response => {
        // this.$message.success("添加成功");
        this.$notify({
          title: '成功',
          message: '添加装备成功',
          type: 'success'
        });
      }, response => {
        // this.$message.error("添加失败");
        this.$notify.error({
          title: '错误',
          message: '添加装备失败',
          type: 'error'
        });
      });
    }
  },
  computed: {
    items: {
      get() {
        return this.$store.state.app.items;
      },
    },
    originItems: {
      get() {
        return this.$store.state.app.originItems;
      },
    }
  },
  mounted() {},
}
</script>

<style scoped>
</style>
