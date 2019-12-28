// pages/talk/talk.js
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to:"",
    text:"",
    mine:6,
    history:[],
    getmsg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let mine = wx.getStorageSync("userInfo").id
    let that = this
    this.setData({
      to: 6,//tanke
      mine:mine
    })
    new Promise(resolve=>{
      ajax.requestByGet('/tim/msg/history', {
        senderId: that.data.to,
      }, res => {
        console.log("历史信息")
        console.log(res.data.data)
        for (let item of res.data.data){
          let d = new Date(item.gmtSend)
          let date = (d.getMonth()+1)+"-"+d.getDay()+" "+d.getHours()+':'+d.getMinutes()
          item.gmtSend = date
        }
        that.setData({
          history: res.data.data
        })
        resolve()
      })
    }).then(()=>{
      setInterval(function () {
        ajax.requestByGet('/tim/msg/' + that.data.to, {}, res => {
          console.log("新信息")
          console.log(res)
          if(res.data.data.length>0){
            let arr = that.data.getmsg
            for (let item of res.data.data){
              let d = new Date(item.gmtSend)
              let date = (d.getMonth() + 1) + "-" + d.getDay() + " " + d.getHours() + ':' + d.getMinutes()
              item.gmtSend = date
              arr.push(item)
            }
            that.setData({
              getmsg:arr
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
    ajax.requestByPut('/tim/msg',{
      msg:that.data.text,
      receiverId:that.data.to,
      type:"message"
    },res=>{
      console.log(res)
      let d = new Date(res.data.data.gmtSend)
      let date = (d.getMonth() + 1) + "-" + d.getDay() + " " + d.getHours() + ':' + d.getMinutes()
      res.data.data.gmtSend = date
      that.data.getmsg.push(res.data.data)
      that.setData({
        text:"",
        getmsg: that.data.getmsg
      })
    })
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