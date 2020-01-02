/*
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-12-16
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const _import = require(`./import-${process.env.NODE_ENV}`);
const routes = [
  {
    path: '/',
    name: 'main',
    redirect: { name: 'index' },
    component: _import("SystemMain/main"),
    children: [{
      path: "index",
      name: "index",
      component: _import("SystemMain/index"),
      meta: {
        istab: false,
        pageId: "99999",
        pageName: "首页"
      }
    }]
  }, {
    name: "login",
    path: "/login",
    component: _import("Login/login")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  isAddDynamicMenuRoutes: false,
  routes
})

import menulist from './../../public/page.json'
router.beforeEach((to, form, next) => {
  if (router.isAddDynamicMenuRoutes) {
    next();
  } else {
    router.isAddDynamicMenuRoutes = true;
    createRouter(menulist);
    router.addRoutes(router.options.routes)
    if (to.name != "index" && to.name != "login")
      next("/index")
    else
      next();
  }
})

/**
 * 添加动态路由
 * @param {*} menuList  
 * @param {*} route 
 */
/**动态创建路由 */
function createRouter(data) {
  for (let i = 0; i < data.length; i++) {
    const obj = data[i];
    if (obj.children.length == 0 && "url" in obj) {
      const tempRouter = {
        path: obj.path,
        name: obj.path.split("/")[1],
        meta: {
          istab: obj.istab,
          pageId: obj.id,
          pageName: obj.text
        },
        component: _import(obj.url)
      };
      routes[0].children.push(tempRouter)
    } else {
      createRouter(obj.children, routes);
    }
  }
}


export default router
