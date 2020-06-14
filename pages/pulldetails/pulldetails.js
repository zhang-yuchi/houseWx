// pages/pulldetails/pulldetails.js
let ajax = require('../../utils/ajax.js')
const moment = require('../../utils/moment')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      
    ],
    nowlist:[],
    selectbtn:[
      {
        name:"所有",
        selected:"active",
      },
      {
        name: "审核中",
        selected: "",
      },
      {
        name: "打款中",
        selected: "",
      },
      {
        name: "已完成",
        selected: "",
      },
      {
        name: "审核失败",
        selected: "",
      },
    ]
  },
  selectbtn(e){
    let that = this
    let index = parseInt(e.currentTarget.dataset.index)
    for(let item of this.data.selectbtn){
      item.selected = ""
    }
    this.data.selectbtn[index-1].selected = "active"
    this.setData({
      selectbtn: this.data.selectbtn
    })
    let list = that.data.list
    let arr = []
    if(index==1){
      //筛选所有
      that.setData({
        nowlist:list
      })
      return
    }
    if(index==2){
      //筛选审核中
      for (let item of list) {
        if (item.isCheck) {
          arr.push(item)
          continue
        }
      }
      that.setData({
        nowlist: arr
      })
      return
    }
    if(index==3){
      //筛选打款中
      for (let item of list) {
        if (item.isCheckPass) {
          arr.push(item)
          continue
        }
      }
      that.setData({
        nowlist: arr
      })
      return
    }
    if(index==4){
      //筛选已完成
      for (let item of list) {
        if (item.isFinish) {
          arr.push(item)
          continue
        }
      }
      that.setData({
        nowlist: arr
      })
      return
    }
    if(index==5){
      //筛选审核失败
      for (let item of list) {
        if (!item.withdrawStatus) {
          arr.push(item)
          continue
        }
      }
      that.setData({
        nowlist: arr
      })
      return
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    ajax.requestByGet('/pay/withdraw',{},res=>{
      // console.log(res)
      let bill = res.data.data
      for(let item of bill){
        let date = moment(item.gmtCreate).format('YYYY-MM-DD HH:mm:ss')
        // let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDay() + " " + d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes())
        item.gmtCreate = date
      }
      if(res.data.status==1){
        that.setData({
          list: bill,
          nowlist: bill,
        })
      }
      else{
        wx.showToast({
          title: res.data.message,
          icon:"none"
        })
      }
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