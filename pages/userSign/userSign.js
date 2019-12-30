var app = getApp();
Page({
  data: {
    houseid:"",
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
    imageLeft:"",
    name:"",
    idCard:"",
    items: [
      { name: '长久', value: '长久' }
    ],
    starttime:"开始日期",
    endtime:"截至日期"
  },
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      starttime: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endtime: e.detail.value
    })
  },
  getName:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  getId:function(e){
    this.setData({
      idCard:e.detail.value
    })
  },
  toUploadSign:function(){
    var that = this;
    //包装上传信息
    var obj = {};
    if(that.data.idCard.length!==18){
      wx.showToast({
        title: '请输入正确的18位身份证',
        icon:"none",
      })
      return
    }
    if (that.data.name != "" && that.data.idCard != "" && that.data.starttime != "" && that.data.endtime != ""  ){
      obj.name = that.data.name;
      obj.idCard = that.data.idCard;
      obj.starttime = that.data.starttime;
      obj.endtime = that.data.endtime;
      obj.houseid = that.data.houseid
      wx.navigateTo({
        url: '../uploadSign/uploadSign?obj=' + JSON.stringify(obj),
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '信息不正确',
      })
    }
    
  },
  onLoad: function (options) {
    console.log(options)

    var width = app.data.width;
    var logoLeft = 0 + "px"
    var imageLeft = (width * 0.9 * 0.3) / 2 + "px"
    console.log(logoLeft);
    this.setData({
      logoLeft: logoLeft,
      imageLeft:imageLeft,
      houseid:options.houseid
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
      for (var i = 0; i < fileArr.length; i++) {
        wx.uploadFile({
          url: app.data.requestHost + '/upFdAuthPic', //仅为示例，非真实的接口地址
          filePath: fileArr[i],
          header: {
            "content-type": "multipart/form-data"
          },
          name: 'file',
          formData: {
            id: id,
            token: token,
            index: i
          },
          success: function (res) {
            var data = res.data
            //do something
            console.log("1" + data);
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
  to: function () {
    wx.navigateTo({
      url: '../fdAuth_check/fdAuth_check',
    })
  }
});