// pages/fd_cz/fdcz.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cashArray: ['押一付一', '押一付三'],
    multiIndex: [0, 0],
    imageSrc: "",
    addr: "",
    cash: "",
    time: "",
    cashType: "请选择房源",
    areaWidth: "",
    floor: "",
    cgArr: ["优", "良", "一般"],
    caig: "请选择采光程度",
    cxArr: ["东", "南", "西"],
    caox: "请选择朝向",
    elArr: ["是", "否"],
    diant: "请选择是否有电梯",
    looktime: "",
    intime: "",
    textarea: "",
    // firstLevel: [
    //   { name: "电视", url: "../../images/电视.png", id: 0, selected: false, className: "jjBox_son_text" },
    //   { name: "冰箱", url: "../../images/冰箱.png", id: 1, selected: false, className: "jjBox_son_text" },
    //   { name: "洗衣机", url: "../../images/洗衣机.png", id: 2, selected: false, className: "jjBox_son_text" },
    //   { name: "空调", url: "../../images/空调.png", id: 3, selected: false, className: "jjBox_son_text" },
    //   { name: "热水器", url: "../../images/热水器.png", id: 4, selected: false, className: "jjBox_son_text" },
    // ],
    // secondLevel: [
    //   { name: "床", url: "../../images/床.png", id: 0, selected: false, className: "jjBox_son_text" },
    //   { name: "暖气", url: "../../images/暖气.png", id: 1, selected: false, className: "jjBox_son_text" },
    //   { name: "宽带", url: "../../images/宽带.png", id: 2, selected: false, className: "jjBox_son_text" },
    //   { name: "衣柜", url: "../../images/衣柜.png", id: 3, selected: false, className: "jjBox_son_text" },
    //   { name: "天然气", url: "../../images/煤气.png", id: 4, selected: false, className: "jjBox_son_text" },
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // getId: function (e) {
  //   var id = e.currentTarget.id;
  //   var now = this.data.firstLevel;
  //   for (var i = 0; i < now.length; i++) {
  //     if (id == now[i].id) {
  //       if (now[i].selected == true) {
  //         now[i].selected = false;
  //         now[i].className = "jjBox_son_text"
  //       } else {
  //         now[i].selected = true;
  //         now[i].className = "jjBox_son_textC"
  //       }


  //     }
  //   }
  //   this.setData({
  //     firstLevel: now
  //   })
  // },
  getTextArea: function (e) {
    this.setData({
      textarea: e.detail.value
    })
  },
  getSecond: function (e) {
    var id = e.currentTarget.id;
    var now = this.data.secondLevel;
    for (var i = 0; i < now.length; i++) {
      if (id == now[i].id) {
        if (now[i].selected == true) {
          now[i].selected = false;
          now[i].className = "jjBox_son_text"
        } else {
          now[i].selected = true;
          now[i].className = "jjBox_son_textC"
        }


      }
    }
    this.setData({
      secondLevel: now
    })
  },
  bindMultiPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  submit: function () {
    var that = this;
    // imageSrc: "",
    //   addr: "",
    //     cash: "",
    //       time: "",
    //         cashType: "请选择押金方式",
    //           areaWidth: "",
    //             floor: "",
    //               cgArr: ["优", "良", "一般"],
    //                 caig: "请选择采光程度",
    //                   cxArr: ["东", "南", "西"],
    //                     caox: "请选择朝向",
    //                       elArr: ["是", "否"],
    //                         diant: "请选择是否有电梯",
    //                           looktime: "",
    //                             intime: "",
    //                               textarea: "",
    if (that.data.addr != "" && that.data.cash != "" && that.data.time != "" && that.data.cashType != "" && that.data.areaWidth != "" && that.data.caig != "" && that.data.caox != "" && that.data.diant != "" && that.data.looktime != "" && that.data.intime != "" && that.data.textarea != "" && that.data.imageSrc != "" && that.data.floor != "") {
      var dataObj = {};
      dataObj.addr = that.data.addr;
      dataObj.cash = that.data.cash;
      dataObj.time = that.data.time;
      dataObj.cashType = that.data.cashType;
      dataObj.areaWidth = that.data.areaWidth;
      dataObj.caig = that.data.caig;
      dataObj.caox = that.data.caox;
      dataObj.diant = that.data.diant;
      dataObj.looktime = that.data.looktime;
      dataObj.intime = that.data.intime;
      dataObj.textarea = that.data.textarea;
      dataObj.floor = that.data.floor;
      dataObj.jj_1 = that.data.firstLevel;
      dataObj.jj_2 = that.data.secondLevel;
      var fdId = wx.getStorageSync('id');
      var token = wx.getStorageSync('token');
      //上传图片的同时将文字也进行上传
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
  //
  watchPassWord: function (event) {
    console.log(event.detail.value);
  },
  getAddr: function (event) {
    this.setData({
      addr: event.detail.value
    })
  },
  getCash: function (event) {
    this.setData({
      cash: event.detail.value
    })
  },
  getTime: function (event) {
    this.setData({
      time: event.detail.value
    })
  },
  areaWidth: function (event) {
    this.setData({
      areaWidth: event.detail.value
    })
  },
  getFloor: function (event) {
    this.setData({
      floor: event.detail.value
    })
  },
  lookTime: function (event) {
    this.setData({
      looktime: event.detail.value
    })
  },
  intime: function (event) {
    this.setData({
      intime: event.detail.value
    })
  },
  bindCashPickerChange: function (e) {
    console.log(this.data.cashArray[e.detail.value]);
    this.setData({
      cashType: this.data.cashArray[e.detail.value]
    })
  },
  bindCgPickerChange: function (e) {
    console.log(this.data.cgArr[e.detail.value]);
    this.setData({
      caig: this.data.cgArr[e.detail.value]
    })
  },
  bindCxPickerChange: function (e) {
    console.log(this.data.cxArr[e.detail.value]);
    this.setData({
      caox: this.data.cxArr[e.detail.value]
    })
  },
  bindDtPickerChange: function (e) {
    console.log(this.data.elArr[e.detail.value]);
    this.setData({
      diant: this.data.elArr[e.detail.value]
    })
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