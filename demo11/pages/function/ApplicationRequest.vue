<template>
	<!-- 盖章申请 -->
	<!-- <view class="X-out-interval">
		<u-form :model="form" ref="uForm">
			<u-form-item label="申请人" label-width=100><u-input type="textarea" auto-height="true" height="40" placeholder-style="color: #000;font-size: 26rpx;" v-model="intro1" /></u-form-item>
			<u-form-item label="名称" label-width=100><u-input type="textarea" auto-height="true" height="40" placeholder-style="color:#000;font-size: 26rpx;" v-model="intro2" /></u-form-item>
			<u-form-item label="金额" label-width=100><u-input v-model="intro3" type="textarea" height="40" auto-height="true" placeholder-style="color:#000;font-size: 26rpx;"  /></u-form-item>
			<u-form-item label="内容"><u-input v-model="intro4" type="textarea" auto-height="true" height="40" placeholder-style="color: #000;font-size: 26rpx;" /></u-form-item>
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
				intro1:"",
				intro2:"",
				intro3:"",
				intro4:"",
				color1:"#c0c4cc",
				color2:"#c0c4cc",
				color3:"#c0c4cc",
				color4:"#c0c4cc",
			}
		},
		methods: {
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
			}
		}
	}
</script>

<style>
</style>
