// pages/poetry_detail/poetry_detail.js
var http = require("../../utils/http");

// pages/storehouse/storehouse.js

  /**
   * 页面的初始数据
   */
  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentContent:"",
    poetry:{
    },
    isExist:false,
    collection:false,
    hasDetail:false
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
  
  loadDetail(id) {
      http.request({
      url: '/poetry/'+id,
      method:'GET',
      then:(res) => {
        var hasDetail=true
        if (res.data.poetryDetails[0].detailId===null) {  
          hasDetail=false
        }
        wx.setNavigationBarTitle({
          title: '《'+res.data.poetryTitle+'》诗词详情',
        })
        this.setData({
          poetry: res.data,
          currentContent:res.data.poetryDetails[0].detailContent,
          isExist: true,
          hasDetail:hasDetail,
          collection:res.data.collection,
          })
      },

      failed:(res)=>{
        console.log(res);
      }
      });
  
  },
  toTag(e){
    wx.navigateTo({
      url: '/pages/poetry-index/poetry-index?tagId='+e.target.dataset.tag.tagId+"&tagName="+e.target.dataset.tag.tagName,
    })
  },
  changeCurrent(e){
        this.setData({
          currentContent: this.data.poetry.poetryDetails[e.detail.currentIndex].detailContent  
          })
  },
  copyBtn(){
    var text = this.data.poetry.poetryTitle+"\n"+this.data.poetry.poetryDynasty+"·"+this.data.poetry.poetryAuthor+"\n"+this.data.poetry.poetryContent;
    wx.setClipboardData({//复制文本
        data: text,
         success: function (res) {
               wx.showToast({
                title: '复制成功',
                icon:"none",
                mask:"true"//是否设置点击蒙版，防止点击穿透
              })
        }
     })
  },
  collection(){
    if (this.data.collection) {
      http.checkLogin(this.cancelCollection)
    }else{
      http.checkLogin(this.doCollection)
    }
},
cancelCollection(hasLogin){
  var resId =this.data.poetry.poetryId
  if (hasLogin) {
  this.loadDetail(resId)  
  }else{
    http.request({
      url: '/collection?resId='+resId,
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
  var resId =this.data.poetry.poetryId
  if (hasLogin) {
  this.loadDetail(resId)  
  }else{
    http.request({
        url: '/collection?resId='+resId,
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