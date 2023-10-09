// pages/anthology/anthology.js
var http = require("../../utils/http");
import deviceUtil from "../../dist/utils/device-util"
Page({
  data: {
    capsuleBarHeight: deviceUtil.getNavigationBarHeight(),
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    title:"",
    list: [],
    load: true
  },
  onLoad(options) {
    this.setData({
      title : options.name
    })
    wx.setNavigationBarTitle({
          title: options.name,
        })
    http.request({
      url: "/anthology/list/"+options.id,
      method:'GET',
      then:(res) => {
        let list = [{}];
        for (let i = 0; i < res.data.length; i++) {
            list[i] = {};
            list[i].name = res.data[i].anthologyName;
            list[i].id = i;
            list[i].poetryList=res.data[i].anthologyPoetryList
        }
        this.setData({
          list: list,
          listCur: list[0]
        })
      }
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})