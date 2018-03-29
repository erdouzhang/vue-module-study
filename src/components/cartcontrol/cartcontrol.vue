<template>
   <div class="cart-control">
        <div class="cart-decrease iconfont icon-shanchu" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        </div>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add iconfont icon-tianjia" @click.stop.prevent="addCart"></div>
   </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
export default {
    props: {
       food: {
           type: Object
       }
    },
    methods: {
        addCart (event) {
            if (!event._constructed) {
                return;
            }
            if (!this.food.count) {
                 Vue.set(this.food, 'count', 1);
                // this.food.count = 1;
            } else {
                this.food.count++;
            }
          },
        decreaseCart (event) {
              if (!event._constructed) {
                return;
              }
              if (this.food.count) {
                 this.food.count--;
              }
        }
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
   .cart-control
      font-size: 0
      .cart-decrease
          padding: 6px
          display:inline-block
          line-height: 24px
          font-size: 24px
          color: rgb(0,160,220)
      .cart-count
          display: inline-block
          vertical-align: top
          width: 12px
          padding-top: 6px
          line-height: 24px
          font-size: 10px
          text-align: center
          color: rgb(147,153,159)
      .cart-add
          display: inline-block
          padding: 6px
          line-height: 24px
          font-size: 24px
          color: rgb(0,160,220)
</style>
