const skinConfig = {
    state: {
        //右键菜单
        showEditer: false,
        contextMenuShow: false,
        contextMenuDataEvent: null,
        contextMenuDataTarget: null,
    },
    actions: {},
    mutations: {
        //右键菜单
        SET_SHOW_CONTEXTMENU: (state, data) => {
            // console.log('SET_SHOW_CONTEXTMENU==>', data);
            state.contextMenuShow = data;
        },
        SET_CONTEXTMENU_EVENT: (state, data) => {
            // console.log('SET_CONTEXTMENU_EVENT==>', data);
            state.contextMenuDataEvent = data;
        },
        SET_CONTEXTMENU_TARGET: (state, data) => {
            // console.log('SET_CONTEXTMENU_TARGET==>', data)
            state.contextMenuDataTarget = data;
        },
        SET_SHOW_EDITER: (state, data) => {
            // console.log('SET_SHOW_EDITER==>', data);
            state.showEditer = data;
        }
    },
    getters: {
        //右键菜单
        getShowEditer: (state) => state.showEditer,
        getContextMenuShow: (state) => state.contextMenuShow,
        getContextMenuDataEvent: (state) => state.contextMenuDataEvent,
        getContextMenuDataTarget: (state) => state.contextMenuDataTarget
    }
}

export default skinConfig;