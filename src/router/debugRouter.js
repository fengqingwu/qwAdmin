import menu from "../page_default/menu/menu.vue";
import buildComponents from "../page_default/buildComponents/buildComponents.vue";
import demos from "../page_default/demos/demos.vue"
import sysSetting from "../page_default/sysSetting/sysSetting.vue"
import test from "../page_default/test/test.vue"
export default [
    {
        path: '/debug___menu',
        name: 'debug___menu',
        component: menu
    },
    {
        path: '/debug___buildComponents',
        name: 'debug___buildComponents',
        component: buildComponents
    },
    {
        path: '/debug___demos',
        name: 'debug___demos',
        component: demos
    },
    {
        path: '/debug___sysSetting',
        name: 'debug___sysSetting',
        component: sysSetting
    },
    {
        path: '/debug___test',
        name: 'debug___test',
        component: test
    }
]