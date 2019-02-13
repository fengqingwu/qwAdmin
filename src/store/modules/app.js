const app = {
	state: {
        logoutPage:"",
        homePage:null,
        isLoading:false,                                    //控制全局loading显示
        loadingTag:0,                                       //加载标志
        userName:'',                                        //用户名称
        userImg:'',                                         //用户头像
        appName:"",
        companyName:'',                                     //公司名称(中文)
        companyEnglish:'',                                  //公司名称(英文)
        companyLogo:'',                                     //LOGO
        isShowSidebar:true,                                 //是否现实侧边栏
        sideMenus:[],                                       //侧边栏菜单
        tags:[],                                            //tab栏数据
        curRoute:{title:'首页',link:'/Desktop'},            //当前路由
        tagsActiveIndex:0,                                  //活动tag id
        iframeLink:'',                                      //iframe的链接
        sidebarHeight:0,
        perMissionList:[],                                  //权限白名单
        debug: false,                                       //是否开启调试
    },
    actions:{},
    mutations:{
        SET_LOGOUT_PAGE:(state, data) =>{
            state.logoutPage = data
        },
        SET_HOME_PAGE:(state, data) =>{
            state.homePage = data
        },
        SET_IS_LOADING:(state,data)=>{                      //设置全局加载状态
            state.isLoading = data
        },
        SET_LOADING_TAG:(state,data)=>{
            state.loadingTag += parseInt(data)
        },
        SET_APP_NAME:(state,data)=>{
            state.appName = data
        },
        SET_USER_NAME:(state,data)=>{                       //设置用户名称
            state.userName = data
        },
        SET_USER_IMG:(state,data)=>{                        //设置用户头像
            state.userImg = data
        },
        SET_COMPANY_NAME:(state,data)=>{                    //设置公司名称
            state.companyName = data
        },
        SET_COMPANY_ENGLISH:(state,data)=>{                 //设置公司名称（英文）
            state.companyEnglish = data
        },
        SET_COMPANY_LOGO:(state,data)=>{                    //设置公司logo
            state.companyLogo = data
        },
        TOGGLE_SIDEBAR:(state,data)=>{                      //取反侧边栏状态
            state.isShowSidebar=!state.isShowSidebar;
        },
        SET_SIDE_MENUS: ( state, data ) => {                //设置侧边栏菜单数据
            state.sideMenus = data
        },
        SET_TAGS: ( state, data ) => {                      //设置标签数据
            state.tags =  data
        },
        ADD_TAG: ( state, data ) => {
            var tag=false;
            for(let attr in state.tags){
                if(data.id==state.tags[attr].id){
                    tag=true;
                    state.tagsActiveIndex=attr;
                    return;
                }
            }
            state.tags.push(data);
            state.tagsActiveIndex = state.tags.length-1;
        },
        SET_TAG_ACTIVE_INDEX: ( state, data ) =>{
            state.tagsActiveIndex=parseInt(data) || 0;
        },
        REMOVE_TAG: ( state, index ) => {
            state.tags.splice(index,1)
        },
        SET_CUR_ROUTE: ( state, data ) =>{           
            state.curRoute=data;
        },
        SET_IFRAMELINK: ( state,data ) => {
            state.iframeLink=data;
        },
        SET_SIDEBARHIEGHT: ( state,data ) => {
            state.sidebarHeight = data;
        },
        SET_PERMISSION_LIST: ( state,data ) => {
            state.perMissionList =data;
        },
        SET_DEBUG: ( state, data ) => {
            state.debug = data;
        },
        SET_COMPANY_LOGO: (state, data) => {
            state.companyLogo =data;
        }
    },
    getters:{
        getIsLoading:(state) => state.isLoading,                //获取全局loading状态
        getUserName:(state) => state.userName,                  //获取用户名
        getUserImg:(state) => state.userImg,                    //获取用户头像
        getCompanyName:(state) => state.companyName,            //获取公司名称（中文）
        getCompanyEnglish:(state) => state.companyEnglish,      //获取公司名称（英文）
        getCompanyLogo:(state) => state.companyLogo,            //获取公司LOGO
        getPorts:(state) => state.ports,                        //获取api地址
        getShowSidebar:(state) => state.showSideBar,            //获取侧边栏显示状态
        getSideMenus:(state) => state.sideMenus,                //获取侧边栏菜单
        getTags:(state) => state.tags,                          //获取tab标签数据
        getCurRoute:(state) => state.curRoute,                  //获取当前主路由
        getTagsActiveIndex:( state ) => state.tagsActiveIndex,  //获取标签组件数据活动索引,
        getIframeLink:( state ) => state.iframeLink,
    }
}

export default app;