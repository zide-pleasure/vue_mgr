<template>
  <el-table
     :data="Data"
     :default-sort = "{prop: 'score', order: 'ascending'}"
     style="width: 800px">
     <el-table-column type="expand">
         <template slot-scope="props">
           <el-table
                  :data="props.row.reasons"
                  border
                  size ="small"
                   :row-style = "rowStyle"
                  style="width: 100%">
                  <el-table-column
                  label ='xxx'
                   align = 'center'
                    type="index">
                  </el-table-column>
                  <el-table-column
                    prop="Data"
                    label="日期"
                     align = 'center'
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="reason"
                    label="说明"
                     align = 'center'
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="score"
                     align = 'center'
                    label="计分">
                  </el-table-column>
          </el-table>
           <!-- <ul v-for= "item in props.row.reasons" class="reason_ul">
            <li>{{item.reason}}</li>
           </ul> -->
         </template>
     </el-table-column>
     <el-table-column
       label="编号"
       align = 'center'
       prop="id">
     </el-table-column>
     <el-table-column
       label="姓名"
       align = 'center'
       prop="name">
     </el-table-column>
     <el-table-column
       label="分数"
       align = 'center'
       sortable
       prop="score">
     </el-table-column>
   </el-table>
</template>

<script>
export default {
  mounted() {
    var url = "http://10.0.3.36:3000/data/read?type=manager";
      // console.log("http://192.168.130.13:3000/data/manager.json");
    this.$http.get(url).then(response => {
      let signData = response.data.data;
      for (let i = 0; i < signData.length; i++) {
        let ids = signData[i].name.split("-")[0]
        this.Data[ids].score+= Number(signData[i].score);
          this.Data[ids].reasons.push(signData[i])
      }
      console.log(JSON.stringify(this.Data));
    }, response => {
      this.$message.error("获取数据失败");
      // error callback
    });
  },
	data() {
		return {
      Data: [
        {
          id: '1',
          name: '贺东华',
          score: 0,
          reasons: []
        }, {
          id: '2',
          name: '张雪姣',
          score: 0,
          reasons: []
        },{
          id: '3',
          name: '韩艳龙',
          score: 0,
          reasons: []
        },
        {
          id: '4',
          name: '谭燕青',
          score: 0,
          reasons: []
        }, {
          id: '5',
          name: '蔡伟',
          score: 0,
          reasons: []
        },{
          id: '6',
          name: '田贤松',
          score: 0,
          reasons: []
        },
        {
          id: '7',
          name: '温晓凯',
          score: 0,
          reasons: []
        }, {
          id: '8',
          name: '梁健',
          score: 0,
          reasons: []
        },{
          id: '9',
          name: '房自德',
          score: 0,
          reasons: []
        },
        {
          id: '10',
          name: '周福祥',
          score: 0,
          reasons: []
        }, {
          id: '11',
          name: '杨志权',
          score: 0,
          reasons: []
        },{
          id: '12',
          name: '郑煌斐',
          score: 0,
          reasons: []
        },
        {
          id: '13',
          name: '毛有斌',
          score: 0,
          reasons: []
        },
        {
          id: '14',
          name: '李俊峰',
          score: 0,
          reasons: []
        }
      ]
		};
	},
	methods: {
    rowStyle(){
      return "background: #f0f9eb"
    }
	}
}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-table .warning-row {
  background: #f0f9eb;
}
.bgRed{
  background: #d43047;
}

</style>
