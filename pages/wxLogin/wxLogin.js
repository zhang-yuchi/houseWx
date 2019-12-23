var app = getApp();
var ajax = require('../../utils/ajax.js')
Page({
  data: {
    userInfo: {},
    code: '',
    authShow: "block",
    loginShow: "none"
  },
  onLoad: function () {
    var that = this;
    
    var token = wx.getStorageSync('token');
    console.log(token)
    if(token){
      wx.request({
        url: app.data.requestHost+'/user/token/'+token,
        header:{
          'content-type': 'application/x-www-form-urlencoded',
        },
        success(res){
          //如果有信息则直接跳转index页面
          console.log(res)
          if(res.data.status===1){
            wx.reLaunch({
              url: '../index/index',
            })
          }
        }
      })
    }
    // if (token) {
    //   //用户已有登录态，检查token是否过期，过期重新登录
    //       wx.request({
    //         url: app.data.requestHost + '/tokenCheck',
    //         method: 'POST',
    //         header: {
    //           'content-type': 'application/json',
    //         },
    //         data: {token:token},
    //         success: res => {
    //           console.log(res.data);
    //           if (res.data.data == "token未过期" && res.data.status== "200"){
    //             wx.reLaunch({
    //               url: '../index/index',
    //             })
    //           }else{

    //           }
    //         },
    //         fail: res => {
    //           console.log("failed");
    //         }
    //       })
    // } else {
    //   // 用户未登录,啥都不做，留在本页面进行微信授权登录
      
    // }
  },

  // 点击按钮授权
  getUserInfo: function (e) {
    var that = this;
    that.setData({
      userInfo: e.detail.userInfo,
      authShow: "none",
      loginShow: "block",
    })
    app.data.userInfo = e.detail.userInfo;
    wx.setStorageSync('userInfo', e.detail.userInfo)
    new Promise((resolve)=>{
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
            })
          }
          resolve()
        }
      })  
    }).then(()=>{
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userLocation']) {
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)
              }
            })
          }
        }
      })  
    })
    
    
    
  },

  // 登陆
  login: function () {
    var that = this;
    wx.login({
      success:res=>{
        const code = res.code
        wx.request({
          url: `${app.data.requestHost}/user/login`,
          data:{code:res.code},
          method: "POST",
          header:{
            'content-type': 'application/x-www-form-urlencoded',
          },
          success(res){
            console.log(res)
            const userinfo = wx.getStorageSync("userInfo")
            if(res.status==-1){
              console.log(wx.getStorageSync("userInfo"))
              wx.login({
                success:res=>{
                  let secCode = res.code
                  wx.request({
                    url: `${app.data.requestHost}/user/register`,
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                    },
                    method: "POST",
                    data: {
                      authImgUrl: userinfo.avatarUrl,
                      city: userinfo.city,
                      country: userinfo.country,
                      nickName: userinfo.nickName,
                      province: userinfo.province,
                      gender: userinfo.gender,
                      language: userinfo.language,
                      code: secCode
                    },
                    success(res) {
                      console.log(res)
                      wx.redirectTo({
                        url: '../index/index',
                      })
                    },

                  })
                }
              })
              
            }else{
              //已注册,直接登录
              wx.setStorageSync("token", res.data.data)
              console.log(res.data.data)
              wx.reLaunch({
                url: '../index/index',
              })
            }
          },
          fail: res => {
            wx.showModal({
              title: '登陆失败',
              content: '请重试!',
              showCancel: false,
              confirmColor: '#f95a70',
            })
          }
        })
      }
    })
    // wx.switchTab({
    //   url: '../index/index',
    // })
    // wx.login({
    //   success: res => {
    //     var code = res.code;
    //     var data = {
    //       userInfo: that.data.userInfo,
    //       code: code
    //     }
    //     wx.request({
    //       url: app.data.requestHost + '/wxLogin',
    //       method: 'POST',
    //       header: {
    //         'content-type': 'application/x-www-form-urlencoded',
    //       },
    //       data: data,
    //       success: res => {
    //         console.log(res.data);
    //         if(res.data.status == "200" && res.data.code == "1"){
    //           app.data.isLogin = true;
    //           wx.setStorageSync('token', res.data.data.userToken);
    //           wx.setStorageSync('id', res.data.data.id);
    //           wx.setStorageSync('isFd', res.data.data.isFd);
    //           wx.reLaunch({
    //             url: '../index/index',
    //           })
    //         }
    //       },
    //       fail: res => {
    //         wx.showModal({
    //           title: '登陆失败',
    //           content: '请重试!',
    //           showCancel: false,
    //           confirmColor: '#f95a70',
    //         })
    //       }
    //     })
    //   }
    // })
    
    
  },

  // 获取code
  getCode: function () {
    var that = this;
    wx.login({
      success: res => {
        console.log(res.code);
        that.setData({
          code: res.code
        })
      }
    })
  }

})