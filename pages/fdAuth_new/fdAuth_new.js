var app = getApp();
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
      currentTaskName: options.info,
      currentTaskId: options.id
    });
  },
  uploadImageData: function () {
    console.log("request");
  },
  uploadIdcard: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        var tempFilePaths1 = res.tempFilePaths;
        console.log("test:" + String(tempFilePaths1));
        var pparr = String(tempFilePaths1).split(".")
        if (pparr[pparr.length - 1] == "jpg" || pparr[pparr.length - 1] == "JPG") {
          that.setData({
            isIdCardJpg: true
          });
        }
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
    var id = wx.getStorageSync('id');
    var token = wx.getStorageSync('token');
    if (that.data.isIdCardJpg && that.data.isTaskJpg) {
      var fileArr = [];
      fileArr.push(that.data.imageSrc1[0]);
      fileArr.push(that.data.imageSrc2[0]);
      console.log(fileArr)
      for(var i=0;i<fileArr.length;i++){
        wx.uploadFile({
          url: app.data.requestHost + '/upFdAuthPic', //仅为示例，非真实的接口地址
          filePath: fileArr[i],
          header: {
            "content-type": "multipart/form-data"
          },
          name: 'file',
          formData: {
            id: id,
            token:token,
            index:i
          },
          success: function (res) {
            var data = res.data
            //do something
            console.log("1" + data);
            if(data.status == "200" && data.code == "1"){
              wx.navigateTo({
                url: '../fdAuth_check/fdAuth_check',
              })
            }else{
              wx.showModal({
                title: '提示',
                content: '网络出错',
              })
            }
          }
        });
      }

    } else {
      wx.showModal({
        title: '提示',
        content: '图片格式必须为jpg',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
  },
  to:function(){
    wx.navigateTo({
      url: '../fdAuth_check/fdAuth_check',
    })
  }
});