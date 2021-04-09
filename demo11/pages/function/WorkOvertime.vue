<template>
	<!-- 社工加班 -->
	<!-- <view class="X-out-interval">
		<u-form :model="form" ref="uForm">
			<view @click="gettime()">
				<u-form-item label="时间" >
					<text v-if="timeshow" class="X-family X-fontspacing" :style="{ color: color6}" style="font-size: 26rpx;">请选择时间</text>
					<view class="X-C" v-if="!timeshow">
						<text  class="X-family X-fontspacing" style="font-size: 26rpx;">{{time}}</text>
						<u-calendar v-model="show"  @change="change"></u-calendar>
					</view>
					
				</u-form-item>
			</view>
			<u-form-item label="申请人" label-width=100><u-input type="textarea" auto-height="true" height="40" placeholder-style="color:{{color1}};font-size: 26rpx;" v-model="intro1" /></u-form-item>
			<u-form-item label="身份证" label-width=100><u-input type="textarea" auto-height="true" height="40" placeholder-style="color: {{color2}};font-size: 26rpx;" v-model="intro2" /></u-form-item>
			<u-form-item label="电话" label-width=100><u-input type="textarea" auto-height="true" height="40" placeholder-style="color:{{color3}};font-size: 26rpx;" v-model="intro3" /></u-form-item>
			<u-form-item label="地点" label-width=100><u-input type="textarea" auto-height="true" height="40" placeholder-style="color: {{color4}};font-size: 26rpx;" v-model="intro4" /></u-form-item>
			<u-form-item label="内容"><u-input v-model="intro5" type="textarea" auto-height="true" height="40" placeholder-style="color: {{color5}};font-size: 26rpx;" /></u-form-item>
		</u-form>
		<view style="z-index: 999;position: fixed; bottom: 100rpx;width: 95vw;">
			<u-button type="primary" @click="submit()">提交</u-button>
		</view>
		
	</view> -->
</template>

<script>
export default {
	data() {
		return {
			time:"请选择时间",
			timeshow:true,
			show:true,
			intro1:"",
			intro2:"",
			intro3:"",
			intro4:"",
			intro5:"",
			color1:"#c0c4cc",
			color2:"#c0c4cc",
			color3:"#c0c4cc",
			color4:"#c0c4cc",
			color5:"#c0c4cc",
			color6:"#c0c4cc"
		};
	},
	methods: {
		gettime(){
			this.timeshow = false
		},
		change(e){
			this.time = e.result
		},
		submit(){
			if(this.intor1 == null){
				this.color1 = "#ff0000"
			}
			if(this.intor2 == null){
				this.color2 = "#ff0000"
			}
			if(this.intor3 == null){
				this.color3 = "#ff0000"
			}
			if(this.intor4 == null){
				this.color4 = "#ff0000"
			}
			if(this.intor5 == null){
				this.color5 = "#ff0000"
			}
			if(this.time == "请选择时间"){
				this.color6 = "#ff0000"
			}
		}
	}
};
</script>

<style>
</style>
