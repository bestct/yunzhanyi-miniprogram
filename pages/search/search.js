// pages/search/search.js
var http = require("../../utils/http");
import deviceUtil from "../../dist/utils/device-util"
Page({
  data: {
        pageNum:1,
        show: false,
        loading:false,
        pageSize: 10,
        typeList:[
        {
            typeId:"poetry",
            typeName:"诗文"
        },
        {
          typeId:"author",
          typeName:"作者"
        },
       ],
        poetryList:[],
        authorList:[],
        keyword:"",
        initValue:"",
        searchType:"poetry"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.kw){
      this.setData({
        keyword:options.kw,
        initValue:options.kw
      })
    }
    this.loadData()
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
     var searchType=this.data.searchType
    if (searchType==="poetry") {
      this.setData({
        pageNum:1,
        poetryList:[],
        keyword:value,
        loading:false,
        pageSize: 10
      })
    }else if (searchType==="author") {
      this.setData({
        pageNum:1,
        authorList:[],
        keyword:value,
        loading:false,
        pageSize: 10
      })
    }
    this.loadData()
  },
  changeCurrent(e){
     var searchType=this.data.searchType
    if (searchType==="poetry") {
        this.setData({
            searchType: e.detail.activeKey,
            pageNum:1,
            authorList:[],
            loading:false,
            pageSize: 10
        })
    } else if (searchType==="author") {
        this.setData({
            searchType: e.detail.activeKey,
            pageNum:1,
            poetryList:[],
            loading:false,
            pageSize: 10
        }) 
    }
    this.loadData()
  },
  loadData(){
    if (this.data.loading ||this.data.pageSize<10) {
        return;
    }
    this.setData({
        show: true,
        loading:true,
        type: 'loading'
    });
    var searchType=this.data.searchType
      http.request({
        url: '/search?searchType='+searchType+'&keyword='+this.data.keyword+'&pageNum='+this.data.pageNum,
        method:'GET',
        then:(res) => {
          if (searchType==="poetry") {
            this.setData({
            loading:false,
            show: false,
            poetryList:this.data.poetryList.concat(res.data.list),
            pageNum:this.data.pageNum+1,
            pageSize:res.data.list.length,
            })
        }else if (searchType==="author") {
          this.setData({
            loading:false,
            show: false,
            authorList:this.data.authorList.concat(res.data.list),
            pageNum:this.data.pageNum+1,
            pageSize:res.data.list.length,
          })
        }
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
    });
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
  toAuthor(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/author-detail/author-detail?id='+e.currentTarget.dataset.id
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

    onReachBottom() {
        this.loadData()
    },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})