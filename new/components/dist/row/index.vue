<template>
<view class="custom-class van-row" :style="viewStyle">
  <slot></slot>
</view>
</template>

<script>
import { VantComponent } from '../common/component';

export default {
  data() {
    return {
      viewStyle: ''
    };
  },

  components: {},
  props: {
    gutter: {
      type: Number
    }
  },
  watch: {
    gutter: {
      handler: 'setGutter',
      immediate: true
    }
  },
  relation: {
    name: 'col',
    type: 'descendant',
    current: 'row',

    linked(target) {
      if (this.gutter) {
        target.setGutter(this.gutter);
      }
    }

  },

  mounted() {
    if (this.gutter) {
      this.setGutter();
    }
  },

  methods: {
    setGutter() {
      const {
        gutter
      } = this;
      const margin = `-${Number(gutter) / 2}px`;
      const viewStyle = gutter ? `margin-right: ${margin}; margin-left: ${margin};` : '';
      this.setData({
        viewStyle
      });
      this.getRelationNodes('../col/index').forEach(col => {
        col.setGutter(this.gutter);
      });
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-row:after{display:table;clear:both;content:""}
</style>