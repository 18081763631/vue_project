<template>
<view :class="'van-grid custom-class ' + ( border && !gutter ? 'van-hairline--top' : '' )" :style="viewStyle">
  <slot></slot>
</view>
</template>

<script>
import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';

export default {
  data() {
    return {
      viewStyle: ''
    };
  },

  components: {},
  props: {
    square: {
      type: Boolean
    },
    gutter: {
      type: [Number, String],
      default: 0
    },
    clickable: {
      type: Boolean
    },
    columnNum: {
      type: Number,
      default: 4
    },
    center: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    square: {
      handler: 'updateChildren',
      immediate: true
    },
    gutter: {
      handler: 'updateChildren',
      immediate: true
    },
    clickable: {
      handler: 'updateChildren',
      immediate: true
    },
    columnNum: {
      handler: 'updateChildren',
      immediate: true
    },
    center: {
      handler: 'updateChildren',
      immediate: true
    },
    border: {
      handler: 'updateChildren',
      immediate: true
    }
  },
  relation: {
    name: 'grid-item',
    type: 'descendant',
    current: 'grid'
  },

  created() {
    const {
      gutter
    } = this;

    if (gutter) {
      this.setData({
        viewStyle: `padding-left: ${addUnit(gutter)}`
      });
    }
  },

  methods: {
    updateChildren() {
      this.children.forEach(child => {
        child.updateStyle();
      });
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-grid{position:relative;box-sizing:border-box;overflow:hidden}
</style>