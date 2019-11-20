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
		},
		globalData: {
			lang: "zh",
			eventNo: "68",
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	:root {
		--themeColor: #c30d23;
	}
	page {
		height: 100%;
		font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "微软雅黑", "WenQuanYi Micro Hei", sans-serif;
	}
	radio, checkbox, textarea, button, input {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		outline: 0;
	}
	input, textarea {
		border: 2rpx solid #bfbfbf;
	}
	.lt {
		float: left;
	}
	.rt {
		float: right;
	}
	.clear::after {
	    display: block;
	    content: "";
	    clear: both;
	}
	.formGroup {
		min-height: 30rpx;
		margin-bottom: 30rpx;
		font-size: 0;
	}
	.formInput {
		width: 100%;
		height: 80rpx;
		min-height: initial;
		padding: 0 20rpx;
		font-size: 28rpx;
	}
	.formTips {
		font-size: 24rpx;
		line-height: 30rpx;
		text-align: left;
		color: var(--themeColor);
	}
	.placeholderClass {
		font-size: 26rpx;
		color: #757575;
	}
</style>
