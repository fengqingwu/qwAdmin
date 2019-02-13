import iframeLink from '../page_default/iframeLink/index.vue'
import page_404 from '../page_default/404/index.vue'

export default [
    {
        path: '/iframeLink',
        name: 'iframeLink',
        component: iframeLink
    },
    {
        path: "*",
        component: page_404,
        name: "404"
    },
    {
        path: "/404",
        component: page_404,
        name: "404"
    }
]