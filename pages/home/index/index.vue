<template>
	<view class="program">
		<!-- <uni-nav-bar left-icon="back"></uni-nav-bar> -->
		<navBar></navBar>
		<view class="content">
			
		</view>
		<view class="btnContainer" @click="changeLang">
			修改语言
		</view>
	</view>
</template>

<script>
	// import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import navBar from "@/components/navBar.vue";
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components: {
			// uniNavBar,
			navBar
		},
		onLoad() {

		},
		methods: {
			changeLang: function() {
				this.$i18n.locale = "en"
			}
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
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
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
