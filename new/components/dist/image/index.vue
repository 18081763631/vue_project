<template>
<view :style="viewStyle" :class="'custom-class ' + utils.bem('image', { round })" @tap="onClick">
  <image v-if="!error" :src="src" :mode="mode" :lazy-load="lazyLoad" class="image-class van-image__img" :show-menu-by-longpress="showMenuByLongpress" @load="onLoad" @error="onError"></image>

  <view v-if="loading && showLoading" class="loading-class van-image__loading">
    <slot v-if="useLoadingSlot" name="loading"></slot>
    <van-icon v-else name="photo-o" size="22"></van-icon>
  </view>
  <view v-if="error && showError" class="error-class van-image__error">
    <slot v-if="useErrorSlot" name="error"></slot>
    <van-icon v-else name="warning-o" size="22"></van-icon>
  </view>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { addUnit, isDef } from '../common/utils';
import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
const FIT_MODE_MAP = {
  none: 'center',
  fill: 'scaleToFill',
  cover: 'aspectFill',
  contain: 'aspectFit',
  widthFix: 'widthFix',
  heightFix: 'heightFix'
};
import vanIcon from "../icon/index";
import vanLoading from "../loading/index";

export default {
  data() {
    return {
      error: false,
      loading: true,
      viewStyle: '',
      mode: ""
    };
  },

  components: {
    vanIcon,
    vanLoading
  },
  props: {
    src: {
      type: String
    },
    round: Boolean,
    width: {
      type: null
    },
    height: {
      type: null
    },
    radius: null,
    lazyLoad: Boolean,
    useErrorSlot: Boolean,
    useLoadingSlot: Boolean,
    showMenuByLongpress: Boolean,
    fit: {
      type: String,
      default: 'fill'
    },
    showError: {
      type: Boolean,
      default: true
    },
    showLoading: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    src: {
      handler: function () {
        this.setData({
          error: false,
          loading: true
        });
      },
      immediate: true
    },
    width: {
      handler: 'setStyle',
      immediate: true
    },
    height: {
      handler: 'setStyle',
      immediate: true
    },
    fit: {
      handler: 'setMode',
      immediate: true
    }
  },
  mixins: [button, openType],
  classes: ['custom-class', 'loading-class', 'error-class', 'image-class'],

  mounted() {
    this.setMode();
    this.setStyle();
  },

  methods: {
    setMode() {
      this.setData({
        mode: FIT_MODE_MAP[this.fit]
      });
    },

    setStyle() {
      const {
        width,
        height,
        radius
      } = this;
      let style = '';

      if (isDef(width)) {
        style += `width: ${addUnit(width)};`;
      }

      if (isDef(height)) {
        style += `height: ${addUnit(height)};`;
      }

      if (isDef(radius)) {
        style += 'overflow: hidden;';
        style += `border-radius: ${addUnit(radius)};`;
      }

      this.setData({
        viewStyle: style
      });
    },

    onLoad(event) {
      this.setData({
        loading: false
      });
      this.$emit('load', event.detail);
    },

    onError(event) {
      this.setData({
        loading: false,
        error: true
      });
      this.$emit('error', event.detail);
    },

    onClick(event) {
      this.$emit('click', event.detail);
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-image{position:relative;display:inline-block}.van-image--round{overflow:hidden;border-radius:50%}.van-image--round .van-image__img{border-radius:inherit}.van-image__error,.van-image__img,.van-image__loading{display:block;width:100%;height:100%}.van-image__error,.van-image__loading{position:absolute;top:0;left:0;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;color:#969799;color:var(--image-placeholder-text-color,#969799);font-size:14px;font-size:var(--image-placeholder-font-size,14px);background-color:#f7f8fa;background-color:var(--image-placeholder-background-color,#f7f8fa)}
</style>