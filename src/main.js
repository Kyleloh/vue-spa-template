// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './app';
import routes from './routes';
import storeOption from './vuex/store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import exception from './helper/exception.js'

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  mode: 'history',
  routes: routes
});

// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store(storeOption);

Vue.use(exception, { store });

window.__lendApp__ = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

// 输入框在虚拟键盘弹出时，自动滚动到可见位置
document.body.addEventListener('click', function (event) {
  var element = event.target;
  var tags = {
    'INPUT': 1,
    'TEXTAREA': 1,
  }
  if ((element.tagName in tags)) {
    setTimeout(function () {
      element.scrollIntoViewIfNeeded();
      // console.log('scrollIntoViewIfNeeded');
    }, 400);
  }
}, false);