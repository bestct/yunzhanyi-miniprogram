// pages/poetry-check/poetry-check.js
var http = require("../../utils/http");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  forms:null,
  formList:[
  {
    "formsCode": "31201,00114;20011,31104;31201,00114;20011,31104",
    "formsId": "1-1",
    "formsName": "五律·仄起首句不入韵"
  },
  {
    "formsCode": "31104,00114;20011,31104;31201,00114;20011,31104",
    "formsId": "1-2",
    "formsName": "五律·仄起首句入韵"
  },
  {
    "formsCode": "20011,31104;31201,00114;20011,31104;31001,00114",
    "formsId": "1-3",
    "formsName": "五律·平起首句不入韵"
  },
  {
    "formsCode": "00114,31104;31201,00114;20011,31104;31001,00114",
    "formsId": "1-4",
    "formsName": "五律·平起首句入韵"
  },
  {
    "formsCode": "31201,00114;20011,31104",
    "formsId": "2-1",
    "formsName": "五绝·仄起首句不入韵"
  },
  {
    "formsCode": "31124,00114;20011,31104",
    "formsId": "2-2",
    "formsName": "五绝·仄起首句入韵"
  },
  {
    "formsCode": "20011,31104;31201,00114",
    "formsId": "2-3",
    "formsName": "五绝·平起首句不入韵"
  },
  {
    "formsCode": "00114,31104;31201,00114",
    "formsId": "2-4",
    "formsName": "五绝·平起首句入韵"
  },
  {
    "formsCode": "3120011,2031104;2031201,3100114;3120011,2031104;2031201,3100114",
    "formsId": "3-1",
    "formsName": "七律·仄起首句不入韵"
  },
  {
    "formsCode": "3100114,2031104;2031201,3100114;3120011,2031104;2031201,3100114",
    "formsId": "3-2",
    "formsName": "七律·仄起首句入韵"
  },
  {
    "formsCode": "2031201,3100114;3120011,2031104;2031201,3100114;3120211,2031104",
    "formsId": "3-3",
    "formsName": "七律·平起首句不入韵"
  },
  {
    "formsCode": "2031104,3100114;3120011,2031104;2031201,3100114;3120211,2031104",
    "formsId": "3-4",
    "formsName": "七律·平起首句入韵"
  },
  {
    "formsCode": "3120011,2031104;2031201,3100114",
    "formsId": "4-1",
    "formsName": "七绝·仄起首句不入韵"
  },
  {
    "formsCode": "3100114,2031104;2031201,3100114",
    "formsId": "4-2",
    "formsName": "七绝·仄起首句入韵"
  },
  {
    "formsCode": "2031201,3100114;3120011,2031104",
    "formsId": "4-3",
    "formsName": "七绝·平起首句不入韵"
  },
  {
    "formsCode": "2031104,3100114;3120011,2031104",
    "formsId": "4-4",
    "formsName": "七绝·平起首句入韵"
  }
],
 typeList: [{
  id:1,
  name:'五律'
  },
  {
  id:2,
  name:'五绝'
  }, 
        {
          id:3,
          name:'七律'
        }, 
        {
          id:4,
          name:'七绝'
         }],
      firstList: [{
        id:1,
        name:'仄起'
       },
       {
         id:2,
         name:'仄起入韵'
        }, 
        {
          id:3,
          name:'平起'
        }, 
        {
          id:4,
          name:'平起入韵'
         }],
      bookList: [{
        id:1,
        name:'平水韵'
       },
        {
          id:3,
          name:'中华新韵'
        }, 
        {
          id:4,
          name:'中华通韵'
         }],
         typeIndex: 0,
         firstIndex: 0,
         bookIndex:0,
         pingze:"",
         suggest:"",
         formHtml:"",
         formsName:"",
         content:"",
         checked:false,
         bookName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  if (options.formType) {
    this.setData({
      typeIndex:parseInt(options.formType)-1
      })
  }
  if (options.firstType) {
    this.setData({
      firstIndex:parseInt(options.firstType)-1
      })
  }
  this.loadForm()
  },
  
  loadForm(){
    let formId=(parseInt(this.data.typeIndex)+1)+"-"+(parseInt(this.data.firstIndex)+1)
    let formCode=""
    let formsName=""
    var formList=this.data.formList
    for (const key in formList) {
        const element = formList[key];
        if (element.formsId===formId) {
          formCode=element.formsCode
          formsName=element.formsName
          break
        }
    }
  let formHtml=""
  for (let i in formCode) {
    let char=formCode[i]
    if (char!==';'&&char!==',') {
        switch (char) {
        case '0':
        formHtml+="平"
        break;
        case '1':
        formHtml+="仄"
          break;
        case '2':
        formHtml+="<span style='color: gray'>"+"平"+"</span>"
          break;
        case '3':
        formHtml+="<span style='color: gray'>"+"仄"+"</span>"
          break;
        case '4':
        formHtml+="<span style='color: purple'>"+"平"+"</span>"
          break;
        case '5':
        formHtml+="<span style='color: purple'>"+"仄"+"</span>"
          break;
        default:
          break;
      }  
    }else{
      if (char===',') {
      formHtml+="，"
      }else{
      formHtml+="<br/>"
      }
    }
  }
  this.setData({
    formHtml:formHtml,
    formsName:formsName
  })
  },
  listenValue(e){
    //太乙近天都连山接海隅白云回望合青霭入看无分野中峰变阴晴众壑殊欲投人处宿隔水问樵夫
  this.setData({
    content:e.detail.value
  })
  },

  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
    this.loadForm()
  },
  bindFirstChange: function (e) {
    this.setData({
      firstIndex: e.detail.value
    })
    this.loadForm()
  },
  doCheck(){
    let typeIndex=parseInt(this.data.typeIndex)+1
    let firstType=parseInt(this.data.firstIndex)+1
    let bookId=this.data.bookList[this.data.bookIndex].id
     http.request({
      url: '/rhyme/check',
      method:'POST',
      data:{
        rhymeBookId:bookId,
        checkContent:this.data.content,
        formType:typeIndex,
        firstType:firstType
      },
      then:(res) => {
        this.setData({
          pingze:res.data.codeResult,
          suggest:res.data.suggest,
          checked:true,
          bookName:this.data.bookList[this.data.bookIndex].name
      })
      },
      failed:(res)=>{
        console.log(res);
      }
      });
  },
  bindBookChange: function (e) {
    this.setData({
      bookIndex: e.detail.value
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