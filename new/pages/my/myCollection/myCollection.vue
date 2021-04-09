<template>
<view>
<view class="tip" v-if="tips">
  <image src="/static/pages/image/nullcollection.jpg" style="width:128rpx;height:128rpx;"></image>
  <view class="l">你还没有收藏过景点哦~</view>
  <view class="r">收藏的景点将会显示在这里</view>
</view>

<view v-for="(item, index) in List" :key="index" style="text-align: center;">


	<view>
		<image class="nog" type="default" :src="item.coverUrl" @tap="toScenic" @longpress="longPress" :id="item.placeId"></image>
	</view>
	
	<view style="height:60rpx" class="X-R X-allCenter">
		<text class="X-allCenter" style="font-size: 30rpx;font-weight: 600;left:10%">{{item.placeName}}</text>
		<view class="X-allCenter">
			<image style="width: 50rpx;height: 50rpx;left:75%" src="/static/pages/image/voice.png"></image>
			<text class="X-allCenter" style="font-size: 30rpx;font-weight: 600;left:80%">内含语音讲解</text>
		</view>
	</view>

</view>
</view>
</template>

<script>

export default {
  data() {
    return {
      openID: "",
      List: [],
      tips: false
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
            List: res.data.result
          }); // console.log("injectdata"+that.result)

          console.log(res.data.result);
          console.log(that.openID);
        }

        if (res.data.result.length == 0) {
          that.setData({
            tips: true
          });
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
      var scenicID = "";
      console.log(placeID);
      uni.navigateTo({
        //sceniIDm没做 转不了
        url: '../../index/scenic/scenic?placeID=' + placeID + '&scenicID=' + scenicID
      });
    },
    longPress: function (e) {
      var placeID = e.currentTarget.id;
      var that = this;
      uni.showModal({
        //使用模态框提示用户进行操作    
        title: '警告',
        content: '确定要删除此景点吗',
        success: function (res) {
          if (res.confirm) {
            //判断用户是否点击了确定   
            uni.request({
              url: 'http://106.52.75.136/v1/bookmark/' + that.openID + '/place/' + placeID,
              method: 'DELETE',
              header: {
                'content-Type': 'application/json'
              },

              success(res) {
                console.log(res);
                uni.showToast({
                  title: '已取消收藏',
                  icon: 'success',
                  duration: 2000
                });
                console.log(that);
                uni.request({
                  url: 'http://106.52.75.136/v1/bookmark/' + that.openID,
                  method: 'GET',
                  header: {
                    'content-Type': 'application/json'
                  },

                  success(res) {
                    console.log(res);

                    if (res.statusCode == 200) {
                      that.setData({
                        List: res.data.result
                      }); // console.log("injectdata"+that.result)

                      console.log(res.data.result);
                    }
                  }

                });
              }

            });
          }
        }
      });
    }
  }
};
</script>
<style>
.nog {

  height: 400rpx;
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

.tip{
  margin-top: 100rpx;
  text-align: center;
  color: #999;
}
.l{
  margin-bottom: 15rpx;
}

.end {
text-align: center;
color: #b0b0b0;
font-size: 12px;
}
</style>