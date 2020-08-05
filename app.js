//app.js
App({
  data: {
    // requestHost: "https://lbwl.wingstudio.org",
    requestHost: "https://nadev.cn/house",
    isLogin: false,
    isBusiness: false,
    currentEmail: "",
    width: 0,
    height: 0,
    currentEmailCoinCount: "",
    userInfo: {},
    openId: "",
    mapKey: 'OVUBZ-MLPL6-MQPSJ-MR2KT-MWFIK-O6FUE'
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    var width = 0;
    var height = 0;
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth;
        height = res.windowHeight;
      }

    });
    this.data.width = width;
    this.data.height = height;
  },
  verifyLogin:function(){
    //这个函数用于在需要进行用户校验的地方,先进行判断,是否已经注册(token是否过期,token是否合法),若已经注册则不执行操作,若未注册,则跳转至注册页面  返回promise
    return new Promise((resolve)=>{
      const token = wx.getStorageSync('token')
      if(!token){
        wx.navigateTo({
          url: "/pages/wxLogin/wxLogin?status='null",
        })
        return
      }
      this.ajaxMethod(`/user/token/${token}`).then(res=>{
        // console.log(res)
        let tokenStatus = res.data.status
        return new Promise((resolve,reject)=>{
          if(tokenStatus==1){
            reject(tokenStatus)//验证成功,不进行操作
          }else{
            resolve(tokenStatus)
          }
        })
      })
      .then(tokenStatus=>{
        //验证过期,需要重新登录
        wx.navigateTo({
          url: "/pages/wxLogin/wxLogin?status='expired'"
        })
      })
      .catch(success=>{
        resolve(success)
      })
    })
    
    
  },
  ajaxMethod(url,method,data){
    return new Promise((resolve,reject)=>{
      wx.request({
        url: `${this.data.requestHost}${url}`,
        data:data,
        method,
        header:{
          'content-type': 'application/x-www-form-urlencoded',
          "Authorization":wx.getStorageSync("token")
        },
        success(res){
          resolve(res)
        },
        fail(err){
          reject(err)
        }
      })
    })
  }
});