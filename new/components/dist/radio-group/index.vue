<template>
<slot></slot>
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
    disabled: {
      type: Boolean
    }
  },
  watch: {
    value: {
      handler: 'updateChildren',
      immediate: true
    },
    disabled: {
      handler: 'updateChildren',
      immediate: true
    }
  },
  field: true,
  relation: {
    name: 'radio',
    type: 'descendant',
    current: 'radio-group',

    linked(target) {
      this.updateChild(target);
    }

  },
  methods: {
    updateChildren() {
      (this.children || []).forEach(child => this.updateChild(child));
    },

    updateChild(child) {
      const {
        value,
        disabled
      } = this;
      child.setData({
        value,
        disabled: disabled || child.data.disabled
      });
    }

  }
};
</script>
<style>
@import "../common/index.css";
</style>