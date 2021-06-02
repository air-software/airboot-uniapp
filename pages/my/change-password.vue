<template>
  <view class="container">
    <view class="tui-form">
      <view class="tui-view-input">
        <tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
          <view class="tui-cell-input">
            <tui-icon name="pwd" color="#6d7a87" :size="40"></tui-icon>
            <input v-model="oldPassword" placeholder="请输入原密码" :password="true" placeholder-class="tui-phcolor" type="text" maxlength="50" />
            <view class="tui-icon-close" v-show="oldPassword" @tap="oldPassword = ''"><tui-icon name="close-fill" color="#bfbfbf"></tui-icon></view>
          </view>
        </tui-list-cell>
        <tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
          <view class="tui-cell-input">
            <tui-icon name="pwd" color="#6d7a87" :size="40"></tui-icon>
            <input v-model="newPassword" placeholder="请输入新密码" :password="true" placeholder-class="tui-phcolor" type="text" maxlength="50" />
            <view class="tui-icon-close" v-show="newPassword" @tap="newPassword = ''"><tui-icon name="close-fill" color="#bfbfbf"></tui-icon></view>
          </view>
        </tui-list-cell>
        <tui-list-cell :hover="false" :lineLeft="false" backgroundColor="transparent">
          <view class="tui-cell-input">
            <tui-icon name="pwd" color="#6d7a87" :size="40"></tui-icon>
            <input v-model="confirmPassword" placeholder="请再次确认新密码" :password="true" placeholder-class="tui-phcolor" type="text" maxlength="50" />
            <view class="tui-icon-close" v-show="confirmPassword" @tap="confirmPassword = ''"><tui-icon name="close-fill" color="#bfbfbf"></tui-icon></view>
          </view>
        </tui-list-cell>
      </view>
      <view class="tui-btn-box"><tui-button class="primary-btn" :disabledGray="true" :disabled="disabled" :shadow="true" shape="circle" @click="submit">确认修改</tui-button></view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    computed: {
      disabled() {
        return !this.oldPassword || !this.newPassword || !this.confirmPassword
      }
    },
    methods: {
      submit() {
        if (this.newPassword.length < 6) {
          this.tui.toast('新密码不能少于6位')
        } else if (this.newPassword !== this.confirmPassword) {
          this.tui.toast('确认密码与新密码不一致')
        } else {
          this.api.user.changePassword(this.oldPassword, this.newPassword).then(data => {
            this.reset()
            this.tui.toast('密码修改成功')
          })
        }
      },
      reset() {
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
      }
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    
    .tui-page-title {
      width: 100%;
      font-size: 48rpx;
      font-weight: bold;
      color: $uni-text-color;
      line-height: 42rpx;
      padding: 110rpx 40rpx 40rpx 40rpx;
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
          
          .tui-btn-send {
            width: 156rpx;
            text-align: right;
            flex-shrink: 0;
            font-size: $uni-font-size-base;
            color: $color-primary;
          }
          
          .tui-gray {
            color: $uni-text-color-placeholder;
          }
        }
      }
      
      .tui-cell-text {
        width: 100%;
        padding: 40rpx $uni-spacing-row-lg;
        box-sizing: border-box;
        font-size: $uni-font-size-sm;
        color: $uni-text-color-grey;
        display: flex;
        align-items: center;
        
        .tui-color-primary {
          color: $uni-color-primary;
          padding-left: $uni-spacing-row-sm;
        }
      }
      
      .tui-btn-box {
        width: 100%;
        padding: 0 $uni-spacing-row-lg;
        box-sizing: border-box;
        margin-top: 80rpx;
      }
    }
  }
</style>
