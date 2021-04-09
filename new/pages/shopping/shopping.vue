<template>
<view>
<!-- 搜索 -->

<!-- 分类导航栏 -->
<bar :tabitem="tabitem" @my="bannerid"></bar>
<!-- 商品轮播 -->
	 <view class="X-contentBackgroundColor">
		 <swiper indicator-dots="true" style="height: 500rpx;" @change="handleChange" circular autoplay>
		   <block v-for="(item, index) in list.data" :key="index">
		     <swiper-item style="background-color: #fff;" @tap="ok" :id="item.link">
		       <image style="width: 100%;height: 500rpx;" :src="item.photo" mode="aspectFill"></image>
		     </swiper-item>			 
		   </block>
		 </swiper>
	  </view>
	  <view style="height: 150rpx;" class="X-R-Center X-RautoAdjust">
		  <view class="X-R-Center X-RautoAdjust" style="font-size: 40rpx;font-weight: 600; padding-top:50rpx ;">
			  ——— 攻 略 ———
		  </view>
		  
		</view>
<!-- 商品展示 -->
<view class="X-R  X-wrap X-baseBackgroundColor" style>

	<view v-for="(item, index) in list.data" :key="index" class="X-C  X-contentBackgroundColor" style="width: 49.5%;margin-top: 5rpx;" v-if="0 == id">
		<view @tap="ok" :id="item.link" style="margin-bottom: 20rpx;">
			<image class="X-R-Center" style="width: 350rpx;height: 350rpx;" :src="item.photo" mode="aspectFill"></image>
			<view style="height: 5rpx;"></view>
			<view class="X-C">
				<font fontnum="8" font_size="15rpx" font_weight="550" letter_spacing="5" :font="item.name" left="15"></font>
				<view class="X-R X-RautoAdjust X-C-Center" style="padding: 10rpx;margin-top: 10rpx;">
					<view class="X-R">
						<text class="X-fontspacing X-font-weight X-C-Center" style="color: #ff5500;font-size: 25rpx;margin-top: 10rpx;">￥</text>
						<text class="X-fontspacing X-font-weight X-C-Center" style="color: #ff5500;font-size: 35rpx;">{{item.price}}</text>
						<text style="color: #3d3d3d;font-size: 23rpx;margin-top: 10rpx;margin-left: 10rpx;">起</text>
					</view>
					<text class="X-fontspacing X-C-Center" style="font-size: 25rpx;">{{item.category}}</text>
				</view>
			</view>
		</view>
		
	</view>
	
	<view v-for="(item, index) in list.data" :key="index" class="X-C  X-contentBackgroundColor" style="width: 49.5%;margin-top: 5rpx;" v-if="item.category == id">
			<view @tap="ok" :id="item.link">
				<image class="X-R-Center" style="width: 350rpx;height: 350rpx;" :src="item.photo" mode="aspectFill"></image>
				<view style="height: 5rpx;"></view>
				<view class="X-C">
					<font fontnum="8" font_size="15rpx" font_weight="550" letter_spacing="5" :font="item.name" left="15"></font>
					<view class="X-R X-RautoAdjust X-C-Center" style="padding: 10rpx;margin-top: 10rpx;">
						<view class="X-R">
							<text class="X-fontspacing X-font-weight X-C-Center" style="color: #ff5500;font-size: 25rpx;margin-top: 10rpx;">￥</text>
							<text class="X-fontspacing X-font-weight X-C-Center" style="color: #ff5500;font-size: 35rpx;">{{item.price}}</text>
							<text style="color: #3d3d3d;font-size: 23rpx;margin-top: 10rpx;margin-left: 10rpx;">起</text>
						</view>
						<text class="X-fontspacing X-C-Center" style="font-size: 25rpx;">{{item.category}}</text>
					</view>
				</view>
			</view>
			
		</view>
</view>
</view>
</template>

<script>
import font from "./font_stype/font_stype.vue";
import bar from "./ui-bar/index.vue";

export default {
  data() {
    return {
      latitude: 30.916426,
      longitude: 103.56947,
      id: 0,
      value: '',
      currentIndex: 0,
      list: [],
      tabitem: [{
        "id": 0,
        "text": "推荐",
        "check": true
      }, {
        "id": 1,
        "text": "住宿",
        "check": false
      }, {
        "id": 2,
        "text": "美食",
        "check": false
      }, {
        "id": 3,
        "text": "娱乐",
        "check": false
      }]
    };
  },

  components: {
    font,
    bar
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    uni.getLocation({
      type: 'gcj02',
      //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      fail: function (err) {},
      //请求失败
      complete: function () {
        uni.request({
          //请求地址
          url: 'http://yikang.pub/api/links?latitude=' + that.latitude + '&longitude=' + that.longitude,
          method: 'GET',
          dataType: 'json',
          success: function (res) {
            console.log(res);
            that.setData({
              list: res.data.data
            });
          },
          fail: function (err) {},
          //请求失败
          complete: function () {} //请求完成后执行的函数

        });
      } //请求完成后执行的函数 

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    bannerid: function (e) {
      console.log(e.detail.id);
      this.setData({
        id: e.detail.id
      });
    },
    handleChange: function (e) {
      this.setData({
        currentIndex: e.detail.current
      });
    },

    /* 点击商品 */
    ok(e) {
      console.log(e);
      uni.navigateTo({
        url: `/pages/shopping/web/index?id=` + e.currentTarget.id
      });
    },

    /* 获取搜索栏输入值 */
    onChange(e) {
      this.setData({
        value: e.detail
      });
    },

    onSearch() {
      Toast('搜索' + this.value);
    },

    /* 点击搜索 */
    onClick() {
      Toast('搜索' + this.value);
    }

  }
};
</script>
<style>
/* pages/shopping/shopping.wxss */

.division{
  height:60rpx;
  display: flex;
}

.bar{
  height: 60rpx;
  width: 5rpx;
  background-color: orange;
  margin-left:80rpx ;
  border-radius: 30rpx;
}

.barText{
 margin-left: 60rpx;
}



.imageContainer{
  width: 100%;
  height: 500rpx;
  background: #fff;
}
.item{
  height: 500rpx;
 
}
.itemImg{
  position: absolute;
  width: 100%;
  height: 380rpx;
  width:  380rpx;
  border-radius: 15rpx;
  z-index: 5;
  opacity: 0.7;
  top: 13%;
}
.active{
  opacity: 1;
  z-index: 10;
  height: 430rpx;
  width:430rpx ;
  top: 7%;
  transition:all .2s ease-in 0s;
}


</style>