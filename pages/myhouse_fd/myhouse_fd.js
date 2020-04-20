// pages/myorder/myorder.js
var app = getApp();
var allArr = [];
let ajax = require('../../utils/ajax.js')
let utils = require('../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollViewHeight: "",
    barArr: [{
        name: "待租房源",
        id: 0,
        value: "no",
        className: "son_text"
      },
      {
        name: "已出租房源",
        id: 1,
        value: "yes",
        className: "son_textC"
      }
    ],
    houseSets: [],
    houses: [],
    nowlist: [],
    requestHost: app.data.requestHost,
    select: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    ajax.requestByGet('/user/landload/house', {}, res => {
      console.log(res)
      if (res.data.status == 1) {
        let houses = res.data.data
        let nowlist = []
        for (let item of houses) {
          let tags = item.tags
          if (tags) {
            console.log(tags)
            tags = tags.replace("{", "")
            tags = tags.replace("}", "")

            tags = tags.split(',')
            tags = tags.map((item, index) => {
              item = item.replace('\"', '')
              // console.log(item)
              item = item.replace('\"', '')
              // console.log(item)
              return item
            })
            item.tags = tags
          }
          if (item.rented == that.data.select) {
            nowlist.push(item)
          }
        }
        that.setData({
          nowlist: nowlist,
          houses: houses
        })
        wx.hideLoading()
      }else {
        wx.showToast({
          title: res.data.message,
          icon:'none'
        })
      }

    })
  },
  tohousedetails(e) {
    let index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../housedetail/housedetail?obj=' + index + "&fdeditor=" + 1,
    })
  },
  changeBar: function(e) {
    var that = this;
    var id = e.currentTarget.id;
    let nowlist = []
    var arr = that.data.barArr;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        arr[i].className = "son_text"
        if (arr[i].value == "no") {
          //未出租
          that.setData({
            select: 0
          })
        } else {
          //已出租
          that.setData({
            select: 1
          })
        }
      } else {
        arr[i].className = "son_textC"
      }
    }
    for (let item of that.data.houses) {
      if (item.rented == that.data.select) {
        console.log(item)
        nowlist.push(item)
      }
    }

    that.setData({
      barArr: arr,
      nowlist: nowlist
    })
  },
  editorHouse(e) {

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
    var that = this;
    that.setData({
      scrollViewHeight: (app.data.height - 50) + "px"
    })
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