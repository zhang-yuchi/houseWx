// pages/talk/talk.js
var ajax = require('../../utils/ajax.js')
var timer = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to:"",
    text:"",
    mine:6,
    history:[],
    getmsg:[],
    toview:"",
    product:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let mine = wx.getStorageSync("userInfo").id
    let houseid = options.houseid
    console.log(houseid)
    if(houseid){
      //如果有 就去查找房屋的信息,并放入product中
      ajax.requestByGet(`/house/${houseid}`,{},res=>{
        console.log(res)
        let product = res.data.data
        that.setData({
          product:product
        })
      })
    }
    // let that = this
    this.setData({
      to: options.new,//tanke
      mine:mine,
    })
    new Promise(resolve=>{
      ajax.requestByGet('/tim/msg/history', {
        senderId: that.data.to,
      }, res => {
        console.log("历史信息")
        console.log(res.data.data)
        for (let item of res.data.data){
          let d = new Date(item.gmtSend)
          let date = (d.getMonth() + 1) + "-" + d.getDate()+" "+d.getHours()+':'+d.getMinutes()
          item.gmtSend = date
        }
        that.setData({
          history: res.data.data,
          toview: "history" + (res.data.data.length-1)
        })
        resolve()
      })
    }).then(()=>{
      ajax.requestByGet('/tim/msg/' + that.data.to, {}, res => {
        console.log("新信息")
        console.log(res)
        if (res.data.data.length > 0) {
          let arr = that.data.getmsg
          for (let item of res.data.data) {
            let d = new Date(item.gmtSend)
            let date = (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ':' + d.getMinutes()
            item.gmtSend = date
            arr.push(item)
          }
          that.setData({
            getmsg: arr,
            toview: "getmsg" + (that.data.getmsg.length - 1)
          })
        }
      })
      timer = setInterval(function () {
        ajax.requestByGet('/tim/msg/' + that.data.to, {}, res => {
          console.log("新信息")
          console.log(res)
          if(res.data.data.length>0){
            let arr = that.data.getmsg
            for (let item of res.data.data){
              let d = new Date(item.gmtSend)
              let date = (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ':' + d.getMinutes()
              item.gmtSend = date
              arr.push(item)
            }
            that.setData({
              getmsg:arr,
              toview: "getmsg" + (that.data.getmsg.length - 1)
            })
          }
        })
      }, 10000)
    })
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //发送一条普通文本
  sendtext(e){
    let that = this
    console.log(this.data.text)
    wx.showLoading({
      title: '发送中..',
    })
    if(this.data.text){
      ajax.requestByPut('/tim/msg', {
        msg: that.data.text,
        receiverId: that.data.to,
        type: "message"
      }, res => {
        console.log(res)
        let d = new Date(res.data.data.gmtSend)
        let date = (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ':' + d.getMinutes()
        res.data.data.gmtSend = date
        that.data.getmsg.push(res.data.data)
        that.setData({
          text: "",
          getmsg: that.data.getmsg,
          toview: "getmsg" + (that.data.getmsg.length - 1)
        })
        wx.hideLoading()
      })
    }
    
  },
  //监听聊天内容并绑定
  listentext(e){
    this.setData({
      text:e.detail.value
    })
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
    console.log(timer)
    if(timer){
      clearInterval(timer)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(timer)
    if (timer) {
      clearInterval(timer)
    }
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