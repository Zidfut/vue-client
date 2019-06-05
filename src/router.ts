import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import Login from './components/Login.vue';
import Products from './views/Products.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      beforeEnter: (to: Router.Route, from: Router.Route, next: Function) => {
        store.dispatch('getLogin');
        next();
      },
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '*',
      name: 'default',
      redirect: { name: 'login' },
    },
  ],
});
