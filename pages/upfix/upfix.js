// pages/fd_cz/fdcz.js
var app = getApp()
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixtime:'请选择时间',
    fixdate: '请选择日期',
    phone:'',
    cashArray: [],
    cashType: "请选择房源",
    imageSrc: "",
    textarea: "",
    index:'',
    dateArray:'',
    houseId:[],
    userId:[],
    upPicFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    ajax.requestByGet('/house/user',{},function(res){
      console.log(res)
      var cashArray = [];
      var dateArray = [];
      var houseid = [];
      var userId = [];
      if(res.status == 200){
        let list = res.data.data;
        for (let item of list) {
          cashArray.push(item.houseInfo);
          dateArray.push(item.gmtCreate)
          houseid.push(item.id)
          userId.push(item.userId)
        }
      }
      that.setData({
        cashArray:cashArray,
        dateArray: dateArray,
        houseId:houseid,
        userId:userId
      })
    })
  },
  getTextArea: function (e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  getphone: function (event) {
    this.setData({
      phone: event.detail.value
    })
  },
  bindDatePickerChange(e){
    console.log(e.detail.value)
    this.setData({
      fixdate: e.detail.value
    })
  },
  bindTimePickerChange(e) {
    console.log(e.detail.value)
    this.setData({
      fixtime: e.detail.value
    })
  },
  bindCashPickerChange: function (e) {
    console.log(e.detail.value);
    if(this.data.cashArray.length > 0){
      this.setData({
        cashType: this.data.cashArray[e.detail.value],
        index: e.detail.value
      })
    }else{
      this.setData({
        cashType: "请选择房源",
        index: e.detail.value
      })
    }
  },
  submit: function () {
    var that = this;
    if (that.data.cashType != "请选择房源" && that.data.areaWidth != "" && that.data.textarea != "" && that.data.imageSrc != "" && that.data.phone != "" && that.data.fixtime != '请选择时间'&& that.data.fixdate != '请选择日期') {
      //上传图片的同时将文字也进行上传
      wx.uploadFile({
        url: app.data.requestHost + '/image', 
        filePath: that.data.imageSrc[0],
        name: 'file',
        formData: {
          imgType: 'repair'
        },
        success: function (res) {
          console.log(res)
          var obj = JSON.parse(res.data)
          //do something
          if (obj.status == 1) {
            var dataObj = {};
            let index = that.data.index
            dataObj.content = that.data.textarea;
            dataObj.gmtCreate = that.data.dateArray[index];
            dataObj.houseId = that.data.houseId[index];
            dataObj.id = that.data.userId[index];
            dataObj.phone = that.data.phone;
            dataObj.url = obj.data;
            dataObj.repairTime = `${that.data.fixdate} ${that.data.fixtime}:00`
            console.log(dataObj)
            ajax.requestByPut('/user/repair', dataObj, function (res) {
              console.log(res)
              // wx.navigateTo({
              //   url: '../fdAuth_check/fdAuth_check',
              // })
            })
            
          } else {
            wx.showModal({
              title: '提示',
              content: '信息出错，请重试',
            })
          }
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '信息不完整！请检查',
      })
    }
  },
  choseImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,//选择图片的数量
      sizeType: ['compressed'],//尺寸压缩图
      sourceType:['album'],
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
          imageSrc: tempFilePaths1,
          upPicFlag:true,
        });
      }
    })
    console.log(that.data.imageSrc);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})