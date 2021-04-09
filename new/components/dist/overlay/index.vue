<template>
<van-transition :show="show" custom-class="van-overlay" :custom-style="'z-index: ' + zIndex + '; ' + customStyle" :duration="duration" @tap="onClick" catch:touchmove="noop">
  <slot></slot>
</van-transition>
</template>

<script>
import { VantComponent } from '../common/component';
import vanTransition from "../transition/index";

export default {
  data() {
    return {};
  },

  components: {
    vanTransition
  },
  props: {
    show: Boolean,
    customStyle: String,
    duration: {
      type: null,
      default: 300
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    },

    // for prevent touchmove
    noop() {}

  }
};
</script>
<style>
@import "../common/index.css";.van-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.7);background-color:var(--overlay-background-color,rgba(0,0,0,.7))}
</style>