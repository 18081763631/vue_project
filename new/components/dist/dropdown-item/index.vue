<template>
<view v-if="showWrapper" :class="utils.bem('dropdown-item', direction)" :style="wrapperStyle">
  <van-popup :show="showPopup" :custom-style="'position: absolute;' + popupStyle" overlay-style="position: absolute;" :overlay="overlay" :position="direction === 'down' ? 'top' : 'bottom'" :duration="transition ? duration : 0" :close-on-click-overlay="closeOnClickOverlay" @enter="onOpen" @leave="onClose" @close="toggle" @after-enter="onOpened" @after-leave="onClosed">
    <van-cell v-for="(item, index) in options" :key="index" :data-option="item" :class="utils.bem('dropdown-item__option', { active: item.value === value } )" clickable :icon="item.icon" @tap="onOptionTap">
      <view slot="title" class="van-dropdown-item__title" :style="item.value === value  ? 'color:' + activeColor : ''">
        {{ item.text }}
      </view>
      <van-icon v-if="item.value === value" name="success" class="van-dropdown-item__icon" :color="activeColor"></van-icon>
    </van-cell>

    <slot></slot>
  </van-popup>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import vanPopup from "../popup/index";
import vanCell from "../cell/index";
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false,
      displayTitle: '',
      overlay: "",
      duration: "",
      activeColor: "",
      closeOnClickOverlay: "",
      direction: "",
      wrapperStyle: ""
    };
  },

  components: {
    vanPopup,
    vanCell,
    vanIcon
  },
  props: {
    value: {
      type: null
    },
    title: {
      type: String
    },
    disabled: Boolean,
    titleClass: {
      type: String
    },
    options: {
      type: Array,
      default: []
    },
    popupStyle: String
  },
  watch: {
    value: {
      handler: 'rerender',
      immediate: true
    },
    title: {
      handler: 'rerender',
      immediate: true
    },
    titleClass: {
      handler: 'rerender',
      immediate: true
    },
    options: {
      handler: 'rerender',
      immediate: true,
      deep: true
    }
  },
  field: true,
  relation: {
    name: 'dropdown-menu',
    type: 'ancestor',
    current: 'dropdown-item',

    linked() {
      this.updateDataFromParent();
    }

  },
  methods: {
    rerender() {
      uni.nextTick(() => {
        this.parent && this.parent.updateItemListData();
      });
    },

    updateDataFromParent() {
      if (this.parent) {
        const {
          overlay,
          duration,
          activeColor,
          closeOnClickOverlay,
          direction
        } = this.parent.data;
        this.setData({
          overlay,
          duration,
          activeColor,
          closeOnClickOverlay,
          direction
        });
      }
    },

    onOpen() {
      this.$emit('open');
    },

    onOpened() {
      this.$emit('opened');
    },

    onClose() {
      this.$emit('close');
    },

    onClosed() {
      this.$emit('closed');
      this.setData({
        showWrapper: false
      });
    },

    onOptionTap(event) {
      // console.log(event);
      const {
        option
      } = event.currentTarget.dataset;
      const {
        value
      } = option;
      const shouldEmitChange = this.value !== value;
      this.setData({
        showPopup: false,
        value
      });
      this.$emit('close');
      this.rerender();

      if (shouldEmitChange) {
        this.$emit('change', option);
      }
    },

    toggle(show, options = {}) {
      const {
        showPopup
      } = this;

      if (typeof show !== 'boolean') {
        show = !showPopup;
      }

      if (show === showPopup) {
        return;
      }

      this.setData({
        transition: !options.immediate,
        showPopup: show
      });

      if (show) {
        this.parent.getChildWrapperStyle().then(wrapperStyle => {
          this.setData({
            wrapperStyle,
            showWrapper: true
          });
          this.rerender();
        });
      } else {
        this.rerender();
      }
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-dropdown-item{position:fixed;right:0;left:0;overflow:hidden}.van-dropdown-item__option{text-align:left}.van-dropdown-item__option--active .van-dropdown-item__icon,.van-dropdown-item__option--active .van-dropdown-item__title{color:#1989fa;color:var(--dropdown-menu-option-active-color,#1989fa)}.van-dropdown-item--up{top:0}.van-dropdown-item--down{bottom:0}.van-dropdown-item__icon{display:block;line-height:inherit}
</style>