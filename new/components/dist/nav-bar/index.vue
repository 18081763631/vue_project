<template>
<view>
<view v-if="fixed && placeholder" :style="'height: ' + height + 'px;'"></view>

<view :class="( utils.bem('nav-bar', { fixed }) ) + ' custom-class ' + ( border ? 'van-hairline--bottom' : '' )" :style="'z-index: ' + zIndex + '; padding-top: ' + ( safeAreaInsetTop ? statusBarHeight : 0 ) + 'px;'">
  <view class="van-nav-bar__left" @tap="onClickLeft">
    <block v-if="leftArrow || leftText">
      <van-icon v-if="leftArrow" size="16px" name="arrow-left" custom-class="van-nav-bar__arrow"></van-icon>
      <view v-if="leftText" class="van-nav-bar__text" hover-class="van-nav-bar__text--hover" hover-stay-time="70">{{ leftText }}</view>
    </block>
    <slot v-else name="left"></slot>
  </view>
  <view class="van-nav-bar__title title-class van-ellipsis">
    <block v-if="title">{{ title }}</block>
    <slot v-else name="title"></slot>
  </view>
  <view class="van-nav-bar__right" @tap="onClickRight">
    <view v-if="rightText" class="van-nav-bar__text" hover-class="van-nav-bar__text--hover" hover-stay-time="70">{{ rightText }}</view>
    <slot v-else name="right"></slot>
  </view>
</view>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      statusBarHeight: 0,
      height: 44
    };
  },

  components: {
    vanIcon
  },
  props: {
    title: String,
    fixed: {
      type: Boolean
    },
    placeholder: {
      type: Boolean
    },
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    fixed: {
      handler: 'setHeight',
      immediate: true
    },
    placeholder: {
      handler: 'setHeight',
      immediate: true
    }
  },
  classes: ['title-class'],

  created() {
    const {
      statusBarHeight
    } = uni.getSystemInfoSync();
    this.setData({
      statusBarHeight,
      height: 44 + statusBarHeight
    });
  },

  mounted() {
    this.setHeight();
  },

  methods: {
    onClickLeft() {
      this.$emit('click-left');
    },

    onClickRight() {
      this.$emit('click-right');
    },

    setHeight() {
      if (!this.fixed || !this.placeholder) {
        return;
      }

      uni.nextTick(() => {
        this.getRect('.van-nav-bar').then(res => {
          this.setData({
            height: res.height
          });
        });
      });
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-nav-bar{position:relative;text-align:center;-webkit-user-select:none;user-select:none;height:44px;height:var(--nav-bar-height,44px);line-height:44px;line-height:var(--nav-bar-height,44px);background-color:#fff;background-color:var(--nav-bar-background-color,#fff)}.van-nav-bar__text{display:inline-block;vertical-align:middle;margin:0 -16px;margin:0 -var(--padding-md,16px);padding:0 16px;padding:0 var(--padding-md,16px);color:#1989fa;color:var(--nav-bar-text-color,#1989fa)}.van-nav-bar__text--hover{background-color:#f2f3f5;background-color:var(--active-color,#f2f3f5)}.van-nav-bar__arrow{vertical-align:middle;font-size:16px;font-size:var(--nav-bar-arrow-size,16px);color:#1989fa;color:var(--nav-bar-text-color,#1989fa)}.van-nav-bar__arrow+.van-nav-bar__text{margin-left:-20px;padding-left:25px}.van-nav-bar--fixed{position:fixed;top:0;left:0;width:100%}.van-nav-bar__title{max-width:60%;margin:0 auto;color:#323233;color:var(--nav-bar-title-text-color,#323233);font-weight:500;font-weight:var(--font-weight-bold,500);font-size:16px;font-size:var(--nav-bar-title-font-size,16px)}.van-nav-bar__left,.van-nav-bar__right{position:absolute;bottom:0;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;font-size:14px;font-size:var(--font-size-md,14px)}.van-nav-bar__left{left:16px;left:var(--padding-md,16px)}.van-nav-bar__right{right:16px;right:var(--padding-md,16px)}
</style>