<template>
<div>
  <el-row>
    <el-col :span="8">
      道具名称过滤器:
      <el-input style="padding:15px 0" width="200" placeholder="请输入道具名称或id(回车查询)" v-model="queryName" @keyup.enter.native="doSearch">
      </el-input>
      <!-- 点击选择常用筛选: -->
      <el-button v-for="item in itemm" type="text" @click.native = "handleOfenSearch(item.value)">{{item.value}}</el-button>
    </el-col>
  </el-row>
  <el-table :data="items2" stripe border max-height="600" style="width:800px;">
    <el-table-column prop="itemId" label="ItemId" width="250"> </el-table-column>
    <el-table-column prop="name" label="名称" width="250"> </el-table-column>
    <el-table-column label="操作" width="300">
      <template slot-scope="scope">
					<el-input
						placeholder="输入数量 (回车添加) "
						v-model="scope.num"
						@keyup.enter.native="onAddtt(scope.row, $event.target.value)"
						class="el_input_in_tbl">
					</el-input>
				</template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
// import TabAddItemAction from "./TabAddItemAction"
export default {
  data() {
    return {
      queryName: "",
      itemm: [
        {value: "礼包"},
        {value: "宝箱"},
        {value: "图鉴"},
        {value: "经验"},
        {value: "战功"},
        {value: "魂石"},
        {value: "玉"}
      ]
      // addNum: 0
    }
  },
  methods: {
    handleOfenSearch(e) {
      this.queryName = e;
      this.doSearch();
    },
    onAddtt(row, num) {
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
          message: '添加道具成功',
          type: 'success'
        });
      }, response => {
        // this.$message.error("添加失败");
        this.$notify.error({
          title: '错误',
          message: '添加道具失败',
          type: 'error'
        });
      });
    },
    doSearch() {
      var server = this.$store.state.app.serverAddress;
      if (!server) {
        this.$message.error("请先选择可用的服务器");
        return;
      }
      this.$store.commit("FILTER_TOOLS", this.queryName);
    }
  },
  computed: {
    items2: {
      get() {
        return this.$store.state.app.items2;
      },
    }
  },
  mounted() {},
}
</script>

<style scoped>
</style>
