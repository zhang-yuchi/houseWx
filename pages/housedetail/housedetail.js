// pages/housedetail/housedetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topPic:"../../images/index_1.jpg",
    scrollViewHeight:"",
    lat:0,
    lng:0,
    markers: [{
      iconPath: "",//地图图片路径
      id: 0,
      latitude: 0,
      longitude: 0,
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
      iconPath: '',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    obj:{},
    host:app.data.requestHost,
    firstLevel: [
      { name: "电视", url: "../../images/dianshi.png", id: 0, selected: false, className: "jjBox_son_text" },
      { name: "冰箱", url: "../../images/bingxiang.png", id: 1, selected: false, className: "jjBox_son_text" },
      { name: "洗衣机", url: "../../images/xiyiji.png", id: 2, selected: false, className: "jjBox_son_text" },
      { name: "空调", url: "../../images/kongtiao.png", id: 3, selected: false, className: "jjBox_son_text" },
      { name: "热水器", url: "../../images/reshuiqi.png", id: 4, selected: false, className: "jjBox_son_text" },
    ],
    secondLevel: [
      { name: "床", url: "../../images/chuang.png", id: 0, selected: false, className: "jjBox_son_text" },
      { name: "暖气", url: "../../images/nuanqi.png", id: 1, selected: false, className: "jjBox_son_text" },
      { name: "宽带", url: "../../images/kuandai.png", id: 2, selected: false, className: "jjBox_son_text" },
      { name: "衣柜", url: "../../images/yigui.png", id: 3, selected: false, className: "jjBox_son_text" },
      { name: "天然气", url: "../../images/meiqi.png", id: 4, selected: false, className: "jjBox_son_text" },
    ],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const details = JSON.parse(options.obj)
    let marker = this.data.markers[0]
    new Promise(resolve=>{
      wx.getLocation({
        success: function (res) {
          console.log(res)
          let userlat = res.latitude
          let userlng = res.longitude
          // console.log(userlat)
          let polyline = that.data.polyline[0]
          polyline.points[0].longitude = userlng
          polyline.points[0].latitude = userlat
          polyline.points[1].longitude = details.lng
          polyline.points[1].latitude = details.lat
          // console.log(polyline)
          that.setData({
            polyline:[polyline]
          })
          resolve()
        },
      })
    }).then(()=>{
      marker.longitude = details.lng
      marker.latitude = details.lat
      this.setData({
        obj: details,
        markers: [marker],
        lng: details.lng,
        lat: details.lat
      })
      console.log(this.data.obj)
    })
    

    //上传浏览记录
    // var id = wx.getStorageSync('id');
    // var token = wx.getStorageSync('token');
    // var houseId = that.data.obj.id;
    // wx.request({
    //   url: app.data.requestHost + '/updateJoinPeople',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: "POST",
    //   data:{
    //     id:id,
    //     token:token,
    //     houseId:houseId
    //   },
    //   success: function (res) {
    //     var result = res.data;
    //     if (result.status == "200" && result.code == "1") {
    //       console.log(result);
    //     }
    //   },
    // });
  },
sc:function(){
  var that = this;
  var id = wx.getStorageSync('id');
  var token = wx.getStorageSync('token');
  var houseId = that.data.obj.id;
  wx.request({
    url: app.data.requestHost + '/updateScPeople',
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    data: {
      id: id,
      token: token,
      houseId: houseId
    },
    success: function (res) {
      var result = res.data;
      if (result.status == "200" && result.code == "1" && result.data == "") {
        wx.showToast({
          title: '收藏成功',
        })
      } else if (result.status == "200" && result.code == "1" && result.data == "already"){
        wx.showToast({
          title: '请勿重复收藏',
        })
      }else{}
    },
  });
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
  touserSign:function(){
    wx.navigateTo({
      url: '../userSign/userSign',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      scrollViewHeight:(app.data.height-40)+"px"
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