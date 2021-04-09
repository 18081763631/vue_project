<template>
	<!-- <text>个人</text> -->
	<view class="X-C X-contentBackgroundColor">
		<!-- 头像 -->
		<view class="X-R X-R-Center" style="margin-top: 20rpx;">
			<image class="X-C-Center" style="width: 200rpx;height: 200rpx;border-radius: 100%;" src="../../static/logo.png"></image>
			<view class="X-C X-C-Center X-CautoAdjust" style="margin-left: 20rpx;">
				<text class="X-family X-fontspacing X-font-weight" style="color: #333333;font-size: 46rpx;">用户名</text>
				<text class="X-family X-fontspacing" style="font-size: 40rpx;color: #939393;margin-top: 50rpx;">用户其他信息</text>
			</view>
		</view>
		<button  pen-type="getUserInfo" @click="userinfo()">登录</button>
		<!-- 功能模块 -->
		<view class="X-R-Center X-C" style="width: 70vw;height: 200rpx;margin-top:200rpx;">
			<view class="X-R X-RautoAdjust X-Card X-have-interval X-radius">
				<text class="X-C-Center X-family X-fontspacing" style="font-size: 40rpx;">工单</text>
				<text class="X-C-Center X-family X-fontspacing" style="font-size: 40rpx;">></text>
			</view>
			<view class="X-R X-RautoAdjust X-Card X-have-interval X-radius" style="margin-top: 40rpx;">
				<text class="X-C-Center X-family X-fontspacing" style="font-size: 40rpx;">记录</text>
				<text class="X-C-Center X-family X-fontspacing" style="font-size: 40rpx;">></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
	data(){
			return {
				code:"",
				name:"",
				userimg:"",
			};
		},
		methods: {
			 login() {
				 /* 获取本次登录code*/
				uni.login({
					provider: 'weixin',
				   success: function (loginRes) {
					   console.log("login");
				 	console.log(loginRes);
					uni.request({
					    url: 'http://shuaishen.top/index.php/admin/Wxlogin/index', 
					    data: {
					        code: loginRes.code
					    },
					    success: (res) => {
					        console.log("请求成功");
							console.log(res);
					    }
					});
				   }
				 })
			},
			userinfo(){
				console.log("userinfo");
				this.weixin();
				this.login();
				this.getu();
			},
			getu(){
				/* 获取用户信息 */
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log('-------获取微信用户所有-----');
						console.log(infoRes.userInfo);
					}
				});
			},
			weixin(){
				/* 微信APP检测 */
				console.log("检测");
				uni.getProvider({
				    service: 'weixin',
				    success: function (res) {
						console.log("微信检测结果");
				        console.log(res);
				    }
				});
			}
		}
	};
</script>

<style>
</style>
