// pages/about/about.js

import deviceUtil from "../../dist/utils/device-util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
  },
  copySite(){
    console.log("hhheh");
      wx.setClipboardData({//复制文本
        data: "https://www.yunzhanyi.net",
         success: function (res) {
               wx.showToast({
                title: '复制成功',
                icon:"none",
                mask:"true"//是否设置点击蒙版，防止点击穿透
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