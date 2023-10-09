// pages/user/user.js
var http = require("../../utils/http");

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    nickName:'',
    uid:'',
    signature:'',
    createdTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      http.request({
      url: "/profile",
      method:'GET',
      then:(res) => {
        this.setData({
            avatarUrl:res.data.avatarUrl,
            nickName:res.data.nickName,
            uid:res.data.uid,
            signature: res.data.signature,
            createdTime: res.data.createdTime
        })
        
        app.globalData.nickName=res.data.nickName
        wx.setStorageSync('nickName', res.data.nickName)
      }
    })
  },
  doSave(){
      http.request({
      url: "/save/user",
      method:'POST',
      data:{
          avatarUrl: this.data.avatarUrl,
          nickName:this.data.nickName,
          signature:this.data.signature
      },
      then:(res) => {
          
          this.setData({
            show: true,
            type: 'success',
            duration: 1500,
            content: '保存成功'
          })
      }
    })
  },
  onChooseAvatar(e) {
      app.globalData.avatarUrl=e.detail.avatarUrl
      wx.setStorageSync('avatarUrl', e.detail.avatarUrl)    
        this.setData({
             avatarUrl:e.detail.avatarUrl
         })
  },
  onError(){
        this.setData({
            avatarUrl: "../../static/icon/user.png"
        })
  },
  onNikeName(e){
      this.setData({
             nickName:e.detail.value
        })
  },
    onSignature(e){
      this.setData({
             signature:e.detail.value
        })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  
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

  }
})