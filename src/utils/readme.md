关于框架权限控制：

1.菜单控制
    基于index.html app标签里的节点 app-menu
    原理：
        1.利用app-menu传入到app.vue最终传入到index.vue
        2.通过tansServeMenu2App转化为app多级菜单
        3.基于app-menu生成权限列表permissionList
        4.在main.js 进行路由拦截判断to.path是否在permissionList里面，如果不存在则跳转到404
2.api权限控制
    基于api的黑名单的权限控制
    原理:
        1.利用app-menu节点里的每个菜单的buttonList节点传入到App.vue
        2.已app-menu单个项的 "/"加上 code 为key组成权限控制对象并存储到window对象上(不存储在store上是因为某些接口在created请求导致拦截失败)
        3.在utils下的public.js的每种请求前做一层拦截，具体见public.js和permissionControl.js
