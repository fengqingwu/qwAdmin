//动态布局，动态页面生成辅助参数
const app = {
    state: {
        showSettingDialog: false,
        dialogConfig: null,
        curComp: null,
    },
    action:{},
    mutations: {
        SET_SHOW_SETTING_DIALOG:(state,data)=>{
            console.log("SET_SHOW_SETTING_DIALOG",!!data)
            state.showSettingDialog = !!data
        },
        SET_DIALOG_CONFIG:(state, data)=>{
            state.dialogConfig = data;
        },
        SET_CUR_COMP:(state, data)=>{
            state.curComp = data
        }
    }
}
export default app;