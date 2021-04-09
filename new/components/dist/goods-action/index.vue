<template>
<view :class="'custom-class ' + ( utils.bem('goods-action', { safe: safeAreaInsetBottom }) )">
  <slot></slot>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  relation: {
    type: 'descendant',
    name: 'goods-action-button',
    current: 'goods-action'
  },
  methods: {}
};
</script>
<style>
@import "../common/index.css";.van-goods-action{position:fixed;right:0;bottom:0;left:0;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;background-color:#fff;background-color:var(--goods-action-background-color,#fff)}.van-goods-action--safe{padding-bottom:env(safe-area-inset-bottom)}
</style>