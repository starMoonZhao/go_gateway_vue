import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/service',
    component: Layout,
    redirect: '/service/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/service/ServiceList'),
        name: '服务列表',
        meta: { title: '服务列表', icon: 'component', affix: true }
      },
      {
        path: 'service_stat/:id(\\d+)',
        component: () => import('@/views/service/ServiceStat'),
        name: '服务流量统计',
        meta: { title: '服务流量统计', icon: 'component', affix: false },
        hidden: true
      },
      {
        path: 'service_add_http',
        component: () => import('@/views/service/ServiceHTTP'),
        name: '添加HTTP服务',
        meta: { title: '添加HTTP服务', icon: 'component', affix: false },
        hidden: true
      },
      {
        path: 'service_edit_http/:id(\\d+)',
        component: () => import('@/views/service/ServiceHTTP'),
        name: '编辑HTTP服务',
        meta: { title: '编辑HTTP服务', icon: 'component', affix: false },
        hidden: true
      },
      {
        path: 'service_add_tcp',
        component: () => import('@/views/service/ServiceTCP'),
        name: '添加TCP服务',
        meta: { title: '添加TCP服务', icon: 'component', affix: false },
        hidden: true
      },
      {
        path: 'service_edit_tcp/:id(\\d+)',
        component: () => import('@/views/service/ServiceTCP'),
        name: '编辑TCP服务',
        meta: { title: '编辑TCP服务', icon: 'component', affix: false },
        hidden: true
      },
      {
        path: 'service_add_grpc',
        component: () => import('@/views/service/ServiceGRPC'),
        name: '添加GRPC服务',
        meta: { title: '添加GRPC服务', icon: 'component', affix: false },
        hidden: true
      },
      {
        path: 'service_edit_grpc/:id(\\d+)',
        component: () => import('@/views/service/ServiceGRPC'),
        name: '编辑GRPC服务',
        meta: { title: '编辑GRPC服务', icon: 'component', affix: false },
        hidden: true
      },
    ]
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/list',
    children: [
      {
        path: 'list',
        component: () => import('@/views/app/APPList'),
        name: '租户列表',
        meta: { title: '租户列表', icon: 'user', affix: true }
      },
      {
        path: 'app_stat/:id(\\d+)',
        component: () => import('@/views/app/APPStat'),
        name: '租户流量统计',
        meta: { title: '租户流量统计', icon: 'user', affix: false },
        hidden: true
      },
      {
        path: 'app_add',
        component: () => import('@/views/app/APP'),
        name: '添加租户',
        meta: { title: '添加租户', icon: 'user', affix: false },
        hidden: true
      },
      {
        path: 'app_edit/:id(\\d+)',
        component: () => import('@/views/app/APP'),
        name: '编辑租户',
        meta: { title: '编辑租户', icon: 'user', affix: false },
        hidden: true
      },
    ]
  },

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
