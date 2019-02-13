/**
 * 系统菜单前后端菜单对接转化相关函数
 * 2018/1030
 */

// 将后台给出的json转为前端菜单
export const transMenuServerToApp = (menu) => {
    let menu_ = [];
    for (let attr in menu) {
        menu_[attr] = {
            "title": menu[attr].alias,
            "link": '/' + menu[attr].code,
            "childrens": []//childList
        };
        if (menu[attr].childList && menu[attr].childList.length > 0) {
            menu_[attr].childrens = transMenuServerToApp(menu[attr].childList)
        }
    }
    return menu_;
}
// 前端菜单转为 后台菜单
export const tansMenuAppToServer = (menu) => {
    let menu_ = [];
    for (let attr in menu) {
        menu_[attr] = {
            "alias": menu[attr].title,
            "code": menu[attr].link.replace(/^\/{1}/, ""),
            "descs": menu[attr].title,
            "buttonList": [],
            "childList": []
        };
        if (menu[attr].childrens && menu[attr].childrens.length > 0) {

            menu_[attr].childList = tansMenuAppToServer(menu[attr].childrens)
        }
    }

    return menu_;
}

let menusApp = [
    {
        id: 1,
        title: '数据仓库',
        link: '/dataCenter',
        childrens: [
            {
                id: 6,
                title: '数据建模',
                link: '/dataModel',
                childrens: []
            },
            {
                id: 7,
                title: '数据结构',
                link: '/dataStruct'
            }
        ]
    },
    {
        id: 2,
        title: '数据授权',
        link: '/dataAuth',
        childrens: [
            {
                id: 8,
                title: '授权策略',
                link: '/dataAuthMehod',
                childrens: []
            },
            {
                id: 9,
                title: '角色授权',
                link: '/dataAuthRole',
                childrens: []
            },
            {
                id: 10,
                title: '人员查看',
                link: '/dataAuthPerson',
                childrens: []
            },
            {
                id: 11,
                title: '授权查询',
                link: '/dataAuthQuery',
                childrens: []
            },
        ]
    },
    {
        id: 3,
        title: '数据运维',
        link: '/dataInfo',
        childrens: []
    },
    {
        id: 5,
        title: '数据日志',
        link: '/dataLog',
        childrens: []
    }
]



let menuServer = [{ "alias": "数据仓库", "appId": 169, "buttonList": [], "code": "dataCenter", "deleted": "F", "descs": "数据仓库", "id": 2746, "isControl": false, "parentId": 0, "path": "2746" }, { "alias": "数据建模", "appId": 169, "buttonList": [], "code": "dataModel", "deleted": "F", "descs": "数据建模", "id": 2747, "isControl": false, "parentId": 2746, "path": "2746,2747" }, { "alias": "数据结构", "appId": 169, "buttonList": [], "code": "dataStruct", "deleted": "F", "descs": "数据结构", "id": 2748, "isControl": false, "parentId": 2746, "path": "2746,2748" }, { "alias": "数据授权", "appId": 169, "buttonList": [], "code": "dataAuth", "deleted": "F", "descs": "数据授权", "id": 2749, "isControl": false, "parentId": 0, "path": "2749" }, { "alias": "授权策略", "appId": 169, "buttonList": [], "code": "dataAuthMehod", "deleted": "F", "descs": "授权策略", "id": 2750, "isControl": false, "parentId": 2749, "path": "2749,2750" }, { "alias": "角色授权", "appId": 169, "buttonList": [], "code": "dataAuthRole", "deleted": "F", "descs": "角色授权", "id": 2751, "isControl": false, "parentId": 2749, "path": "2749,2751" }, { "alias": "人员查看", "appId": 169, "buttonList": [], "code": "dataAuthPerson", "deleted": "F", "descs": "人员查看", "id": 2752, "isControl": false, "parentId": 2749, "path": "2749,2752" }, { "alias": "授权查询", "appId": 169, "buttonList": [], "code": "dataAuthQuery", "deleted": "F", "descs": "授权查询", "id": 2753, "isControl": false, "parentId": 2749, "path": "2749,2753" }, { "alias": "数据运维", "appId": 169, "buttonList": [], "code": "dataInfo", "deleted": "F", "descs": "数据运维", "id": 2754, "isControl": false, "parentId": 0, "path": "2754" }, { "alias": "数据日志", "appId": 169, "buttonList": [], "code": "dataLog", "deleted": "F", "descs": "数据日志", "id": 2755, "isControl": false, "parentId": 0, "path": "2755" }];
function transMenuServerToApp2(menu,pid){
    let menu_ =[];
    for(let item of menu){
       if(item.parentId==pid){
           let menuItem = {
               "id": item.id,
               "title": item.alias,
               "link": '/' + item.code,
               "childrens": []//childList
           }
           menuItem.childrens = transMenuServerToApp2(menu, item.id)
           menu_.push(menuItem);
       }
    }
    return menu_
}
// console.log(transMenuServerToApp2(menuServer,0));
function buildPerMissionList(menu){
    let list =[];
    for(let item of menu){
        list.push(item.code);
    }
    return list;
}