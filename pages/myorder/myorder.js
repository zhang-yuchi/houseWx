// pages/myorder/myorder.js
var app = getApp();
var ajax = require('../../utils/ajax.js')
const moment = require('../../utils/moment')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    barArr: [{
        name: "履行中",
        id: 0,
        className: "son_text"
      },
      {
        name: "已结束",
        id: 1,
        className: "son_textC"
      }
    ],
    fulArr: [],
    nowList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    console.log(wx.getStorageSync("token"))
    ajax.requestByGet('/user/sign', {}, function(res) {
      console.log(res)
      if(res.data.status == 1){
        let arr = res.data.data
        for (let item of arr) {
          let date = moment(item.startCreate).format('YYYY-MM-DD')
          // let date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`
          console.log(date)
          item.startCreate = date
        }
        that.setData({
          fulArr: arr
        })
        let now = new Date()
        let nowList = []
        for (let item of arr) {
          if (now - new Date(item.endCreate) <= 0) {
            nowList.push(item)
          }
        }
        that.setData({
          nowList: nowList
        })
      }else{
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
      
    })
  },
  changeBar: function(e) {
    var that = this;
    var id = e.currentTarget.id;
    var arr = that.data.barArr;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        arr[i].className = "son_text"
      } else {
        arr[i].className = "son_textC"
      }
    }
    if (id == 0) {
      // console.log("履行中")
      let arr = that.data.fulArr
      let nowL = []
      let now = new Date()
      for (let item of arr) {
        if (now - new Date(item.endCreate)  <= 0) {
          nowL.push(item)
        }
      }
      that.setData({
        nowList: nowL
      })
    } else {
      // console.log("已结束")
      let arr = that.data.fulArr
      let nowL = []
      let now = new Date()
      for (let item of arr) {
        if (now - new Date(item.endCreate) > 0) {
          nowL.push(item)
        }
      }
      that.setData({
        nowList: nowL
      })

    }
    that.setData({
      barArr: arr
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})