<template>
<div id="app">
  <el-container>
    <el-header style="height: 80px; background-color: rgb(64, 158, 255);">霍去病Tools</el-header>
    <el-main>
      <span class="span_label">服务器：</span>
      <el-select v-model="server" filterable placeholder="请选择服务器" v-on:change="changeHandler">
        <el-option v-for="item in serverList" v-bind:key="item.serverAddress" :label="item.serverName" :value="item.serverAddress">
        </el-option>
      </el-select>
      <span class="span_label">昵称：</span>
      <div style="display:inline-block; width:210px;">
        <el-input placeholder="请输入昵称" size="medium" v-model="nickName"> </el-input>
      </div>
    </el-main>
    <section>
      <!-- 选项卡 -->
      <el-tabs tab-position="left" type="border-card">
        <!-- <el-tab-pane label="常用物品">
          <section style="padding:0 250px 1px 1px;">
            <tabOffenUse></tabOffenUse>
          </section>
        </el-tab-pane> -->
        <el-tab-pane label="增加物品">
          <addItem></addItem>
        </el-tab-pane>
        <el-tab-pane label="增加道具">
          <addTools></addTools>
        </el-tab-pane>
        <el-tab-pane label="活动充值">
          <actRecharge></actRecharge>
        </el-tab-pane>
        <el-tab-pane label="功能合集">
          <tabSmallFun></tabSmallFun>
        </el-tab-pane>
        <el-tab-pane label="考勤日常">
          <dailySign></dailySign>
        </el-tab-pane>
        <!-- <el-tab-pane label="小工具">
        </el-tab-pane> -->
      </el-tabs>
    </section>
  </el-container>
</div>
</template>
<script>
import tabOffenUse from './components/tabOffenUse'
import addItem from './components/addItem'
import addTools from './components/addTools'
import tabSmallFun from './components/tabSmallFun'
import dailySign from './components/dailySign'
import actRecharge from './components/actRecharge'
export default {
  mounted() {
    var url = "http://10.0.3.69:8000/serverlist?uid=&product=1&version=0.1.23&channel=none&group=5.4";
    this.$http.get(url).then(response => {
      var serverList = response.body.serverList
      serverList.forEach(function(serverData) {
        var sid = serverData.serverId.split("_")[1]
        serverData.serverId = sid;
        var serverName = "S" + sid + "-" + serverData.serverName;
        serverData.serverName = serverName;
        serverData.serverAddress = "S" + sid + "_" + serverData.serverAddress;
        //console.log(JSON.stringify(serverData));
      });
      serverList.sort(function(a, b) {
        return parseInt(a.serverId) < parseInt(b.serverId) ? -1 : 1;
      });
      this.serverList = serverList;
      this.$message.success("获取区服列表成功");
    }, response => {
      this.$message.error("获取区服列表失败");
      // error callback
    });
  },
  computed: {
    nickName: {
      get() {
        return this.$store.state.app.nickName;
      },
      set(value) {
        this.$store.commit("UPDATE_NICKNAME", value);
      }
    },
    server: {
      get() {
        return this.$store.state.app.serverAddress;
      },
      set(value) {
        console.log("set-server:" + value);
        this.$store.commit("CHANGE_SERVER", value);
      }
    }
  },
  data() {
    return {
      serverList: []
      // server: ""
      // nickName: ""
    }
  },

  methods: {
    changeHandler() {
      // console.log("server_choose===" + this.server);
      console.log(this.server);
      var address = this.server.split("_")[1];
      this.$http.get("http://10.0.3.53:8091" + '/admin/api/Item/5').then(response => {
				console.log(response);
				var itemArr = [];
				itemArr = response.body.domainObject;
	      // var itemArr2 = []; // 道具item
        this.$store.commit("INIT_ITEMS", itemArr);
        // this.$store.commit("INIT_ITEMS2", itemArr2);
        this.$message.success("成功获取item列表");
      }, response => {
        this.$message.error("服务器错误");
        // error callback
      });
      this.$http.get("http://10.0.3.53:8091" + '/admin/api/Item/4').then(response => {
				console.log(response);
				// var itemArr = [];
				 var itemArr2 = []; // 道具item
				itemArr2 = response.body.domainObject;
        // this.$store.commit("INIT_ITEMS", itemArr);
        this.$store.commit("INIT_ITEMS2", itemArr2);
        this.$message.success("成功获取item列表");
      }, response => {
        this.$message.error("服务器错误");
        // error callback
      });
      // this.$http.get("http://192.168.130.13:8080" + '/admin/additemhtml').then(response => {
      //   var parser = new DOMParser();
      //   var cheerio = require('cheerio');
      //   var $ = cheerio.load(response.bodyText, {
      //     xmlMode: false
      //   });
      //   var itemArr = [];
      //   var itemArr2 = []; // 道具item
      //   var trElements = $('tr').each(function(i, item) {
      //     if ($(this).children().last().prev().text().substring(0, 1) == 5) {
      //       itemArr.push({
      //         id: $(this).children().last().prev().text(),
      //         name: $(this).children().last().text()
      //       })
      //     } else {
      //       itemArr2.push({
      //         id: $(this).children().last().prev().text(),
      //         name: $(this).children().last().text()
      //       })
      //     }
      //   });
      //   this.$store.commit("INIT_ITEMS", itemArr);
      //   this.$store.commit("INIT_ITEMS2", itemArr2);
      //   this.$message.success("成功获取item列表");
      // }, response => {
      //   this.$message.error("服务器错误");
      //   // error callback
      // });
    }
  },
  components: {
    tabOffenUse,
    addItem,
    addTools,
    actRecharge,
    dailySign,
    tabSmallFun
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
  background-color: #E9EEF3;
  margin: 0;
  padding: 0;
}

.el-tab-pane {
  height: auto;
  text-align: center;
  padding: 10px;
}

.el-tabs__item {
  height: 65px;
  line-height: 65px;
  color: #1f2d3d;
}

.el-header {
  background-color: rgb(64, 158, 255);
  color: #fff;
  text-align: center;
  line-height: 80px;
}

.span_label {
  color: rgb(119, 136, 153);
}

body>.el-container {
  margin-bottom: 40px;
}
</style>
