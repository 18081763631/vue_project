<template>
<view class="van-circle">
  <canvas class="van-circle__canvas" :style="'width: ' + utils.addUnit(size) + ';height:' + utils.addUnit(size)" canvas-id="van-circle"></canvas>
  <view v-if="!text" class="van-circle__text">
    <slot></slot>
  </view>
  <cover-view v-else class="van-circle__text">{{ text }}</cover-view>
</view>
</template>

<script module="utils" lang="wxs" src="../wxs/utils.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import { isObj } from '../common/utils';
import { BLUE, WHITE } from '../common/color';
function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}
const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;
const STEP = 1;

export default {
  data() {
    return {
      hoverColor: BLUE
    };
  },

  components: {},
  props: {
    text: String,
    lineCap: {
      type: String,
      default: 'round'
    },
    value: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 50
    },
    size: {
      type: Number,
      default: 100
    },
    fill: String,
    layerColor: {
      type: String,
      default: WHITE
    },
    color: {
      type: [String, Object],
      default: BLUE
    },
    type: {
      type: String,
      default: ''
    },
    strokeWidth: {
      type: Number,
      default: 4
    },
    clockwise: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value: {
      handler: 'reRender',
      immediate: true
    },
    color: {
      handler: 'setHoverColor',
      immediate: true
    }
  },

  created() {
    const {
      value
    } = this;
    this.currentValue = value;
    this.drawCircle(value);
  },

  destroyed() {
    this.ctx = null;
    this.clearInterval();
  },

  methods: {
    getContext() {
      if (!this.ctx) {
        this.ctx = uni.createCanvasContext('van-circle', this);
      }

      return this.ctx;
    },

    setHoverColor() {
      const {
        color,
        size,
        type
      } = this;
      const context = type ? this.getContext(type) : this.getContext();
      let hoverColor = color;

      if (isObj(color)) {
        const LinearColor = context.createLinearGradient(size, 0, 0, 0);
        Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map(key => LinearColor.addColorStop(parseFloat(key) / 100, color[key]));
        hoverColor = LinearColor;
      }

      this.setData({
        hoverColor
      });
    },

    presetCanvas(context, strokeStyle, beginAngle, endAngle, fill) {
      const {
        strokeWidth,
        lineCap,
        clockwise,
        size
      } = this;
      const position = size / 2;
      const radius = position - strokeWidth / 2;
      context.setStrokeStyle(strokeStyle);
      context.setLineWidth(strokeWidth);
      context.setLineCap(lineCap);
      context.beginPath();
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
      context.stroke();

      if (fill) {
        context.setFillStyle(fill);
        context.fill();
      }
    },

    renderLayerCircle(context) {
      const {
        layerColor,
        fill
      } = this;
      this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
    },

    renderHoverCircle(context, formatValue) {
      const {
        clockwise,
        hoverColor
      } = this; // 结束角度

      const progress = PERIMETER * (formatValue / 100);
      const endAngle = clockwise ? BEGIN_ANGLE + progress : 3 * Math.PI - (BEGIN_ANGLE + progress);
      this.presetCanvas(context, hoverColor, BEGIN_ANGLE, endAngle);
    },

    drawCircle(currentValue) {
      const {
        size,
        type
      } = this;
      const context = type ? this.getContext(type) : this.getContext();
      context.clearRect(0, 0, size, size);
      this.renderLayerCircle(context);
      const formatValue = format(currentValue);

      if (formatValue !== 0) {
        this.renderHoverCircle(context, formatValue);
      }

      context.draw();
    },

    reRender() {
      // tofector 动画暂时没有想到好的解决方案
      const {
        value,
        speed
      } = this;

      if (speed <= 0 || speed > 1000) {
        this.drawCircle(value);
        return;
      }

      this.clearInterval();
      this.currentValue = this.currentValue || 0;
      this.interval = setInterval(() => {
        if (this.currentValue !== value) {
          if (this.currentValue < value) {
            this.currentValue += STEP;
          } else {
            this.currentValue -= STEP;
          }

          this.drawCircle(this.currentValue);
        } else {
          this.clearInterval();
        }
      }, 1000 / speed);
    },

    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-circle{position:relative;display:inline-block;text-align:center}.van-circle__text{position:absolute;top:50%;left:0;width:100%;-webkit-transform:translateY(-50%);transform:translateY(-50%);color:#323233;color:var(--circle-text-color,#323233)}
</style>