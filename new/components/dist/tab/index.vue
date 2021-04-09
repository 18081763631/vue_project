<template>
<view :class="'custom-class ' + utils.bem('tab__pane', { active, inactive: !active })" :style="shouldShow ? '' : 'display: none;'">
  <slot v-if="shouldRender"></slot>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {
      active: false,
      shouldRender: "",
      shouldShow: ""
    };
  },

  components: {},
  props: {
    dot: {
      type: Boolean
    },
    info: {
      type: null
    },
    title: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    titleStyle: {
      type: String
    },
    name: {
      type: [Number, String],
      default: ''
    }
  },
  watch: {
    dot: {
      handler: 'update',
      immediate: true
    },
    info: {
      handler: 'update',
      immediate: true
    },
    title: {
      handler: 'update',
      immediate: true
    },
    disabled: {
      handler: 'update',
      immediate: true
    },
    titleStyle: {
      handler: 'update',
      immediate: true
    }
  },
  relation: {
    name: 'tabs',
    type: 'ancestor',
    current: 'tab'
  },
  methods: {
    getComputedName() {
      if (this.name !== '') {
        return this.name;
      }

      return this.index;
    },

    updateRender(active, parent) {
      const {
        data: parentData
      } = parent;
      this.inited = this.inited || active;
      this.setData({
        active,
        shouldRender: this.inited || !parentData.lazyRender,
        shouldShow: active || parentData.animated
      });
    },

    update() {
      if (this.parent) {
        this.parent.updateTabs();
      }
    }

  }
};
</script>
<style>
@import "../common/index.css";:host{-webkit-flex-shrink:0;flex-shrink:0;width:100%}.van-tab__pane,:host{box-sizing:border-box}.van-tab__pane{overflow-y:auto;-webkit-overflow-scrolling:touch}.van-tab__pane--active{height:auto}.van-tab__pane--inactive{height:0;overflow:visible}
</style>