<template>
<van-button square :id="id" size="large" :lang="lang" :loading="loading" :disabled="disabled" :open-type="openType" :business-id="businessId" custom-class="van-goods-action-icon" :session-from="sessionFrom" :app-parameter="appParameter" :send-message-img="sendMessageImg" :send-message-path="sendMessagePath" :show-message-card="showMessageCard" :send-message-title="sendMessageTitle" @click="onClick" @error="bindError" @contact="bindContact" @opensetting="bindOpenSetting" @getuserinfo="bindGetUserInfo" @getphonenumber="bindGetPhoneNumber" @launchapp="bindLaunchApp">
  <view class="van-goods-action-icon__content">
    <van-icon v-if="icon" size="20px" :name="icon" :dot="dot" :info="info" class="van-goods-action-icon__icon" custom-class="icon-class"></van-icon>
    <slot name="icon"></slot>
    <text class="text-class">{{ text }}</text>
  </view>
</van-button>
</template>

<script>
import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
import vanIcon from "../icon/index";
import vanButton from "../button/index";

export default {
  data() {
    return {};
  },

  components: {
    vanIcon,
    vanButton
  },
  props: {
    text: String,
    dot: Boolean,
    info: String,
    icon: String,
    disabled: Boolean,
    loading: Boolean
  },
  classes: ['icon-class', 'text-class'],
  mixins: [link, button, openType],
  methods: {
    onClick(event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-goods-action-icon{border:none!important;width:50px!important;width:var(--goods-action-icon-height,50px)!important}.van-goods-action-icon__content{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:center;justify-content:center;height:100%;line-height:1;font-size:10px;font-size:var(--goods-action-icon-font-size,10px);color:#646566;color:var(--goods-action-icon-text-color,#646566)}.van-goods-action-icon__icon{margin-bottom:4px}
</style>