<template>
 <section>
   <div class="goods">
      <div class="menu-wrap" ref="menuWrap">
          <ul>
              <li v-for= "(item,index) in goods" :key="index" class="menu-item"  :class="{'current':currentIndex===index}" @click="selectMenu((index),$event)">
                  <span class="text">
                     <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                  </span>
              </li>
          </ul>
      </div>
      <div class="foods-wrap" ref="foodsWrap">
           <ul>
               <li v-for="(item,index) in goods" class="food-list food-list-hook" :key="index">
                   <h1 class="title">{{item.name}}</h1>
                   <ul>
                        <li v-for="(food,index) in item.foods" :key="index" class="food-item" @click="selectFood(food,$event)">
                              <div class="icon">
                                 <img :src="food.icon" width="57" height="57">
                              </div>
                              <div class="content">
                                  <h2 class="name">{{food.name}}</h2>
                                  <p class="desc">{{food.description}}</p>
                                  <div class="extra">
                                     <span class="count">月售{{food.sellCount}}</span>
                                     <span>好评率{{food.rating}}%</span>
                                  </div>
                                  <div class="price">
                                     <span class="now">￥{{food.price}}</span>
                                     <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                  </div>
                                  <div class="cartcontrol-wrapper">
                                      <cartcontrol :food="food"></cartcontrol>
                                  </div>
                              </div>

                        </li>
                   </ul>
                </li>
           </ul>
      </div>
       <shortcart ref="shopcart" :select-foods="selectFoodsCart" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shortcart>
   </div>
   <food ref="food" :food="selectedFoodsDetail"></food>
</section>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import shortcart from '../shopcart/shopcart.vue';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
import food from '../food/food.vue';
export default {
     props: {
         seller: {
           type: Object
         }
        },
     data () {
        return {
          goods: [],
          listHeight: [],
          scorllY: 0,
          selectedFoodsDetail: {}
        };
     },
     computed: {
         currentIndex () {
            // console.log(this.scorllY);
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scorllY >= height1 && this.scorllY < height2)) {
                    return i;
                }
            }
            return 0;
         },
         selectFoodsCart () {
            let foods = [];
            this.goods.forEach((good) => {
                  good.foods.forEach((food) => {
                      if (food.count) {
                        foods.push(food);
                      }
                  });
            });
            return foods;
         }
     },
      created () {
          this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
          this.$http.get('/api/goods').then((response) => {
                   // console.log(response);
               if (response.data && response.status === 200) {
                    this.goods = response.data.data;
                    this.$nextTick(() => {
                        this.initScroll();
                        this.calculateHeight();
                    });
                    // console.log(this.goods);
                  }
          }).catch((error) => {
               console.log(error);
          });
     },
     methods: {
         initScroll () {
             this.menuScorll = new BScroll('.menu-wrap', {
                       click: true
                  });
             this.foodsScorll = new BScroll('.foods-wrap', {
                       click: true,
                       probeType: 3
              });
             this.foodsScorll.on('scroll', (pos) => {
                   // console.log(Math.abs(Math.round(pos.y)));
                    this.scorllY = Math.abs(Math.round(pos.y));
             });
         },
         calculateHeight () {
            let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
            // console.log(foodList);
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
               let item = foodList[i];
               height += item.clientHeight;
               this.listHeight.push(height);
            }
         },
         selectMenu (index, event) {
             if (!event._constructed) {
               return;
             }
             let foodList = this.$refs.foodsWrap.getElementsByClassName('food-list-hook');
             let el = foodList[index];
              //  console.log(foodList);
             this.foodsScorll.scrollToElement(el, 300);
         },
         selectFood (food, event) {
                if (!event._constructed) {
                   return;
                }
                this.selectedFoodsDetail = food;
                 // 调用子组件的方法
                this.$refs.food.show();
         }
     },
     components: {
         shortcart,
         cartcontrol,
         'food': food
     }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/minxin";

   .goods
      display: flex
      position: absolute
      top: 174px
      bottom:46px
      width: 100%
      overflow: hidden
      .menu-wrap
          flex: 0 0 80px
          width: 80px
          background: #f3f5f7
          .menu-item
             display: table
             height: 54px
             width: 80px
             line-height: 14px
             padding: 0 10px
             margin: 0 auto
             &.current
                 position: relative
                 margin-top: -1px
                 z-index: 10
                 background: #fff
                 font-weight: 700
                 .text
                   border-none()
             .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_3')
                &.discount
                  bg-image('discount_3')
                &.guarantee
                  bg-image('guarantee_3')
                &.invoice
                  bg-image('invoice_3')
                &.special
                  bg-image('special_3')
             .text
                font-size: 12px
                display: table-cell
                width: 56px
                vertical-align: middle
                border-none()
      .foods-wrap
          flex: 1
          .title
             padding-left: 14px
             height: 26px
             line-height: 26px
             border-right: 2px solid #d9dde1
             font-size: 12px
             color: rgb(147,153,159)
             background: #f3f5f7
          .food-item
             display: flex
             margin: 18px
             padding-bottom: 18px
             border-1px(rgba(7,17,27,0.1))
             &last:child
               border-none()
               margin-bottom: 0
             .icon
               flex:0 0 57px
               margin-right: 10px
             .content
               flex: 1
               .name
                  margin: 2px 0 8px 0;
                  height: 14px
                  line-height: 14px
                  font-size: 14px
                  color: rgb(7,17,27)
               .desc,.extra
                  line-height: 15px
                  font-size: 10px
                  color: rgb(147,153,159)
               .desc
                  margin-bottom: 0
                  line-height: 12px
               .extra
                  &.count
                    margin-right: 12px
               .price
                  font-weight: 700
                  line-height: 24px
                  .now
                     margin-right: 8px
                     color: rgb(240,20,20)
                     font-size: 14px
                  .old
                     text-decoration: line-through
                     font-size: 10px
                     color: rgb(147,153,159)
               .cartcontrol-wrapper
                  position: absolute
                  right: 0
                  bottom: 12px
</style>
