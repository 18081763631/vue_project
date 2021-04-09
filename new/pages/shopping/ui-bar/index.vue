<template>
<!-- 自定义导航栏 -->
<view style="position: sticky;top:0;background-color: #fff;z-index: 10;">
	<scroll-view scroll-x="true" style=" white-space: nowrap; display: flex;width: 100%;margin: 10px;" class="X-R">
		<view v-for="(item, index) in tabitem" :key="index" class="X-R X-RautoAdjust" style="display: inline-block;">
			<view @tap="onTap">
				<view class="X-fontspacing" v-if="!item.check" :data-id="item.id" @tap="top" style="margin-left: 30px;margin-right: 30px;font-weight: 550;color: #787878;font-size: 15px;">{{item.text}}</view>
				<view class="X-C" v-if="item.check" :data-id="item.id" @tap="top" style="margin-left: 30px;margin-right: 30px;">
				<text class="X-fontspacing " :style="'text-decoration: ' + decoration + ';font-weight: 550;font-size: 20px;;'">{{item.text}}</text>
				<view class="X-R-Center " style="width: 100%;">
							 <view class :style="'height: 3px;background-color: ' + underlinebc + ';margin-top: 5px;width: 60%;margin-left: 20%;'"></view>
				</view>
				</view>
			</view>
			 
		</view>
	</scroll-view>
</view>
</template>

<script>

export default {
  data() {
    return {
      family: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
      underlinebc: "",
      tabitem: [],
      id: 0
    };
  },

  components: {},
  props: {
    underlinebc: {
      type: String,
      default: "#000"
    },

    /* 下划线颜色 */
    tabitem: {
      type: Array,
      default: []
    }
    /* 导航内容 */

  },
  methods: {
    bannerid: function (e) {
      console.log(e.detail.id);
      this.setData({
        id: e.detail.id
      });
    },
    onTap: function () {
      var myEventDetail = {
        id: this.id
      };
      var myEventOption = {}; // 触发事件的选项

      this.$emit('my', {
        detail: myEventDetail
      }, myEventOption);
    },
    top: function (e) {
      var that = this;
      var index = 0;
      console.log(e);
      that.setData({
        id: e.target.dataset.id
      });

      if (this.tabitem[e.target.dataset.id].check == false) {
        for (index; index < this.tabitem.length; index++) {
          if (e.target.dataset.id == index) {
            this.tabitem[index].check = true;
          } else {
            this.tabitem[index].check = false;
          }
        }

        that.setData({
          tabitem: this.tabitem,
          family: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
        });
      }
    }
  }
};
</script>
