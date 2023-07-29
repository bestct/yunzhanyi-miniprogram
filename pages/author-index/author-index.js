// pages/author-index/author-index.js
var http = require("../../utils/http");
import deviceUtil from "../../dist/utils/device-util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    show: false,
    loading:true,
    pageSize: 10,
    authorList:[],
    dynastyId:'0',
    hasData:true,
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
    dynastyList:[{dynastyId:0,dynastyName:"全部"},{dynastyId:1,dynastyName:"先秦"},{dynastyId:2,dynastyName:"两汉"},{dynastyId:3,dynastyName:"魏晋"},{dynastyId:4,dynastyName:"南北朝"},{dynastyId:5,dynastyName:"隋代"},{dynastyId:6,dynastyName:"唐代"},{dynastyId:7,dynastyName:"五代"},{dynastyId:8,dynastyName:"宋代"},{dynastyId:9,dynastyName:"辽朝"},{dynastyId:10,dynastyName:"金朝"},{dynastyId:11,dynastyName:"元代"},{dynastyId:12,dynastyName:"明代"},{dynastyId:13,dynastyName:"清代"},{dynastyId:14,dynastyName:"近现代"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log();
    if (options.dynastyId) {
      this.setData({
        dynastyId:options.dynastyId,
        activeKey:options.dynastyId
      });
    }
    this.indexAuthor()
  }, 
  indexAuthor(){
    this.setData({
      loading: true
    })
      http.request({
      url: "/index/author?pageNum="+this.data.pageNum+"&dynasty="+this.data.dynastyId,
      method:'GET',
      then:(res) => {
        this.setData({
          show: false,
          authorList:res.data,
          pageNum:this.data.pageNum+1,
          pageSize:res.data.length,
         hasData:res.data.length !== 0
        });
      }
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
  changeCurrent(e){
    console.log(e.detail.activeKey);
      this.setData({
        pageNum:1,
        dynastyId:e.detail.activeKey
      });
      this.indexAuthor()
  },
  toAuthor(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/author-detail/author-detail?id='+e.currentTarget.dataset.id
    })
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },

  //回到顶部
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
      
   if (this.data.loading && this.data.pageSize === 10) {
      this.setData({
        show: true,
        type: 'loading'
      });
      http.request({
      url: '/index/author?pageNum='+this.data.pageNum+"&dynasty="+this.data.dynastyId,
      method:'GET',
      then:(res) => {
        this.setData({
          show: false,
          authorList:this.data.authorList.concat(res.data),
          pageNum:this.data.pageNum+1,
          pageSize:res.data.length
        });
      }
    })  
  }
  if (this.data.loading && this.data.pageSize < 10) {
      this.setData({
          show: true,
          type: 'end',
          loading: false
        });
  }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})