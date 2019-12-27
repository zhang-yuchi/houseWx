// pages/fd_cz/fdcz.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cashArray: ['押一付一', '押一付三'],
    multiIndex: [0, 0],
    imageSrc:"",
    addr:"单行输入",
    longitude:"",
    latitude:"",
    cash:"",
    time:"",
    cashType:"请选择押金方式",
    areaWidth:"",
    floor:"",
    cgArr:["优","良","一般"],
    caig:"请选择采光程度",
    cxArr:["东","南","西"],
    caox:"请选择朝向",
    elArr:["有","无"],
    diant:"请选择是否有电梯",
    looktime:"单行输入",
    intime:"单行输入",
    textarea:"",
    firstLevel:[
      { name: "电视", url: "../../images/dianshi.png", value:"hasTelevison", id: 0, selected: false, className:"jjBox_son_text"},
      { name: "冰箱", url: "../../images/bingxiang.png", value: "hasRefrigerator", id: 1, selected: false, className: "jjBox_son_text" },
      { name: "洗衣机", url: "../../images/xiyiji.png", value: "hasWasher", id: 2, selected: false, className: "jjBox_son_text"},
      { name: "空调", url: "../../images/kongtiao.png", value: "hasAirConditioner", id: 3, selected: false, className: "jjBox_son_text"},
      { name: "热水器", url: "../../images/reshuiqi.png", value: "hasHeater", id: 4, selected: false, className: "jjBox_son_text"},
    ],
    secondLevel:[
      { name: "床", url: "../../images/chuang.png", value: "hasBed",  id: 0, selected: false, className: "jjBox_son_text" },
      { name: "暖气", url: "../../images/nuanqi.png", value: "hasHeating",  id: 1, selected: false, className: "jjBox_son_text" },
      { name: "宽带", url: "../../images/kuandai.png", value: "hasBoradband",  id: 2, selected: false, className: "jjBox_son_text" },
      { name: "衣柜", url: "../../images/yigui.png", value: "hasWardrobe",  id: 3, selected: false, className: "jjBox_son_text" },
      { name: "天然气", url: "../../images/meiqi.png", value: "hasGas",  id: 4, selected: false, className: "jjBox_son_text" },
    ],
    
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //具体地址
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res.longitude);
        console.log(res.latitude);
        console.log(res.address);
        console.log(res.name);
        var longlat = res.longitude + "&" + res.latitude;
        that.setData({
          addr: res.address,
          locationAddress: res.address,
          longitude: res.longitude,
          latitude: res.latitude
        });
      }
    })
  },

  getId:function(e){
    var id = e.currentTarget.id;
    var now = this.data.firstLevel;
    for(var i=0;i<now.length;i++){
      if (id == now[i].id){
        if(now[i].selected == true){
          now[i].selected = false;
          now[i].className = "jjBox_son_text"
        }else{
          now[i].selected = true;
          now[i].className = "jjBox_son_textC"
        }
        
        
      }
    }
    this.setData({
      firstLevel:now
    })
  },
  //其他要求
  getTextArea:function(e){
    this.setData({
      textarea: e.detail.value
    })
  },

  getSecond: function (e) {
    var id = e.currentTarget.id;
    var now = this.data.secondLevel;
    for (var i = 0; i < now.length; i++) {
      if (id == now[i].id) {
        if (now[i].selected == true) {
          now[i].selected = false;
          now[i].className = "jjBox_son_text"
        } else {
          now[i].selected = true;
          now[i].className = "jjBox_son_textC"
        }
      }
    }
    this.setData({
      secondLevel: now
    })
  },
  bindMultiPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  submit:function(){
    var that = this;
    console.log(wx.getStorageSync("userInfo"))
    console.log(that.data)
    if (that.data.addr != "" && that.data.cash != "" && that.data.time != "" && that.data.cashType != "请选择押金方式" && that.data.areaWidth != "" && that.data.caig != "请选择采光程度" && that.data.caox != "请选择朝向" && that.data.diant != "请选择是否有电梯" && that.data.looktime != "" && that.data.intime != "单行输入" && that.data.textarea != "" && that.data.imageSrc != "" && that.data.floor != ""){
      var dataObj = {
        area:that.data.areaWidth,//面积
        cash:that.data.cash,//租金
        cashType: that.data.cashType,//房租类型
        checkInDate:that.data.intime,//入住时间
        inspection:that.data.looktime,//看房时间
        city:"",
        daylighting:that.data.caig,
        floor: that.data.floor,
        // gmtCreate:"",
        hasAirConditioner:0,
        hasBalcony:0,
        hasBed:0,
        hasBoradband:0,
        hasElevator:0,
        hasGas:0,
        hasHeater:0,
        hasHeating:0,
        hasRefrigerator:0,
        hasTelevison:0,
        hasWardrobe:0,
        hasWasher:0,
        lat:that.data.latitude,
        lng:that.data.longitude,
        orientation:that.data.caox,
        province:"",
        title:that.data.time,
        textarea:that.data.textarea,
      };
      console.log("1111")
      console.log(dataObj)
      console.log(that.data.address)
      //得到city和province
      let addr = that.data.addr
      //县级市
      if (addr.indexOf('省') == -1 && addr.indexOf("自治区") == -1) {
        //省市相同
        let index = addr.indexOf('市')
        console.log(addr.substring(0, index))
        dataObj.city = dataObj.province = addr.substring(0, index)
      } else if (addr.indexOf('省') == -1 && addr.indexOf("自治区") != -1) {
        //自治区
        let index = addr.indexOf('自治区')
        let cindex = addr.indexOf('市')
        dataObj.province = addr.substring(0, index)
        dataObj.city = addr.substring(index+3, cindex)
      } else if (addr.indexOf('省') != -1 && addr.indexOf("自治区") == -1) {
        //常规
        let index = addr.indexOf('省')
        let cindex = addr.indexOf('市')
        dataObj.province = addr.substring(0, index)
        dataObj.city = addr.substring(index+1, cindex)
      }

      //得到两排的筛选
      for(let item of that.data.firstLevel){
        if(item.selected){
          //被选中了
          dataObj[item.value] = 1
        }
      }
      for(let item of that.data.secondLevel){
        if (item.selected) {
          //被选中了
          dataObj[item.value] = 1
        }
      }
      //是否有电梯
      if(that.data.dianti=="有"){
        dataObj.hasElevator = 1
      }
      console.log(dataObj)
    }else{
      // wx.showModal({
      //   title: '提示',
      //   content: '信息不完整！请检查',
      // })
    }
    
  },
  choseImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        var tempFilePaths1 = res.tempFilePaths;
        console.log("test:" + String(tempFilePaths1));
        var pparr = String(tempFilePaths1).split(".")
        if (pparr[pparr.length - 1] == "jpg" || pparr[pparr.length - 1] == "JPG") {
          that.setData({
            isIdCardJpg: true
          });
        }
        that.setData({
          imageSrc: tempFilePaths1,
        });
      }
    })
    console.log(that.data.imageSrc);
  },
  //
  watchPassWord: function (event) {
    console.log(event.detail.value);
  },
  getAddr:function(event){
    this.setData({
      addr: event.detail.value
    })
  },
  getCash: function (event) {
    this.setData({
      cash: event.detail.value
    })
  },
  getTime: function (event){
    this.setData({
      time: event.detail.value
    })
  },
  areaWidth: function (event){
    this.setData({
      areaWidth: event.detail.value
    })
  },
  getFloor: function (event){
    this.setData({
      floor: event.detail.value
    })
  },
  lookTime: function (event){
    this.setData({
      looktime: event.detail.value
    })
  },
  intime: function (event){
    this.setData({
      intime: event.detail.value
    })
  },
  bindCashPickerChange:function(e){
    console.log(this.data.cashArray[e.detail.value]);
    this.setData({
      cashType: this.data.cashArray[e.detail.value]
    })
  },
  bindCgPickerChange:function(e){
    console.log(this.data.cgArr[e.detail.value]);
    this.setData({
      caig: this.data.cgArr[e.detail.value]
    })
  },
  bindCxPickerChange:function(e){
    console.log(this.data.cxArr[e.detail.value]);
    this.setData({
      caox: this.data.cxArr[e.detail.value]
    })
  },
  bindDtPickerChange:function(e){
    console.log(this.data.elArr[e.detail.value]);
    this.setData({
      diant: this.data.elArr[e.detail.value]
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