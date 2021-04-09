<template>
<view class="custom-class van-sticky" :style="computed.containerStyle({ fixed, height, zIndex })">
  <view :class="utils.bem('sticky-wrap', { fixed })" :style="computed.wrapStyle({ fixed, offsetTop, transform, zIndex })">
    <slot></slot>
  </view>
</view>
</template>

<script module="computed" lang="wxs" src="./index.wxs"></script>
<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import { pageScrollMixin } from '../mixins/page-scroll';
const ROOT_ELEMENT = '.van-sticky';

export default {
  data() {
    return {
      height: 0,
      fixed: false,
      transform: 0
    };
  },

  components: {},
  props: {
    zIndex: {
      type: Number,
      default: 99
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean
    },
    container: {
      type: null
    },
    scrollTop: {
      type: null
    }
  },
  watch: {
    offsetTop: {
      handler: 'onScroll',
      immediate: true
    },
    disabled: {
      handler: 'onScroll',
      immediate: true
    },
    container: {
      handler: 'onScroll',
      immediate: true
    },
    scrollTop: {
      handler: function (val) {
        this.onScroll({
          scrollTop: val
        });
      },
      immediate: true
    }
  },
  mixins: [pageScrollMixin(function (event) {
    if (this.scrollTop != null) {
      return;
    }

    this.onScroll(event);
  })],

  mounted() {
    this.onScroll();
  },

  methods: {
    onScroll({
      scrollTop
    } = {}) {
      const {
        container,
        offsetTop,
        disabled
      } = this;

      if (disabled) {
        this.setDataAfterDiff({
          fixed: false,
          transform: 0
        });
        return;
      }

      this.scrollTop = scrollTop || this.scrollTop;

      if (typeof container === 'function') {
        Promise.all([this.getRect(ROOT_ELEMENT), this.getContainerRect()]).then(([root, container]) => {
          if (offsetTop + root.height > container.height + container.top) {
            this.setDataAfterDiff({
              fixed: false,
              transform: container.height - root.height
            });
          } else if (offsetTop >= root.top) {
            this.setDataAfterDiff({
              fixed: true,
              height: root.height,
              transform: 0
            });
          } else {
            this.setDataAfterDiff({
              fixed: false,
              transform: 0
            });
          }
        });
        return;
      }

      this.getRect(ROOT_ELEMENT).then(root => {
        if (offsetTop >= root.top) {
          this.setDataAfterDiff({
            fixed: true,
            height: root.height
          });
          this.transform = 0;
        } else {
          this.setDataAfterDiff({
            fixed: false
          });
        }
      });
    },

    setDataAfterDiff(data) {
      uni.nextTick(() => {
        const diff = Object.keys(data).reduce((prev, key) => {
          if (data[key] !== this[key]) {
            prev[key] = data[key];
          }

          return prev;
        }, {});
        this.setData(diff);
        this.$emit('scroll', {
          scrollTop: this.scrollTop,
          isFixed: data.fixed || this.fixed
        });
      });
    },

    getContainerRect() {
      const nodesRef = this.container();
      return new Promise(resolve => nodesRef.boundingClientRect(resolve).exec());
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-sticky{position:relative}.van-sticky-wrap--fixed{position:fixed;right:0;left:0}
</style>