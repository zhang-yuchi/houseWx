var app = getApp();
var ajax = require('../../utils/ajax.js')
Page({
  data: {
    currentTaskName: "",
    imageSrc1: "",
    imageSrc2: "",
    logoLeft: "",
    Display1: "none",
    Display2: "none",
    plusDisplay1: "block",
    plusDisplay2: "block",
    tempFilePaths1: "",
    tempFilePaths2: "",
    isIdCardJpg: false,
    isTaskJpg: false,
    currentTaskId: "",
  },
  onLoad: function (options) {
    var width = app.data.width;
    var logoLeft = (width - width * 0.9 * 0.07) / 2 + "px"
    console.log(logoLeft);
    this.setData({
      logoLeft: logoLeft,
      // currentTaskName: options.info,
      // houseId: options.id
    });
  },
  // uploadImageData: function () {
  //   console.log("request");
  // },
  uploadIdcard: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        var tempFilePaths1 = res.tempFilePaths;
        console.log("test:" + String(tempFilePaths1));
        var pparr = String(tempFilePaths1).split(".")
        if (pparr[pparr.length - 1] == "jpg" || pparr[pparr.length - 1] == "JPG") {
          that.setData({
            isIdCardJpg: true
          });
        }

        wx.uploadFile({
          url: app.data.requestHost+'/image',
          filePath: tempFilePaths1[0],
          name: 'file',
          formData:{
            imgType:"auth_img"
          },
          success(res){
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
            })
          }
        })
        that.setData({
          imageSrc1: tempFilePaths1,
          plusDisplay1: "none",
          Display1: "block",
        });
      }
    })
  },
  uploadTaskphoto: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        var tempFilePaths1 = res.tempFilePaths;
        console.log(tempFilePaths1);
        var pparr = String(tempFilePaths1).split(".")
        if (pparr[pparr.length - 1] == "jpg" || pparr[pparr.length - 1] == "JPG") {
          that.setData({
            isTaskJpg: true
          });
        }
        wx.showLoading({
          title: '上传中',
        })
        wx.uploadFile({
          url: app.data.requestHost + '/image',
          filePath: tempFilePaths1[0],
          name: 'file',
          formData: {
            imgType: "auth_img"
          },
          success(res) {
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
            })
          }
        })
        that.setData({
          imageSrc2: tempFilePaths1,
          plusDisplay2: "none",
          Display2: "block",
        });
      }
    })
  },
  upload: function () {
    var that = this;
    if (that.data.isIdCardJpg && that.data.isTaskJpg) {
      ajax.requestByPost('/user/landlord/certify', { authImgUrl: that.data.imageSrc1},function(res){
        let data = res.data;
        console.log(res)
        console.log(data)
        if(data.status != 1){
          wx.showToast({
            title: data.message,
            icon:'none'
          })
        }else{
          ajax.requestByPost('/user/landlord/certify', { authImgUrl: that.data.imageSrc2 }, function (res) {
            if(res.data){

            }
          })
        }
      })
      
      // wx.navigateTo({
      //   url: '../fdAuth_check/fdAuth_check',
      // })
    } else if (that.data.Display1 == 'none' || that.data.Display2 == 'none'){
      wx.showModal({
        title: '提示',
        content: '请上传图片',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
            wx.navigateBack()
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '图片格式必须为jpg',
        showCancel: false
      })
    }
  },
  to:function(){
    wx.navigateTo({
      url: '../fdAuth_check/fdAuth_check',
    })
  }
});