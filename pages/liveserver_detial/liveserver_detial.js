// pages/housedetail/housedetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3140560614,3641376433&fm=26&gp=0.jpg' },
      { url: 'https://lbwl.wingstudio.org/public/images/2.jpg' }
    ],
    topPic: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3140560614,3641376433&fm=26&gp=0.jpg",
    scrollViewHeight: "",
    markers: [{
      iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    obj: {},
    host: app.data.requestHost,
    firstLevel: [
      { name: "电视", url: "../../images/电视.png", id: 0, selected: false, className: "jjBox_son_text" },
      { name: "冰箱", url: "../../images/冰箱.png", id: 1, selected: false, className: "jjBox_son_text" },
      { name: "洗衣机", url: "../../images/洗衣机.png", id: 2, selected: false, className: "jjBox_son_text" },
      { name: "空调", url: "../../images/空调.png", id: 3, selected: false, className: "jjBox_son_text" },
      { name: "热水器", url: "../../images/热水器.png", id: 4, selected: false, className: "jjBox_son_text" },
    ],
    secondLevel: [
      { name: "床", url: "../../images/床.png", id: 0, selected: false, className: "jjBox_son_text" },
      { name: "暖气", url: "../../images/暖气.png", id: 1, selected: false, className: "jjBox_son_text" },
      { name: "宽带", url: "../../images/宽带.png", id: 2, selected: false, className: "jjBox_son_text" },
      { name: "衣柜", url: "../../images/衣柜.png", id: 3, selected: false, className: "jjBox_son_text" },
      { name: "天然气", url: "../../images/煤气.png", id: 4, selected: false, className: "jjBox_son_text" },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var obj = options.obj;
    // that.setData({
    //   obj: JSON.parse(obj),
    //   firstLevel: JSON.parse(obj).houseinfo.jj_1,
    //   secondLevel: JSON.parse(obj).houseinfo.jj_2
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      scrollViewHeight: (app.data.height - 60) + "px"
    })
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