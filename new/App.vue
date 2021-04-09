<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.container {
	  height: 100%;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: space-between;
	  padding: 200rpx 0;
	  box-sizing: border-box;
	} 
	.X-baseBackgroundColor {
		background-color: #f6f6f6;
	} /* 背景色（灰） */
	.X-contentBackgroundColor {
		background-color: #ffffff;
	} /* 背景色（白） */
	.X-R {
		display: flex;
		flex-direction: row;
	} /* 水平排列 */
	.X-C {
		display: flex;
		flex-direction: column;
	} /* 竖直排列 */
	.X-R-Center {
		display: flex;
		margin-left: auto;
		margin-right: auto;
	} /* 水平方向居中 */
	.X-C-Center {
		display: flex;
		margin-top: auto;
		margin-bottom: auto;
	} /* 竖直方向居中 */
	.X-allCenter {
		display: flex;
		margin: auto;
	} /* 整体居中 */
	.X-RautoAdjust {
		display: flex;
		justify-content: space-between;
	} /* 水平均匀排列 */
	.X-CautoAdjust {
		display: flex;
		justify-content: center;
	} /* 竖直均匀排列 */
	.X-have-interval {
		padding: 20upx;
	} /* 内边距 */
	.X-out-interval {
		margin: 20upx;
	} /* 外边距 */
	.X-top {
		display: flex;
		margin-top: 20upx;
	} /* 上边距 */
	.X-left {
		margin-left: 20upx;
	} /* 左边距 */
	.X-right {
		margin-right: 20upx;
	} /* 右边距 */
	.X-bottom {
		margin-bottom: 20upx;
	} /* 下边距 */
	.X-radius {
		border-radius: 20upx;
	} /* 圆角 */
	.X-CardShadow {
		display: flex;
		box-shadow: 0px 8px 4px #f2f2f2;
	} /* 卡片阴影效果 */
	.X-Card {
		display: flex;
		box-shadow: 0px 0px 4px #dd524d;
	} /* 环绕线条 */
	.X-titletext {
		font-size: 50upx;
	} /* 标题文字字号 */
	.X-fontSizeM {
		font-size: 40upx;
	} /* 大字号 */
	.X-fontSizeS {
		font-size: 30upx;
	} /* 小字号 */
	.X-fontSizeSS {
		font-size: 25upx;
	} /* 小小字号 */
	.X-textcolor1 {
		color: #4cd964;
	} /* 字体颜色1 */
	.X-textcolor2 {
		color: #4399fc;
	} /* 字体颜色2 */
	.X-textcolor3 {
		color: #dd524d;
	} /* 字体颜色3 */
	.X-textcolor4 {
		color: #ffffff;
	} /* 字体颜色4 */
	.X-font-weight {
		font-weight: 550;
	} /* 文字加粗 */
	.X-fontspacing {
		letter-spacing: 2rpx;
	} /* 字间距 */
	.X-tab {
		border-radius: 40upx;
		width: 70%;
		height: 80upx;
		display: flex;
		margin-left: auto;
		margin-right: auto;
	} /* 选项卡 */
	.X-button {
		position: fixed;
		width: 100%;
		bottom: 0upx;
		height: 100upx;
		margin-top: 30upx;
		display: flex;
		background-color: #304e07;
		color: #ffffff;
	} /* 底部选项卡 */
	.X-line {
		display: flex;
		margin: auto;
		width: 80%;
		height: 5upx;
		background-color: #f0f0f0;
	} /* 下划线 */
	.X-Verticalline {
		display: flex;
		margin-top: auto;
		margin-bottom: auto;
		width: 5upx;
		height: 80%;
		background-color: #f0f0f0;
	} /* 竖线 */
	.X-gradient {
		background: -moz-linear-gradient(top, #ffff00 0%, #ff0000 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ffff00), color-stop(100%, #ff0000));
		background: -webkit-linear-gradient(top, #ffff00 0%, #ff0000 100%);
		background: -o-linear-gradient(top, #ffff00 0%, #ff0000 100%);
		background: -ms-linear-gradient(top, #ffff00 0%, #ff0000 100%);
		background: linear-gradient(to bottom, #ffff00 0%, #ff0000 100%);
	} /* 渐变色 */
	
	.X-wrap {
		flex-wrap: wrap;
	} /* 换行——第一行在上方 */
	.X-wrap-reverse {
		flex-wrap: wrap-reverse;
	} /* 换行——第一行在上方 */
	.X-rowheight {
		line-height: 30px;
	} /* 行高 */
	.X-strikeout {
		text-decoration: line-through;
	} /* 删除线 */
	.X-underline {
		text-decoration: underline;
	} /* 下划线 */
	.X-overline {
		text-decoration: overline;
	} /* 上划线 */
	.X-NewMimicry-smooth {
		background: #55b9f3;
		box-shadow: inset 20px 20px 60px #489dcf, inset -20px -20px 60px #62d5ff;
	} /* 新拟态-平整 */
	.X-NewMimicry-sunken {
		background: linear-gradient(145deg, #5bc6ff, #4da7db);
		box-shadow: 10px 10px 20px #489dcf, -10px -10px 20px #62d5ff;
	} /* 新拟态-凹陷 */
	.X-NewMimicry-bulge {
		background: linear-gradient(145deg, #4da7db, #5bc6ff);
		box-shadow: 10px 10px 20px #489dcf, -10px -10px 20px #62d5ff;
	} /* 新拟态-凸出 */
	.X-NewMimicry-around {
		background: #55b9f3;
		box-shadow: inset 20px 20px 60px #489dcf, inset -20px -20px 60px #62d5ff;
	} /* 新拟态-凸出四周 */
</style>
