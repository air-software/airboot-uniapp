<template>
	<view class="container">
		<!-- #ifndef MP -->
		<view class="tui-status-bar"></view>
		<view class="tui-header">
			<view>AIRBOOT</view>
			<tui-icon name="shut" @click="$back"></tui-icon>
		</view>
		<!-- #endif -->
		<view class="tui-page-title">登录</view>
		<view class="tui-form">
			<view class="tui-view-input">
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="mobile" color="#6d7a87" :size="40"></tui-icon>
						<input
							:adjust-position="false"
							v-model="mobile"
							placeholder="请输入手机号"
							placeholder-class="tui-phcolor"
							type="number"
							maxlength="11"
						/>
						<view class="tui-icon-close" v-show="mobile" @tap="clearInput(1)"><tui-icon name="close-fill" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
					<view class="tui-cell-input">
						<tui-icon name="pwd" color="#6d7a87" :size="40"></tui-icon>
						<input
							:adjust-position="false"
							v-model="password"
							placeholder="请输入密码"
							:password="true"
							placeholder-class="tui-phcolor"
							type="text"
							maxlength="36"
						/>
						<view class="tui-icon-close" v-show="password" @tap="clearInput(2)"><tui-icon name="close-fill" color="#bfbfbf"></tui-icon></view>
					</view>
				</tui-list-cell>
			</view>
			<view class="tui-cell-text">
				<view class="color-primary" hover-class="tui-opacity" :hover-stay-time="150" @click="forgetPwd">忘记密码？</view>
				<view hover-class="tui-opacity" :hover-stay-time="150">
					没有账号？
					<text class="color-primary" @click="register">注册</text>
				</view>
			</view>
			<view class="tui-btn-box"><tui-button class="primary-btn" :disabledGray="true" :disabled="disabled" :shadow="true" shape="circle" @click="login">登录</tui-button></view>
			<view class="tui-protocol" hover-class="tui-opacity" :hover-stay-time="150">
				点击"登录"即表示已同意
				<text class="tui-protocol-yello" @click="$toPage('./protocol')">《用户协议》</text>
			</view>
		</view>
		
		<!-- 公众号关注组件 -->
		<view class="official-account" v-if="$showOfficialAccount">
			<tui-divider width="80%" :size="28" :gradual="true" :gradualColor="['red', '#4a67d6']">欢迎关注公众号</tui-divider>
			<view class="flex jcenter">
				<official-account></official-account>
			</view>
		</view>
		
		<tui-bottom-popup :mask="false" backgroundColor="transparent" :show="true">
			<view class="tui-auth-login">
				<!-- #ifdef APP-PLUS || MP-WEIXIN || H5 -->
				<!-- 如果已绑定过用户，则可直接微信登录，否则需要授权手机号 -->
				<view v-if="bindWx" class="tui-icon-platform" hover-class="tui-opacity" :hover-stay-time="150">
					<image src="/static/images/share/icon_wechat.png" class="tui-login-logo"></image>
				</view>
				<button v-else open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" class="tui-icon-platform" hover-class="tui-opacity" :hover-stay-time="150">
					<image src="/static/images/share/icon_wechat.png" class="tui-login-logo"></image>
				</button>
				<text class="weixin-login-text">微信快捷登录</text>
				<!-- #endif -->
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	export default {
		computed: {
			disabled: function() {
				return !this.mobile || !this.password
			}
		},
		data() {
			return {
				mobile: '',
				password: '',
				bindWx: false
			}
		},
		onLoad(options) {
		},
		methods: {
			clearInput(type) {
				if (type === 1) {
					this.mobile = '';
				} else {
					this.password = '';
				}
			},
			login() {
				this.$toPage('/pages/my/my')
			},
			onGetPhoneNumber(e) {
				console.log(e)
			},
			forgetPwd() {
			},
			register() {
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		.tui-status-bar {
			width: 100%;
			height: var(--status-bar-height);
		}
		
		.tui-header {
			width: 100%;
			padding: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
		}
		
		.tui-page-title {
			width: 100%;
			font-size: 48rpx;
			font-weight: bold;
			color: $uni-text-color;
			line-height: 42rpx;
			padding: 40rpx;
			box-sizing: border-box;
		}
		
		.tui-form {
			padding-top: 50rpx;
			
			.tui-view-input {
				width: 100%;
				box-sizing: border-box;
				padding: 0 40rpx;
				
				.tui-cell-input {
					width: 100%;
					display: flex;
					align-items: center;
					padding-top: 48rpx;
					padding-bottom: $uni-spacing-col-base;
					
					input {
						flex: 1;
						padding-left: $uni-spacing-row-base;
					}
					
					.tui-icon-close {
						margin-left: auto;
					}
				}
			}
			
			.tui-cell-text {
				width: 100%;
				padding: 16rpx 40rpx;
				margin-top: 20rpx;
				box-sizing: border-box;
				font-size: 26rpx;
				color: $uni-text-color-grey;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			
			.tui-btn-box {
				width: 100%;
				padding: 0 $uni-spacing-row-lg;
				box-sizing: border-box;
				margin-top: 40rpx;
				
				.tui-primary-hover {
					color: #fff !important;
					background-color: $color-primary !important;
				}
			}
		}
		
		.tui-login-way {
			width: 100%;
			font-size: 26rpx;
			color: $uni-color-primary;
			display: flex;
			justify-content: center;
			position: fixed;
			left: 0;
			bottom: 80rpx;
			
			view {
				padding: 12rpx 0;
			}
		}
		
		.tui-auth-login {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding-bottom: 80rpx;
			padding-top: 20rpx;
			
			.tui-icon-platform {
				width: 90rpx;
				height: 90rpx;
				padding: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				background: transparent;
				
				&::after {
					content: '';
					position: absolute;
					width: 200%;
					height: 200%;
					transform-origin: 0 0;
					transform: scale(0.5, 0.5) translateZ(0);
					box-sizing: border-box;
					left: 0;
					top: 0;
					border-radius: 180rpx;
					border: 1rpx solid $uni-text-color-placeholder;
				}
			}
			
			.tui-login-logo {
				width: 60rpx;
				height: 60rpx;
			}
			
			.weixin-login-text {
				font-size: 24rpx;
				color: #666666;
				margin-top: 20rpx;
			}
		}
		
		.tui-protocol {
			color: #333;
			font-size: 24rpx;
			text-align: center;
			width: 100%;
			margin-top: 40rpx;
		}
		
		.tui-protocol-yello {
			color: $color-primary;
		}
		
		.official-account {
			margin-top: 150rpx;
		}
	}
</style>
