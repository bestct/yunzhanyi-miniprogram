// pages/rhyme/rhyme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formList:[
      {
        "firstType": 1,
        "formType": 1,
        "formsName": "五律·仄起首句不入韵"
      },
      {
        "firstType": 2,
        "formType": 1,
        "formsName": "五律·仄起首句入韵"
      },
      {
        "firstType": 3,
        "formType": 1,
        "formsName": "五律·平起首句不入韵"
      },
      {
        "firstType": 4,
        "formType": 1,
        "formsName": "五律·平起首句入韵"
      },
      {
        "firstType": 1,
        "formType": 2,
        "formsName": "五绝·仄起首句不入韵"
      },
      {
        "firstType": 2,
        "formType": 2,
        "formsName": "五绝·仄起首句入韵"
      },
      {
        "firstType": 3,
        "formType": 2,
        "formsName": "五绝·平起首句不入韵"
      },
      {
        "firstType": 4,
        "formType": 2,
        "formsName": "五绝·平起首句入韵"
      },
      {
        "firstType": 1,
        "formType": 3,
        "formsName": "七律·仄起首句不入韵"
      },
      {
        "firstType": 2,
        "formType": 3,
        "formsName": "七律·仄起首句入韵"
      },
      {
        "firstType": 3,
        "formType": 3,
        "formsName": "七律·平起首句不入韵"
      },
      {
        "firstType": 4,
        "formType": 3,
        "formsName": "七律·平起首句入韵"
      },
      {
        "firstType": 1,
        "formType": 4,
        "formsName": "七绝·仄起首句不入韵"
      },
      {
        "firstType": 2,
        "formType": 4,
        "formsName": "七绝·仄起首句入韵"
      },
      {
        "firstType": 3,
        "formType": 4,
        "formsName": "七绝·平起首句不入韵"
      },
      {
        "firstType": 4,
        "formType": 4,
        "formsName": "七绝·平起首句入韵"
      }
    ],
    rhymeBookList:[
      {
        rhymeBookId:1,
        rhymeBookName:"平水韵",
        rhymeBookImage:"../../static/img/psy.jpg"
      },
      {
        rhymeBookId:2,
        rhymeBookName:"词林正韵",
        rhymeBookImage:"../../static/img/clzy.jpg"       
        },
        {
          rhymeBookId:3,
          rhymeBookName:"中华新韵",
          rhymeBookImage:"../../static/img/zhxy.jpg"
        },
        {
          rhymeBookId:4,
          rhymeBookName:"中华通韵",
          rhymeBookImage:"../../static/img/zhty.jpg"
        }
        ]    
  },

  toFromSearch(){
     wx.navigateTo({
      url: '/pages/rhyme-search/rhyme-search',
    })
  },
  toPoetryCheck(){
    wx.navigateTo({
      url: '/pages/poetry-check/poetry-check',
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