<template>
<view>
<!--<import src="./calendar.wxml"></import>-->

<van-popup v-if="poppable" :custom-class="'van-calendar__popup--' + position" close-icon-class="van-calendar__close-icon" :show="show" :round="round" :position="position" :closeable="showTitle || showSubtitle" :close-on-click-overlay="closeOnClickOverlay" @enter="onOpen" @close="onClose" @after-enter="onOpened" @after-leave="onClosed">
  <block data-type="template" data-is="calendar" data-attr="title, subtitle, showTitle, showSubtitle, minDate, maxDate, type, color, showMark, formatter, rowHeight, currentDate, safeAreaInsetBottom, showConfirm, confirmDisabledText, confirmText, scrollIntoView, allowSameDay">
  <view class="van-calendar">
    <header :title="title" :showTitle="showTitle" :subtitle="subtitle" :showSubtitle="showSubtitle">
      <slot name="title" slot="title"></slot>
    </header>

    <scroll-view class="van-calendar__body" scroll-y :scroll-into-view="scrollIntoView">
      <month v-for="(item, index) in computed.getMonths(minDate, maxDate)" :key="index" :id="'month' + index" class="month" :data-date="item" :date="item" :type="type" :color="color" :minDate="minDate" :maxDate="maxDate" :showMark="showMark" :formatter="formatter" :rowHeight="rowHeight" :currentDate="currentDate" :showSubtitle="showSubtitle" :allowSameDay="allowSameDay" :showMonthTitle="index !== 0 || !showSubtitle" @click="onClickDay"></month>
    </scroll-view>

    <view :class="'van-calendar__footer ' + ( safeAreaInsetBottom ? 'van-calendar__footer--safe-area-inset-bottom' : '' )">
      <slot name="footer"></slot>
    </view>

    <view :class="'van-calendar__footer ' + ( safeAreaInsetBottom ? 'van-calendar__footer--safe-area-inset-bottom' : '' )">
      <van-button v-if="showConfirm" round block type="danger" :color="color" custom-class="van-calendar__confirm" :disabled="computed.getButtonDisabled(type, currentDate)" nativeType="text" @click="onConfirm">
        {{computed.getButtonDisabled(type, currentDate) ? confirmDisabledText : confirmText}}
      </van-button>
    </view>
  </view>
</block>
</van-popup>

<block data-type="template" data-is="calendar" data-attr="title, subtitle, showTitle, showSubtitle, minDate, maxDate, type, color, showMark, formatter, rowHeight, currentDate, safeAreaInsetBottom, showConfirm, confirmDisabledText, confirmText, scrollIntoView, allowSameDay" v-else="">
  <view class="van-calendar">
    <header :title="title" :showTitle="showTitle" :subtitle="subtitle" :showSubtitle="showSubtitle">
      <slot name="title" slot="title"></slot>
    </header>

    <scroll-view class="van-calendar__body" scroll-y :scroll-into-view="scrollIntoView">
      <month v-for="(item, index) in computed.getMonths(minDate, maxDate)" :key="index" :id="'month' + index" class="month" :data-date="item" :date="item" :type="type" :color="color" :minDate="minDate" :maxDate="maxDate" :showMark="showMark" :formatter="formatter" :rowHeight="rowHeight" :currentDate="currentDate" :showSubtitle="showSubtitle" :allowSameDay="allowSameDay" :showMonthTitle="index !== 0 || !showSubtitle" @click="onClickDay"></month>
    </scroll-view>

    <view :class="'van-calendar__footer ' + ( safeAreaInsetBottom ? 'van-calendar__footer--safe-area-inset-bottom' : '' )">
      <slot name="footer"></slot>
    </view>

    <view :class="'van-calendar__footer ' + ( safeAreaInsetBottom ? 'van-calendar__footer--safe-area-inset-bottom' : '' )">
      <van-button v-if="showConfirm" round block type="danger" :color="color" custom-class="van-calendar__confirm" :disabled="computed.getButtonDisabled(type, currentDate)" nativeType="text" @click="onConfirm">
        {{computed.getButtonDisabled(type, currentDate) ? confirmDisabledText : confirmText}}
      </van-button>
    </view>
  </view>
</block>

<van-toast id="van-toast"></van-toast>
</view>
</template>

<script module="computed" lang="wxs" src="./index.wxs"></script>

<script>
import { VantComponent } from '../common/component';
import { ROW_HEIGHT, getNextDay, compareDay, copyDates, calcDateNum, formatMonthTitle, compareMonth, getMonths, getDayByOffset } from './utils';
import Toast from '../toast/toast';
import header from "./components/header/index";
import month from "./components/month/index";
import vanButton from "../button/index";
import vanPopup from "../popup/index";

export default {
  data() {
    return {
      subtitle: '',
      currentDate: null,
      scrollIntoView: ''
    };
  },

  components: {
    header,
    month,
    vanButton,
    vanPopup
  },
  props: {
    title: {
      type: String,
      default: '日期选择'
    },
    color: String,
    show: {
      type: Boolean
    },
    formatter: null,
    confirmText: {
      type: String,
      default: '确定'
    },
    rangePrompt: String,
    defaultDate: {
      type: [Number, Array]
    },
    allowSameDay: Boolean,
    confirmDisabledText: String,
    type: {
      type: String,
      default: 'single'
    },
    minDate: {
      type: null,
      default: Date.now()
    },
    maxDate: {
      type: null,
      default: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime()
    },
    position: {
      type: String,
      default: 'bottom'
    },
    rowHeight: {
      type: [Number, String],
      default: ROW_HEIGHT
    },
    round: {
      type: Boolean,
      default: true
    },
    poppable: {
      type: Boolean,
      default: true
    },
    showMark: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    showSubtitle: {
      type: Boolean,
      default: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    maxRange: {
      type: [Number, String],
      default: null
    }
  },
  watch: {
    show: {
      handler: function (val) {
        if (val) {
          this.initRect();
          this.scrollIntoViewFun();
        }
      },
      immediate: true
    },
    defaultDate: {
      handler: function (val) {
        this.setData({
          currentDate: val
        });
        this.scrollIntoViewFun();
      },
      immediate: true
    },
    type: {
      handler: 'reset',
      immediate: true
    }
  },

  created() {
    this.setData({
      currentDate: this.getInitialDate()
    });
  },

  mounted() {
    if (this.show || !this.poppable) {
      this.initRect();
      this.scrollIntoViewFun();
    }
  },

  methods: {
    reset() {
      this.setData({
        currentDate: this.getInitialDate()
      });
      this.scrollIntoViewFun();
    },

    initRect() {
      if (this.contentObserver != null) {
        this.contentObserver.disconnect();
      }

      const contentObserver = this.createIntersectionObserver({
        thresholds: [0, 0.1, 0.9, 1],
        observeAll: true
      });
      this.contentObserver = contentObserver;
      contentObserver.relativeTo('.van-calendar__body');
      contentObserver.observe('.month', res => {
        if (res.boundingClientRect.top <= res.relativeRect.top) {
          // @ts-ignore
          this.setData({
            subtitle: formatMonthTitle(res.dataset.date)
          });
        }
      });
    },

    getInitialDate() {
      const {
        type,
        defaultDate,
        minDate
      } = this;

      if (type === 'range') {
        const [startDay, endDay] = defaultDate || [];
        return [startDay || minDate, endDay || getNextDay(new Date(minDate)).getTime()];
      }

      if (type === 'multiple') {
        return [defaultDate || minDate];
      }

      return defaultDate || minDate;
    },

    scrollIntoViewFun() {
      setTimeout(() => {
        const {
          currentDate,
          type,
          show,
          poppable,
          minDate,
          maxDate
        } = this;
        const targetDate = type === 'single' ? currentDate : currentDate[0];
        const displayed = show || !poppable;

        if (!targetDate || !displayed) {
          return;
        }

        const months = getMonths(minDate, maxDate);
        months.some((month, index) => {
          if (compareMonth(month, targetDate) === 0) {
            this.setData({
              scrollIntoView: `month${index}`
            });
            return true;
          }

          return false;
        });
      }, 100);
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
    },

    onClickDay(event) {
      const {
        date
      } = event.detail;
      const {
        type,
        currentDate,
        allowSameDay
      } = this;

      if (type === 'range') {
        const [startDay, endDay] = currentDate;

        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);

          if (compareToStart === 1) {
            this.select([startDay, date], true);
          } else if (compareToStart === -1) {
            this.select([date, null]);
          } else if (allowSameDay) {
            this.select([date, date]);
          }
        } else {
          this.select([date, null]);
        }
      } else if (type === 'multiple') {
        let selectedIndex;
        const selected = currentDate.some((dateItem, index) => {
          const equal = compareDay(dateItem, date) === 0;

          if (equal) {
            selectedIndex = index;
          }

          return equal;
        });

        if (selected) {
          const cancelDate = currentDate.splice(selectedIndex, 1);
          this.setData({
            currentDate
          });
          this.unselect(cancelDate);
        } else {
          this.select([...currentDate, date]);
        }
      } else {
        this.select(date, true);
      }
    },

    unselect(dateArray) {
      const date = dateArray[0];

      if (date) {
        this.$emit('unselect', copyDates(date));
      }
    },

    select(date, complete) {
      if (complete && this.type === 'range') {
        const valid = this.checkRange(date);

        if (!valid) {
          // auto selected to max range if showConfirm
          if (this.showConfirm) {
            this.emit([date[0], getDayByOffset(date[0], this.maxRange - 1)]);
          } else {
            this.emit(date);
          }

          return;
        }
      }

      this.emit(date);

      if (complete && !this.showConfirm) {
        this.onConfirm();
      }
    },

    emit(date) {
      const getTime = date => date instanceof Date ? date.getTime() : date;

      this.setData({
        currentDate: Array.isArray(date) ? date.map(getTime) : getTime(date)
      });
      this.$emit('select', copyDates(date));
    },

    checkRange(date) {
      const {
        maxRange,
        rangePrompt
      } = this;

      if (maxRange && calcDateNum(date) > maxRange) {
        Toast({
          context: this,
          message: rangePrompt || `选择天数不能超过 ${maxRange} 天`
        });
        return false;
      }

      return true;
    },

    onConfirm() {
      if (this.type === 'range' && !this.checkRange()) {
        return;
      }

      uni.nextTick(() => {
        this.$emit('confirm', copyDates(this.currentDate));
      });
    }

  }
};
</script>
<style>
@import "../common/index.css";.van-calendar{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;height:100%;height:var(--calendar-height,100%);background-color:#fff;background-color:var(--calendar-background-color,#fff)}.van-calendar__close-icon{top:11px}.van-calendar__popup--bottom,.van-calendar__popup--top{height:80%;height:var(--calendar-popup-height,80%)}.van-calendar__popup--left,.van-calendar__popup--right{height:100%}.van-calendar__body{-webkit-flex:1;flex:1;overflow:auto;-webkit-overflow-scrolling:touch}.van-calendar__footer{-webkit-flex-shrink:0;flex-shrink:0;padding:0 16px;padding:0 var(--padding-md,16px)}.van-calendar__footer--safe-area-inset-bottom{padding-bottom:env(safe-area-inset-bottom)}.van-calendar__footer+.van-calendar__footer,.van-calendar__footer:empty{display:none}.van-calendar__footer:empty+.van-calendar__footer{display:block!important}.van-calendar__confirm{height:36px!important;height:var(--calendar-confirm-button-height,36px)!important;margin:7px 0!important;margin:var(--calendar-confirm-button-margin,7px 0)!important;line-height:34px!important;line-height:var(--calendar-confirm-button-line-height,34px)!important}
</style>