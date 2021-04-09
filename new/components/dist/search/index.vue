<template>
<view>
<view :class="utils.bem('search', { withaction: showAction || useActionSlot }) + ' custom-class'" :style="'background: ' + background">
  <view :class="utils.bem('search__content', [shape])">
    <view class="van-search__label" v-if="label">{{ label }}</view>
    <slot v-else name="label"></slot>

    <van-field type="search" :left-icon="!useLeftIconSlot ? leftIcon : ''" :right-icon="!useRightIconSlot ? rightIcon : ''" :focus="focus" :error="error" border="false" confirm-type="search" class="van-search__field field-class" :value="value" :disabled="disabled" :readonly="readonly" :clearable="clearable" :maxlength="maxlength" :input-align="inputAlign" input-class="input-class" :placeholder="placeholder" :placeholder-style="placeholderStyle" custom-style="padding: 5px 10px 5px 0; background-color: transparent;" @blur="onBlur" @focus="onFocus" @change="onChange" @confirm="onSearch" @clear="onClear">
      <slot v-if="useLeftIconSlot" name="left-icon" slot="left-icon"></slot>
      <slot v-if="useRightIconSlot" name="right-icon" slot="right-icon"></slot>
    </van-field>
  </view>

  <view v-if="showAction || useActionSlot" class="van-search__action" hover-class="van-search__action--hover" hover-stay-time="70">
    <slot v-if="useActionSlot" name="action"></slot>
    <view v-else @tap="onCancel" class="cancel-class">{{ actionText }}</view>
  </view>
  
  
</view>
<scroll-view v-if="show" scroll-y="true" :style="'position: absolute;margin-top: -2rpx; border-bottom-left-radius: 20rpx;height: ' + (List.length*70) + 'rpx; border-bottom-right-radius: 20rpx; background-color: #fff;z-index: 1;width: 100%;'">
	<view v-for="(item, index) in List" :key="index">
		
		<view class="X-allCenter" @touchstart="goDetail" :data-items="item" style="background-color: #fff;margin: 10rpx;">
			 <van-icon name="search"></van-icon>
			<text style="margin-left: 30rpx; display: flex; font-size: 35rpx;font-weight: 3; ">{{item.name}}</text>			
		</view>
	</view>
</scroll-view>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import { canIUseModel } from '../common/version';
import vanField from "../field/index";
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      show: false,
      value: ""
    };
  },

  components: {
    vanField,
    vanIcon
  },
  props: {
    List: {
      type: Object,
      default: []
    },
    label: String,
    focus: Boolean,
    error: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    inputAlign: String,
    showAction: Boolean,
    useActionSlot: Boolean,
    useLeftIconSlot: Boolean,
    useRightIconSlot: Boolean,
    leftIcon: {
      type: String,
      default: 'search'
    },
    rightIcon: String,
    placeholder: String,
    placeholderStyle: String,
    actionText: {
      type: String,
      default: '取消'
    },
    background: {
      type: String,
      default: '#ffffff'
    },
    maxlength: {
      type: Number,
      default: -1
    },
    shape: {
      type: String,
      default: 'square'
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  field: true,
  classes: ['field-class', 'input-class', 'cancel-class'],
  mounted: {},
  methods: {
    onChange(event) {
      if (canIUseModel()) {
        this.setData({
          value: event.detail
        });
      }

      this.$emit('change', event.detail);
    },

    onCancel() {
      /**
       * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
       * https://github.com/youzan/@vant/weapp/issues/1768
       */
      setTimeout(() => {
        if (canIUseModel()) {
          this.setData({
            value: ''
          });
        }

        this.$emit('cancel');
        this.$emit('change', '');
      }, 200);
    },

    onSearch(event) {
      this.$emit('search', event.detail);
    },

    goDetail(e) {
      let id = e.currentTarget.dataset.items.placeId;
      console.log(e.currentTarget.dataset.items.placeId);
      uni.navigateTo({
        url: "/pages/index/scenic/scenic?placeID=" + id
      });
    },

    onFocus(event) {
      this.setData({
        show: !this.show
      });
      this.$emit('focus', event.detail);
    },

    onBlur(event) {
      this.setData({
        show: !this.show
      });
      this.$emit('blur', event.detail);
    },

    onClear(event) {
      this.$emit('clear', event.detail);
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-search{-webkit-align-items:center;align-items:center;box-sizing:border-box;padding:10px 12px;padding:var(--search-padding,10px 12px)}.van-search,.van-search__content{display:-webkit-flex;display:flex}.van-search__content{-webkit-flex:1;flex:1;padding-left:8px;padding-left:var(--padding-xs,8px);border-radius:2px;border-radius:var(--border-radius-sm,2px);background-color:#f7f8fa;background-color:var(--search-background-color,#f7f8fa)}.van-search__content--round{border-radius:17px;border-radius:calc(var(--search-input-height, 34px)/2)}.van-search__label{padding:0 5px;padding:var(--search-label-padding,0 5px);font-size:14px;font-size:var(--search-label-font-size,14px);line-height:34px;line-height:var(--search-input-height,34px);color:#323233;color:var(--search-label-color,#323233)}.van-search__field{-webkit-flex:1;flex:1}.van-search__field__left-icon{color:#969799;color:var(--search-left-icon-color,#969799)}.van-search--withaction{padding-right:0}.van-search__action{padding:0 8px;padding:var(--search-action-padding,0 8px);font-size:14px;font-size:var(--search-action-font-size,14px);line-height:34px;line-height:var(--search-input-height,34px);color:#323233;color:var(--search-action-text-color,#323233)}.van-search__action--hover{background-color:#f2f3f5;background-color:var(--active-color,#f2f3f5)}
</style>