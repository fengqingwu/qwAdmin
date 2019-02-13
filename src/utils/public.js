import checkPerMission from "./permissionControl.js"
/**
 * @description    基于axios的数据请求类,注意:此名称不可以更改 serve服务会调用此页面并改变配置
 */
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
let port = '';
let timeout = localStorage.getItem('api_timeout');
timeout= timeout? timeout : 6000;
//请求方法
export default {   
    /**
     * @description get请求
     * @param { String } url 
     * @param { Object } data 
     * @param { Boolean } noPocPort 
     */     
    fetchGet(url, data = {}, noPocPort = false) {
        if (data.Vue) {
            if(!checkPerMission(data.Vue,url)){
                return new Promise((resolve, reject) => {
                    let err = {
                        result: false,
                        message: "当前角色没有访问该接口的权限！"
                    }
                    data.Vue.$message.error(err.message);
                    reject(null, err)
                })
            }
            data.Vue.$store.commit("SET_LOADING_TAG", 1)
        }
        let params = data.params ? this.setParams(data.params) : {};
        return new Promise((resolve, reject) => {
            axios.get((noPocPort ? url : (this.getPocPort() + url)), {
                params
            }, { timeout: timeout }).then(res => {
                if (data.Vue) setTimeout(() => {
                    data.Vue.$store.commit("SET_LOADING_TAG", -1)
                }, 100);
                if (res.data.result) {
                    resolve(res.data)
                } else {
                    if (data.Vue) {
                        data.Vue.$message.error(res.data.message);
                        reject(res)
                    }
                }
            }).catch(error => {
                if (data.Vue) setTimeout(() => {
                    data.Vue.$store.commit("SET_LOADING_TAG", -1)
                }, 100);
                if (data.Vue) {
                    data.Vue.$message.error('系统异常');
                }
                reject(null, error)
            })
        })
    },
    /**
     * @description 快捷获取
     * @param {String} url 
     * @param {Object[Vue]} Vue 
     */
    fetchQuickSearch(url, Vue) {
        return new Promise((resolve, reject) => {
            axios.get(this.getPocPort() + url, { timeout: timeout }).then(res => {
                if (res.data.result) {
                    resolve(res.data)
                } else {
                    if (Vue) {
                        Vue.$message.error(res.data.message);
                    }
                    reject(res)
                }
            }).catch(error => {
                if (Vue) {
                    Vue.$message.error('系统异常');
                }
                reject(null, error)
            })
        })
    },
    /**
     * post获取数据
     * @param {String} url 
     * @param {Object} data 
     * @param {Boolean} noPocPort 
     */
    fetchPost(url, data = {}, noPocPort = false) {
        if (data.Vue) {
            if (!checkPerMission(data.Vue, url)) {
                return new Promise((resolve, reject) => {
                    let err = {
                        result: false,
                        message: "当前角色没有访问该接口的权限！"
                    }
                    data.Vue.$message.error(err.message);
                    reject(null,err)
                })
            }
            data.Vue.$store.commit("SET_LOADING_TAG", 1)
        }
        let params = data.params ? this.setParams(data.params) : {};
        return new Promise((resolve, reject) => {
            axios.post((noPocPort ? url : (this.getPocPort() + url)), params, { timeout: timeout}).then(res => {
                if (res.data.result) {
                    resolve(res.data)
                } else {
                    if (data.Vue) {
                        data.Vue.$message.error(res.data.message);
                    }
                    reject(res)
                }
                if (data.Vue) {
                    setTimeout(() => {
                        data.Vue.$store.commit("SET_LOADING_TAG", -1)
                    }, 100);
                }
            }).catch(error => {
                if (data.Vue) {
                    data.Vue.$message.error('系统异常');
                }
                reject(null, error)
                if (data.Vue) {
                    setTimeout(() => {
                        data.Vue.$store.commit("SET_LOADING_TAG", -1)
                    }, 100);
                }
            })
        })
    },
    /**
     * @description 以json为参数请求数据
     * @param {String} url 
     * @param {Object} data 
     * @param {Boolean} noPocPort 
     */
    fetchPostJson(url, data = {}, noPocPort = false) {
        if (data.Vue) {
            if (!checkPerMission(data.Vue, url)) {
                return new Promise((resolve, reject) => {
                    let err = {
                        result: false,
                        message: "当前角色没有访问该接口的权限！"
                    }
                    data.Vue.$message.error(err.message);
                    reject(null, err)
                })
            }
            data.Vue.$store.commit("SET_LOADING_TAG", 1)
        }
        return new Promise((resolve, reject) => {
            axios.post((noPocPort ? url : (this.getPocPort() + url)), data.params, { timeout: timeout }).then(res => {
                if (res.data.result) {
                    resolve(res.data)
                } else {
                    if (data.Vue) {
                        data.Vue.$message.error(res.data.message);
                    }
                    reject(res);
                }
                if (data.Vue) {
                    setTimeout(() => {
                        data.Vue.$store.commit("SET_LOADING_TAG", -1)
                    }, 100);
                }
            }).catch(error => {
                if (data.Vue) {
                    data.Vue.$message.error('系统异常');
                }
                reject(null, error);
                if (data.Vue) {
                    setTimeout(() => {
                        data.Vue.$store.commit("SET_LOADING_TAG", -1)
                    }, 100);
                }
            })
        })
    },
    /**
     * @description 过滤参数
     * @param {Object[JSON]} params 
     */
    setParams(params) {
        let fdata = new URLSearchParams();
        for (let attr in params) {
            if (null !== params[attr]) {
                fdata.append(attr, params[attr]);
            }
        }
        return fdata;
    },
    /**
     * 获取api请求URL domain
     */
    getPocPort() {
        if (!port) {
            port = localStorage.getItem('ports');
            // console.log('port====>', port);
        }
        return port;
    }
}
