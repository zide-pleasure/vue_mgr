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
  <el-row>
    <el-button type="primary" @click.native="goDownLoad(0)" href="">打包地址</el-button>
  </el-row>
  <el-row>
    <hr>
  </el-row>
  <el-row>
    <el-button type="success" @click.native="goDownLoad(1)" href="">安装包下载地址</el-button>
  </el-row>
  <el-row>
    <hr>
  </el-row>
  <el-row>
    <el-button type="success" @click.native="goDownLoad(2)" href="">hl-uieditor-hqb</el-button>
      <el-button type="success" @click.native="goDownLoad(3)" href="">UI编辑器windows版本下载</el-button>
  </el-row>

  <el-row>
    <hr>
  </el-row>
  <el-row>
    <el-button type="success" @click="handleSearch">查询PlatformId</el-button> <span>{{pid}}</span>
  </el-row>
  <el-row>
    <hr>
  </el-row>
  <el-row>
    <el-button type="success" @click="skipNewgain">跳过新手</el-button>
  </el-row>
  <el-row>
    <hr>
  </el-row>
  <el-row>
      <div style="display:inline-block; width:210px;">
    <el-input placeholder="groupId" size="groupId" v-model="groupId"> </el-input>
    </div>
      <div style="display:inline-block; width:210px;">
    <el-input placeholder="noviceId" size="noviceId" v-model="noviceId"> </el-input>
        </div>
      <el-button type="success" @click="handleNovice">Novice</el-button>
  </el-row>
  <el-row>
    <hr>
  </el-row>
</div>
</template>

<script>
export default {
  data() {
    return {
      pid: ""
    };
  },
  methods: {
    handleSearch() {
      this.pid = "";
      var nickName = this.$store.state.app.nickName;
      var server = this.$store.state.app.serverAddress;
      if (!this.checkServerAndNickName(server, nickName)) {
        return;
      }
      var uri = server.split("_")[1] + "/admin/user?nickname=" + encodeURI(nickName);
      this.$http.get(uri).then(response => {
        if (typeof response.body == 'string') {
          this.$message({
            showClose: true,
            message: '未查询到结果',
            type: 'warning'
          })
        } else {
          this.pid = response.body[0];
        }
      }, response => {
        this.$message({
          showClose: true,
          message: "未知错误",
          type: 'error'
        })
      });
    },
    handleNovice() {
      this.pid = "";
      var nickName = this.$store.state.app.nickName;
      var server = this.$store.state.app.serverAddress;
      if (!this.checkServerAndNickName(server, nickName)) {
        return;
      }
      var uri = server.split("_")[1] + "admin/novice?nickname=" + encodeURI(nickName) + "&groupId=" + this.groupId + "&noviceId=" + this.noviceId;
      this.$http.get(uri).then(response => {
        if (typeof response.body == 'string') {
          this.$message({
            showClose: true,
            message: '请求成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '未查询到结果',
            type: 'warning'
          })
        }
      }, response => {
        this.$message({
          showClose: true,
          message: "未知错误",
          type: 'error'
        })
      });
    },
    skipNewgain() {
      this.pid = "";
      var nickName = this.$store.state.app.nickName;
      var server = this.$store.state.app.serverAddress;
      if (!this.checkServerAndNickName(server, nickName)) {
        return;
      }
      var uri = server.split("_")[1] + "admin/skipnovice?nickname=" + encodeURI(nickName);
      this.$http.get(uri).then(response => {
          this.$message({
            showClose: true,
            message: '跳过新手成功',
            type: 'success'
          })
      }, response => {
        this.$message({
          showClose: true,
          message: "跳过新手失败",
          type: 'error'
        })
      });
    },
    goDownLoad(i) {
      let url_ = this.downloadUrl[i];
      window.open(url_);
    },
    handleSubmit(e) {
      var nickName = this.$store.state.app.nickName;
      var server = this.$store.state.app.serverAddress;
      if (!this.checkServerAndNickName(server, nickName)) {
        return;
      }

      var uri = server.split("_")[1] + "player/updateviplevel?nickname=" + encodeURI(nickName) + "&viplevel=" + this.vipLevel;
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
      if (nickName.length <= 0) {
        this.$message({
          showClose: true,
          message: '昵称为空',
          type: 'error'
        });
        return false;
      }

      if (server.length <= 0) {
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
      downloadUrl: [
        // 'http://192.168.150.27:8080/jenkins/job/huoqubing/build?delay=0sec',
        // 'http://192.168.150.27:8080/huoqubing/',
        'http://10.0.3.63:8080/jenkins/job/huoqubing/',
        'http://10.0.3.63:8080/huoqubing/',
        'http://code.hoolai.com/AuroraEngine/hl-uieditor/archive/hqb.zip',
        // 'http://code.hoolai.com/AuroraEngine/hl-uieditor/archive/master.zip',
        'http://10.0.2.93/AtomUiEditorWin.zip'
        // ' http://192.168.140.59/AtomUIEditorWin.zip'
      ],
      pid: "",
      groupId: "",
      noviceId: ""
    };
  }
}
</script>

<style scoped>
div {
  min-width: 1px;
  min-height: 1px;
}
</style>
