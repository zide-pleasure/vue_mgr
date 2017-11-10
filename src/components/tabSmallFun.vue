<template>
	<div>
		<el-row>
			<el-col :span="2">
				<span>vipLevel</span>
			</el-col>
			<el-col :span="9">
				<el-slider v-model="vipLevel" :step="1" :max="15" show-stops show-input> </el-slider>
			</el-col>
			<el-col :span="1">
				<div></div>
			</el-col>
			<el-col :span="4">
				<el-button @click="handleSubmit">提交修改</el-button>
			</el-col>
		</el-row>
		<el-row>
			<hr>
		</el-row>
	</div>
</template>

<script>
export default {
	methods: {
		handleSubmit(e) {
			var nickName = this.$store.state.app.nickName;
			var server = this.$store.state.app.serverAddress;
			if(!this.checkServerAndNickName(server, nickName)) {
				return;
			}

			var uri = server.split("_")[1] + "player/updateviplevel?nickname="+encodeURI(nickName)+"&viplevel="+this.vipLevel;
			this.$http.get(uri).then(response => {
				// this.$message.success("修改vip成功");
        this.$notify({
          title: '成功',
          message: '修改vip成功',
          type: 'success'
        });
			}, response => {
				// this.$message.error("修改vip失败");
        this.$notify.error({
          title: '错误',
          message: '修改vip失败',
          type: 'error'
        });
			});
		},
		checkServerAndNickName(server, nickName) {
			if(nickName.length <= 0) {
				this.$message({
					showClose: true,
					message: '昵称为空',
					type: 'error'
				});
				return false;
			}

			if(server.length <= 0) {
				this.$message({
					showClose: true,
					message: '请选择所在区服',
					type: 'warning'
				});
				return false;
			}
			return true;
		}
	},
	data() {
		return {
			vipLevel: 7,
			pid: ""
		};
	}
}
</script>

<style scoped>
div {
	min-width:1px;
	min-height:1px;
}
</style>
