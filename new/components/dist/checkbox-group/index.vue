<template>
<slot></slot>
</template>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {
      parentDisabled: ""
    };
  },

  components: {},
  props: {
    max: Number,
    value: {
      type: Array
    },
    disabled: {
      type: Boolean
    }
  },
  watch: {
    value: {
      handler: 'updateChildren',
      immediate: true,
      deep: true
    },
    disabled: {
      handler: 'updateChildren',
      immediate: true
    }
  },
  field: true,
  relation: {
    name: 'checkbox',
    type: 'descendant',
    current: 'checkbox-group',

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
        value: value.indexOf(child.data.name) !== -1,
        parentDisabled: disabled
      });
    }

  }
};
</script>
<style>
@import "../common/index.css";
</style>