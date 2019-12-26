const app = getApp()
var ajax = require('../../utils/ajax.js');
module.exports = {
    pay(houseid, payItem, money) {
      ajax.requestByGet('/pay/prepayInfo/houseid/payItem/money', {}, function(res) {
          console.log(res)
          let payInfo = res.data.data;
          wx.requestPayment({
            timeStamp: payInfo.timeStamp,
            nonceStr: payInfo.nonceStr,
            package: payInfo.package,
            signType: 'MD5',
            paySign: payInfo.paySign,
            success: function(res) {
              wx.showToast({
                title: '支付成功',
              })
            },
            fail: function(res) {
              if (res.errMsg == "requestPayment:fail cancel"){
                wx.showToast({
                  title: '已取消',
                })
              }else{
                wx.showToast({
                  title: '支付失败',
                })
              }
            }
          });
        })
      }
    }
