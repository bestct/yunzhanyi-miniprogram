// pages/storehouse/storehouse.js
import deviceUtil from "../../dist/utils/device-util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
      capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
      initValue:"",
      cardList:[
        {
          cardName:"选集",
          tagList:[
            {
              tagName:"诗经",
              tagId:14,
              subName:"中国最早的诗歌总集"
            },
            {
              tagName:"楚辞",
              tagId:127,
              subName:"浪漫主义诗歌总集"
            },
            {
              tagName:"乐府",
              tagId:65,
              subName:"民歌精华总集"
            },
            {
              tagName:"古诗十九首",
              tagId:469,
              subName:"南朝萧统所编诗集"
            },
            {
              tagName:"唐诗三百首",
              tagId:129,
              subName:"清代蘅塘退士编选诗集"
            },
            {
              tagName:"宋词三百首",
              tagId:129,
              subName:"朱孝臧所编词集"
            }
            ]
        },
        {
          cardName:"课本",
          tagList:[
            {
              anthologyId:1,
              tagName:"小学古诗词",
              tagId:4,
              subName:"望庐山瀑布"
            },
            {
              anthologyId:2,
              tagName:"小学文言文",
              tagId:384,
              subName:"曾子杀彘"
            },
            {
              anthologyId:3,
              tagName:"初中古诗词",
              tagId:359,
              subName:"江城子·密州出猎"
            },
            {
              anthologyId:4,
              tagName:"初中文言文",
              tagId:159,
              subName:"塞翁失马"
            },
            {
              anthologyId:5,
              tagName:"高中古诗词",
              tagId:71,
              subName:"念奴娇·赤壁怀古"
            },
            { 
              anthologyId:6,
              tagName:"高中文言文",
              tagId:33,
              subName:"荆轲刺秦王"
            }
            ]
        }
      ]
  },
  search(e){
    var value=e.detail.value
    if (value!==null&&value!=="") {
      wx.navigateTo({
        url: '/pages/search/search?kw='+value,
      })
      this.setData({
        initValue:""
      })
    }else{
      wx.showToast({
        title: '搜索内容不能为空',
        icon: "none"
      })
    }
  },
  
  toAllPoetry(){
    wx.navigateTo({
      url: '/pages/poetry-index/poetry-index',
    })
  },
  toAllAuthor(){
    wx.navigateTo({
      url: '/pages/author-index/author-index',
    })
  },
  toTag(e){
    var tag=e.currentTarget.dataset.tag
    if (tag.anthologyId) {
      wx.navigateTo({
      url: '/pages/anthology/anthology?id='+tag.anthologyId+"&name="+tag.tagName,
    })
    }else{
      wx.navigateTo({
      url: '/pages/poetry-index/poetry-index?tagId='+e.currentTarget.dataset.tag.tagId+"&tagName="+e.currentTarget.dataset.tag.tagName,
    })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
 toPoetryDetail (e) {
      wx.navigateTo({
          url: `/pages/poetry_detail/poetry_detail?id=10051`,
        })
 },
  toPoetryDetail1 (e) {
      wx.navigateTo({
          url: `/pages/poetry_detail/poetry_detail?id=1005`,
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