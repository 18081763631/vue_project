<template>
<view class="van-sidebar custom-class">
  <slot></slot>
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
    activeKey: {
      type: Number,
      default: 0
    }
  },
  watch: {
    activeKey: {
      handler: 'setActive',
      immediate: true
    }
  },
  relation: {
    name: 'sidebar-item',
    type: 'descendant',
    current: 'sidebar',

    linked() {
      this.setActive(this.activeKey);
    },

    unlinked() {
      this.setActive(this.activeKey);
    }

  },

  beforeCreate() {
    this.currentActive = -1;
  },

  methods: {
    setActive(activeKey) {
      const {
        children,
        currentActive
      } = this;

      if (!children.length) {
        return Promise.resolve();
      }

      this.currentActive = activeKey;
      const stack = [];

      if (currentActive !== activeKey && children[currentActive]) {
        stack.push(children[currentActive].setActive(false));
      }

      if (children[activeKey]) {
        stack.push(children[activeKey].setActive(true));
      }

      return Promise.all(stack);
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-sidebar{width:85px;width:var(--sidebar-width,85px)}
</style>