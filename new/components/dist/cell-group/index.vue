<template>
<view>
<view v-if="title" class="van-cell-group__title">
  {{ title }}
</view>
<view :class="'custom-class van-cell-group ' + ( border ? 'van-hairline--top-bottom' : '' )">
  <slot></slot>
</view>
</view>
</template>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    title: String,
    border: {
      type: Boolean,
      default: true
    }
  },
  methods: {}
};
</script>
<style>
@import "../common/index.css";.van-cell-group__title{padding:16px 16px 8px;padding:var(--cell-group-title-padding,16px 16px 8px);font-size:14px;font-size:var(--cell-group-title-font-size,14px);line-height:16px;line-height:var(--cell-group-title-line-height,16px);color:#969799;color:var(--cell-group-title-color,#969799)}
</style>