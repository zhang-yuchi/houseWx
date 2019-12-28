// pages/fd_cz/fdcz.js
var app = getApp()
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fixtime:'',
    phone:'',
    cashArray: [],
    cashType: "请选择房源",
    imageSrc: "",
    textarea: "",
    index:'',
    dateArray:'',
    houseId:[],
    userId:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    ajax.requestByGet('/house/user',{},function(res){
      console.log(res)
      let list = res.data.data;
      var cashArray = [];
      var dateArray = [];
      var houseid = [];
      var userId = [];
      for(let item of list){
        cashArray.push(item.houseInfo);
        dateArray.push(item.gmtCreate)
        houseid.push(item.id)
        userId.push(item.userId)
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
  getfixtime: function (event) {
    this.setData({
      fixtime: event.detail.value
    })
  },
  bindCashPickerChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      cashType: this.data.cashArray[e.detail.value],
      index: e.detail.value
    })
  },
  submit: function () {
    var that = this;
    if (that.data.cashType != "请选择房源" && that.data.areaWidth != "" && that.data.textarea != "" && that.data.imageSrc != "" && that.data.phone != "" && that.data.fixtime != '') {
      var dataObj = {};
      let idnex = that.data.index
      dataObj.content = that.data.textarea;
      dataObj.gmtCreate = that.data.dateArray[index];
      dataObj.houseId = that.data.houseId[idnex];
      dataObj.id = that.data.userId[idnex];


      dataObj.cashType = that.data.cashType;  
      dataObj.areaWidth = that.data.areaWidth;
      dataObj.textarea = that.data.fixtime;
      var fdId = wx.getStorageSync('id');
      var token = wx.getStorageSync('token');
      //上传图片的同时将文字也进行上传
      ajax.requestByPut('/user/repair',{},function(res){
        
      })
      wx.uploadFile({
        url: app.data.requestHost + '/upFdHouse', //仅为示例，非真实的接口地址
        filePath: that.data.imageSrc[0],
        header: {
          "content-type": "multipart/form-data"
        },
        name: 'file',
        formData: {
          id: fdId,
          token: token,
          houseInfo: JSON.stringify(dataObj)
        },
        success: function (res) {
          var data = res.data
          //do something
          console.log("1" + data);
          if (JSON.parse(data).status == "200" && JSON.parse(data).code == "1") {
            wx.navigateTo({
              url: '../fdAuth_check/fdAuth_check',
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