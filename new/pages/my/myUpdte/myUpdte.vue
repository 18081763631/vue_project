<template>
<view>
<view style="height:40rpx"></view>

<view class="division">
	<view class="bar"></view>
	<view class="barText">更新记录</view>
</view>

<view>
	<view class="update">

		<view class="border">
			<view>
				<text class="data-content">2020/06/08</text>
			</view>
			<view style="margin-bottom:40rpx">
				<text class="article-content">景点板块新添加景点天气</text>
			</view>
		</view>

		<view style="height:40rpx">	</view>

		<view class="border">
			<view>
				<text class="data-content">2020/06/13</text>
			</view>
			<view style="margin-bottom:40rpx">
				<text class="article-content">新添加收藏删除功能</text>
			</view>
		</view>

		<view style="height:40rpx">	</view>

		<view class="border">
			<view>
				<text class="data-content">2020/06/13</text>
			</view>
			<view style="margin-bottom:40rpx">
				<text class="article-content">新添音频锁屏播放功能</text>
			</view>
		</view>



	</view>
</view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  methods: {}
};
</script>
<style>

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

/* 内容 */
.update{
  /* background: #f80; */
  margin: 50rpx;
}

.border{
  border-width: 4rpx 4rpx 4rpx 4rpx;  
  border-color: rgba(180, 175, 175, 0.911);  
  border-style: solid;  
}

.data-content{
  font-size: 28rpx;
  margin-left: 30rpx;
  line-height: 40rpx;
  letter-spacing: 2rpx;
  color:#333;
  margin-bottom: 20px;
}

.article-content{
  color: #666;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  margin-left: 50rpx;
  line-height: 40rpx;
  letter-spacing: 2rpx;
}

</style>