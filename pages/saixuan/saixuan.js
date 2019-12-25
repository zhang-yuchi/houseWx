// pages/hx/hx.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    middle_check_sonwidth: "",
    middle_check_son_textleft: "",
    btnLeft: "",
    cx:[],
    zf: []
  },
  toarea() {
    wx.redirectTo({
      url: '../area/area',
    })
  },
  tosort(){
    wx.redirectTo({
      url: '../price/price',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cx: wx.getStorageSync("saixuanlist").cx,
      zf: wx.getStorageSync("saixuanlist").zf
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
    var that = this;
    that.setData({
      middle_check_sonwidth: (app.data.width / 5 - 5) + "px",
      middle_check_son_textleft: (app.data.width / 5 - 37) / 2 + "px",
      btnLeft: (app.data.width - 311) / 2 + "px"
    })
  },
  sxBind: function (e) {
    var that = this;
    var id = e.target.id;
    var cx = that.data.cx;
    for(var i=0;i<cx.length;i++){
      if(cx[i].id == id){
        cx[i].className = "barBtn barBtnC";
        cx[i].select = true
      }else{
        cx[i].className = "barBtn";
        cx[i].select = false;
      }
    }
    that.setData({
      cx:cx
    })
  },
  zfBind: function (e) {
    var that = this;
    var id = e.target.id;
    var cx = that.data.zf;
    for (var i = 0; i < cx.length; i++) {
      if (cx[i].id == id) {
        if (cx[i].className == 'barBtn'){
          //选择
          cx[i].className = "barBtn barBtnC";
          cx[i].select = true
        }else{
          //取消
          cx[i].className = "barBtn"
          cx[i].select = false
        }
        
        break
      } 
      
    }
    that.setData({
      zf: cx
    })
  },
  tomoney(){
    wx.redirectTo({
      url: '../price2/price2',
    })
    
  },
  tohx(){
    wx.redirectTo({
      url: '../hx/hx',
    })
  },
  tosort(){
    wx.redirectTo({
      url: '../price/price',
    })
  },
  sx(){
    let userselect = wx.getStorageSync("userSelect")
    console.log(userselect)
    let saixuanlist = wx.getStorageSync("saixuanlist")
    let cx = this.data.cx
    let zf = this.data.zf
    saixuanlist.cx = cx
    saixuanlist.zf = zf
    wx.setStorageSync("saixuanlist", saixuanlist)
    console.log(saixuanlist)
    for(let item of cx){
      //朝向
      if(item.select){
        userselect.orientation = item.value
      }
    }
    for(let item of zf){
      if(item.select){
        //被选中的话
        userselect[item.obj] = item.value
      }else{
        //没有被选中的需要在缓存中清空
        userselect[item.obj] = ""
      }
    }
    console.log(userselect)
    wx.setStorageSync("userSelect", userselect)
    wx.switchTab({
      url: '../index/index',
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