import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 布局*/
import Layout from '@/views/layout/Layout'

/* 路由模块*/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/views/user/user'),
    hidden: true
  },
  {
    path: '/pinglun',
    component: () => import('@/views/user/pinglun'),
    hidden: true
  },
  {
    path: '/userhome',
    component: () => import('@/views/user/userhome'),
    hidden: true
  },
  {
    path: '/huati',
    component: () => import('@/views/user/huati'),
    hidden: true
  },
  {
    path: '/audit',
    component: () => import('@/views/audit/audit'),
    hidden: true
  },
  {
    path: 'serious',
    component: () => import('@/views/serious/serious'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/manage-info',
    component: () => import('@/views/manage/info'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
