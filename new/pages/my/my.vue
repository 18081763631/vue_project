<template>
<view class="X-C">
	<view style="height:20rpx"></view>
	<view class="X-R">
		<open-data type="userNickName" class="X-allCenter" style="font-size: 45rpx;font-weight: 600;"></open-data>
		<open-data type="userAvatarUrl" class="X-allCenter" style="width: 200rpx;height: 200rpx;overflow:hidden;border-radius:50%"></open-data>
	</view>

	<view style="margin: 80rpx;" class="X-R X-RautoAdjust ">
		
	
			<view class="X-C">
				<text class="X-allCenter" style>{{collection}}</text>
				<text style="font-size: 40rpx;font-weight: 600;">收藏</text>
			</view>

			<view class="X-C">
				<text class="X-allCenter" style>0</text>
				<text style="font-size: 40rpx;font-weight: 600;">反馈</text>
			</view>
		

	</view>


	<!-- 项目栏 -->
	<view class="X-C">
		

		<button style="height:100rpx;width:100%;" class="X-R X-RautoAdjust" @tap="toCollection">
			<view class="X-allCenter">
				<image class="X-allCenter" style="width: 60rpx;height: 60rpx;" src="/static/pages/image/Collection.png"></image>
				<text class="X-allCenter X-fontspacing" style="margin-left: 30rpx;">景区收藏</text>
			</view>
			<view style="width: 150rpx;"></view>
			<image class="X-allCenter" style="width: 60rpx;height: 60rpx;" src="/static/pages/image/arrow_right.png"></image>
		</button>

		<view class="interlayer"></view>

		<button style="height:100rpx;width:100%;" class="X-R X-RautoAdjust" open-type="feedback">
			<view class="X-allCenter">
				<image class="X-allCenter" style="width: 60rpx;height: 60rpx;" src="/static/pages/image/feedback.png"></image>
				<text class="X-allCenter X-fontspacing" style="margin-left: 30rpx;">问题反馈</text>
			</view>
			<view style="width: 150rpx;"></view>
			<image class="X-allCenter" style="width: 60rpx;height: 60rpx;" src="/static/pages/image/arrow_right.png"></image>
		</button>

		<view class="interlayer"></view>

		<button style="height:100rpx;width:100%;" class="X-R X-RautoAdjust" @tap="toupdate">
			<view class="X-allCenter">
				<image class="X-allCenter" style="width: 60rpx;height: 60rpx;" src="/static/pages/image/update.png"></image>
				<text class="X-allCenter X-fontspacing" style="margin-left: 30rpx;">更新记录</text>
			</view>
			<view style="width: 150rpx;"></view>
			<image class="X-allCenter" style="width: 60rpx;height: 60rpx;" src="/static/pages/image/arrow_right.png"></image>
		</button>

		<view class="interlayer"></view>

		<button style="height:100rpx;width:100%;" class="X-R X-RautoAdjust" @tap="auto">
			<view class="X-allCenter">
				<image class="X-allCenter" style="width: 60rpx;height: 60rpx;" src="/static/pages/image/update.png"></image>
				<text class="X-allCenter X-fontspacing" style="margin-left: 30rpx;">授权管理</text>
			</view>
			<view style="width: 150rpx;"></view>
			<image class="X-allCenter" style="width: 60rpx;height: 60rpx;" src="/static/pages/image/arrow_right.png"></image>
		</button>

	</view>





</view>
</template>

<script>

export default {
  data() {
    return {
      collection: '',
      feedback: '',
      openID: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var value = uni.getStorageSync("openid"); //console.log(value);

    that.setData({
      openID: value
    });
    uni.request({
      url: 'http://106.52.75.136/v1/bookmark/' + this.openID,
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },

      success(res) {
        console.log(res);

        if (res.statusCode == 200) {
          that.setData({
            collection: res.data.result.length
          }); // console.log("injectdata"+that.result)

          console.log(res.data.result);
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
  onShow: function () {
    var that = this;
    var value = uni.getStorageSync("openid"); //console.log(value);

    that.setData({
      openID: value
    });
    uni.request({
      url: 'http://106.52.75.136/v1/bookmark/' + this.openID,
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },

      success(res) {
        console.log(res);

        if (res.statusCode == 200) {
          that.setData({
            collection: res.data.result.length
          }); // console.log("injectdata"+that.result)

          console.log(res.data.result);
        }
      }

    });
  },

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
    toCollection: function () {
      uni.navigateTo({
        url: '../my/myCollection/myCollection'
      });
    },
    tofootprint: function () {
      uni.navigateTo({
        url: '../my/myFootprint/myFootprint'
      });
    },
    tofeedback: function () {
      uni.navigateTo({
        url: '../my/myfeedback/myfeedback'
      });
    },
    toupdate: function () {
      uni.navigateTo({
        url: '../my/myUpdate/myUpdate'
      });
    },
    auto: function () {
      uni.openSetting({
        success: result => {},
        fail: () => {},
        complete: () => {}
      });
    }
  }
};
</script>
<style>
/* pages/my/my.wxss */

.icon{
  position: absolute;
width: 100rpx;
height: 100rpx;
opacity: 0.8;
}

.interlayer{
height: 60rpx;
}

.noa {
  position: absolute;
  width: 400rpx;
  height:180rpx;
  line-height: 180rpx;
  font-size: 48rpx;
  font-family: PingFang SC;
  font-weight: bold;
  
  text-align: center;
  color: rgba(51, 51, 51, 1);
}

.nob {
  position: absolute;
  width: 250rpx;
  height: 25rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
}

.noc {
  position: absolute;
  width: 120rpx;
  height: 40rpx;
  background: rgba(30, 164, 115, 1);
  border-radius: 20rpx;
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 40rpx;
}

.nod {
  position: absolute;
  width: 120rpx;
  height: 40rpx;
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(30, 164, 115, 1);
  line-height: 40rpx;
}

.noe {
  position: absolute;
  width: 180rpx;
  height: 180rpx;
  border-radius: 50%;
}

.nof {
  position: absolute;
  width: 50rpx;
  height: 40rpx;
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 40rpx;
}

.nog {
  position: absolute;
  width: 50rpx;
  height: 20rpx;
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 1);
  line-height: 20rpx;
}

.noh {
  position: absolute;
  left:190rpx;
  top:31rpx;
  width: 150rpx;
  height: 40rpx;
  font-size: 35rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 40rpx;
}

.noi {
  position: absolute;
  width: 150rpx;
  height: 40rpx;
  font-size: 35rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgb(150, 149, 149);
  line-height: 40rpx;
}

</style>