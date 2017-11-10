<template>
	<div>
		<p> 常用道具添加: </p>
		<div v-for="item in itemList" width="100">
			<div class="item_name">
				{{ item.name }} id:{{item.id}}
			</div>
			<el-input
				width="100"
				placeholder="请输入数量, 回车添加"
				@keyup.enter.native="onAdd(item.id, item.name, $event.target.value)"
				>
			</el-input>
			<p></p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			itemList: [
				{ id: 400003, name:"经验"},
				{ id: 400002, name:"钻石"},
				{ id: 400005, name:"战功"},
				{ id: 400001, name:"金币"},
				{ id: 405001, name:"霍去病碎片"},
				{ id: 405002, name:"李敢碎片"},
				{ id: 50561040, name:"白色品质靴子"},
				{ id: 50692100, name:"绿色品质戒指"},
				{ id: 50094080, name:"紫色品质武器"},
				{ id: 50135080, name:"橙色品质武器"}
			],
		};
	},
	methods: {
		onAdd(id, name, value) {
			var nickName = this.$store.state.app.nickName;
			var num = value;
			if(num == undefined || num <= 0) {
				this.$message.error("请输入正确的数量");
				return;
			}
			if(nickName == undefined|| nickName.length <=0) {
				this.$message.error("请填写昵称");
				return;
			}
			var server = this.$store.state.app.serverAddress;
			var uri = server.split("_")[1] + "admin/additem?nickname="+encodeURI(nickName)+"&itemId="+id+"&itemCount="+num;
			this.$http.get(uri).then(response => {
				this.$message.success("添加"+name+"成功");
			}, response => {
				this.$message.error("添加失败");
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
