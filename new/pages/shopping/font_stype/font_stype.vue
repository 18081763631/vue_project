<template>
<!--components/font_stype/font_stype.wxml-->

<view :style="'display: flex; padding-left:' + left + 'rpx;padding-right:' + right + 'rpx;width:' + width + 'rpx;color:' + color + '; font-weight:' + font_weight + '; font-size: ' + font_size + 'rpx; letter-spacing:' + letter_spacing + 'rpx;'">
<text>{{tools.sub(font,fontnum)}}</text>
</view>
</template>

<script module="tools" lang="wxs" src="./subutil.wxs"></script>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
    //截取字数
    fontnum: {
      type: Int32Array,
      default: "100"
    },
    left: {
      type: Int32Array,
      default: "0"
    },
    right: {
      type: Int32Array,
      default: "0"
    },
    //字体颜色
    color: {
      type: String,
      default: ""
    },
    //字体加粗程度
    font_weight: {
      type: String,
      default: ""
    },
    //字体大小
    font_size: {
      type: String,
      default: ""
    },
    //字间距
    letter_spacing: {
      type: String,
      default: ""
    },
    //输入字符串
    font: {
      type: String,
      default: ""
    }
  },
  methods: {}
};
</script>
<style>
/* components/font_stype/font_stype.wxss */
.d{
  width: auto;
  
}
</style>