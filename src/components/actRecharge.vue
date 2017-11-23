<template>
	<div>
		<div v-for="item in itemList" style="width: 650px; float:left;">
			<div class="item_name" style="color:#fa5555">
				{{ item.name }} id:{{item.id}}
			</div>
      <el-button type="primary" @click.native="onAdd(item.id, item.name, item.FunctionId, item.Level)">添加</el-button>
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
        { id: 2001001, name:"周卡", FunctionId: 0, Level: 0},
				{ id: 2001002, name:"月卡", FunctionId: 0, Level: 0},
				{ id: 2001003, name:"60钻", FunctionId: 0, Level: 0},
				{ id: 2001004, name:"300钻", FunctionId: 0, Level: 0},
				{ id: 2001005, name:"980钻", FunctionId: 0, Level: 0},
				{ id: 2001006, name:"1980钻", FunctionId: 0, Level: 0},
				{ id: 2001007, name:"3280钻", FunctionId: 0, Level: 0},
				{ id: 2001008, name:"6480钻", FunctionId: 0, Level: 0},
				{ id: 3001002, name:"坐骑礼包", FunctionId: 408, Level: 0},
				{ id: 3001003, name:"998元礼包", FunctionId: 414, Level: 0},
				{ id: 3001004, name:"998元礼包", FunctionId: 415, Level: 0},
				{ id: 3001005, name:"成长基金", FunctionId: 301, Level: 0},
				{ id: 3001006, name:"幸运装备礼包", FunctionId: 410, Level: 0},
				{ id: 3001007, name:"RMB进阶礼包", FunctionId: 417, Level: 0},
				{ id: 3001008, name:"超值锦囊-6元", FunctionId: 430, Level: 1},
				{ id: 3001009, name:"超值锦囊-68元", FunctionId: 430, Level: 2},
				{ id: 3001010, name:"坐骑礼包-6元", FunctionId: 433, Level: 1},
				{ id: 3001011, name:"坐骑礼包-30元", FunctionId: 433, Level: 2},
				{ id: 3001012, name:"坐骑礼包-98元", FunctionId: 433, Level: 3},
				{ id: 3001013, name:"坐骑礼包-198元", FunctionId: 433, Level: 4},
				{ id: 3001017, name:"明星进阶礼包", FunctionId: 648, Level: 0}
			],
		};
	},
	methods: {
		onAdd(id, name, FunctionId, Level) {
			var nickName = this.$store.state.app.nickName;
			if(nickName == undefined|| nickName.length <=0) {
				this.$message.error("请填写昵称");
				return;
			}
			var server = this.$store.state.app.serverAddress;
			var uri = server.split("_")[1] + "admin/payment?nickname="+encodeURI(nickName)+"&purchaseId="+id;
			// var uri = server.split("_")[1] + "admin/payment?nickname="+encodeURI(nickName)+"&purchaseId="+id+"&templateId="+FunctionId+"&level="+Level;
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
