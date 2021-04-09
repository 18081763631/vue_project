<template>
	<view>
		<!-- <van-divider contentPosition="center" customStyle="color:#FF0000; border-color: #FF0000; font-size: 30rpx;">
		青城山
	</van-divider> -->

		<view style="height:4.02vh;position:relative">
			<image class="icon_left" src="/static/pages/image/voice.png"></image>
			<image class="icon_right" src="/static/pages/image/instruction.png"></image>
		</view>

		<vantabs @click="onClick">
			<vantab title="景点解说">
				<view style="height:1500rpx">
					<view class="voice">
						<view class="voice_author"><image :src="imageSrc" @tap="onMusicTap" style="height: 80rpx;width: 80rpx;"></image></view>

						<!-- 下拉列表 -->
						<vandropdown-menu :class="'hide select ' + (showView ? 'show' : '')">
							<van-dropdown-item :value="value1" :options="option1" @change="toScenic"></van-dropdown-item>
						</vandropdown-menu>
					</view>

					<!-- 天气 -->
					<view class="content">
						<view class="info">
							<view class="city">
								<view style="height:30rpx"></view>
								<view>{{ weather.city.data }}</view>
							</view>
							<view class="temp">{{ weather.temperature.data }}℃</view>
						</view>
						<view class="weather">
							<view style="flex:1">{{ weather.weather.data }}</view>
							<view style="flex:1">{{ weather.winddirection.data }}</view>
							<view style="flex:1">{{ weather.windpower.data }}</view>
						</view>
					</view>

					<!-- 图片 -->
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<block v-for="(item, index) in imgUrls" :key="index">
							<swiper-item><image :src="item" mode="aspectFill" style="height:37.6vh;width:750rpx"></image></swiper-item>
						</block>
					</swiper>

					<view class="doommview">
						<block v-for="(item, index) in doommData" :key="index">
							<text v-if="item.display" class="aon" :style="'animation: first ' + item.time + 's linear forwards;top:' + item.top + '%;color:' + item.color + ';'">
								{{ item.text }}
							</text>
						</block>
					</view>
				</view>

				<!-- 发送 -->
				<view class="end">
					<view @tap="shouchang"><image class="shouchang" :src="shouchangimage"></image></view>

					<view><image class="shangchuan" src="/static/pages/image/camera.png" @tap="uploadDetailImage"></image></view>

					<view class="button">
						<vancell-group>
							<van-field :value="sms" center clearable placeholder="发送弹幕" border="false" @change="getValue" use-button-slot>
								<van-button slot="button" size="small" type="primary" @tap="bindbt">发送</van-button>
							</van-field>
						</vancell-group>
						<!-- <button bindtap="bindbt">弹一个小苹果</button> -->
					</view>
				</view>
			</vantab>

			<vantab title="景点简介">
				<view>
					<view class="introduce">
						<view>
							<view><text class="title">景点名</text></view>
							<view style="margin-bottom:40rpx">
								<text class="article-content">{{ placeName }}</text>
							</view>
						</view>

						<view>
							<view><text class="title">景点地点</text></view>
							<view style="margin-bottom:40rpx">
								<text class="article-content">{{ address }}</text>
							</view>
						</view>

						<view>
							<view><text class="title">景点介绍</text></view>
							<view style="margin-bottom:40rpx">
								<text class="article-content">{{ description }}</text>
							</view>
						</view>

						<!-- <view>
						<view>
							<text class="title">景点天气</text>
						</view>
						<view style="margin-bottom:40rpx">
							<text class="article-content">{{}}</text>
						</view>
					</view> -->
					</view>
				</view>
			</vantab>
		</vantabs>
	</view>
</template>

<script>
var doommList = [];
var i = 0;
var ids = 0;
var cycle = null; //计时器
//计时器
var amapFile = require('../../../libs/amap-wx.js');
var markersData = {
	latitude: '',
	//纬度
	longitude: '',
	//经度
	key: '07bc9ea6f9f0ead91d03f7cbafc2a720' //申请的key
}; //const myaudio = wx.createInnerAudioContext();
//const myaudio = wx.createInnerAudioContext();
const myaudio = uni.getBackgroundAudioManager();
myaudio.title = '小导游'; // 弹幕参数
// 弹幕字体颜色
function getRandomColor() {
	let rgb = [];

	for (let i = 0; i < 3; ++i) {
		let color = Math.floor(Math.random() * 256).toString(16);
		color = color.length == 1 ? '0' + color : color;
		rgb.push(color);
	}

	return '#' + rgb.join('');
}
import vantab from '../../../wxcomponents/vant/tab/index.vue';
import vantabs from '../../../wxcomponents/vant/tabs/index.vue';
import vandivider from '../../../wxcomponents/vant/divider/index.vue';
import vandropdownMenu from '../../../wxcomponents/vant/dropdown-menu/index.vue';
import vandropdownItem from '../../../wxcomponents/vant/dropdown-item/index.vue';
import vanfield from '../../../wxcomponents/vant/field/index.vue';

export default {
	data() {
		return {
			//用户
			openID: '',
			//天气
			weather: [],
			//输入框
			sms: '',
			//当前景区
			ScenicID: '',
			//景点信息
			placeId: '',
			placeName: '',
			address: '',
			description: '',
			locationLat: '',
			locationLon: '',
			//轮播图
			imgUrls: [],
			//显示列表
			showView: true,
			//获取弹幕文本
			valueText: '',
			//弹幕
			doommData: [],
			detailPics: [],
			indicatorDots: true,
			//是否显示面板指示点
			autoplay: true,
			//是否自动切换
			interval: 3000,
			//自动切换时间间隔
			duration: 1000,
			//滑动动画时长
			inputShowed: false,
			inputVal: '',
			//底部收藏 上传
			isPlayingMusic: true,
			isShouchang: false,
			shouchangimage: '/static/pages/image/shouChangfalse.jpg',
			imageSrc: '/static/pages/image/play.png',
			//景点列表
			option1: [],
			value1: 0,
			//默认弹幕
			arr: ['景色优美', '确实不错', '太好了', '真有趣', '妙极了', '太强了', '很壮观', '有趣极了', '有点意思', '确实强大', '真的不错'],
			src: ''
		};
	},

	components: {
		vantab,
		vantabs,
		vandivider,
		vandropdownMenu,
		vandropdownItem,
		vanfield
	},
	props: {},
	onLoad: function(options) {
		var value = uni.getStorageSync('openid');
		console.log(value);
		this.setData({
			openID: value,
			ScenicID: options.scenicID
		}); //console.log(this.data.openID);

		var placeID = options.placeID;
		var scenicID = options.scenicID;
		console.log(placeID);
		console.log(scenicID);
		var that = this;

		if (scenicID == null || scenicID == '') {
			that.setData({
				showView: true
			});
		}

		uni.request({
			url: 'http://106.52.75.136/v1/place/' + placeID,
			method: 'GET',
			header: {
				'content-Type': 'application/json'
			},

			success(res) {
				console.log(res);

				if (res.statusCode == 200) {
					that.setData({
						placeId: res.data.result.placeId,
						placeName: res.data.result.name,
						imgUrls: res.data.result.images,
						address: res.data.result.address,
						description: res.data.result.description,
						locationLat: res.data.result.location.lat,
						locationLon: res.data.result.location.lon
					});
					myaudio.src = res.data.result.audio;
					myaudio.loop = true;
					console.log(that.placeId);
				} //console.log(this.data.locationLat)

				that.loadCity(that.locationLat, that.locationLon);
				console.log('ProcessURL == http://106.52.75.136/v1/bookmark/' + that.openID + '/place/' + that.placeId + '/status'); //请求收藏状态

				uni.request({
					url: 'http://106.52.75.136/v1/bookmark/' + that.openID + '/place/' + that.placeId + '/status',
					method: 'GET',
					header: {
						'content-Type': 'application/json'
					},

					success(res) {
						console.log(res);

						if (res.data.result) {
							that.setData({
								isShouchang: true,
								shouchangimage: '/static/pages/image/shouChangture.jpg'
							});
						}
					}
				}); //请求弹幕

				uni.request({
					url: 'http://106.52.75.136/v1/comment/place/' + that.placeId,
					method: 'GET',
					header: {
						'content-Type': 'application/json'
					},

					success(res) {
						console.log(res); // that.setData({
						//   arr:res.
						// })

						var text = [];

						for (i = 0; i < res.data.result.length; i++) {
							text.push(res.data.result[i].content);
						}

						console.log(text);
						that.setData({
							arr: text
						});
					}
				});
			}
		}), //下拉列表定位
			uni.request({
				url: 'http://106.52.75.136/v1/place/sight/' + scenicID,
				method: 'GET',
				header: {
					'content-Type': 'application/json'
				},

				success(res) {
					console.log(res);

					if (res.statusCode == 200) {
						var optionx = []; // console.log(res.data.result.length);
						// console.log(that.data);

						for (i = 0; i < res.data.result.length; i++) {
							let temp = {};
							(temp.text = res.data.result[i].name), (temp.value = i), (temp.placeID = res.data.result[i].placeId), optionx.push(temp);

							if (that.placeName == temp.text) {
								that.setData({
									value1: i
								});
							}
						}

						console.log(optionx);
						that.setData({
							option1: optionx
						});
					}
				}
			}),
			(cycle = setInterval(function() {
				let arr = that.arr;

				if (arr[ids] == undefined) {
					ids = 0; // 1.循环一次，清除计时器
					// doommList = []
					// clearInterval(cycle)
					// 2.无限循环弹幕

					doommList.push(new Doomm(arr[ids], Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 5) + 5, getRandomColor()));

					if (doommList.length > 10) {
						//删除运行过后的dom
						doommList.splice(0, 1);
					}

					that.setData({
						doommData: doommList
					});
					ids++;
				} else {
					doommList.push(new Doomm(arr[ids], Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 5) + 5, getRandomColor()));

					if (doommList.length > 10) {
						doommList.splice(0, 1);
					}

					that.setData({
						doommData: doommList
					});
					ids++;
				}
			}, 1000));
	},
	onReady: function() {
		// 使用 wx.createAudioContext 获取 audio 上下文 context
		//this.audioCtx = wx.createAudioContext('myAudio');
		//this.audioCtx.play()
		myaudio.play();
		var that = this; //定时5分钟搜索附近景点

		var i = setInterval(function() {
			//console.log("yes")
			//实时获取经纬坐标
			uni.getLocation({
				type: 'gcj02',
				//返回可以用于wx.openLocation的经纬度
				success: function(res) {
					var Latitude = res.latitude; //维度

					var Longitude = res.longitude; //经度
					// console.log(res);
					//搜索附近景点2000米内

					uni.request({
						url: 'http://106.52.75.136/v1/place/nearby?latitude=' + Latitude + '&longitude=' + Longitude + '&distance=2000',
						// url: 'http://106.52.75.136/v1/place/nearby?latitude=30.919264&longitude=103.577062&distance=2000',
						method: 'GET',
						header: {
							'content-Type': 'application/json'
						},

						success(res) {
							console.log(res.data.result); //如果接收的景点不为空 且跟当前景点不同

							if (res.data.result.length != 0 && that.placeId != res.data.result[0].placeId) {
								//console.log("yes")
								var PLACEID = res.data.result[0].placeId; //跟下拉列表一样重新刷新页面

								uni.showModal({
									//使用模态框提示用户进行操作
									title: '提示',
									content: '您已经到达新的景点，是否跳转到新景点',
									success: function(res) {
										if (res.confirm) {
											//判断用户是否点击了确定
											uni.request({
												url: 'http://106.52.75.136/v1/place/' + PLACEID,
												method: 'GET',
												header: {
													'content-Type': 'application/json'
												},

												success(res) {
													console.log(res);

													if (res.statusCode == 200) {
														that.setData({
															placeId: res.data.result.placeId,
															placeName: res.data.result.name,
															imgUrls: res.data.result.images,
															src: res.data.result.audio,
															address: res.data.result.address,
															description: res.data.result.description,
															locationLat: res.data.result.location.lat,
															locationLon: res.data.result.location.lon
														});
														myaudio.src = res.data.result.audio;
													}

													that.onMusicTap();
													that.onMusicTap();
													uni.request({
														url: 'http://106.52.75.136/v1/place/sight/' + that.ScenicID,
														method: 'GET',
														header: {
															'content-Type': 'application/json'
														},

														success(res) {
															console.log(res);

															if (res.statusCode == 200) {
																var optionx = []; // console.log(res.data.result.length);
																// console.log(that.data);

																for (i = 0; i < res.data.result.length; i++) {
																	let temp = {};
																	(temp.text = res.data.result[i].name),
																		(temp.value = i),
																		(temp.placeID = res.data.result[i].placeId),
																		optionx.push(temp);

																	if (that.placeName == temp.text) {
																		that.setData({
																			value1: i
																		});
																	}
																}

																console.log(optionx);
																that.setData({
																	option1: optionx
																});
															}
														}
													}),
														uni.request({
															url: 'http://106.52.75.136/v1/bookmark/' + that.openID + '/place/' + that.placeId + '/status',
															method: 'GET',
															header: {
																'content-Type': 'application/json'
															},

															success(res) {
																console.log(that.openID);
																console.log(that.placeId);
																console.log(res);

																if (res.data.result) {
																	that.setData({
																		isShouchang: true,
																		shouchangimage: '/static/pages/image/shouChangture.jpg'
																	});
																} else {
																	that.setData({
																		isShouchang: false,
																		shouchangimage: '/static/pages/image/shouChangfalse.jpg'
																	});
																}
															}
														}); //请求弹幕

													uni.request({
														url: 'http://106.52.75.136/v1/comment/place/' + that.placeId,
														method: 'GET',
														header: {
															'content-Type': 'application/json'
														},

														success(res) {
															console.log(res); // that.setData({
															//   arr:res.
															// })

															var text = [];

															for (i = 0; i < res.data.result.length; i++) {
																text.push(res.data.result[i].content);
															}

															console.log(text);
															that.setData({
																arr: text
															});
														}
													});
												}
											});
										}
									}
								});
							}
						}
					});
				}
			});
		}, 300000);
	},
	onShow: function() {
		var that = this;
		that.onMusicTap();
		that.onMusicTap();
	},

	onUnload() {
		console.log('yes');
	},

	onHide() {
		console.log('yes');
	},

	// 清除弹幕缓存
	onUnload() {
		clearInterval(cycle);
		ids = 0;
		doommList = [];
	},

	methods: {
		toScenic: function(e) {
			var that = this;
			console.log(e);
			uni.request({
				url: 'http://106.52.75.136/v1/place/' + e.detail.placeID,
				method: 'GET',
				header: {
					'content-Type': 'application/json'
				},

				success(res) {
					console.log(res);

					if (res.statusCode == 200) {
						that.setData({
							placeId: res.data.result.placeId,
							placeName: res.data.result.name,
							imgUrls: res.data.result.images,
							src: res.data.result.audio,
							address: res.data.result.address,
							description: res.data.result.description,
							locationLat: res.data.result.location.lat,
							locationLon: res.data.result.location.lon
						});
						myaudio.src = res.data.result.audio;
					}

					that.onMusicTap();
					that.onMusicTap();
					uni.request({
						url: 'http://106.52.75.136/v1/bookmark/' + that.openID + '/place/' + that.placeId + '/status',
						method: 'GET',
						header: {
							'content-Type': 'application/json'
						},

						success(res) {
							console.log(that.openID);
							console.log(that.placeId);
							console.log(res);

							if (res.data.result) {
								that.setData({
									isShouchang: true,
									shouchangimage: '/static/pages/image/shouChangture.jpg'
								});
							} else {
								that.setData({
									isShouchang: false,
									shouchangimage: '/static/pages/image/shouChangfalse.jpg'
								});
							}
						}
					}); //请求弹幕

					uni.request({
						url: 'http://106.52.75.136/v1/comment/place/' + that.placeId,
						method: 'GET',
						header: {
							'content-Type': 'application/json'
						},

						success(res) {
							console.log(res); // that.setData({
							//   arr:res.
							// })

							var text = [];

							for (i = 0; i < res.data.result.length; i++) {
								text.push(res.data.result[i].content);
							}

							console.log(text);
							that.setData({
								arr: text
							});
						}
					});
				}
			});
		},
		onClick: function(e) {
			var that = this;

			if (e.detail.index == 1) {
				clearInterval(cycle);
				ids = 0;
				doommList = [];
				console.log(e);
				cycle = setInterval(function() {
					let arr = that.arr;

					if (arr[ids] == undefined) {
						ids = 0; // 1.循环一次，清除计时器
						// doommList = []
						// clearInterval(cycle)
						// 2.无限循环弹幕

						doommList.push(new Doomm(arr[ids], Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 5) + 5, getRandomColor()));

						if (doommList.length > 10) {
							//删除运行过后的dom
							doommList.splice(0, 1);
						}

						that.setData({
							doommData: doommList
						});
						ids++;
					} else {
						doommList.push(new Doomm(arr[ids], Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 5) + 5, getRandomColor()));

						if (doommList.length > 10) {
							doommList.splice(0, 1);
						}

						that.setData({
							doommData: doommList
						});
						ids++;
					}
				}, 1000);
			}
		},
		// 获取发送弹幕
		getValue: function(e) {
			//console.log(e.detail);
			var that = this;
			that.setData({
				valueText: e.detail
			});
		},
		//发送弹幕
		bindbt: function() {
			var that = this;
			uni.request({
				url: 'http://106.52.75.136/v1/comment',
				method: 'POST',
				data: {
					placeId: that.placeId,
					content: that.valueText
				},
				header: {
					'Content-Type': 'application/json'
				},
				success: function(res) {
					console.log(res.data);
					uni.showToast({
						title: '发送成功！',
						icon: 'success',
						duration: 2000
					});
					console.log(that);
				}
			});
			doommList.push(new Doomm(that.valueText, Math.ceil(Math.random() * 100), Math.ceil(Math.random() * 5) + 5, getRandomColor()));
			that.setData({
				doommData: doommList,
				sms: ''
			});
		},
		//暂停
		onMusicTap: function() {
			var isPlayingMusic = this.isPlayingMusic;

			if (isPlayingMusic) {
				console.log('no');
				myaudio.pause(); //设置setData值，前端界面才能读取到isPlayingMusic是值，以下同理

				this.setData({
					isPlayingMusic: false,
					imageSrc: '/static/pages/image/timeout.png'
				});
			} else {
				console.log('yes');
				myaudio.play();
				this.setData({
					isPlayingMusic: true,
					imageSrc: '/static/pages/image/play.png'
				});
			}
		},
		//收藏
		shouchang: function() {
			var isShouchang = this.isShouchang;

			if (isShouchang) {
				console.log('1');
				var that = this;
				uni.request({
					url: 'http://106.52.75.136/v1/bookmark/' + this.openID + '/place/' + this.placeId,
					method: 'DELETE',
					header: {
						'content-Type': 'application/json'
					},

					success(res) {
						console.log(res);
						uni.showToast({
							title: '取消收藏！',
							icon: 'success',
							duration: 2000
						});
						console.log(that);
					}
				}); //设置setData值，前端界面才能读取到isPlayingMusic是值，以下同理

				this.setData({
					isShouchang: false,
					shouchangimage: '/static/pages/image/shouChangfalse.jpg'
				});
			} else {
				console.log('2');
				var that = this;
				uni.request({
					url: 'http://106.52.75.136/v1/bookmark',
					method: 'POST',
					data: {
						userId: this.openID,
						//把JSON.stringify全去掉 所有的request都不需要把他转换成字符串
						placeId: this.placeId,
						placeName: this.placeName,
						coverUrl: this.imgUrls[0] // data:JSON.stringify(this.data)
					},
					header: {
						'Content-Type': 'application/json'
					},
					success: function(res) {
						console.log(res.data); // wx.navigateBack({
						//   delta: 1  //小程序关闭当前页面返回上一页面
						// })

						uni.showToast({
							title: '收藏成功！',
							icon: 'success',
							duration: 2000
						});
						console.log(that);
					}
				});
				this.setData({
					isShouchang: true,
					shouchangimage: '/static/pages/image/shouChangture.jpg'
				});
			}
		},
		uploadDetailImage: function(e) {
			//这里是选取图片的方法
			var that = this;
			var pics = [];
			var detailPics = that.detailPics;

			if (detailPics.length >= that.count) {
				uni.showToast({
					title: '最多选择' + that.count + '张！'
				});
				return;
			}

			uni.chooseImage({
				count: that.count,
				// 最多可以选择的图片张数，默认9
				sizeType: ['original', 'compressed'],
				// original 原图，compressed 压缩图，默认二者都有
				sourceType: ['album', 'camera'],
				// album 从相册选图，camera 使用相机，默认二者都有
				success: function(res) {
					var imgs = res.tempFilePaths;

					for (var i = 0; i < imgs.length; i++) {
						pics.push(imgs[i]);
					}

					that.uploadimg({
						url: 'http://106.52.75.136/v1/upload/image',
						//这里是你图片上传的接口
						path: pics //这里是选取的图片的地址数组
					});
				}
			}); //刷新页面

			const pages = getCurrentPages();
			const perpage = pages[pages.length - 1];
			perpage.onLoad();
		},
		//多张图片上传
		uploadimg: function(data) {
			uni.showLoading({
				title: '上传中...',
				mask: true
			});
			var that = this,
				i = data.i ? data.i : 0,
				success = data.success ? data.success : 0,
				fail = data.fail ? data.fail : 0;
			uni.uploadFile({
				url: data.url,
				filePath: data.path[i],
				name: 'file',
				formData: {
					userId: '35'
				},
				success: resp => {
					uni.hideLoading();
					success++;
					var str = resp.data; //返回的结果，可能不同项目结果不一样

					console.log(str); // var pic = JSON.parse(str);
					// var pic_name = that.data.showUrl + pic.Data;
					// var detailPics = that.data.detailPics;
					// detailPics.push(pic_name)
					// that.setData({
					//   detailPics: detailPics
					// })

					uni.showToast({
						title: '上传成功！',
						icon: 'success',
						duration: 2000
					});
				},
				fail: res => {
					fail++;
					console.log('fail:' + i + 'fail:' + fail);
				},
				complete: () => {
					i++;

					if (i == data.path.length) {
						//当图片传完时，停止调用
						console.log('执行完毕');
						console.log('成功：' + success + ' 失败：' + fail);
						var myEventDetail = {
							picsList: that.detailPics
						}; // detail对象，提供给事件监听函数

						var myEventOption = {}; // 触发事件的选项

						that.$emit(
							'myevent',
							{
								detail: myEventDetail
							},
							myEventOption
						); //结果返回调用的页面
					} else {
						//若图片还没有传完，则继续调用函数
						data.i = i;
						data.success = success;
						data.fail = fail;
						that.uploadimg(data); //递归，回调自己
					}
				}
			});
		},
		loadCity: function(latitude, longitude) {
			var that = this;
			var myAmapFun = new amapFile.AMapWX({
				key: markersData.key
			});
			myAmapFun.getRegeo({
				location: '' + longitude + ',' + latitude + '',
				//location的格式为'经度,纬度'
				success: function(data) {
					console.log(data);
					console.log(data[0].regeocodeData.addressComponent.district);
					myAmapFun.getWeather({
						city: data[0].regeocodeData.addressComponent.district,
						success: function(data) {
							that.setData({
								weather: data
							});
							console.log(data); //成功回调
						},
						fail: function(info) {
							//失败回调
							console.log(info);
						}
					});
				},
				fail: function(info) {}
			});
		}
	}
};
</script>
<style>
/* pages/index/scenic/scenic.wxss */
.icon_left {
	position: absolute;
	left: 22%;
	width: 50rpx;
	height: 50rpx;
}

.icon_right {
	position: absolute;
	right: 22%;
	width: 50rpx;
	height: 50rpx;
}

.voice {
	height: 6.55vh;
	display: flex;
}

.voice_author {
	flex: 1;
	text-align: center;
}

.select {
	flex: 1;
}

/* 轮播图 */
.swiper {
	height: 460rpx;
	z-index: 4;
}

/* 底部 */
.end {
	position: fixed;
	bottom: 0px;
	height: 100rpx;
	display: flex;
}
.shouchang {
	width: 100rpx;
	height: 100rpx;
}
.shangchuan {
	width: 100rpx;
	height: 100rpx;
	background-color: white;
}
.button {
	width: 560rpx;
	height: 100rpx;
}
.aon {
	position: absolute;
	white-space: nowrap; /* 防止向下换行*/
}
.doommview {
	z-index: -1;
	height: 24.43vh;
	width: 100%;
	position: absolute;
	/* top:56.7vh; */
	top: 50vh;
}
/**定义从右边向左边的移动的动画**/
@keyframes first {
	from {
		left: 100%;
	}
	to {
		left: -100%;
	}
}

/* 传语音 */
.audio {
	display: flex;
	position: relative;
	height: 140rpx;
	line-height: 140rpx;
	background: #f7f7f7;
	width: 690rpx;
	margin: 0 auto;
}
.audio_img {
	position: absolute;
	top: -15rpx;
	right: -15rpx;
	width: 30rpx;
	height: 30rpx;
}
.audio_btn {
	width: 88rpx;
	height: 88rpx;
	margin-top: 28rpx;
	margin-left: 42rpx;
}
.audio_pro {
	margin-top: 36rpx;
	margin-left: 20rpx;
	width: 410rpx;
}
.audio_text {
	font-weight: bold;
	margin-left: 36rpx;
	color: #90bed5;
	font-size: 10rpx;
}

/* 上传图片 */

/* 景区简介 */
.introduce {
	/* background: #f80; */
	margin: 40rpx;
}

.title {
	font-size: 34rpx;
	font-weight: 600;
	color: #333;
	margin-bottom: 20px;
}

.article-content {
	color: #666;
	font-size: 28rpx;
	margin-bottom: 20rpx;
	margin-left: 30rpx;
	line-height: 40rpx;
	letter-spacing: 2rpx;
}

/* 天气 */
.content {
	color: #043567;
	background-color: rgba(252, 252, 252, 0.762);
	padding: 0;
	height: 12.62;
}

.info {
	display: flex;
	width: 100%;
	height: 80rpx;
	margin-top: 0;
}

.city {
	flex: 1;
	font-size: 35rpx;
	line-height: 35rpx;
	text-align: center;
	color: #043567;
}

.temp {
	flex: 1;
	font-size: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color: #043567;
}

.weather {
	display: flex;
	padding-left: 40rpx;
}

.hide {
	display: none;
}

.show {
	display: block;
}
</style>
