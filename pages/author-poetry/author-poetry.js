// pages/author-poetry/author-poetry.js
var http = require("../../utils/http");
Page({
  data: {
    name:'',
    keyword:"",
    poetryList:[],
    authorId:0,
    pageNum:1,
    show: false,
    loading:false,
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad(options) {
    if (options.id) {
       wx.setNavigationBarTitle({
          title: options.name+'全部作品',
        })
      this.setData({
        authorId:options.id,
        name:options.name
      })
      this.loadPoetry()
    }
  },
  toPoetry(e){
  wx.navigateTo({
      url: '/pages/poetry-detail/poetry-detail?id='+e.currentTarget.dataset.id
    })
  },
  toDynasty(e){
    wx.navigateTo({
      url: '/pages/author-index/author-index?dynastyId='+e.currentTarget.dataset.id
    })
  },
  toAuthor(e){
    wx.navigateTo({
      url: '/pages/author-detail/author-detail?id='+e.currentTarget.dataset.id
    })
  },
  onClear(e){
    var value=''
    if (this.data.keyword !== '') {
        this.search(value)
    }
  },
  onConfirm(e){
    var value=e.detail.value
    this.search(value)
  },
  onChange(e){
    var value=e.detail.value
    if (this.data.keyword !== '' && value == '') {
        this.search(value)
    }
  },
    search(value){
      this.setData({
        pageNum:1,
        poetryList:[],
        keyword:value,
        loading:false,
        pageSize: 10
      })
      this.loadPoetry()
  },
  loadPoetry(){
    if (this.data.loading ||this.data.pageSize<10) {
        return;
    }
    this.setData({
        show: true,
        loading:true,
        type: 'loading'
    });
    http.request({
      url: '/author/poetry/'+this.data.authorId+"?pageNum="+this.data.pageNum+"&searchVal="+this.data.keyword,
      method:'GET',
      then:(res) => {
        this.setData({
          loading:false,
          show: false,
          poetryList:this.data.poetryList.concat(res.data.list),
          pageNum:this.data.pageNum+1,
          pageSize:res.data.list.length
        });
        if (this.data.pageSize < 10) {
            this.setData({
                show: true,
                loading:false,
                type: 'end',
            });
        }
      },
      failed:(res)=>{
       this.setData({
        show: true,
        loading:false,
        type: 'end',
        });
      }
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
    this.loadPoetry()          
 },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})