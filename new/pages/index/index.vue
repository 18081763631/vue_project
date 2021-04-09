<template>
<view>
<!--index.wxml-->
<!-- 搜索 -->
<view style="background-color: #007AFF;">
	<vansearch @focus="focus" :List="searchList" :value="value" placeholder="请输入景点" use-action-slot @change="change" @search="onSearch">
		<!-- <view slot="action" @tap="onClick">搜索</view> -->
	</vansearch>
</view>
	
<!-- 轮播图 -->
<view class="recommend">
	<view class="swiper-container">
		<swiper autoplay="auto" interval="5000" duration="500" :current="swiperCurrent" @change="swiperChange" class="swiper">
			<block v-for="(item, index) in slider" :key="index">
				<swiper-item :data-id="item.id" :data-url="item.linkUrl">
					<image :src="item.picUrl" class="img"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="dots">
			<block v-for="(item, index) in slider" :key="index">
				<view :class="'dot' + (index == swiperCurrent ? ' active' : '')" @tap="chuangEvent" :id="index">{{index+1}}</view>
			</block>
		</view>
	</view>
</view>

<view style="height:40rpx"></view>


<!-- 城市列表 -->
<view class="city">
	<view class="citylist">

		<vansidebar :active-key="activeKey" @change="onSlidebarChange">
			
			<van-sidebar-item v-for="(item, index) in result" :key="index" :title="item.name" id></van-sidebar-item>	
			
		</vansidebar>
		<vannotify id="van-notify"></vannotify>

	</view>


	<view class="scenic">

		<button class="btn" style="width:380rpx;font-weight: 600;" @tap="getLocation">
			<text style="color: #fff;" class="X-fontspacing">{{cityText}}{{cityName}}</text>
		</button>
		<!-- <van-button type="warning" style="margin-left:80rpx;" bindtap="getLocation">定位到当前位置</van-button> -->

		<view style="height:40rpx"></view>

		<view class="division">
		<view class="bar"></view>
		<view class="barText">热门景区</view>
		</view>

		<view style="height:40rpx"></view>

		<view v-for="(item, index) in List" :key="index" style="margin-left:80rpx">
		

			<view>
				<image class="nog" style="margin-left: 30rpx; height: 320rpx; width:450rpx" type="default" :src="item.coverUrl" :id="item.id" @tap="toDetail"></image>
			</view>
			<view style="height:70rpx;" class="X-R X-allCenter">

				<text class="X-allCenter" style="font-size: 30rpx;font-weight: 600;">{{item.name}}</text>
				<view class="X-allCenter">
					<image style="width: 50rpx;height: 50rpx;" src="/static/pages/image/voice.png"></image>
					<text class="X-allCenter" style="font-size: 30rpx;font-weight: 600;">内含语音讲解</text>
				</view>
				
			</view>
			<view style="height: 50rpx;"></view>

		</view>
	</view>
</view>
















<!-- /* 分割线 */ -->
<!-- <view class="container">
  <view class="userinfo">
    <button wx:if="{{!hasUserInfo && canIUse}}" open-type="getUserInfo" bindgetuserinfo="getUserInfo"> 获取头像昵称 </button>
    <block wx:else>
      <image bindtap="bindViewTap" class="userinfo-avatar" src="{{userInfo.avatarUrl}}" mode="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </block>
  </view>
  <view class="usermotto">
    <text class="user-motto">{{motto}}</text>
  </view>
</view> -->
</view>
</template>

<script>
//index.js
//获取应用实例
const app = getApp();
import vannotify from '../../wxcomponents/vant/notify/index.vue';
var util = require("../../utils/util.js");
import vansearch from "../../wxcomponents/vant/search/index.vue";
import vansidebar from "../../wxcomponents/vant/sidebar/index.vue";
import vansidebarItem from "../../wxcomponents/vant/sidebar-item/index.js";

export default {
  data() {
    return {
      key: "",
      searchList: [],
      value: '',
      swiperCurrent: 0,
      activeKey: 0,
      //测导航栏索引
      cityId: 10000,
      cityName: '定位到当前城市',
      cityText: '',
      slider: [{
        //picUrl:'../image/calling robort.png'
        picUrl: 'http://p3.qhimgs0.com/sdm/280_200_60/t01c0c6bdd52bc7eccc.png'
      }, {
        picUrl: 'http://i0.sinaimg.cn/travel/2014/0411/U6986P704DT20140411151308.jpg'
      }, {
        picUrl: 'http://img1.qunarzz.com/travel/d1/1512/57/2919ffdcd8e29cf7.jpg_r_720x480x95_3d38cbf2.jpg'
      }],
      List: [],
      result: [],
      methods: {}
    };
  },

  components: {
    vansearch,
    vansidebar,
    vansidebarItem
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; //网络访问，获取轮播图的图片

    util.getRecommend(function (data) {
      that.setData({
        slider: data.data.slider
      });
    }); //city请求

    uni.request({
      url: 'http://106.52.75.136/v1/city',
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },

      success(res) {
        console.log(res);

        if (res.statusCode == 200) {
          that.setData({
            result: res.data.result
          });
          console.log(res.data.result); // console.log("injectdata"+that.result)
        }
      }

    }); // screa请求

    uni.request({
      url: 'http://106.52.75.136/v1/sight/city/10000',
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
    /**
     * 侧边导航切换
     */
    onSlidebarChange: function (e) {
      console.log(e);
      console.log(this.result);
      var sliderIndex = e.detail; //这个是通过slideBar的回调的参数获取到现在是那个item被点击了

      var cityList = this.result; //从data里获取到城市列表

      var curCityId = cityList[sliderIndex].cityId; //因为slideBar是通过cityList渲染的 自然cityId也在这个数组里 通过对应的下标访问 找到对应的cityId

      this.setData({
        cityId: curCityId,
        activeKey: sliderIndex
      });
      var that = this; // screa请求

      uni.request({
        //这个URL其实就是个字符串组装 不必太在意
        url: 'http://106.52.75.136/v1/sight/city/' + curCityId,
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
          }
        }

      });
    },

    onSearch(e) {
      console.log(e);
    },

    change(event) {
      this.setData({
        key: event.detail
      });
      console.log(event.detail);
      this.vagSearch(event.detail);
    },

    focus() {
      this.vagSearch("");
    },

    vagSearch(key) {
      var that = this;
      uni.request({
        url: 'http://106.52.75.136/v1/place/name?keyword=' + key,
        method: 'GET',
        header: {
          'content-Type': 'application/json'
        },

        success(res) {
          if (res.statusCode == 200) {
            that.setData({
              searchList: res.data.result
            }); // console.log("injectdata"+that.result)
          }
        }

      });
    },

    onClick() {
      console.log(this.key);
      uni.navigateTo({
        url: '../index/searchList/scenicList?key=' + this.key
      });
    },

    //轮播图的切换事件
    swiperChange: function (e) {
      //只要把切换后当前的index传给<swiper>组件的current属性即可
      this.setData({
        swiperCurrent: e.detail.current
      });
    },
    //点击指示点切换
    chuangEvent: function (e) {
      this.setData({
        swiperCurrent: e.currentTarget.id
      });
    },

    //左边城市栏
    onChange(event) {
      Notify({
        type: 'primary',
        message: event.detail
      });
    },

    //获取当前位置的经纬度
    loadInfo: function () {
      var that = this;
      uni.getLocation({
        type: 'gcj02',
        //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude; //维度

          var longitude = res.longitude; //经度
          // console.log(res);
          //that.loadCity(latitude,longitude);

          that.getCityId(latitude, longitude);
        }
      });
    },
    //根据坐标定位获取城市id  改测导航栏索引
    getCityId: function (latitude, loadCity) {
      var that = this;
      uni.request({
        //这个URL其实就是个字符串组装 不必太在意
        url: 'http://106.52.75.136/v1/city/geo?latitude=' + latitude + '&longitude=' + loadCity,
        //  url: 'http://106.52.75.136/v1/city/geo?latitude=39.999686&longitude=116.275115',北京
        method: 'GET',
        header: {
          'content-Type': 'application/json'
        },

        success(res) {
          console.log(res);

          if (res.data.result.cityId == "20000") {
            that.setData({
              activeKey: 1,
              cityName: res.data.result.name,
              cityText: '当前位置：'
            });
            uni.request({
              //这个URL其实就是个字符串组装 不必太在意
              url: 'http://106.52.75.136/v1/sight/city/' + res.data.result.cityId,
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
                }
              }

            });
          }

          if (res.data.result.cityId == "10000") {
            that.setData({
              activeKey: 0,
              cityName: res.data.result.name,
              cityText: '当前位置：'
            });
            uni.request({
              //这个URL其实就是个字符串组装 不必太在意
              url: 'http://106.52.75.136/v1/sight/city/' + res.data.result.cityId,
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
                }
              }

            });
          }

          if (!res.data.ok) {
            that.setData({
              cityName: "",
              cityText: '未在列表中找到城市'
            });
          }
        }

      });
    },
    //把当前位置的经纬度传给高德地图，调用高德API获取当前地理位置，天气情况等信息
    // loadCity: function (latitude, longitude){
    //   var that=this;
    //   var myAmapFun = new amapFile.AMapWX({ key: markersData.key });
    //   myAmapFun.getRegeo({
    //     location: '' + longitude + ',' + latitude + '',//location的格式为'经度,纬度'
    //     success: function (data) {
    //       console.log(data);
    //     },
    //     fail: function (info) { }
    //   });
    //   myAmapFun.getWeather({
    //     success: function (data) {
    //       that.setData({
    //         weather: data,
    //           activeKey:1,
    //       })
    //       console.log(data);
    //       //成功回调
    //     },
    //     fail: function (info) {
    //       //失败回调
    //       console.log(info)
    //     }
    //   })
    // },
    getLocation: function () {
      this.loadInfo();
    },
    //跳转二级页面
    toDetail: function (e) {
      var id = e.currentTarget.id;
      console.log(id);
      uni.navigateTo({
        url: '../index/scenicList/scenicList?idData=' + id
      });
    }
  }
};
</script>
<style>
/**index.wxss**/

.swiper-container {
  position: relative;
}

.swiper-container .swiper {
  height: 400rpx;
}

.swiper-container .swiper .img {
  width: 100%;
  height: 100%;
}

.swiper-container .dots {
  position: absolute;
  right: 40rpx;
  bottom: 20rpx;
  display: flex;
  justify-content: center;
}

.swiper-container .dots .dot {
  margin: 0 10rpx;
  width: 28rpx;
  height: 28rpx;
  background: #fff;
  border-radius: 50%;
  transition: all .6s;
  font: 300 18rpx/28rpx "microsoft yahei";
  text-align: center;
}

.swiper-container .dots .dot.active {
  background: #f80;
  color: #fff;
}

.city {
  display: flex;
}

.scenic {
  flex: 1;
}


.btn {
  /* 渐变色 */
  background: linear-gradient(to right, #f7b733, #fc4a1a);
  padding: 0;
  border-radius: 30rpx;
  font-weight: 1;
  font-size: 32rpx;
  line-height: 1.8;
}

.division{
  height:60rpx;
  display: flex;
}

.bar{
  height: 60rpx;
  width: 5rpx;
  background-color: orange;
  margin-left:120rpx ;
  border-radius: 30rpx;
}

.barText{
 margin-left: 60rpx;
}


.nod {
  position: relative;
  height: 180rpx;
  width: 686rpx;
}

.noe {
  position: absolute;
  width: 378rpx;
  height: 31rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 30rpx;
  left: 34rpx;
}

.nof {
  position: absolute;
  width: 515rpx;
  height: 84rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 30rpx;
  top: 54rpx;
  left: 34rpx;
  display: -webkit-box;
  /*设置为弹性盒子*/
  -webkit-line-clamp: 3;
  /*最多显示5行*/
  overflow: hidden;
  /*超出隐藏*/
  text-overflow: ellipsis;
  /*超出显示为省略号*/
  -webkit-box-orient: vertical;
  word-break: break-all;
  /*强制英文单词自动换行*/
}

.nog {

  height: 240rpx;
  width: 100%;
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

/* 分割线
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 200px;
} */
</style>