// pages/collection/collection.js
var http = require("../../utils/http");
import deviceUtil from "../../dist/utils/device-util"

Page({

  /**
   * 页面的初始数据
   */
  data: {
        capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
        collectionType:0,
        activeId:-1,
        hasData:true,
        typeList:[
          {
            typeId:"0",
            typeName:"全部"
          },
          {
            typeId:"1",
            typeName:"诗文"
          },
          {
            typeId:"2",
            typeName:"作者"
          }
        ],
        collectionList:[],
        pageNum:1,
        show: false,
        loading:true,
        pageSize: 10
  },
  changeCurrent(e){
    this.setData({
      collectionType:e.detail.activeKey,
      pageNum:1,
      activeId:-1
    })
    this.indexCollection()
  },
  slideopen(e){
      this.setData({
        activeId:e.target.dataset.id
        })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.indexCollection()
  },
  indexCollection(){
    this.setData({
      loading: true,
    })
   http.request({
      url: '/collection?collectionType='+this.data.collectionType,
      method:'GET',
      then:(res) => {
        this.setData({
        pageNum:this.data.pageNum+1,
        collectionList:res.data,
        pageSize:res.data.length,
         hasData:res.data.length !== 0
        })
      },
      failed:(res)=>{
        console.log(res);
      }
      });
  
  },
  deleteCollection(e){
    var index=e.currentTarget.dataset.id
   var collectionList=this.data.collectionList
    http.request({
      url: '/collection/'+collectionList[index].id,
      method:'DELETE',
      then:(res) => {

        collectionList.splice(index,1)
        this.setData({
        collectionList:collectionList,
        show: true,
        type: 'success',
        duration: 1500,
        content: '删除成功'
        })
      },
      failed:(res)=>{
        console.log(res);
      }
      });     
  },
  toCollection(e){
    var collection=this.data.collectionList[e.currentTarget.dataset.id]
    console.log(collection);
    if (collection.collectionType===1) {
      wx.navigateTo({
        url: '/pages/poetry-detail/poetry-detail?id='+collection.resId,
      })
    }else if (collection.collectionType===2) {
      wx.navigateTo({
        url: '/pages/author-detail/author-detail?id='+collection.resId,
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
      url: '/collection?collectionType='+this.data.collectionType+"&pageNum="+this.data.pageNum,
     method:'GET',
      then:(res) => {
        this.setData({
          show: false,
          collectionList:this.data.collectionList.concat(res.data),
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