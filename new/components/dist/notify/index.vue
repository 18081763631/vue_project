<template>
<van-transition name="slide-down" :show="show" custom-class="van-notify__container" :custom-style="'z-index: ' + zIndex + '; top: ' + utils.addUnit(top)" @tap="onTap">
  <view :class="'van-notify van-notify--' + type" :style="'background:' + background + ';color:' + color + ';'">
    <view v-if="safeAreaInsetTop" :style="'height: ' + statusBarHeight + 'px'"></view>
    <text>{{ message }}</text>
  </view>
</van-transition>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import { WHITE } from '../common/color';
import vanTransition from "../transition/index";

export default {
  data() {
    return {
      show: false,
      statusBarHeight: ""
    };
  },

  components: {
    vanTransition
  },
  props: {
    message: String,
    background: String,
    type: {
      type: String,
      default: 'danger'
    },
    color: {
      type: String,
      default: WHITE
    },
    duration: {
      type: Number,
      default: 3000
    },
    zIndex: {
      type: Number,
      default: 110
    },
    safeAreaInsetTop: {
      type: Boolean,
      default: false
    },
    top: null
  },

  created() {
    const {
      statusBarHeight
    } = uni.getSystemInfoSync();
    this.setData({
      statusBarHeight
    });
  },

  methods: {
    showFun() {
      const {
        duration,
        onOpened
      } = this;
      clearTimeout(this.timer);
      this.setData({
        show: true
      });
      uni.nextTick(onOpened);

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(() => {
          this.hide();
        }, duration);
      }
    },

    hide() {
      const {
        onClose
      } = this;
      clearTimeout(this.timer);
      this.setData({
        show: false
      });
      uni.nextTick(onClose);
    },

    onTap(event) {
      const {
        onClick
      } = this;

      if (onClick) {
        onClick(event.detail);
      }
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-notify{text-align:center;word-wrap:break-word;padding:6px 15px;padding:var(--notify-padding,6px 15px);font-size:14px;font-size:var(--notify-font-size,14px);line-height:20px;line-height:var(--notify-line-height,20px)}.van-notify__container{position:fixed;top:0;box-sizing:border-box;width:100%}.van-notify--primary{background-color:#1989fa;background-color:var(--notify-primary-background-color,#1989fa)}.van-notify--success{background-color:#07c160;background-color:var(--notify-success-background-color,#07c160)}.van-notify--danger{background-color:#ee0a24;background-color:var(--notify-danger-background-color,#ee0a24)}.van-notify--warning{background-color:#ff976a;background-color:var(--notify-warning-background-color,#ff976a)}
</style>