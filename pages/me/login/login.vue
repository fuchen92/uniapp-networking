<template>
	<view class="login">
		<image class="loginLogo" src="/static/loginLogo.png" mode="aspectFit"></image>
		<view class="languageSwitch">
			<radio-group @change="chooseLanguage">
				<label class="languageLabel">
					<radio class="languageRadio" value="zh" />
					<text class="languageLabelText" :class="{ active: lang == 'zh' }">中文</text>
				</label>
				<view class="languageDivide"></view>
				<label class="languageLabel">
					<radio class="languageRadio" value="en" />
					<text class="languageLabelText" :class="{ active: lang == 'en' }">EN</text>				
				</label>
			</radio-group>
		</view>
		<view class="loginBox">
			<view class="formGroup">
				<input class="formInput" type="text" :placeholder="$t('login.accountPlaceholder')" placeholder-class="placeholderClass" :focus="accountFocus" v-model.trim="account">
			</view>
			<view class="formGroup clear">
				<input class="formInput valicodeInput lt" type="text" :placeholder="$t('login.valicodePlaceholder')" placeholder-class="placeholderClass" :focus="valicodeFocus" maxlength="6" v-model.trim="valicode" />
				<button class="getValicode rt" @click="getValicode" :disabled="isGettedCode">
					{{ isGettedCode ? (countDown + "s") : $t("login.getCode[" + valicodeTipIndex + "]") }}
				</button>
			</view>
			<view class="formGroup">
				<text class="formTips" v-show="hasError">
					{{ $t("login.errTip['" + errType + "']") }}
				</text>
			</view>
			<view class="formGroup">
				<button class="loginBtn" @click="submitLogin">
					{{ $t('login.loginBtn') }}
				</button>	
				<text class="loginTip">
					{{ $t('login.loginTip') }}
				</text>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
			<view class="otherLogin">
				<view class="otherLoginTitle">
					{{ $t('login.otherLogin') }}
				</view>
				<view class="otherLoginIcons">
					<image class="wechatLogin" src="/static/wechat.svg" mode="aspectFit"></image>
				</view>
				<view class="wechatLoginTip">
					{{ $t('login.wechatLoginTip') }}
				</view>
			</view>			
		<!-- #endif -->
		<view class="copyright">
			<text class="copyrightTxt">
				Copyright 2006-2019 TravelDaily All Rights Reserved
			</text>
			<text class="copyrightTxt">
				环球旅讯 版权所有
			</text>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				lang: app.globalData.lang,
				account: "",
				accountFocus: false,
				valicode: "",
				valicodeFocus: false,
				isGettedCode: false,
				countDown: 59,
				valicodeTipIndex: 0,
				timer: null,
				hasError: false,
				errType: "empty"
			}
		},
		computed: {
			
		},
		methods: {
			chooseLanguage: function(event) {
				var lang = event.detail.value;
				this.lang = lang;
				this.$i18n.locale = lang;
				app.globalData.lang = lang;
				uni.setStorageSync("lang", lang);
				console.log("globalData 里面的lang： " + app.globalData.lang)
				console.log("storage 里面的lang： " + uni.getStorageSync('lang'))
			},
			_validate: function(type) {
				let { account, valicode } = this;
				switch(type) {
					case "account":
						if(account == "" || account.length == 0) {
							this.hasError = true;
							this.accountFocus = true;
							// this.$refs.account.focus();
							return false;
						}
						if(account.indexOf("@") != -1) {
							if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(account)) {
								this.errType = "emailErr";
								this.hasError = true;
								this.accountFocus = true;
								// this.$refs.account.focus();
								return false;
							}
						} else {
							if(!/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$)|(^09\d{8}$)|(^[569]\d{7}$)|(^(66|62)\d{6}$)/.test(account)) {
								this.errType = "mobileErr";
								this.hasError = true;
								this.accountFocus = true;
								// this.$refs.account.focus();
								return false;
							}
						}
						break;
					case "valicode":
						if(valicode == "" || valicode.length == 0) {
							this.errType = "valicodeEmpty";
							this.hasError = true;
							this.valicodeFocus = true;
							// this.$refs.valicode.focus();
							return false;
						} else if(!/\d{6}/.test(valicode)) {
							this.errType = "valicodeErr";
							this.hasError = true;
							this.valicodeFocus = true;
							// this.$refs.valicode.focus();
							return false;
						}
						break;
				}
				return true;
			},
			getValicode: function() {
				if(this.isGettedCode == true) {
					return;
				}
				if(this._validate("account")) {
					this.hasError = false;
					this.isGettedCode = true;
					this.valicodeFocus = true;
					
					this.timer = setInterval(() => {
						this.countDown--;
						if(this.countDown <= 0) {
							this.countDown = 59;
							clearInterval(this.timer);
							this.timer = null;
							this.isGettedCode = false;
							this.valicodeTipIndex = 1;
						}
					}, 1000);
					
					// uni.request({
					// 	url: this.$apiDomain + '/Home/SendCode',
					// 	data: {
					// 		eventNo: this.$eventNo,
					// 		loginName: this.account,
					// 		lang: this.lang
					// 	},
					// 	method: "POST"
					// }).then(data => {
					// 	var [err, res] = data;
					// 	console.log(data);
					// 	if(res.data.Code == 0) {
					// 		this.timer = setInterval(() => {
					// 			this.countDown--;
					// 			if(this.countDown <= 0) {
					// 				this.countDown = 59;
					// 				clearInterval(this.timer);
					// 				this.timer = null;
					// 				this.isGettedCode = false;
					// 				this.valicodeTipIndex = 1;
					// 			}
					// 		}, 1000);
					// 	} else if(res.data.Code != 0) {
					// 		console.log(res.data.Message)
					// 	}
					// })
					
				}
			},
			submitLogin: function() {
				console.log(this.account)
				console.log(this.valicode)
			}
		},
		onLoad: function() {
			// console.log("登录页加载")
			// console.log("globalData 里面的lang： " + app.globalData.lang)
			// console.log("storage 里面的lang： " + uni.getStorageSync('lang'))
		}
	}
</script>

<style>
page {
	background-color: #f0f1f2;
}
.login {
	width: 90%;
	margin: 0 auto;
	overflow: hidden;
}
.loginLogo {
	display: block;
	width: 420rpx;
	height: 70rpx;
	margin: 100rpx auto 40rpx;
}
.languageSwitch {
	text-align: right;
}
.languageRadio {
	display: none;
}
.languageDivide, .languageLabel {
	display: inline-block;
}
.languageDivide {
	height: 20rpx;
	margin: 0 30rpx;
	border-left: 2rpx solid #181818;
}
.languageLabelText {
	font-size: 28rpx;
	color: #aaa;
}
.languageLabelText.active {
	color: #181818;
}
.loginBox {
	box-sizing: border-box;
	margin-top: 20rpx;
	padding: 40rpx 20rpx;
	background-color: #FFFFFF;
}
.formGroup:last-child {
    margin-bottom: 0;
}
.valicodeInput {
	width: 65%;
	border-right: 0px;
}
.getValicode {
	width: 35%;
	height: 80rpx;
	font-size: 28rpx;
	line-height: 80rpx;
	text-align: center;
	border-radius: 0px;
	background-color: #C30D23;
	color: #FFFFFF;
}
.loginBtn {
	width: 100%;
	height: 80rpx;
	font-size: 28rpx;
	line-height: 80rpx;
	text-align: center;
	border-radius: 0px;
	background-color: #C30D23;
	color: #FFFFFF;
}
.loginTip {
	display: block;
	width: 100%;
	margin-top: 20rpx;
	font-size: 24rpx;
	line-height: 30rpx;
	text-align: center;
}
.copyright {
	position: fixed;
	left: 0;
	bottom: 30rpx;
	width: 100%;
	font-size: 24rpx;
	line-height: 28rpx;
	text-align: center;
	word-break: break-word;
	color: #aaaaaa;
}
.copyrightTxt {
	display: block;
}
.otherLogin {
	margin-top: 60rpx;
	font-size: 28rpx;
	text-align: center;
	border-top: 2rpx solid #b6bbbb;
}
.otherLoginTitle {
	position: relative;
	top: -20rpx;
	display: inline-block;
	width: auto;
	padding: 0 20rpx;
	line-height: 40rpx;
	background-color: #F0F1F2;
	z-index: 1;
}
.otherLoginIcons {
	font-size: 0px;
	text-align: center;
}
.wechatLogin {
	display: inline-block;
	width: 60rpx;
	height: 60rpx;
}
.wechatLoginTip {
	margin-top: 20rpx;
	font-size: 24rpx;
	line-height: 30rpx;
	color: #999;
}
</style>
