// pages/housedetail/housedetail.js
var ajax = require("../../utils/ajax.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topPic:"",
    id:"",
    scrollViewHeight:"",
    lat:0,
    lng:0,
    love:"../../images/sc.png",
    scTips:"收藏",
    isSc:false,
    userId:"",//房东的
    myId:"",//自己的 用于判断是不是自己的房子
    isloader:0,
    iseditor:0,
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
        longitude: 0,
        latitude: 0
      }, {
        longitude: 0,
        latitude: 0
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
      { name: "电视", url: "../../images/dianshi.png", prop:"hasTelevison", id: 0, selected: false, className: "jjBox_son_text" },
      { name: "冰箱", url: "../../images/bingxiang.png", prop: "hasRefrigerator", id: 1, selected: false, className: "jjBox_son_text" },
      { name: "洗衣机", url: "../../images/xiyiji.png", prop: "hasWasher", id: 2, selected: false, className: "jjBox_son_text" },
      { name: "空调", url: "../../images/kongtiao.png", prop: "hasAirConditioner", id: 3, selected: false, className: "jjBox_son_text" },
      { name: "热水器", url: "../../images/reshuiqi.png", prop: "hasHeater", id: 4, selected: false, className: "jjBox_son_text" },
    ],
    secondLevel: [
      { name: "床", url: "../../images/chuang.png", prop: "hasBed", id: 0, selected: false, className: "jjBox_son_text" },
      { name: "暖气", url: "../../images/nuanqi.png", prop: "hasHeating", id: 1, selected: false, className: "jjBox_son_text" },
      { name: "宽带", url: "../../images/kuandai.png", prop: "hasBroadband", id: 2, selected: false, className: "jjBox_son_text" },
      { name: "衣柜", url: "../../images/yigui.png", prop: "hasWardrobe", id: 3, selected: false, className: "jjBox_son_text" },
      { name: "天然气", url: "../../images/meiqi.png", prop: "hasGas", id: 4, selected: false, className: "jjBox_son_text" },
    ],
    
  },
  talk(){
    let that = this
    // console.log(this.data.userId)
    wx.navigateTo({
      url: '../talk/talk?new='+that.data.userId+"&houseid="+that.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    console.log(wx.getStorageSync("userInfo"))
    if(!options.fdeditor){
      options.fdeditor = 0
    }
    console.log(this.data)
    // const details = JSON.parse(options.obj)
    this.setData({
      id:options.obj,
      iseditor:options.fdeditor,
      myId: wx.getStorageSync("userInfo").id,
      isloader: wx.getStorageSync("userInfo").landlord
    })
    //是否收藏
    ajax.requestByGet('/house/'+that.data.id+"/isfavor",{},res=>{
      console.log(res.data.data.isfavor)
      that.setData({
        isSc:res.data.data.isfavor
      })
      if(that.data.isSc){
        that.setData({
          love: "../../images/love.png",
          scTips: "已收藏",
        })
      }
    })
    //房屋详情
    ajax.requestByGet(`/house/${options.obj}`, {}, (res) => {
      const details = res.data.data
      console.log(details)
      that.setData({
        userId: details.userId
      })
      var d = new Date(details.checkInDate);
      var datetime = d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate();
      details.checkInDate = datetime
      if(details.hasAirConditioner==1||details.hasTelevison==1||details.hasComplete==1||details.hasRefrigerator==1||details.hasWasher==1){
        details.jiadian = 1
      }else{
        details.jiadian = 0
      }
      let marker = this.data.markers[0]
      //坐标定位
      new Promise(resolve => {
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
              polyline: [polyline]
            })
            resolve()
          },
        })
      }).then(() => {
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
      
      //配套齐全
      let firLev = this.data.firstLevel
      let secLev = this.data.secondLevel
      for (let item of firLev) {
        if(details[item.prop]==1){
          item.className = 'jjBox_son_textC'
        }
      }
      for (let item of secLev) {
        if (details[item.prop] == 1) {
          item.className = 'jjBox_son_textC'
        }
      }
      that.setData({
        firstLevel:firLev,
        secondLevel:secLev
      })
    })
  },
sc:function(){
  var that = this;
  var id = wx.getStorageSync('id');
  var token = wx.getStorageSync('token');
  var houseId = that.data.obj.id;
  if(!that.data.isSc){
    //没有收藏
    wx.showLoading({
      title: '请等候',
    })
    ajax.requestByPost('/user/star/house/'+that.data.id,{houseId:that.data.id},res=>{
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '收藏成功',
      })
      that.setData({
        isSc: true,
        love: "../../images/love.png",
        scTips: "已收藏",

      })
    })
    
  }else{
    //已收藏
    ajax.requestByDelete('/user/star/house/'+that.data.id,{},res=>{
      console.log(res)
      wx.showToast({
        title: '已取消',
        icon: "none"
      })
      that.setData({
        isSc: false,
        love: "../../images/sc.png",
        scTips: "收藏",
      })
    })
    
  }
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
    console.log(wx.getStorageSync("userInfo"))
    let userinfo = wx.getStorageSync("userInfo")
    if(userinfo.isAuth==0){
      wx.showModal({
        title: '未认证',
        content: '请先前往主页认证',
      })
      return
    }
    if (userinfo.landlord==1){
      wx.showToast({
        title: '房东无法签约',
        icon:"none"
      })
      return
    }

    // wx.navigateTo({
    //   url: '../userSign/userSign',
    // })
  },
  editorhouse(){
    let that = this
    wx.navigateTo({
      url: '../housemdf/housemdf?houseid='+that.data.id,
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