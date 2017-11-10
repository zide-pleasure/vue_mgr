import Vue from 'vue';
const state = {
}

const mutations = {
}
const actions = {
}

const app = {
	state: {
		serverAddress:"",
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
			state.items = itemArr.slice(0, 100);
			// state.items = itemArr;
			state.originItems = itemArr.slice();
		},
		INIT_ITEMS2(state, itemArr) {
			state.items2 = itemArr.slice(0, 100);
			// state.items = itemArr;
			state.originItems2 = itemArr.slice();
		},
		FILTER_ITEMS(state, queryName) {
			var newArr = [];
			if (queryName.length <= 0) {
				state.items = state.originItems.slice(0, 100);
				// state.items = state.originItems;
				return;
			};
			state.originItems.every((element, index) => {
				var searchId = false;
				var idStr = "";
				if (queryName.length >=5 ) {
					idStr = parseInt(queryName)+"";
					if (idStr.length >=5) {
						searchId = true;
					};
				};
				if (searchId) {
					var str = element.id + "";
					var index = str.indexOf((idStr))
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
		}
	} ,
	actions: {
	},
};

export default app;
