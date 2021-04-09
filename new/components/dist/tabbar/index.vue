<template>
<view :class="'custom-class ' + ( border ? 'van-hairline--top-bottom' : '' ) + ' ' + utils.bem('tabbar', { fixed, safe: safeAreaInsetBottom })" :style="zIndex ? 'z-index: ' + zIndex : ''">
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
    active: {
      type: null
    },
    activeColor: {
      type: String
    },
    inactiveColor: {
      type: String
    },
    fixed: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    active: {
      handler: 'updateChildren',
      immediate: true
    },
    activeColor: {
      handler: 'updateChildren',
      immediate: true
    },
    inactiveColor: {
      handler: 'updateChildren',
      immediate: true
    }
  },
  relation: {
    name: 'tabbar-item',
    type: 'descendant',
    current: 'tabbar',

    linked(target) {
      target.parent = this;
      target.updateFromParent();
    },

    unlinked() {
      this.updateChildren();
    }

  },
  methods: {
    updateChildren() {
      const {
        children
      } = this;

      if (!Array.isArray(children) || !children.length) {
        return Promise.resolve();
      }

      return Promise.all(children.map(child => child.updateFromParent()));
    },

    onChange(child) {
      const index = this.children.indexOf(child);
      const active = child.data.name || index;

      if (active !== this.active) {
        this.$emit('change', active);
      }
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-tabbar{display:-webkit-flex;display:flex;width:100%;height:50px;height:var(--tabbar-height,50px);background-color:#fff;background-color:var(--tabbar-background-color,#fff)}.van-tabbar--fixed{position:fixed;bottom:0;left:0}.van-tabbar--safe{padding-bottom:env(safe-area-inset-bottom)}
</style>