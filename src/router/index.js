import Vue from 'vue';
import Router from 'vue-router';

// import HelloWorld from '@/components/HelloWorld';
import ratings from '@/components/ratings/ratings';
import goods from '@/components/goods/goods';
import seller from '@/components/seller/seller';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
    // 重定向默认加载
    {
      path: '/',
      redirect: '/goods'
    }
  ]
});
