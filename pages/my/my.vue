<template>
  <view class="container full">
    <view class="full flex vertical jbetween">
      <view>
        <tui-list-cell>
          <view class="tui-item-box">
            <tui-icon name="people" :size="46" color="#F6CD52"></tui-icon>
            <view class="tui-list-cell_name">姓名</view>
            <view class="tui-right">管理员</view>
          </view>
        </tui-list-cell>
        <tui-list-cell>
          <view class="tui-item-box">
            <tui-icon name="mobile" :size="46" color="#F6CD52"></tui-icon>
            <view class="tui-list-cell_name">手机号</view>
            <view class="tui-right">18899887799</view>
          </view>
        </tui-list-cell>
        <tui-list-cell @click="$toPage('/pages/my/change-password')" :arrow="true">
          <view class="tui-item-box">
            <tui-icon name="pwd" :size="46" color="#F6CD52"></tui-icon>
            <view class="tui-list-cell_name">修改密码</view>
          </view>
        </tui-list-cell>
      </view>
      <view class="logout-btn">
        <tui-button class="primary-btn" shadow shape="circle" @click="logout">退出登录</tui-button>
      </view>
    </view>
  
    <tui-modal :show="confirmShow" @click="confirmClick" @cancel="confirmShow = false" :content="`确定退出登录吗？`" color="#333" :size="32" :zIndex="998" :maskZIndex="997" :button="confirmButton"></tui-modal>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        confirmShow: false,
        confirmButton: [
          {
            text: '取消',
            type: 'gray'
          },
          {
            text: '确定',
            type: 'green'
          }
        ]
      }
    },
    methods: {
      logout() {
        this.confirmShow = true
      },
      confirmClick(e) {
        if (e.index === 0) {
          this.confirmShow = false
        } else {
          uni.reLaunch({
            url: '/pages/index/login'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    
    .tui-item-box {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 32rpx;
      
      .tui-list-cell_name {
        padding-left: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 32rpx;
      }
      
      .tui-right {
        margin-left: auto;
        margin-right: 34rpx;
        color: #999;
        line-height: 32rpx;
      }
    }
    
    .logout-btn {
      padding: 0 60rpx;
      margin-bottom: 60rpx;
    }
  }
</style>
