<template>
<div>
<div id="app">
     <v-header :seller="seller"></v-header>
     <div class="tab border-1px">
         <section class="tab-item">
            <router-link to="goods" class="red">商品</router-link>
         </section>
         <section class="tab-item">
            <router-link to="ratings">评论</router-link>
         </section>
         <section class="tab-item">
            <router-link to="seller">商家</router-link>
         </section>
      </div>
       <keep-alive><router-view :seller="seller"></router-view></keep-alive>
   </div>
</div>
</template>
<script>
import header from './components/header/header.vue';
import {urlParse} from './common/js/util';
export default {
     components: {
          'v-header': header
      },
     data () {
           return {
             seller: {
                 id: (() => {
                       let queryParam = urlParse();
                        // console.log(queryParam);
                       return queryParam.id;
                 })()
              }
           };
      },
     created () {
                 this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
                                    // this.seller = response.data.data;
                                    this.seller = Object.assign({}, this.seller, response.data.data);
                                   // console.log(this.seller);
                                   // console.log(this.seller.id);
                             }).catch((error) => {
                               console.log(error);
            });
      }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import "./common/stylus/minxin.styl"
 #app
   .tab
      display:flex
      width:100%
      height:40px
      line-height:40px
      border-1px:rgba(7,17,27,0.1)
      .tab-item
         flex:1
         text-align:center
         &>a
           display:block
           font-size:14px
           color:rgb(77,85,93)
           &.router-link-active
             color:rgb(240,20,20)
</style>
