<template>
<view class="van-rate custom-class" @touchmove="onTouchMove">
  <view v-for="(item, index) in innerCountArray" :key="index" class="van-rate__item" :style="'padding-right: ' + ( index !== count - 1 ? utils.addUnit(gutter) : '' )">
    <van-icon :name="index + 1 <= innerValue ? icon : voidIcon" class="van-rate__icon" :style="'font-size: ' + utils.addUnit(size)" custom-class="icon-class" :data-score="index" :color="disabled ? disabledColor : index + 1 <= innerValue ? color : voidColor" @click="onSelect"></van-icon>

    <van-icon v-if="allowHalf" :name="index + 0.5 <= innerValue ? icon : voidIcon" :class="utils.bem('rate__icon', ['half'])" :style="'font-size: ' + utils.addUnit(size)" custom-class="icon-class" :data-score="index - 0.5" :color="disabled ? disabledColor : index + 0.5 <= innerValue ? color : voidColor" @click="onSelect"></van-icon>
  </view>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import { canIUseModel } from '../common/version';
import vanIcon from "../icon/index";

export default {
  data() {
    return {
      innerValue: 0,
      innerCountArray: Array.from({
        length: 5
      })
    };
  },

  components: {
    vanIcon
  },
  props: {
    value: {
      type: Number
    },
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: null,
    icon: {
      type: String,
      default: 'star'
    },
    voidIcon: {
      type: String,
      default: 'star-o'
    },
    color: {
      type: String,
      default: '#ffd21e'
    },
    voidColor: {
      type: String,
      default: '#c7c7c7'
    },
    disabledColor: {
      type: String,
      default: '#bdbdbd'
    },
    count: {
      type: Number,
      default: 5
    },
    gutter: null,
    touchable: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      handler: function (value) {
        if (value !== this.innerValue) {
          this.setData({
            innerValue: value
          });
        }
      },
      immediate: true
    },
    count: {
      handler: function (value) {
        this.setData({
          innerCountArray: Array.from({
            length: value
          })
        });
      },
      immediate: true
    }
  },
  field: true,
  classes: ['icon-class'],
  methods: {
    onSelect(event) {
      const {
        data
      } = this;
      const {
        score
      } = event.currentTarget.dataset;

      if (!data.disabled && !data.readonly) {
        this.setData({
          innerValue: score + 1
        });

        if (canIUseModel()) {
          this.setData({
            value: score + 1
          });
        }

        uni.nextTick(() => {
          this.$emit('input', score + 1);
          this.$emit('change', score + 1);
        });
      }
    },

    onTouchMove(event) {
      const {
        touchable
      } = this;
      if (!touchable) return;
      const {
        clientX
      } = event.touches[0];
      this.getRect('.van-rate__icon', true).then(list => {
        const target = list.sort(item => item.right - item.left).find(item => clientX >= item.left && clientX <= item.right);

        if (target != null) {
          this.onSelect(Object.assign(Object.assign({}, event), {
            currentTarget: target
          }));
        }
      });
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-rate{display:-webkit-inline-flex;display:inline-flex;-webkit-user-select:none;user-select:none}.van-rate__item{position:relative;padding:0 2px;padding:0 var(--rate-horizontal-padding,2px)}.van-rate__icon{display:block;height:1em;font-size:20px;font-size:var(--rate-icon-size,20px)}.van-rate__icon--half{position:absolute;top:0;width:.5em;overflow:hidden;left:2px;left:var(--rate-horizontal-padding,2px)}
</style>