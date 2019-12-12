// pages/index/index.js
var app = getApp();
var allArr = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: 'http://localhost:3000/swipper/IMG_7096(20190616-201311).jpg' },
      { url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3140560614,3641376433&fm=26&gp=0.jpg' },
      { url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3140560614,3641376433&fm=26&gp=0.jpg' },
      { url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3140560614,3641376433&fm=26&gp=0.jpg' }
    ],
    searchBoxInputWidth:"",
    inputWidth:"",
    itembox_sonwidth:"",
    middle_check_sonwidth:"",
    middle_check_son_textleft:"",
    scrollViewHeight:"",
    sx_son_width:"",
    houseSets:[],
    requestHost:app.data.requestHost
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取轮播图
    wx.request({
      url: app.data.requestHost + '/getAllswipper',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var result = res.data.data.houseData;
        console.log(result);
        that.setData({
          movies:JSON.parse(result)
        })
      },
    });
  },
  toPrice:function(){
    wx.navigateTo({
      url: '../price/price',
    })
  },
  check:function(e){
    var value = e.detail.value;
    var arr = this.data.houseSets;
    var newArr = [];
    var obj = {};
    for(var i=0;i<allArr.length;i++){
      if(allArr[i].houseinfo.addr.indexOf(value) != -1){
        newArr.push(allArr[i]);
      }
    }
    this.setData({
      houseSets:newArr
    })
  },
  reverse:function(){
    var that = this;
    that.setData({
      houseSets:that.data.houseSets.reverse()
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
      searchBoxInputWidth:(app.data.width-136)+"px",
      inputWidth: (app.data.width - 136-14-25)+"px",
      itembox_sonwidth:(app.data.width/3)+"px",
      middle_check_sonwidth: (app.data.width / 5-5) + "px",
      middle_check_son_textleft: (app.data.width / 5-37)/2 + "px",
      scrollViewHeight:(app.data.height*0.745-190)+"px",
      sx_son_width:(app.data.width*0.95*0.6/4-6)+"px",
    });
    //请求所有房间数据
    wx.request({
      url: app.data.requestHost + '/getAllHouse',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var result = res.data;
        if(result.status == "200" && result.code == "1"){
          var arr = JSON.parse(result.data.houseData);
          var newHouseSets = [];
          for(var i=0;i<arr.length;i++){
            var obj = {};
            obj = arr[i];
            obj.houseinfo = JSON.parse(arr[i].houseinfo);
            newHouseSets.push(obj)
          }
          allArr = newHouseSets;
          that.setData({
            houseSets: newHouseSets
          })
          console.log(that.data.houseSets)
        }
      },
    });
  },
  toCity:function(){
    wx.navigateTo({
      url: '../city/city',
    })
  },
  toHx:function(){
    wx.navigateTo({
      url: '../hx/hx',
    })
  },
  tosaixuan:function(){
    wx.navigateTo({
      url: '../saixuan/saixuan',
    })
  },
  toliveserver:function(){
    var that = this;
    wx.navigateTo({
      url: '../liveserver/liveserver',
    })
  },
  toupfix:function(){
    var that = this;
    wx.navigateTo({
      url: '../upfix/upfix',
    })
  },
  tofdauth:function(){
    var that = this;
    if(wx.getStorageSync('isFd')=="yes"){
      wx.navigateTo({
        url: '../fd_cz/fd_cz',
      })
    }else{
      wx.navigateTo({
        url: '../fdAuth_new/fdAuth_new',
      })
    }
    
  },
  tohousedetail:function(e){
    var that = this;
    var id = e.currentTarget.id;
    var arr = that.data.houseSets;
    var obj = {};
    for(var i=0;i<arr.length;i++){
      if(arr[i].id == id){
        obj = arr[i];
        break;
      }
    }
    // console.log(JSON.stringify(obj))
    wx.navigateTo({
      url: '../housedetail/housedetail?obj='+JSON.stringify(obj),
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