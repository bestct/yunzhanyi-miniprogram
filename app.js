// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var avatarUrl=wx.getStorageSync('avatarUrl')
    this.globalData.avatarUrl=avatarUrl==''?"/static/icon/user.png":avatarUrl
    var nickName=wx.getStorageSync('nickName')
    this.globalData.nickName=nickName===''?"点击登录":nickName
    var token=wx.getStorageSync('token')
    this.globalData.token=token;
    this.globalData.isLogin=token==''?false:true;  
  },
  globalData: {
    isLogin: false,
    token:"",
    avatarUrl:"../../static/icon/user.png",
    nickName:"未登录"
  }
})
