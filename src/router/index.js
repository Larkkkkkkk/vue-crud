import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect:'/manager/home'},  // /通过redirect重定向到/home位置
    {path: '/manager', name: 'manager', meta: {title:'父页面'}, component: () => import('../views/Manager.vue'), children: [
        {path: 'home', name: 'home', meta: {title:'主页'}, component: () => import('../views/Home.vue'),},
        {path: 'test', name: 'test', meta: {title: '测试数据页面'}, component: () => import('../views/Test.vue'),},
        {path: 'data', name: 'data', meta: {title: '数据展示页面'}, component: () => import('../views/Data.vue'),},
        {path: 'employee', name: 'employee', meta: {title: '员工信息页面'}, component: () => import('../views/Employee.vue'),},
    ]},
      {path: '/404', name: 'NotFound', meta: {title: '404找不到页面'}, component: () => import('../views/404.vue'),},
      {path: '/login', name: 'Login', meta: {title: '登录页面'}, component: () => import('../views/Login.vue'),},
      {path: '/:pathMatch(.*)', redirect:'/404'},  // /通过redirect重定向到/home位置
  ]
})
//路由守卫
//to: 跳转后route对象(跳转后的一些操作)
//from: 将要进行跳转的当前route对象(跳转前的一些操作)
//next: 调用该方法后，才能进入下一个钩子
router.beforeEach((to,from,next)=>{
    //document.title是当前页面的标题
    document.title=to.meta.title;
    //next函数必须存在【才能跳转】
    next()
})
export default router
