// pages/searchpage/searchpage.js
let ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houses:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let houseinfo = options.houseinfo
    let that = this
    // console.log(search)
    ajax.requestByGet('/house',{
      houseInfo:houseinfo
    },res=>{
      console.log(res)
      if (res.data.status == -1) {
        wx.showToast({
          title: '未查找到数据',
          icon:"none"
        })
        that.setData({
          houses: []
        })
        setTimeout(()=>{
          wx.navigateBack({
            complete: (res) => {},
          })
        },1000)

        // wx.hideLoading()
        return
      }
      let houses = res.data.data
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
            console.log(item)
            return item
          })
          item.tags = tags
        }

      }
      // wx.hideLoading()
      that.setData({
        houses: houses
      })
    })
  },
  tohousedetails(e){
    wx.navigateTo({
      url: '../housedetail/housedetail?obj='+e.currentTarget.dataset.id,
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