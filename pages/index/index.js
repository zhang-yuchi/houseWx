// pages/index/index.js
var app = getApp();
var allArr = [];
var ajax = require("../../utils/ajax.js")
var subwayUtil = require('../../utils/subwayUtil.js')
var utils = require('../../utils/utils.js')
var QQMap = require('../../utils/qqmap-wx-jssdk.min.js')
let qqMap = new QQMap({
  key: "OVUBZ-MLPL6-MQPSJ-MR2KT-MWFIK-O6FUE"
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowcity: wx.getStorageSync("citylist").city ? wx.getStorageSync("citylist").city:"",
    houses:[],
    movies:[],
    requestHost:app.data.requestHost,
    isFd:0,
    isAuth:0,
    page:1,
    isBottom:false,
    search:"",
    tcArr:[]
  },
  init(){
    let that = this
    wx.setStorageSync("fjlist", [
      //没有这个列表则创建一个新的
      {
        name: "不限",
        select: false,
        value: "",
        classname: ""
      },
      {
        name: "1000m内",
        select: false,
        value: 1000,
        classname: ""
      },
      {
        name: "3000m内",
        select: false,
        value: 3000,
        classname: ""
      },
      {
        name: "5000m内",
        select: false,
        value: 5000,
        classname: ""
      },
      {
        name: "10000m内",
        select: false,
        value: 10000,
        classname: ""
      }])
    wx.setStorageSync("pricelist", [
      {
        name: "不限",
        classname: "active",
        select: true,
      },
      {
        name: "价格由低到高",
        classname: "",
        select: false,
      },
      {
        name: "价格由高到低",
        classname: "",
        select: false,
      },
      {
        name: "时间由新到旧",
        classname: "",
        select: false,
      },
    ])
    wx.setStorageSync('moneylist', [
      {
        name: "不限",
        value: 0,
        select: true,
        classname: "active"
      },
      {
        name: "1000元以下",
        value: 1,
        select: true,
        classname: ""
      },
      {
        name: "1000-1500元",
        value: 2,
        select: true,
        classname: ""
      },
      {
        name: "1500-2000元",
        value: 3,
        select: true,
        classname: ""
      },
      {
        name: "2000-2500元",
        value: 4,
        select: true,
        classname: ""
      },
      {
        name: "2500元以上",
        value: 5,
        select: true,
        classname: ""
      },
    ])
    wx.setStorageSync("hxlist", [
      { name: "不限", id: 0, value: "", className: "barBtn barBtnC", select: true },
      { name: "一室", id: 1, value: "一室", className: "barBtn", select: false },
      { name: "二室", id: 2, value: "二室", className: "barBtn", select: false },
      { name: "三室", id: 3, value: "三室", className: "barBtn", select: false }
    ])
    wx.setStorageSync("saixuanlist", {
      cx: [
        { name: "不限", id: 0, value: "", className: "barBtn barBtnC", select: true },
        { name: "东", id: 1, value: "东", className: "barBtn", select: false },
        { name: "南", id: 2, value: "南", className: "barBtn", select: false },
        { name: "西", id: 3, value: "西", className: "barBtn", select: false },
        { name: "北", id: 4, value: "北", className: "barBtn", select: false },
        { name: "南北", id: 5, value: "南北", className: "barBtn", select: false },
      ],
      zf: [//多选
        { name: "押一付一", value: "押一付一", obj: "cashType", id: 1, className: "barBtn", select: false },
        { name: "配套齐全", value: 1, obj: "hasComplete", id: 2, className: "barBtn", select: false },
        { name: "可短租", value: 1, obj: "shortRent", id: 3, className: "barBtn", select: false },
        { name: "女生合租", value: 0, obj: "girlShared", id: 4, className: "barBtn", select: false },
        { name: "男生合租", value: 0, obj: "boyShared", id: 5, className: "barBtn", select: false },
        { name: "独立阳台", value: 1, obj: "hasBalcony", id: 6, className: "barBtn", select: false },
      ]
    })
    // utils.initSelect(function(){
    //   wx.reLaunch({
    //     url: '../index/index',
    //   })
    //   console.log(wx.getStorageSync("userSelect"))
    // })
    new Promise(resolve=>{
      utils.initAsDongGuan(this, function () {
        wx.reLaunch({
          url: '../index/index',
        })
        wx.hideLoading()
      },true)
    })
    
    // wx.reLaunch()
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    utils.token()
    ajax.requestByGet('/user/info',{},function(res){
      console.log(res)
      wx.setStorageSync("userInfo", res.data.data)
      console.log(wx.getStorageSync("userInfo"))
      that.setData({
        isFd: res.data.data.landlord,
        isAuth:res.data.data.isAuth
      })
      console.log(that.data)
    })
    console.log(wx.getStorageSync("userInfo"))
    console.log(wx.getStorageSync("citylist"))
    this.setData({
      nowcity: wx.getStorageSync("citylist").city ? wx.getStorageSync("citylist").city : ""
    })
    // wx.setStorageSync("userSelect", null)
    //获取轮播图
  ajax.requestByGet('/banner',{},function(res){
    console.log(res.data.data)
    that.setData({
      movies: res.data.data
    })

  })


  //获得特色推荐
  ajax.requestByGet('/user/rcmd',{},function(res){
    console.log(res)
    let tcArr = []
    for(let item of res.data.data){
      tcArr.push(item)
    }
    that.setData({
      tcArr: tcArr
    })
  })

  },
  totips(){
    wx.showToast({
      title: '审核中,请耐心等待',
      icon:"none"
    })
  },
  toRent(){
    wx.navigateTo({
      url: '../fd_cz/fd_cz',
    })
  },
  toPrice:function(){
    wx.navigateTo({
      url: '../price2/price2',
    })
  },
  tonew(){
    let page = this.data.page
    let that = this
    if(!that.data.isBottom){
      wx.showLoading({
        title: '加载中',
      })
      ajax.requestByGet('/house?page=' + (page + 1), wx.getStorageSync("userSelect"), (res) => {
        wx.hideLoading()
        console.log(res)
        if (res.data.status == -1) {
          that.data.isBottom = true
          wx.showToast({
            title: '已经到底部了哦~',
            icon: "none"
          })
        } else {
          let houses = that.data.houses
          for (let item of houses) {
            houses.push(item)
          }
          that.setData({
            houses: houses,
            page: page + 1
          })

        }
      })
    }
    
  },
  toarea(){
    wx.navigateTo({
      url: '../area/area',
    })
  },
  tosort(){
    wx.navigateTo({
      url: '../price/price',
    })
  },
  tohousedetails(e){
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `../housedetail/housedetail?obj=${id}`,
    })
    
    // wx.navigateTo({
    //   url: '../housedetail/housedetail',
    // })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(wx.getStorageSync("userSelect"))
    console.log("show")
    var that = this;
    that.setData({
      searchBoxInputWidth:(app.data.width-136)+"px",
      inputWidth: (app.data.width - 136-14-25)+"px",
      itembox_sonwidth:(app.data.width/3)+"px",
      middle_check_sonwidth: (app.data.width / 5-5) + "px",
      middle_check_son_textleft: (app.data.width / 5-37)/2 + "px",
      scrollViewHeight:(app.data.height*0.745-190)+"px",
      sx_son_width:(app.data.width*0.95*0.6/4-6)+"px",
      isBottom:false,
    });
    //请求所有房间数据
    // wx.showLoading({
    //   title: '请等候',
    // })
    if (!wx.getStorageSync("userSelect")) {
      utils.initSelect(function () {//新用户先初始化
        ajax.requestByGet('/house', wx.getStorageSync("userSelect"), function (res) {
          if (res.data.status == -1) {
            that.setData({
              houses: []
            })
            // wx.hideLoading()
            return
          }
          let houses = res.data.data
          for (let item of houses) {
            
            let tags = item.tags
            if(tags){
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
          console.log(that.data)
        })
      })
    } else {
      console.log(wx.getStorageSync("userSelect"))
      ajax.requestByGet('/house', wx.getStorageSync("userSelect"), function (res) {
        console.log(res)
        if(res.data.status==-1){
          that.setData({
            houses:[]
          })
          // wx.hideLoading()
          return
        }
        let houses = res.data.data
        for (let item of houses) {
          let tags = item.tags
          if(tags){
            // console.log(tags)
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
          
        }
        // wx.hideLoading()
        that.setData({
          houses: houses
        })
        // console.log(that.data)
      })
    }

    //获取权限
    // wx.setStorageSync('citylist', null)
    if (!wx.getStorageSync('citylist')) {
      // console.log("进入了")
      //第一次配置
      //配置租金,户型,筛选,附近 四个基本表
      if (!wx.getStorageSync("fjlist")) {
        wx.setStorageSync("fjlist", [
          //没有这个列表则创建一个新的
          {
            name: "不限",
            select: false,
            value:"",
            classname: ""
          },
          {
            name: "1000m内",
            select: false,
            value: 1000,
            classname: ""
          },
          {
            name: "3000m内",
            select: false,
            value: 3000,
            classname: ""
          },
          {
            name: "5000m内",
            select: false,
            value: 5000,
            classname: ""
          },
          {
            name: "10000m内",
            select: false,
            value: 10000,
            classname: ""
          }])
      }
      if (!wx.getStorageSync("pricelist")) {
        //这个是排序!!!!!!!
        wx.setStorageSync("pricelist", [
          {
            name: "不限",
            classname: "active",
            select: true,
          },
          {
            name: "价格由低到高",
            classname: "",
            select: false,
          },
          {
            name: "价格由高到低",
            classname: "",
            select: false,
          },
          {
            name: "时间由新到旧",
            classname: "",
            select: false,
          },
        ])
      }
      if(!wx.getStorageSync("moneylist")){
        wx.setStorageSync('moneylist', [
          {
            name:"不限",
            value:0,
            select:true,
            classname:"active"
          },
          {
            name: "1000元以下",
            value: 1,
            select: true,
            classname: ""
          },
          {
            name: "1000-1500元",
            value: 2,
            select: true,
            classname: ""
          },
          {
            name: "1500-2000元",
            value: 3,
            select: true,
            classname: ""
          },
          {
            name: "2000-2500元",
            value: 4,
            select: true,
            classname: ""
          },
          {
            name: "2500元以上",
            value: 5,
            select: true,
            classname: ""
          },
        ])
      }
      if (!wx.getStorageSync("hxlist")) {
        wx.setStorageSync("hxlist", [
          { name: "不限", id: 0, value:"", className: "barBtn barBtnC", select: true },
          { name: "一室", id: 1, value: "一室", className: "barBtn", select: false },
          { name: "二室", id: 2, value: "二室", className: "barBtn", select: false },
          { name: "三室", id: 3, value: "三室", className: "barBtn", select: false }
        ])
      }
      if (!wx.getStorageSync("saixuanlist")) {
        wx.setStorageSync("saixuanlist", {
          cx: [
            { name: "不限", id: 0, value:"", className: "barBtn barBtnC", select: true },
            { name: "东", id: 1, value: "东", className: "barBtn", select: false },
            { name: "南", id: 2, value: "南", className: "barBtn", select: false },
            { name: "西", id: 3, value: "西", className: "barBtn", select: false },
            { name: "北", id: 4, value: "北", className: "barBtn", select: false },
            { name: "南北", id: 5, value: "南北", className: "barBtn", select: false },
          ],
          zf: [//多选
            { name: "押一付一",value:"押一付一", obj:"cashType", id: 1, className: "barBtn", select: false },
            { name: "配套齐全", value: 1, obj: "hasComplete",  id: 2, className: "barBtn", select: false },
            { name: "可短租", value: 1, obj: "shortRent", id: 3, className:   "barBtn", select: false },
            { name: "女生合租", value: 0, obj: "girlShared", id: 4, className: "barBtn", select: false },
            { name: "男生合租", value: 0, obj: "boyShared", id: 5, className: "barBtn", select: false },
            { name: "独立阳台", value: 1, obj: "hasBalcony", id: 6, className: "barBtn", select: false },
          ]
        })
      }

      //获取用户位置来得到市区信息
      utils.initAsDongGuan(this)
      // new Promise((resolve, reject) => {
      //   wx.getLocation({
      //     success: function (res) {
      //       qqMap.reverseGeocoder({
      //         location: {
      //           latitude: res.latitude,
      //           longitude: res.longitude
      //         },
      //         success(res) {
      //           let addr = res.result.address
      //           let sheng = addr.indexOf('省')
      //           let shi = addr.indexOf('市')
      //           let checkSheng = addr.indexOf('省') != -1
      //           let checkshi = addr.indexOf('市') != -1
      //           let citylist = {
      //             provicename: "",
      //             city: "",
      //             same: false
      //           }
      //           if (checkSheng && checkshi) {
      //             //有省也有市
      //             citylist.city = addr.substring(sheng + 1, shi)
      //             citylist.provicename = addr.substring(0, sheng)
      //           } else if (!checkSheng && checkshi) {
      //             //没有省只有市
      //             citylist.city = addr.substring(sheng + 1, shi)
      //             citylist.provicename = city
      //             citylist.same = true
      //           }
      //           wx.setStorageSync("citylist", citylist)
      //           resolve()
      //         }
      //       })
      //     },
      //   })
      // }).then(() => {
      //   let city = wx.getStorageSync("citylist").city
      //   this.setData({
      //     nowcity:city
      //   })
      //   //获取城市地铁列表
      //   utils.initIndex(city, that)
      // })
    }
    console.log(wx.getStorageSync("citychanges"))
    if (wx.getStorageSync("citychanges")) {
      //城市发生改变 重新获取地铁信息
      let city = wx.getStorageSync("citylist").city
      console.log(city)
      utils.initIndex(city, that)
      //更新完成后将flag变为false
      console.log(wx.getStorageSync("arealist"))
      wx.setStorageSync("citychanges", false)
    }
  },
  search(){
    //搜索
    let that = this
    wx.navigateTo({
      url: '../searchpage/searchpage?houseinfo='+that.data.search,
    })
  },
  listeninput(e){
    this.setData({
      search:e.detail.value
    })
    
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
      wx.showToast({
        title: '您已是房东',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: '../fdAuth_new/fdAuth_new',
      })
    }
    
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