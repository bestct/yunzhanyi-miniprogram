// pages/mine/mine.js
var http = require("../../utils/http");
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,  
    avatarUrl:'',
    nickName:''
},
getUserProfile() {
      wx.showLoading({
          title: '正在登录中.....',
      })
        wx.login({
          success: res => {
            http.request({
            url:'/login/mini?principal='+res.code,
            method:'post',
            then:(res)=>{
                //把token存入缓存，请求接口数据时要用
                wx.setStorageSync('token', res.data.access_token); 
                app.globalData={ 
                    isLogin: true,
                    token:res.data.access_token,
                }
                wx.hideLoading();
                this.getLoginUser()    
              },
            failed:(res)=>{
              wx.hideLoading();
            }
          })
          }
        })
  },
  onError(){
        this.setData({
            avatarUrl: "../../static/icon/user.png"
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
    this.getLoginUser()    
  },
  getLoginUser(){
    http.request({
        url:'/loginUser',
        method:'GET',
        then:(res)=>{
        this.setData({
            isLogin:  res.data.login,  
            avatarUrl: res.data.avatarUrl,
            nickName: res.data.nickName
        })
         wx.stopPullDownRefresh();
        },
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
    this.getLoginUser()   
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
    }else{
    wx.navigateTo({
      url: '/pages/user/user'
    })
    }
  }
})