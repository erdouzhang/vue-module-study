<template>
   <div class="ratings border-1px">
       <div class="ratings-content">
          <div class="overview">
             <div class="overview-left">
                 <h1 class="score">{{seller.score}}</h1>
                 <div class="title">综合评分</div>
                 <div class="rank">高于周边商家{{seller.rankRate}}%</div>
             </div>
             <div class="overview-right">
                  <div class="score-wrapper">
                     <span class="title">服务态度</span>
                     <star :size="36" :score="seller.serviceScore"></star>
                     <span class="score">{{seller.serviceScore}}</span>
                  </div>
                  <div class="score-wrapper">
                    <span class="title">商品评分</span>
                    <star :size="36" :score="seller.foodScore"></star>
                    <span class="score">{{seller.foodScore}}</span>
                  </div>
                  <div class="delivery-wrapper">
                      <span class="title">送达时间</span>
                      <span class="delivery">{{seller.deliveryTime}}分钟</span>
                  </div>
             </div>
          </div>
          <split></split>
          <ratingselect :select-type="selectType" :onlyConent="onlyConent" :ratings="ratings" v-on:child-change="getSelectType" v-on:content-toggle="getonlyConent"></ratingselect>
          <div class="rating-wrapper">
               <ul>
                  <li v-for="(rating,index) in ratings" :key="index" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                     <div class="avatar">
                        <img :src="rating.avatar" width="28" height="28">
                     </div>
                     <div class="content">
                         <h1 class="name">{{rating.username}}</h1>
                         <div class="star-wrapper">
                             <star :size="24" :score="rating.score"></star>
                             <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
                         </div>
                         <p class="text">{{rating.text}}</p>
                          <div class="recommend" v-show="rating.recommend.length>0">
                                 <span class="iconfont icon-zhiding"></span>
                                 <span v-for="(item,index) in rating.recommend" :key="index" class="item border-1px">
                                      {{item}}
                                 </span>
                          </div>
                         <div class="time">{{rating.rateTime | formatDate}}</div>
                      </div>
                  </li>
               </ul>
          </div>
       </div>
   </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import star from '../star/star.vue';
import split from '../split/split.vue';
import ratingselect from '../ratingselect/ratingselect.vue';
import {formatDate} from '../../common/js/date';
const ALL = 2;
export default {
     props: {
        seller: {
          type: Object
        }
     },
     data () {
     return {
         showFlag: false,
         selectType: ALL,
         onlyConent: true,
         ratings: []
      };
     },
     created () {
          this.$http.get('/api/ratings').then((response) => {
                 // console.log(response);
                if (response.data && response.status === 200) {
                   this.ratings = response.data.data;
                   // console.log(this.ratings);
                   this.$nextTick(() => {
                        this.scroll = new BScroll('.ratings', {
                            click: true
                         });
                   });
                 }
          }).catch((error) => {
                console.log(error);
          });
     },
     filters: {
             formatDate (time) {
                 let date = new Date(time);
                 return formatDate(date, 'yyyy-MM-dd hh:mm');
             }
         },
     components: {
        'star': star,
        'split': split,
        'ratingselect': ratingselect
     },
     methods: {
         needShow (type, content) {
                    if (this.onlyConent && !content) {
                          return false;
                      }
                    if (this.selectType === ALL) {
                          return true;
                    } else {
                          return type === this.selectType;
                    }
          },
          getSelectType (type) {
                            // console.log(type);
                            this.selectType = type;
                            this.$nextTick(() => {
                               this.scroll.refresh();
                            });
                },
                getonlyConent (bool) {
                       // console.log(bool);
                        this.onlyConent = bool;
                        this.$nextTick(() => {
                            this.scroll.refresh();
                       });
                }
     }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
     @import "../../common/stylus/minxin";
    .ratings
        position: absolute
        top: 174px
        bottom: 0;
        left: 0
        width: 100%
        overflow: hidden
        .overview
           display: flex
           padding: 18px 0
           .overview-left
              flex: 0 0 137px
              width: 137px
              border-right:1px solid rgba(7,17,27,0.2)
              text-align:center
              padding: 6px 0
              .score
                 line-height: 28px
                 font-size:24px
                 color: rgb(255,153,0)
              .title
                 font-size: 12px
                 line-height: 12px
                 color: rgb(7,17,27)
                 margin-bottom: 8px
              .rank
                  font-size: 10px
                  line-height: 10px
                  color: rgb(7,17,27)
                  padding-bottom: 6px
           .overview-right
               flex: 1
               padding: 6px 0 6px 24px
               .score-wrapper
                   margin-bottom: 8px
                   font-size: 0
                   .title
                      display: inline-block
                      font-size: 12px
                      line-height: 18px
                      vertical-align: top
                      color: rgb(7,17,27)
                   .star
                       display: inline-block
                       margin: 0 12px
                       vertical-align: top
                       font-size: 0;
                    .score
                       display: inline-block
                       vertical-align: top
                       line-height: 18px
                       font-size: 12px
                       color: rgb(255,153,0)
               .delivery-wrapper
                   font-size: 0
                   .title
                      font-size: 12px
                      line-height: 18px
                      color: rgb(7,17,27)
                   .delivery
                      margin-left: 12px
                      font-size: 12px
                      color: rgb(147,153,159)
        .rating-wrapper
           padding: 0 18px
           .rating-item
              display: flex
              padding: 18px 0
              border-1px(rgba(7,17,27,0.1))
              .avatar
                 flex: 0 0 28px
                 width: 28px
                 margin-right: 12px
                 img
                   border-radius: 50%
              .content
                 position: relative
                 flex: 1
                 .name
                    margin-bottom: 4px
                    line-height: 12px
                    font-size: 10px
                    color: rgb(7,17,27)
                 .star-wrapper
                    margin-bottom: 6px
                    font-size: 0
                    .star
                       display: inline-block
                       margin-right: 6px
                       line-height: 10px
                       vertical-align: top
                    .delivery
                       display: inline-block
                       vertical-align: top
                       line-height: 12px
                       font-size: 10px
                       color: rgb(147,153,159)
                 .text
                    margin-bottom: 8px
                    line-height: 18px
                    color: rgb(7,17,27)
                 .recommend
                    line-height: 22px
                    fon-size: 0
                    .iconfont,.icon-zhiding
                        display: inline-block
                        margin: 0 8px 4px 0
                        font-size: 14px
                        color: rgb(0,160,220)
                    .item
                        padding: 2px 6px
                        margin: 2px 4px
                        border: 1px solid rgba(7,17,27,0.1)
                        border-radius: 1px
                        border-1px(rgb(147,153,159))
                        background: #fff
                 .time
                    position: absolute
                    top: 0
                    right: 0
                    font-size: 10px
                    color: (rgb(147,153,159))
</style>
