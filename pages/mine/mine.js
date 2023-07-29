// pages/mine/mine.js
var http = require("../../utils/http");
var app=getApp()
import deviceUtil from "../../dist/utils/device-util"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
    isLogin:false,  
    avatarUrl:'',
    nickName:''
},
getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
          wx.showLoading({
          title: '正在登录中.....',
      })
        var userInfo = res.userInfo
        wx.login({
          success: res => {
            http.request({
            url:'/login/mini?principal='+res.code,
            method:'post',
            data:{
              avatarUrl:userInfo.avatarUrl,
              nickName:userInfo.nickName
            },
            then:(res)=>{
                //把token存入缓存，请求接口数据时要用
                wx.setStorageSync('token', res.data); 
                wx.setStorageSync('nickName', userInfo.nickName)
                wx.setStorageSync('avatarUrl', userInfo.avatarUrl)
                app.globalData={ 
                  isLogin: true,
                  token:res.data.access_token,
                  avatarUrl:userInfo.avatarUrl,
                  nickName:userInfo.nickName
                  }
                  this.setData({
                    avatarUrl:userInfo.avatarUrl,
                    nickName:userInfo.nickName,
                    isLogin:true
                  })
                  wx.hideLoading();
              },
            failed:(res)=>{
              wx.hideLoading();
            }
          })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
    isLogin:app.globalData.isLogin,  
    avatarUrl:app.globalData.avatarUrl,
    nickName:app.globalData.nickName
  })
  },
  openZan(){
    wx.previewImage({
      urls: ["https://res.yunzhanyi.net/static/img/zanshang.png"],
 });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

    

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },
  

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  toLogin(){
    if (!this.data.isLogin) {
      this.getUserProfile()
    }  
  }
})