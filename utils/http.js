//统一的网络请求方法
function request(params) {
  var app=getApp()
  var globalData = app.globalData;
    wx.request({
       url: 'https://www.yunzhanyi.net/api'+params.url,
       method: params.method,
       data: params.data,     
       timeout: 5000,
       header: {
      'Authorization': params.login ? undefined : globalData.token 
      },
     success: (result) => {
         let code= result.data.code
        if (code===200) {
          params.then(result.data) 
        }else if (code===401 || code===403) {
          params.showLogin=params.showLogin===undefined ? true:params.showLogin;
          if (params.showLogin) {                       
            wx.showToast({
            title: result.data.msg,
            icon: "none"
            });
          }
          wx.setStorageSync('token', ''); 
          wx.setStorageSync('nickName', '')
          wx.setStorageSync('avatarUrl', '')
          app.globalData={ 
          isLogin: false,
          token:'',
          avatarUrl:'/static/icon/user.png',
          nickName:'点击登录'
         }
        }
      else if (code===500) {
           var title="服务器出了点小差"
           if (result.data.msg) {
             title=result.data.msg
           }
            wx.showToast({
            title: title,
            icon: "none"
            });
         }else if (code===404) {
            wx.showToast({
            title: "资源未找到",
            icon: "none"
            });
            if (params.failed !== undefined) { 
              params.failed(result.data)
            }
         }
        },
       fail: (res) => {
         console.log(res);
          wx.showToast({
            title: "未知错误",
            icon: "none"
            });
        if (params.failed !== undefined) { 
             params.failed(res)
        }
       }
     })
}

/**
 * 判断是否登录,若没有登录则调起 getUserProfile 登录请求
 * @param callback 回调函数
 * 
 */
 
function cheakLogin(callback) {
    var app=getApp()
    var globalData = app.globalData;
    
    if (globalData.isLogin) {
      callback(false)
    }else{
        wx.showLoading({
          title: '正在登录中.....',
      })
        wx.login({
          success: res => {
          request({
            url:'/login/mini?principal='+res.code,
            method:'post',
            then:(res)=>{
                //把token存入缓存，请求接口数据时要用
                wx.setStorageSync('token', res.data.access_token); 
                app.globalData={ 
                  isLogin: true,
                  token:res.data.access_token,
                  }
                  wx.hideLoading();
                  callback(true);
              },
            failed:(res)=>{
              wx.hideLoading();
            }
          })
      }
    })
    }  
}
exports.request = request;
exports.checkLogin=cheakLogin