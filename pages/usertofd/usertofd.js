// pages/usertofd/usertofd.js
var ajax = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc:''
  },
  chooseimage(){
    let that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        let tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        that.setData({
          imageSrc: tempFilePaths
        })
      },
    })
  },
  upload(){
    let that = this
    if (that.data.imageSrc == ''){
      wx.showToast({
        title: '请上传图片',
        icon:'none'
      })
    }else{
      ajax.requestByPost('/user/landlord/certify', { authImgUrl:that.data.imageSrc},function(res){
        console.log(res);
        wx.showLoading({
          title: '上传中',
        })
        if(res.data.status == 1){
          wx.navigateTo({
            url: '../fdsure/fdsure',
          })
         wx.hideLoading()
        }else{
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      })
      
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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