<template>
    <div class="seller">
         <div class="seller-content">
             <div class="overview">
                 <h1 class="title">{{seller.name}}</h1>
                 <div class="desc border-1px">
                     <star :size="36" :score="seller.score"></star>
                     <span class="text">({{seller.ratingCount}})</span>
                     <span class="text">月售{{seller.ratingCount}}单</span>
                 </div>
                 <ul class="remark">
                      <li class="block">
                          <h1>起送价</h1>
                          <div class="content">
                               <span class="stress">{{seller.minPrice}}<span class="unit">元</span></span>
                          </div>
                       </li>
                      <li class="block">
                           <h1>商家配送</h1>
                           <div class="content">
                               <span class="stress">{{seller.deliveryPrice}}<span class="unit">元</span></span>
                           </div>
                      </li>
                      <li class="block">
                           <h1>平均配送时间</h1>
                           <div class="content">
                               <span class="stress">{{seller.deliveryTime}}<span class="unit">分钟</span></span>
                           </div>
                      </li>
                 </ul>
                 <div class="favorite" @click.stop.prevent="toggleFavorite">
                      <span class="iconfont icon-VS" :class="{'active':favorite}"></span>
                      <span class="text">{{favoriteText}}</span>
                 </div>
             </div>
             <split></split>
             <div class="bulletin">
                  <h1 class="title">公告与活动</h1>
                  <div class="content-wrapper border-1px">
                      <p class="content">
                         {{seller.bulletin}}
                      </p>
                  </div>
                  <ul v-if="seller.supports" class="supports">
                        <li class="support-item border-1px" v-for="item in seller.supports" :key="item.type">
                                <span class="icon" :class="classMap[seller.supports[item.type].type]"></span>
                                <span class="text">{{seller.supports[item.type].description}}</span>
                          </li>
                   </ul>
             </div>
             <split></split>
             <div class="pics">
                    <h1 class="title">商家实体</h1>
                    <div class="pic-wrapper">
                        <ul class="pic-list" ref="pictures">
                            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
                               <img :src="pic" width="120" height="90">
                            </li>
                        </ul>
                    </div>
             </div>
             <split></split>
             <div class="info">
                  <h1 class="title border-1px">商家信息</h1>
                  <ul>
                     <li v-for="(info, index) in seller.infos" :key="index" class="info-item">{{info}}</li>
                  </ul>
             </div>
         </div>
    </div>
</template>
<script type="text/ecmascript-6">
import BScorll from 'better-scroll';
import star from '../star/star.vue';
import split from '../split/split.vue';
import {saveLocal, loadFromLocal} from '../../common/js/store';
export default {
   props: {
      seller: {
         type: Object
      }
   },
   data () {
      return {
        favorite: (() => {
            return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
   },
   computed: {
        favoriteText () {
           return this.favorite ? '已收藏' : '收藏';
        }
   },
    created () {
           this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
   },
    watch: {
        'seller' () {
          this._initScroll();
          this._initPicScroll();
        }
   },
    mounted () {
        this._initScroll();
        this._initPicScroll();
   },
    methods: {
         _initScroll () {
             if (!this.scroll) {
                  this.scroll = new BScorll('.seller', {
                         click: true
                 });
             } else {
                  this.scroll.refresh();
             }
         },
         _initPicScroll () {
               if (this.seller.pics) {
                 // console.log(this.$refs.pictures);
                 let picWidth = 120;
                 let margin = 6;
                 let width = (picWidth + margin) * (this.seller.pics.length);

                 this.$refs.pictures.style.width = width + 'px';
                 this.$nextTick(() => {
                   if (!this.picScroll) {
                       this.picScroll = new BScorll('.pic-wrapper', {
                             scrollX: true,
                             eventPassThrough: 'vertical'
                       });
                   } else {
                       this.picScroll.refresh();
                 }
                });
            }
         },
         toggleFavorite (event) {
               if (!event._constructed) {
                   return;
               }
               this.favorite = !this.favorite;
               saveLocal(this.seller.id, 'favorite', this.favorite);
         }
      },
   components: {
          'star': star,
          'split': split
     }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin";
.seller
     position: absolute
     top: 174px
     bottom: 0;
     left: 0
     width: 100%
     overflow: hidden
     .overview
        position: relative
        padding: 18px
        .title
            margin-bottom: 8px
            line-height: 14px
            color: rgb(7,17,27)
            font-size: 14px
        .desc
            padding-bottom: 18px
            border-1px(rgba(7,17,27,0.1))
            font-size: 0
            .star
                display:inline-block
                margin-right: 8px
                vertical-align: top
            .text
                display: inline-block
                margin-right: 12px
                line-height: 18px
                vertical-align: top
                font-size: 10px
                color: rgb(77,85,93)
        .remark
             display: flex
             padding-top: 18px
             .block
                flex: 1
                text-align: center
                border-right: 1px solid rgba(7,17,27,0.1)
                &:last-child
                   border: none
                h2
                   margin-bottom: 4px
                   line-height: 10px
                   font-size: 10px
                .content
                   line-height: 24px
                   font-size: 10px
                   color: rgb(7,17,27)
                   .stress
                      font-size: 24px
                      .unit
                          font-size: 12px
        .favorite
             position: absolute
             width: 50px
             right: 11px
             top: 18px
             text-align: center
             .iconfont,.icon-VS
                 display: block
                 color: #d4d6d9
                 line-height: 24px
                 font-size: 24px
                 margin-bottom: 4px
                 &.active
                    color: #f01414
             .text
                 line-height: 10px
                 font-size: 10px
                 color: rgb(7,17,27)
     .bulletin
        padding: 18px 18px 0 18px
        .title
             margin-bottom: 8px
             line-height: 14px
             color: rgb(7,17,27)
             font-size: 14px
        .content-wrapper
             padding: 0 12px 16px 12px
             border-1px(rgba(7,17,27,0.1))
             .content
                 line-height: 24px
                 font-size: 12px
                 color: rgb(240,20,20)
        .supports
             .support-item
                 padding: 16px 12px
                 display: inline-block
                 width: 100%
                 border-1px(rgba(7,17,27,0.1))
                 font-size: 0
                 &:last-child
                   border: none
             .icon
                 display: inline-block
                 width: 16px
                 height: 16px
                 vertical-align: top
                 margin-right: 6px
                 background-size: 16px 16px
                 background-repeat: no-repeat
                 &.decrease
                     bg-image('decrease_4')
                 &.discount
                     bg-image('discount_4')
                 &.guarantee
                     bg-image('guarantee_4')
                 &.invoice
                     bg-image('invoice_4')
                 &.special
                     bg-image('special_4')
             .text
                 line-height: 16px
                 font-size: 12px
                 color: rgb(7,17,27)
     .pics
        padding: 18px
        .title
             margin-bottom: 8px
             line-height: 14px
             color: rgb(7,17,27)
             font-size: 14px
        .pic-wrapper
             width: 100%
             overflow: hidden
             white-space: nowrap
        .pic-list
             font-size: 0
             .pic-item
                display: inline-block
                margin-right: 6px
                width: 120px
                height: 90px
                &:last-child
                   margin-right: 0
     .info
        padding: 18px 18px 0 18px
        color: rgb(7,17,27)
        .title
            padding-bottom: 8px
            line-height: 14px
            font-size: 14px
            border-1px(rgba(7,17,27,0.1))
        .info-item
            padding: 16px 12px
            border-1px(rgba(7,17,27,0.1))
            font-size: 12px
            &:last-child
              border: none
</style>
