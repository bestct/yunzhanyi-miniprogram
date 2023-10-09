// pages/account/account.js
var http = require("../../utils/http");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    account:{
      phone:"",
      email:"",
      miniBind:false,
      hasPassword:false
    }
  },
  bindPhone(){
    if (this.checkHasPassword()) {
      console.log("phone");
    }  
  },

  bindEmail(){
    if (this.checkHasPassword()) {
      console.log("email");
    }  
  },

  changePassword(){
    if (this.checkHasPassword()) {
      console.log("password");
    }  
  },
  checkHasPassword(){
    if (this.data.account.hasPassword) {
      return true;
    } else {
      this.setData({show:true})
      return false
    }
  },
  bindMini(){
    wx.login({
        success: res => {
          http.request({
            url:'/bind/openid?principal='+res.code,
            method:'post',
            then:(res)=>{
              wx.showToast({
                title: "绑定成功",
                icon: "none"
              });
           },
            failed:(res)=>{

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
      
      var that=this;
      http.request({
            url:"/account/mini",
            method:'get',
            then:(res)=>{
              that.setData({
                account:res.data
              })
            },
            failed:(res)=>{
            }
          })
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

  }
})