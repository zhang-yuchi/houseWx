// pages/housedetail/housedetail.js
var app = getApp();
var pay = require('../../utils/pay.js')
var ajax = require('../../utils/ajax.js')
var context = null;// 使用 wx.createContext 获取绘图上下文 context  
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
var animateId = {}
wx.getSystemInfo({
  success: function (res) {
    canvasw = res.windowWidth;//设备宽度  
    canvash = res.windowHeight;
  }
}); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad:false,
    handWriteImgUrl:"", 
    house:{},
    houseid:"",
    userName:"",
    starttime:"",
    endtime:"",
    idCardNum:"",
  },
  paybtn:function(){
    var that = this;
    var token = wx.getStorageSync('token');
    if(!this.data.isLoad){
      wx.showToast({
        title: '请先签字并上传!',
        icon:"none"
      })
      return
    } else {//支付相关代码
        wx.showModal({
          title: '注意',
          content: '该房源为' + that.data.house.cashType+'，需先付押金，再付租金',
          success:function(res){
            if(res.cancel){//点取消
              wx.showToast({
                title: '取消支付',
                icon:'none'
              })
            }else{
              pay.pay(that.data.houseid, 'deposit', that.data.house.cash, {}, function(res){
                wx.showModal({
                  title: '提示',
                  content: '已支付押金，请及时到 我的——我的账单 缴纳相应租金',
                })
              })
            }
          }
        })
        

    }
  },


  //canvas函数
  move(event) {
    console.log(111)
    // console.log(this.requestAnimationFrame)
    animateId = this.requestAnimationFrame(function () {
      context.setStrokeStyle('#0000ff');
      context.setLineWidth(3);
      context.setLineCap('round');
      context.setLineJoin('round');
      if (isButtonDown) {
        arrz.push(1);
        arrx.push(event.changedTouches[0].x);
        arry.push(event.changedTouches[0].y);
      };
      for (var i = 0; i < arrx.length; i++) {
        if (arrz[i] == 0) {
          context.moveTo(arrx[i], arry[i])
        } else {
          context.lineTo(arrx[i], arry[i])
        };
      };
      context.clearRect(0, 0, canvasw, canvash);
      context.stroke();
      context.draw();
    })


  },
  touchstart(event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
  },
  touchend(e) {
    // this.cancelAnimationFrame(animateId)
    isButtonDown = false;
  },
  cleardraw() {
    console.log(111)
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },
  getimg() {
    var that = this
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
      return false;
    };
    //生成图片  
    wx.canvasToTempFilePath({
      canvasId: 'firstCanvas',
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        console.log(res.tempFilePath);
        //存入服务器  
        wx.uploadFile({
          url: app.data.requestHost+'/image', //接口地址  
          filePath: res.tempFilePath,
          name: 'file',
          formData: { //HTTP 请求中其他额外的 form data   
            'imgType': 'handwritten_signature'
          },
          success: function (res) {
            // that.data.isLoad = true
            wx.showToast({
              title: '上传成功',
            })
            wx.hideLoading()
            // console.log(res);
            let obj = JSON.parse(res.data)
            // console.log(obj)
            let handWriteImgUrl=obj.data
            console.log(handWriteImgUrl)
            that.setData({
              handWriteImgUrl: handWriteImgUrl
            })
            ajax.requestByPost('/user/'+that.data.houseid+"/sign",{
              handWriteImgUrl: that.data.handWriteImgUrl,
              houseId :that.data.houseid,
              idCardNum:that.data.idCardNum,
              userName:that.data.userName
            },res=>{
              wx.showToast({
                title: '上传成功请支付 ',
              })
              that.setData({
                isLoad:true
              })
            })
          },
          fail: function (res) {
            console.log(res);
            wx.showToast({
              title: '上传失败..',
              icon:"none"
            })
          },
          complete: function (res) {
            wx.hideLoading()
          }
        });
      }
    })
  },
  requestAnimationFrame: function (callback, lastTime) {
    var lastTime;
    if (typeof lastTime === 'undefined') {
      lastTime = 0
    }
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    lastTime = currTime + timeToCall;
    var id = setTimeout(function () {
      callback(lastTime);
    }, timeToCall);
    return id;
  },
  cancelAnimationFrame: function (id) {
    clearTimeout(id);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad:function(options){
    // console.log(111)
    let obj = JSON.parse(options.obj)
    //画布
    context = wx.createCanvasContext('firstCanvas');
    context.beginPath()
    //数据初始化
    console.log(obj)
    let that = this
    that.setData({
      houseid: obj.houseid,
      idCardNum: obj.idCard,
      userName: obj.name,
      starttime:obj.starttime,
      endtime:obj.endtime
    })
    ajax.requestByGet('/house/' + that.data.houseid,{},res=>{
      if(res.data.status==1){
        console.log(res.data.data)
        that.setData({
          house: res.data.data
        })
      }
      
    })
    
  },
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
  touserSign: function () {
    wx.navigateTo({
      url: '../userSign/userSign',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      // scrollViewHeight: (app.data.height - 40) + "px"
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