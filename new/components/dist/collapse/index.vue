<template>
<view :class="'custom-class van-collapse ' + ( border ? 'van-hairline--top-bottom' : '' )">
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
    value: {
      type: null
    },
    accordion: {
      type: Boolean
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      handler: 'updateExpanded',
      immediate: true
    },
    accordion: {
      handler: 'updateExpanded',
      immediate: true
    }
  },
  relation: {
    name: 'collapse-item',
    type: 'descendant',
    current: 'collapse'
  },
  methods: {
    updateExpanded() {
      this.children.forEach(child => {
        child.updateExpanded();
      });
    },

    switchFun(name, expanded) {
      const {
        accordion,
        value
      } = this;

      if (!accordion) {
        name = expanded ? (value || []).concat(name) : (value || []).filter(activeName => activeName !== name);
      } else {
        name = expanded ? name : '';
      }

      this.$emit('change', name);
      this.$emit('input', name);
    }

  }
};
</script>
<style>
@import "../common/index.css";
</style>