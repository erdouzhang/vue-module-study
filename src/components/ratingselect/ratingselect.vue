<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" :class="{'active':selectType === 2}" @click.stop.prevent="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span class="block positive" :class="{'active':selectType === 0}" @click.stop.prevent="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
            <span class="block native" :class="{'active':selectType === 1}" @click.stop.prevent="select(1,$event)">{{desc.native}}<span class="count">{{native.length}}</span></span>
        </div>
        <div class="switch" :class="{'on': onlyConent}" @click.stop.prevent="toggleContent($event)">
             <span class="iconfont icon-VS"></span>
             <span class="text">只看内容评价</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
const POSITIVE = 0;
const NATIVE = 1;
const ALL = 2;
 export default {
     props: {
        ratings: {
           type: Array,
           default () {
              return [];
           }
        },
        selectType: {
           type: Number,
           default: ALL
        },
        onlyConent: {
           type: Boolean,
           default: false
        },
        desc: {
           type: Object,
           default () {
              return {
                all: '全部',
                positive: '满意',
                native: '不满意'
              };
           }
        }
     },
     methods: {
       select (type, event) {
           if (!event._constructed) {
              return;
           }
           this.selectType = type;
           this.$emit('child-change', type);
       },
       toggleContent (event) {
           if (!event._constructed) {
               return;
           }
           this.onlyConent = !this.onlyConent;
           this.$emit('content-toggle', this.onlyConent);
       }
     },
     computed: {
          positives () {
              return this.ratings.filter((rating) => {
                  return rating.rateType === POSITIVE;
              });
          },
          native () {
              return this.ratings.filter((rating) => {
                  return rating.rateType === NATIVE;
              });
          }
     }
 };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/minxin";
    .ratingselect
       .rating-type
           padding: 18px 0
           margin: 0 18px
           border-1px: (rgba(7,17,27,0.1))
           font-size: 0
           .block
              display: inline-block
              padding: 8px 12px
              margin-right: 8px
              border-radius: 2px
              font-size: 12px
              line-height: 16px
              color: rgb(77,85,93)
              &.active
                 color: #fff
              .count
                 font-size: 8px
                 margin-left: 2px
              &.positive
                 background: rgba(0,160,220,0.2)
                 &.active
                    background: rgb(0,160,220)
              &.native
                 background: rgba(77,85,93,0.2)
                 &.active
                    background: rgb(77,85,93)
       .switch
           padding: 12px 18px
           line-height: 24px
           border-bottom: 1px solid rgba(7,17,27,0.1)
           color: rgb(147,153,159)
           font-size: 0
           &.on
              .iconfont,.icon-VS
                  color: #00c850
           .iconfont,.icon-VS
             display: inline-block
             vertical-align: top
             margin-right: 4px
             font-size: 24px
           .text
             font-size: 12px
</style>
