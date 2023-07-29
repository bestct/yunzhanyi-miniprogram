var http = require("../../utils/http");
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      account:"",
      password:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
   onLoad(options) {
   },
   onAccountInput(e){
    if (e.detail.value) {
    this.setData({
      account:e.detail.value
    }) 
    }else{
      this.setData({
      account:""
    })
    }
   },
   onPasswordInput(e){
    if (e.detail.value) {
      this.setData({
      password:e.detail.value
      }) 
    } else{
      this.setData({
      password:""
    })
    }
   },
   login(){
     var account=this.data.account
     var password=this.data.password
     if (this.checkAccount(account,password)) { 
      wx.showLoading({
          title: '正在登录中.....',
      })
      http.request({
            url:'/login?account='+account+"&password="+password,
            method:'post',
            then:(res)=>{
                //把token存入缓存，请求接口数据时要用
                wx.setStorageSync('token', res.data); 
                app.globalData={ isLogin: true,token:res.data}
                wx.hideLoading();
                wx.navigateBack({
                  delta: 1
                })
            },
            failed:(res)=>{
              wx.hideLoading();
            }
          })
      }
   },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
          wx.showLoading({
          title: '正在登录中.....',
      })
        var userInfo = res.userInfo
        wx.login({
          success: res => {
            http.request({
            url:'/login/mini?principal='+res.code,
            method:'post',
            data:{
              avatarUrl:userInfo.avatarUrl,
              nickName:userInfo.nickName
            },
            then:(res)=>{
                //把token存入缓存，请求接口数据时要用
                wx.setStorageSync('token', res.data); 
                app.globalData={ isLogin: true,token:res.data}
                wx.hideLoading();
                wx.navigateBack({
                  delta: 1
                })
            },
            failed:(res)=>{
              wx.hideLoading();
            }
          })
          }
        })
      }
    })
  },

  checkAccount(account,password){
     if (account==="") {
      this.setData({
        show: true,
        type: 'error',
        duration: 1500,
        content: '账号不能为空'
      });
       return false;
     }
     if (!this.isPhoneNumber(account)&&!this.isEmail(account)) {
        this.setData({
        show: true,
        type: 'error',
        duration: 1500,
        content: '账号不符合格式'
      });
       return false;
     }
     if (password.length<8) {
         this.setData({
        show: true,
        type: 'error',
        duration: 1500,
        content: '密码不能小于8'
      });
       return false;
     }
     return true;
  },
/**
 * 判断是否是手机号
 * @param tel
 * @returns {boolean}
 */
 isPhoneNumber(tel) {
    const reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(tel);
},

/**
 * 判断是否是邮箱
 * @param email
 * @returns {boolean}
 */
isEmail(email) {
    const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(email);
}
})