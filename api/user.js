import tui from '@/common/common'

// 账号密码登录
export function login(data) {
  return tui.request({
    url: '/login',
    method: 'POST',
    data
  })
}

// 登出
export function logout() {
  return tui.request({
    url: '/logout',
    method: 'POST'
  })
}

// 修改密码
export function changePassword(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return tui.request({
    url: '/user/change-password',
    method: 'POST',
    data,
    isForm: true
  })
}

