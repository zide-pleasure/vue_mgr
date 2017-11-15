<template>
	<div>
		<div v-for="item in itemList" style="width: 650px; float:left;">
			<div class="item_name" style="color:#fa5555">
				{{ item.name }} id:{{item.id}}
			</div>
      <el-button type="primary" @click.native="onAdd(item.id, item.name)">添加</el-button>
			<!-- <el-input
				width="100"
				placeholder="请输入数量, 回车添加"
				@keyup.enter.native="onAdd(item.id, item.name, $event.target.value)"
				>
			</el-input> -->
			<p></p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			itemList: [
        { id: 2001001, name:"周卡"},
				{ id: 2001002, name:"月卡"},
				{ id: 2001003, name:"60钻"},
				{ id: 2001004, name:"300钻"},
				{ id: 2001005, name:"980钻"},
				{ id: 2001006, name:"1980钻"},
				{ id: 2001007, name:"3280钻"},
				{ id: 2001008, name:"6480钻"},
				{ id: 3001002, name:"坐骑礼包"},
				{ id: 3001003, name:"998元礼包"},
				{ id: 3001004, name:"998元礼包"},
				{ id: 3001005, name:"成长基金"},
				{ id: 3001006, name:"幸运装备礼包"},
				{ id: 3001007, name:"RMB进阶礼包"},
				{ id: 3001008, name:"超值锦囊-6元"},
				{ id: 3001009, name:"超值锦囊-68元"},
				{ id: 3001010, name:"坐骑礼包-6元"},
				{ id: 3001011, name:"坐骑礼包-30元"},
				{ id: 3001012, name:"坐骑礼包-98元"},
				{ id: 3001013, name:"坐骑礼包-198元"},
				{ id: 3001017, name:"明星进阶礼包"}
			],
		};
	},
	methods: {
		onAdd(id, name) {
			var nickName = this.$store.state.app.nickName;
			if(nickName == undefined|| nickName.length <=0) {
				this.$message.error("请填写昵称");
				return;
			}
			var server = this.$store.state.app.serverAddress;
			var uri = server.split("_")[1] + "admin/payment?nickname="+encodeURI(nickName)+"&purchaseId="+id;
			this.$http.get(uri).then(response => {
				// this.$message.success("添加"+name+"成功");
        this.$notify({
          title: '成功',
          message: '添加'+name+'成功',
          type: 'success'
        });
			}, response => {
				// this.$message.error("添加失败");
        this.$notify({
          title: '失败',
          message: '添加'+name+'失败',
          type: 'error'
        });
			});

		}
	}
}
</script>

<style scoped>
.el-input {
	width: 300px;
}
.item_name {
	width: 250px;
	height: 30px;
	display: inline-block;
	text-align: right;
}
</style>
