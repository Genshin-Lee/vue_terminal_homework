import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
 history: createWebHashHistory(),
 routes: [
    { path: '/', redirect: '/Login' },
    { path: '/Login', component: ()=> import ('./components/Login.vue') },
    { path: '/News', component: ()=> import ('./components/News.vue') },
    { path: '/Profile', component: ()=> import ('./components/Profile.vue') },
    { path: '/BigData', component: ()=> import ('./components/BigData.vue') },
    {
      path: '/News/NewsDetail',
      name: 'NewsDetail',
      component: ()=> import ('./components/NewsDetail.vue'), // 对应的组件
    }//详情页动态路由
    ]
 })
export default router