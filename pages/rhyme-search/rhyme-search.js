// pages/rhyme-search/rhyme-search.js

var http = require("../../utils/http");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    initValue:'',
    rhymeData:[]
  },
  searchRhyme(e){
    var value=e.detail.value
    if (value==null||value=="") {
      wx.showToast({
      title: '搜索内容不能为空',
      icon: "none"
      })
      return;
    }
    var reg = /^[\u4E00-\u9FA5]+$/; 
      if (!reg.test(value)|| value.length>2) {
      wx.showToast({
        title: '搜索内容只能是一个汉字',
        icon: "none"
        })
       return
     }
     http.request({
            url: '/rhyme/search?hanZi='+value,
            method:'GET',
            then:(res) => {
               console.log(res);
                this.setData({
                    rhymeData:res.data
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