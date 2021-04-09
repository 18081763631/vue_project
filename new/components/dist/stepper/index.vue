<template>
<view class="van-stepper custom-class">
  <view v-if="showMinus" data-type="minus" :style="'width: ' + utils.addUnit(buttonSize) + '; height: ' + utils.addUnit(buttonSize)" :class="'minus-class ' + utils.bem('stepper__minus', { disabled: disabled || disableMinus || currentValue <= min })" hover-class="van-stepper__minus--hover" hover-stay-time="70" @tap="onTap" @touchstart="onTouchStart" @touchend="onTouchEnd"></view>
  <input :type="integer ? 'number' : 'digit'" :class="'input-class ' + utils.bem('stepper__input', { disabled: disabled || disableInput })" :style="'width: ' + utils.addUnit(inputWidth) + '; height: ' + utils.addUnit(buttonSize)" :value="currentValue" :focus="focus" :disabled="disabled || disableInput" @input="onInput" @focus="onFocus" @blur="onBlur"></input>
  <view v-if="showPlus" data-type="plus" :style="'width: ' + utils.addUnit(buttonSize) + '; height: ' + utils.addUnit(buttonSize)" :class="'plus-class ' + utils.bem('stepper__plus', { disabled: disabled || disablePlus || currentValue >= max })" hover-class="van-stepper__plus--hover" hover-stay-time="70" @tap="onTap" @touchstart="onTouchStart" @touchend="onTouchEnd"></view>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import { isDef } from '../common/utils';
const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200; // add num and avoid float number
// add num and avoid float number
function add(num1, num2) {
  const cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
function equal(value1, value2) {
  return String(value1) === String(value2);
}

export default {
  data() {
    return {
      currentValue: ''
    };
  },

  components: {},
  props: {
    value: {
      type: null
    },
    integer: {
      type: Boolean
    },
    disabled: Boolean,
    inputWidth: null,
    buttonSize: null,
    asyncChange: Boolean,
    disableInput: Boolean,
    decimalLength: {
      type: Number,
      default: null
    },
    min: {
      type: null,
      default: 1
    },
    max: {
      type: null,
      default: Number.MAX_SAFE_INTEGER
    },
    step: {
      type: null,
      default: 1
    },
    showPlus: {
      type: Boolean,
      default: true
    },
    showMinus: {
      type: Boolean,
      default: true
    },
    disablePlus: Boolean,
    disableMinus: Boolean,
    longPress: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      handler: function (value) {
        if (!equal(value, this.currentValue)) {
          this.setData({
            currentValue: this.format(value)
          });
        }
      },
      immediate: true
    },
    integer: {
      handler: 'check',
      immediate: true
    },
    decimalLength: {
      handler: 'check',
      immediate: true
    },
    min: {
      handler: 'check',
      immediate: true
    },
    max: {
      handler: 'check',
      immediate: true
    }
  },
  field: true,
  classes: ['input-class', 'plus-class', 'minus-class'],

  created() {
    this.setData({
      currentValue: this.format(this.value)
    });
  },

  methods: {
    check() {
      const val = this.format(this.currentValue);

      if (!equal(val, this.currentValue)) {
        this.setData({
          currentValue: val
        });
      }
    },

    isDisabled(type) {
      if (type === 'plus') {
        return this.disabled || this.disablePlus || this.currentValue >= this.max;
      }

      return this.disabled || this.disableMinus || this.currentValue <= this.min;
    },

    onFocus(event) {
      this.$emit('focus', event.detail);
    },

    onBlur(event) {
      const value = this.format(event.detail.value);
      this.emitChange(value);
      this.$emit('blur', Object.assign(Object.assign({}, event.detail), {
        value
      }));
    },

    // filter illegal characters
    filter(value) {
      value = String(value).replace(/[^0-9.-]/g, '');

      if (this.integer && value.indexOf('.') !== -1) {
        value = value.split('.')[0];
      }

      return value;
    },

    // limit value range
    format(value) {
      value = this.filter(value); // format range

      value = value === '' ? 0 : +value;
      value = Math.max(Math.min(this.max, value), this.min); // format decimal

      if (isDef(this.decimalLength)) {
        value = value.toFixed(this.decimalLength);
      }

      return value;
    },

    onInput(event) {
      const {
        value = ''
      } = event.detail || {}; // allow input to be empty

      if (value === '') {
        return;
      }

      let formatted = this.filter(value); // limit max decimal length

      if (isDef(this.decimalLength) && formatted.indexOf('.') !== -1) {
        const pair = formatted.split('.');
        formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`;
      }

      this.emitChange(formatted);
    },

    emitChange(value) {
      if (!this.asyncChange) {
        this.setData({
          currentValue: value
        });
      }

      this.$emit('change', value);
    },

    onChange() {
      const {
        type
      } = this;

      if (this.isDisabled(type)) {
        this.$emit('overlimit', type);
        return;
      }

      const diff = type === 'minus' ? -this.step : +this.step;
      const value = this.format(add(+this.currentValue, diff));
      this.emitChange(value);
      this.$emit(type);
    },

    longPressStep() {
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_INTERVAL);
    },

    onTap(event) {
      const {
        type
      } = event.currentTarget.dataset;
      this.type = type;
      this.onChange();
    },

    onTouchStart(event) {
      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
      const {
        type
      } = event.currentTarget.dataset;
      this.type = type;
      this.isLongPress = false;
      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_START_TIME);
    },

    onTouchEnd() {
      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-stepper{font-size:0}.van-stepper__minus,.van-stepper__plus{position:relative;display:inline-block;box-sizing:border-box;margin:1px;vertical-align:middle;border:0;background-color:#f2f3f5;background-color:var(--stepper-background-color,#f2f3f5);color:#323233;color:var(--stepper-button-icon-color,#323233);width:28px;width:var(--stepper-input-height,28px);height:28px;height:var(--stepper-input-height,28px);padding:4px;padding:var(--padding-base,4px)}.van-stepper__minus:before,.van-stepper__plus:before{width:9px;height:1px}.van-stepper__minus:after,.van-stepper__plus:after{width:1px;height:9px}.van-stepper__minus:after,.van-stepper__minus:before,.van-stepper__plus:after,.van-stepper__plus:before{position:absolute;top:0;right:0;bottom:0;left:0;margin:auto;background-color:currentColor;content:""}.van-stepper__minus--hover,.van-stepper__plus--hover{background-color:#e8e8e8;background-color:var(--stepper-active-color,#e8e8e8)}.van-stepper__minus--disabled,.van-stepper__plus--disabled{color:#c8c9cc;color:var(--stepper-button-disabled-icon-color,#c8c9cc)}.van-stepper__minus--disabled,.van-stepper__minus--disabled.van-stepper__minus--hover,.van-stepper__minus--disabled.van-stepper__plus--hover,.van-stepper__plus--disabled,.van-stepper__plus--disabled.van-stepper__minus--hover,.van-stepper__plus--disabled.van-stepper__plus--hover{background-color:#f7f8fa;background-color:var(--stepper-button-disabled-color,#f7f8fa)}.van-stepper__minus{border-radius:4px 0 0 4px;border-radius:var(--stepper-border-radius,4px) 0 0 var(--stepper-border-radius,4px)}.van-stepper__minus:after{display:none}.van-stepper__plus{border-radius:0 4px 4px 0;border-radius:0 var(--stepper-border-radius,4px) var(--stepper-border-radius,4px) 0}.van-stepper__input{display:inline-block;box-sizing:border-box;min-height:0;margin:1px;padding:1px;text-align:center;vertical-align:middle;border:0;border-width:1px 0;border-radius:0;-webkit-appearance:none;font-size:14px;font-size:var(--stepper-input-font-size,14px);color:#323233;color:var(--stepper-input-text-color,#323233);background-color:#f2f3f5;background-color:var(--stepper-background-color,#f2f3f5);width:32px;width:var(--stepper-input-width,32px);height:28px;height:var(--stepper-input-height,28px)}.van-stepper__input--disabled{color:#c8c9cc;color:var(--stepper-input-disabled-text-color,#c8c9cc);background-color:#f2f3f5;background-color:var(--stepper-input-disabled-background-color,#f2f3f5)}
</style>