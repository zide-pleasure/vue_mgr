import Vue from 'vue';
const state = {}

const mutations = {}
const actions = {}

const app = {
  state: {
    serverAddress: "",
    items: [],
    items2: [],
    originItems: [],
    nickName: ""
  },
  mutations: {
    UPDATE_NICKNAME(state, name) {
      state.nickName = name;
    },
    CHANGE_SERVER(state, server) {
      state.serverAddress = server;
    },
    INIT_ITEMS(state, itemArr) {
      // state.items = itemArr;
      state.items = itemArr.slice(0, 100);
      // state.items = itemArr;
      state.originItems = itemArr.slice();
    },
    // 分页处理
    INIT_PAGRINFO(state, currentPage) {
      var newArr = [];
      newArr = state.originItems.slice((currentPage - 1)*100, currentPage*100);
      state.items = newArr;
    },
    INIT_ITEMS2(state, itemArr) {
      state.items2 = itemArr;
      // state.items2 = itemArr.slice(0, 100);
      // state.items = itemArr;
      state.originItems2 = itemArr.slice();
    },
    FILTER_ITEMS(state, queryName) {
			var newArr = [];
			if (queryName.length <= 0) {
				state.items = state.originItems.slice(0, 100);
				return;
			};
			state.originItems.every((element, index) => {
				var searchId = false;
        var re = /^[1-9]+[0-9]*]*$/ ;
				var idStr = "";
        // console.log(re.test(queryName));
				if (re.test(queryName) && queryName.length > 3) {
					idStr = parseInt(queryName)+"";
					// if (idStr.length >=5) {
						searchId = true;
					// };
				};
				if (searchId) {
					var str = element.itemId + "";
					var index = str.indexOf(idStr)
          // console.log(element.itemId);
					if (index !== -1) {
						newArr.push(element);
					};
				}
				else {
					var result = element.name.toLowerCase().indexOf(queryName.toLowerCase());
					if(result !== -1) {
						newArr.push(element);
					}
				};
				return true;
			});
			state.items = newArr;
		},
    FILTER_TOOLS(state, queryName) {
			var newArr = [];
			if (queryName.length <= 0) {
				state.items2 = state.originItems2.slice(0, 100);
				return;
			};
			state.originItems2.every((element, index) => {
				var searchId = false;
        var re = /^[1-9]+[0-9]*]*$/ ;
				var idStr = "";
        // console.log(re.test(queryName));
				if (re.test(queryName) && queryName.length > 3) {
					idStr = parseInt(queryName)+"";
					// if (idStr.length >=5) {
						searchId = true;
					// };
				};
				if (searchId) {
					var str = element.itemId + "";
					var index = str.indexOf(idStr)
          // console.log(element.itemId);
					if (index !== -1) {
						newArr.push(element);
					};
				}
				else {
					var result = element.name.toLowerCase().indexOf(queryName.toLowerCase());
					if(result !== -1) {
						newArr.push(element);
					}
				};
				return true;
			});
			state.items2 = newArr;
		}
  },
  actions: {},
};

export default app;
