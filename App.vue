<script>
	import { mapActions, mapState, mapMutations } from "vuex";
	export default {
		// data: function() {
		// 	return {
		// 		socket: "socket此时为空",
		// 		token: "111222333"
		// 	}
		// },
		computed: {
			...mapState({
				token: state => state.Token
			}),
			computedData: function() {
				return "这是 computed 选项中的字段，证明 App.vue 可以添加 computed 选项"
			}
		},
		watch: {
			token: function() {
				console.log("这是 watch 选项中的方法，证明 App.vue 可以添加 watch 选项")
				console.log("token 变化了，初始化 socket")
				if(this.token != "" || this.token != null) {
					this.initSocket(this.token);
				}
			}
		},
		methods: {
			// print: function() {
			// 	console.log("这是 methods 选项里面的方法，证明 App.vue 可以添加 methods 选项")
			// },
			initSocket: function(token) {
				console.log("初始化 socket 链接")
				// console.log(this)
				// const socketUrl = `wss://socialapi.traveldaily.cn/WebSocket/Index?token=${encodeURIComponent(token)}`;
				this.socket = {
					onOpen: function() {},
					onSend: function() {},
					onMessage: function() {},
					onClose: function() {}
				}
			}
		},
		onLaunch: function() {
			// this.print();
			// this.initSocket();
			console.log('App Launch')
			// console.log("在App Launch方法内初始化socket链接")
		},
		onShow: function() {
			// console.log(this)
			// console.log("data 选项里面的 token： " + this.token)
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},		
		globalData: {
			lang: uni.getStorageSync('lang') || "zh",
			socket: ""
			// eventNo: "68",
			// localApiDomain: "http://192.168.1.21:89",
			// apiDomain: "https://socialapi.traveldaily.cn"
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
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
	button:after {
		border: 0px;
	}
	input[disabled], button[disabled] {
		border: 0px;
	    background-color: #999 !important;
	    cursor: not-allowed !important;
		color: #FFFFFF !important;
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
