var http = require("../../utils/http");
import deviceUtil from "../../dist/utils/device-util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        author:{},
        isExist:false,
        collection:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    if (options.id) {
      wx.setStorageSync('shareId', options.id)
      this.loadDetail(options.id)
    }
  },
   toDynasty(e){
    wx.navigateTo({
      url: '/pages/author-index/author-index?dynastyId='+this.data.author.dynastyId
    })
  },
  loadDetail(id) {
      http.request({
      url: '/author/'+id,
      method:'GET',
      then:(res) => {
        wx.setNavigationBarTitle({
          title: res.data.authorName+' 诗人详情',
        })
        this.setData({
          author: res.data,
          isExist: true,
          collection:res.data.collection
          })
      },
      failed:(res)=>{
        console.log(res);
      }
      });
  },
collection(){
    if (this.data.collection) {
      http.checkLogin(this.cancelCollection)
    }else{
      http.checkLogin(this.doCollection)
    }
},
cancelCollection(hasLogin){
  var resId =this.data.author.id
 if (hasLogin) {
  this.loadDetail(resId)  
  }else{
    http.request({
      url: '/collection?resId='+resId+"&collectionType=2",
      method:'DELETE',
      then:(res) => {
        this.setData({
          collection:false
        })
      },
      failed:(res)=>{
        console.log(res);
      }
      });    
  }
},
doCollection(hasLogin){
  var resId =this.data.author.id
  if (hasLogin) {
  this.loadDetail(resId)  
  }else{
    http.request({
        url: '/collection?resId='+resId+"&collectionType=2",
        method:'POST',
        then:(res) => {
      
          this.setData({
          collection:true,
            show: true,
            type: 'success',
            duration: 1500,
            content: '收藏成功'
          })
        },
      failed:(res)=>{
        console.log(res);
      }
    })
  }
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