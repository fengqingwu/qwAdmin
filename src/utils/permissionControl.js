
/**
 * 根据api获取权限拦截列表 你也可自定义拦截逻辑
 * @param {string} link 
 */
const getMenuPerMissionByLink= (link)=>{
    return window.qwMainNavPool[link];
}
/**
 * 权限判断
 * @param {Vue components} Vue 
 */
const checkPerMission = (Vue,url) => {
    let perMissionList = getMenuPerMissionByLink(window.sessionStorage.getItem("curlink"));
    if(!perMissionList){
        return true;
    }else if(perMissionList.length==0){
        return true;
    }else{
        for (let per of perMissionList){
            if(per.code == url){
                return false;
                break;
            }
        }
        return true;
    }
}
export default checkPerMission;