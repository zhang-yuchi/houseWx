var ajax = require('ajax.js');
module.exports = {
    pay(houseid, payItem, money,obj,callback) {
      ajax.requestByGet(`/pay/prepayInfo/${houseid}/${payItem}/${money}`, obj, function(res) {
          let payInfo = res.data.data;
          wx.requestPayment({
            timeStamp: payInfo.timeStamp,
            nonceStr: payInfo.nonceStr,
            package: payInfo.package,
            signType: 'MD5',
            paySign: payInfo.paySign,
            success: callback,
            fail: function(res) {
              if (res.errMsg == "requestPayment:fail cancel"){
                wx.showToast({
                  title: '已取消',
                  icon:'none'
                })
              }else{
                wx.showToast({
                  title: '支付失败',
                  icon:"none"
                })
              }
            }
          });
        })
      }
    }
