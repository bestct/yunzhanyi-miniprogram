// pages/poetry-index/poetry-index.js
var http = require("../../utils/http");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    show: false,
    loading:true,
    pageSize: 10,
    poetryList:[],
    dynastyId:'0',
    tagId:'0',
    hasData:true,
    dynastyList:[{dynastyId:0,dynastyName:"全部"},{dynastyId:1,dynastyName:"先秦"},{dynastyId:2,dynastyName:"两汉"},{dynastyId:3,dynastyName:"魏晋"},{dynastyId:4,dynastyName:"南北朝"},{dynastyId:5,dynastyName:"隋代"},{dynastyId:6,dynastyName:"唐代"},{dynastyId:7,dynastyName:"五代"},{dynastyId:8,dynastyName:"宋代"},{dynastyId:9,dynastyName:"辽朝"},{dynastyId:10,dynastyName:"金朝"},{dynastyId:11,dynastyName:"元代"},{dynastyId:12,dynastyName:"明代"},{dynastyId:13,dynastyName:"清代"},{dynastyId:14,dynastyName:"近现代"}],
    tagList: [{tagId:0,tagName:'全部'}, {tagId:600,tagName:'七夕'}, {tagId:29,tagName:'七夕节'}, {tagId:252,tagName:'不满'}, {tagId:362,tagName:'不舍'}, {tagId:611,tagName:'中秋'}, {tagId:27,tagName:'中秋节'}, {tagId:550,tagName:'丰收'}, {tagId:852,tagName:'乐器'}, {tagId:65,tagName:'乐府'}, {tagId:466,tagName:'乐曲'}, {tagId:300,tagName:'乐歌'}, {tagId:447,tagName:'乐舞'}, {tagId:218,tagName:'乐观'}, {tagId:484,tagName:'习俗'}, {tagId:640,tagName:'乡思'}, {tagId:348,tagName:'乡情'}, {tagId:326,tagName:'乡村'}, {tagId:684,tagName:'乡风'}, {tagId:332,tagName:'书信'}, {tagId:646,tagName:'书法'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.dynastyId) {
      this.setData({
        dynastyId:options.dynastyId,
        activeDynastyKey:options.dynastyId
      });
    }
    if (options.tagId) {
      var tagList=this.data.tagList
      var has = true;
      for (const key in tagList) {
        if (Object.hasOwnProperty.call(tagList, key)) {
          const element = tagList[key]; 
          if (element.tagId===options.tagId) {
            has=false;
            break;
          }
        }
      }
      if (has) {
      tagList.unshift({tagId:options.tagId,tagName:options.tagName})
      this.setData({
          tagList:tagList
        })
      }
      this.setData({
        tagId:options.tagId,
        activeTagKey:options.tagId
      });
    }
    this.indexPoetry()
  },
  indexPoetry(){
    this.setData({
      loading: true
    })
    var loading=false
    if (this.data.dynastyId==='0'&&this.data.tagId==='0') {
      wx.showLoading({
        title: '正在加载中',
      })
      loading=true
    }
      http.request({
      url: "/index/poetry?pageNum="+this.data.pageNum+"&dynasty="+this.data.dynastyId+"&tag="+this.data.tagId,
      method:'GET',
      then:(res) => {
        this.setData({
          show: false,
          poetryList:res.data,
          pageNum:this.data.pageNum+1,
          hasData:res.data.length !== 0,
          pageSize:res.data.length,
        });
        if (loading) {
          wx.hideLoading()
        }
      }
    })
  },
   changeDynastyCurrent(e){
      this.setData({
        pageNum:1,
        dynastyId:e.detail.activeKey
      });
      this.indexPoetry()
  },
  changeTagCurrent(e){
      this.setData({
        pageNum:1,
        tagId:e.detail.activeKey
      });
      this.indexPoetry()
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
 toPoetry(e){
  wx.navigateTo({
      url: '/pages/poetry-detail/poetry-detail?id='+e.currentTarget.dataset.id
    })
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
       url: "/index/poetry?pageNum="+this.data.pageNum+"&dynasty="+this.data.dynastyId+"&tag="+this.data.tagId,
        method:'GET',
      then:(res) => {
        this.setData({
          show: false,
          poetryList:this.data.poetryList.concat(res.data),
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