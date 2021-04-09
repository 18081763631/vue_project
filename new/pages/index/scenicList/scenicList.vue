<template>
<view>
<view v-for="(item, index) in List" :key="index" style="text-align: center;">


	<view style="height:380rpx">
		<image class="nog" type="default" :src="item.images[0]" @tap="toScenic" :id="item.placeId"></image>
	</view>
	<view style="height:70rpx" class="X-R X-allCenter">

		<text class="X-allCenter" style="font-size: 30rpx;font-weight: 600;left:10%">{{item.name}}</text>
		<view class="X-allCenter">
			<image style="width: 50rpx;height: 50rpx;left:75%" src="/static/pages/image/voice.png"></image>
			<text class="X-allCenter" style="font-size: 30rpx;font-weight: 600;left:80%">内含语音讲解</text>
		</view>
	</view>

</view>
</view>
</template>

<script>
// pages/index/scenicList/scenicList.js
const app = getApp();

export default {
  data() {
    return {
      scenicID: '',
      List: []
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //这个option类似安卓的intentMessage 这个对象下包裹着上一个页面传过来的所有字段
    // screa请求
    var that = this; //  console.log(options)

    var id = options.idData;
    console.log(id);
    console.log(this.scenicID);
    that.setData({
      scenicID: id
    });
    console.log(this.scenicID);
    uni.request({
      url: 'http://106.52.75.136/v1/place/sight/' + id,
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },

      success(res) {
        console.log(res);

        if (res.statusCode == 200) {
          that.setData({
            List: res.data.result // scenicID:id,

          }); // console.log("injectdata"+that.result)
        }
      }

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
    toScenic: function (e) {
      var placeID = e.currentTarget.id;
      console.log(placeID);
      uni.navigateTo({
        url: '../../index/scenic/scenic?placeID=' + placeID + '&scenicID=' + this.scenicID
      });
    }
  }
};
</script>
<style>
.nog {

  height: 380rpx;
  width:100%;
}

.noh {
  position: absolute;
  height: 32rpx;
  width: 32rpx;
}

.noi {
  position: absolute;
  width: 130rpx;
  height: 30rpx;
  font-size: 23rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 30rpx;
  text-align: center;
}
</style>