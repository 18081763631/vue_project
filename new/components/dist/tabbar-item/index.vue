<template>
<view :class="( utils.bem('tabbar-item', { active }) ) + ' custom-class'" :style="'color: ' + ( active ? activeColor : inactiveColor )" @tap="onClick">
  <view class="van-tabbar-item__icon">
    <van-icon v-if="icon" :name="icon" custom-class="van-tabbar-item__icon__inner"></van-icon>
    <block v-else>
      <slot v-if="active" name="icon-active"></slot>
      <slot v-else name="icon"></slot>
    </block>
    <van-info :dot="dot" :info="info" custom-class="van-tabbar-item__info"></van-info>
  </view>
  <view class="van-tabbar-item__text">
    <slot></slot>
  </view>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import vanIcon from "../icon/index";
import vanInfo from "../info/index";

export default {
  data() {
    return {
      active: false
    };
  },

  components: {
    vanIcon,
    vanInfo
  },
  props: {
    info: null,
    name: null,
    icon: String,
    dot: Boolean
  },
  relation: {
    name: 'tabbar',
    type: 'ancestor',
    current: 'tabbar-item'
  },
  methods: {
    onClick() {
      if (this.parent) {
        this.parent.onChange(this);
      }

      this.$emit('click');
    },

    updateFromParent() {
      const {
        parent
      } = this;

      if (!parent) {
        return;
      }

      const index = parent.children.indexOf(this);
      const parentData = parent.data;
      const {
        data
      } = this;
      const active = (data.name || index) === parentData.active;
      const patch = {};

      if (active !== data.active) {
        patch.active = active;
      }

      if (parentData.activeColor !== data.activeColor) {
        patch.activeColor = parentData.activeColor;
      }

      if (parentData.inactiveColor !== data.inactiveColor) {
        patch.inactiveColor = parentData.inactiveColor;
      }

      return Object.keys(patch).length > 0 ? this.set(patch) : Promise.resolve();
    }

  }
};
</script>
<style>
@import "../common/index.css";:host{-webkit-flex:1;flex:1}.van-tabbar-item{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;height:100%;color:#646566;color:var(--tabbar-item-text-color,#646566);font-size:12px;font-size:var(--tabbar-item-font-size,12px);line-height:1;line-height:var(--tabbar-item-line-height,1)}.van-tabbar-item__icon{position:relative;margin-bottom:5px;margin-bottom:var(--tabbar-item-margin-bottom,5px);font-size:18px;font-size:var(--tabbar-item-icon-size,18px)}.van-tabbar-item__icon__inner{display:block;min-width:1em}.van-tabbar-item--active{color:#1989fa;color:var(--tabbar-item-active-color,#1989fa)}.van-tabbar-item__info{margin-top:2px}
</style>