<!-- 公告通知 -->
<template>
	<view class="X-out-interval X-family">
		<u-form  ref="uForm" >
			<view @click="gettime()">
				<u-form-item label="时间" >
					<text v-if="timeshow" class="X-family X-fontspacing" :style="{ color: timecolor}" style="font-size: 26rpx;">请选择时间</text>
					<view class="X-C" v-if="!timeshow">
						<text  class="X-family X-fontspacing" style="font-size: 26rpx;">{{time}}</text>
						<u-calendar v-model="show"  @change="change"></u-calendar>
					</view>
					
				</u-form-item>
			</view>
			<u-form-item label="内容"><u-input v-model="intro" type="textarea" auto-height="true" height="40"  placeholder-style="color: {{introcolor}};font-size: 26rpx;" /></u-form-item>
		</u-form>
		<view style="z-index: 999;position: fixed; bottom: 100rpx;width: 95vw;" >
			<u-button type="primary" @click="submit()">提交</u-button>
		</view>
		
	</view>
		
	
</template>

<script>
export default {
	data() {
		return {
			time:"请选择时间",
			timeshow:true,
			show:true,
			intro:"",
			timecolor:"#c0c4cc",
			introcolor:"#c0c4cc"
		};
	},
	methods: {
		gettime(){
			this.timeshow = false
		},
		change(e){
			this.time = e.result
			
		},
		//点击提交
		submit(){
			if(this.time == "请选择时间"){
				this.timecolor = "#ff0000"
			}
			if(this.intor == null){
				this.introcolor = "#ff0000"
			}
		}
	}
};
</script>

<style>
</style>
