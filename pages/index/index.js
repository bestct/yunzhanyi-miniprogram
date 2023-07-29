// index.js
// 获取应用实例
var DEFAULT_PAGE = 0;

var http = require("../../utils/http");
Page({
  cardCur: 0,
  initValue:"",
  data: {
  partList:[],
  indexPoetry:{}
  },
  onLoad(options) {
    this.index()
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
  index(){
    http.request({
      url: '/index',
      method:'GET',
      then:(res) => {
        this.setData({
          indexPoetry:res.data.indexPoetry,
          partList:res.data.partList
        })
        this.towerSwiper("partList")

      },
      failed:(res)=>{
        console.log(res);
      }
    });
  
  },
  toPoetry(){       
     wx.navigateTo({
      url: '/pages/poetry-detail/poetry-detail?id='+this.data.indexPoetry.poetryId,
    })

  },
  toPoetryDetail (e) {
    wx.navigateTo({
      url: '/pages/poetry-detail/poetry-detail?id='+e.currentTarget.dataset.id,
    })

  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list,
      cardCur: 0
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;

    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
    }
  },

  })
