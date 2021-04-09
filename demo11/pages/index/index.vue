<template>
	<view class="content">
		<view class="X-C X-R-Center">
			<image class="logo" src="/static/logo.png"></image>
			<text class="X-R-Center X-family X-fontspacing " style="font-size: 36rpx;font-weight: 500;">西南交通大学</text>
		</view>
		
		<view class="X-R X-RautoAdjust" style="width: 80vw;margin-top: 40rpx;">
			<view class="X-C-Center">
				<zai-lattice shadow
					backgroundColor="#000"
				    progressColor='#ffffff' 
				    progressPercent='15'
				    title='公告通知' 
				   
				    @click="goAnnouncementNotice()"
				/>
			</view>
			<view class="X-C-Center">
				<zai-lattice shadow
					backgroundColor="#000"
				    progressColor='#ffffff' 
				    progressPercent='15'
				    title='物品申购' 
				   
				    @click="goItemPurchase()"
				/>
			</view>
		</view>
		<view class="X-R X-RautoAdjust" style="width: 80vw;margin-top: 40rpx;">
			<view>
				<zai-lattice shadow
					backgroundColor="#000"
				    progressColor='#ffffff' 
				    progressPercent='15'
				    title='维修申请' 
				   
				    @click="goMaintenanceRequest()"
				/>
			</view>
			<view>
				<zai-lattice shadow
					backgroundColor="#000"
				    progressColor='#ffffff' 
				    progressPercent='15'
				    title='盖章申请' 
				   
				    @click="goApplicationRequest()"
				/>
			</view>
		</view>
		<view class="X-R X-RautoAdjust" style="width: 80vw;margin-top: 40rpx;">
			<view>
				<zai-lattice shadow
					backgroundColor="#000"
				    progressColor='#ffffff' 
				    progressPercent='15'
				    title='社工加班' 
				   
				    @click="goWorkOvertime()"
				/>
			</view>
			<view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import zaiLattice from "../../components/zai-lattice";
	
	
	export default {
		components:{
		    zaiLattice
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			goAnnouncementNotice(){
				uni.navigateTo({
				    url: '../function/AnnouncementNotice'
				});
			},
			goApplicationRequest(){
				uni.navigateTo({
				    url: '../function/ApplicationRequest'
				});
			},
			goItemPurchase(){
				uni.navigateTo({
				    url: '../function/ItemPurchase'
				});
			},
			goMaintenanceRequest(){
				uni.navigateTo({
				    url: '../function/MaintenanceRequest'
				});
			},
			goWorkOvertime(){
				uni.navigateTo({
				    url: '../function/WorkOvertime'
				});
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 20rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 20rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
