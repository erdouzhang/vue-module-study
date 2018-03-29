<template>
  <div>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                   <div class="logo">
                      <i class="iconfont icon-VS"></i>
                   </div>
                   <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'heightlight':totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click="pay">
                <div class="pay" :class="payClass">{{payDesc}}</div>
            </div>
        </div>
        <div class="ball-container">
             <div transition="drop" class="ball"></div>
             <div class="inner"></div>
        </div>
        <div class="shopcart-list" v-show="listShow">
             <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
             </div>
             <div class="list-content">
                 <ul>
                     <li class="food" v-for="(food,index) in selectFoods" :key="index">
                         <span class="name">{{food.name}}</span>
                         <div class="price">
                            <span>￥{{food.price*food.count}}</span>
                         </div>
                         <div class="cartcontrol-wrapper">
                             <cartcontrol :food="food"></cartcontrol>
                         </div>
                     </li>
                 </ul>
             </div>
        </div>
    </div>
    <div class="list-mark" v-show="listShow" @click="hideList"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
  export default {
      data () {
         return {
               fold: true
            };
      },
      props: {
          deliveryPrice: {
             type: Number,
             default: 0
          },
          minPrice: {
             type: Number,
             default: 0
          },
          selectFoods: {
             type: Array,
             default () {
                return [
                  {
                    price: 30,
                    count: 2
                  }
                ];
             }
          }
      },
      computed: {
           totalPrice () {
               let total = 0;
               this.selectFoods.forEach((food) => {
                    total += food.price * food.count;
               });
               return total;
           },
           totalCount () {
                let count = 0;
                this.selectFoods.forEach((food) => {
                     count += food.count;
                });
                return count;
           },
           payDesc () {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}元起送`;
                } else if (this.totalPrice < this.minPrice) {
                    let diff = this.minPrice - this.totalPrice;
                    return `还差￥${diff}元起送`;
                } else {
                    return '去结算';
                }
           },
           payClass () {
                if (this.totalPrice < this.minPrice) {
                     return 'not-enough';
                } else {
                      return 'enough';
                }
           },
           listShow () {
                if (!this.totalCount) {
                     this.fold = true;
                     return false;
                }
                let show = !this.fold;
                if (show) {
                    this.$nextTick(() => {
                    if (!this.listContentScorll) {
                        this.listContentScorll = new BScroll('.list-content', {
                            click: true
                          });
                       } else {
                         this.listContentScorll.refresh();
                     }
                    });
                 }
                return show;
           }
      },
      methods: {
        toggleList () {
              // console.log(this.totalCount);
              if (!this.totalCount) {
                  return;
              }
              this.fold = !this.fold;
        },
        empty () {
              this.selectFoods.forEach((food) => {
                 food.count = 0;
              });
        },
        hideList () {
             this.fold = true;
        },
        pay () {
           if (this.totalPrice < this.minPrice) {
               return;
           }
           window.alert(`支付${this.totalPrice}元`);
        }
      },
      components: {
           cartcontrol
      }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
     @import "../../common/stylus/minxin";
     .shopcart
         position:fixed
         left: 0
         bottom: 0
         width:100%
         height: 48px
         z-index: 50
         background: #000
         .content
            display: flex
            background: #141d27
            .content-left
                flex: 1
                .logo-wrapper
                    display: inline-block
                    position: relative
                    top: -10px
                    margin: 0 12px
                    padding: 6px
                    width: 56px
                    height: 56px
                    box-size: border-box
                    vertical-align: top
                    border-radius: 50%
                    background: #141d27
                    .logo
                       width:100%
                       height: 100%
                       border-radius: 50%
                       background: #2b343c
                       text-align: center
                       .icon-VS
                         font-size: 24px
                         line-height: 44px
                         color: #80858a
                    .num
                       position: absolute
                       top: 0
                       right: 0
                       width: 24px
                       height: 16px
                       line-height: 16px
                       text-align:center
                       border-radius: 16px
                       font-size: 9px
                       font-weight: 400
                       color: #fff
                       background: rgb(240,20,20)
                       box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
                .price
                    display: inline-block
                    line-height: 24px
                    vertical-align: top
                    margin-top: 12px
                    box-size: border-box
                    text-align: center
                    padding-right: 12px
                    border-right: 1px solid rgba(255,255,255,0.1)
                    font-size: 16px
                    font-weight: 700
                    color: rgba(255,255,255,0.4)
                    &.heightlight
                      color: #fff
                .desc
                    display: inline-block
                    line-height: 24px
                    vertical-align: top
                    margin: 12px 0 0 12px
                    color: rgba(255,255,255,0.4)
                    font-size: 10px
                    text-align: center
            .content-right
                flex: 0 0 105px
                width: 105px
                .pay
                   height: 48px
                   line-height: 48px
                   text-align: center
                   font-size: 12px
                   font-weight: 700
                   color: rgba(255,255,255,0.4)
                   background: 2b333b
                   &.no-enough
                      background: #2b333b
                   &.enough
                      background: #00b43c
                      color: #fff
         .ball-container
            .ball
                position: fixed
                left: 32px
                bottom: 22px
                z-index: 200
                &.drop-transition
                   transition: all 0.4s
                   .inner
                      width: 16px
                      height: 16px
                      border-radius: 50%
                      background: rgb(0,160,220)
                      transition: all 0.4s
         .shopcart-list
            position: absolute
            top: 0;
            left: 0;
            z-index: -1
            width: 100%
            transition: all 0.5s
            transform: translate3d(0,-100%,0)
            .list-header
                 height:40px
                 line-height: 40px
                 padding: 0 18px
                 background: #f3f5f7
                 border-bottom: 1px solid rgba(7,17,27,0.1)
                 .title
                     float: left
                     font-size: 14px
                     font-weight: 100
                     color: rgb(7,17,27)
                 .empty
                     float: right
                     color: rgb(0,160,220)
                     font-size: 14px
                     font-weight: 100
            .list-content
                 padding:0 18px
                 max-height: 217px
                 overflow: hidden
                 background: #fff
                 .food
                      position:relative
                      font-size: 14px
                      line-height: 24px
                      height: 48px
                      padding: 12px 0
                      box-sizing: border-box
                      border-1px(rgba(7,17,27,0.1))
                 .name
                      line-height: 24px
                      font-size: 14px
                      color: rgb(7,17,27)
                 .price
                       position: absolute
                       right: 90px
                       bottom: 12px
                       line-height: 24px
                       font-size: 14px
                       color:rgb(240,20,20)
                       font-weight: 700
                 .cartcontrol-wrapper
                       position: absolute
                       right: 0
                       bottom: 6px
     .list-mark
         position: fixed;
         top: 0
         left: 0
         width: 100%
         height: 100%
         z-index: 40
         background: rgba(7,17,27,0.6)
         backdrop-filter: blur(10px)
         transition: all 0.5s
</style>
