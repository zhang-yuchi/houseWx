// pages/area/area.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //单个框
    nowlist:[

    ],
    //多级目录
    sublist:{
      list:[],
      content:[]
    },
    hasSub:false,
    selectbtn:[
      {
        listindex:0,
        name:"附近",
        classname:"active-btn",
        select:true,
        hasSub:false,
      },
      {
        listindex: 1,
        name: "地区",
        classname: "",
        select:false,
        hasSub: false,
      },
      {
        listindex: 2,
        name: "地铁",
        classname: "",
        select:false,
        hasSub: true,
      }
    ],
    selectcontent:[
        
    ],
    ditielist:[]
  },
  chooseOptionNoSub(e){
    let index = e.currentTarget.dataset.optionindex
    let nowlist = this.data.nowlist
    for(let item of nowlist){
      item.select = false;
      item.classname = ""
    }
    nowlist[index].select = true;
    nowlist[index].classname = "active-content"
    this.setData({
      nowlist:nowlist
    })
  },
  choosebtn(e) {
    let index = e.currentTarget.dataset.btnid
    let selectbtn = this.data.selectbtn
    this.setData({
      hasSub:selectbtn[index].hasSub
    })
    for(let item of selectbtn){
      item.classname = ""
      item.select = false
    }
    selectbtn[index].classname = "active-btn"
    selectbtn[index].select = true
    
    if(!selectbtn[index].hasSub){
      //如果没子菜单
      this.setData({
        selectbtn: selectbtn,
        nowlist:this.data.selectcontent[selectbtn[index].listindex]
      })
    }else{
      //如果有子菜单
      let sublist = this.data.sublist
      let list = this.data.selectcontent[selectbtn[index].listindex]
      sublist.list = list
      this.setData({
        selectbtn: selectbtn,
        sublist:sublist
      })
    }
  },
  chooseSub(e){
    //选择子级菜单
    let index = e.currentTarget.dataset.index
    let sublist = this.data.sublist
    let ditielist = this.data.ditielist
    let selectcontent = this.data.selectcontent
    let selectlist = selectcontent[2]//子级菜单
    let content = []
    
    //改变列表
    content = ditielist[index]
    sublist.content = content
    //改变点击特效
    for(let item of selectlist){
      item.classname = ""
      item.select = false
    }
    selectlist[index].classname = "active-content"
    selectlist[index].select = true
    
    //渲染页面
    this.setData({
      sublist:sublist,
      selectcontent:selectcontent,
    })
  },
  chooseOption(e){
    let index = e.currentTarget.dataset.index
    let sub = this.data.sublist
    let sublist = this.data.sublist.list
    let subcontent = this.data.sublist.content
    let ditielist = this.data.ditielist
    let i = 0
    for(let item of sublist){
      if(item.select){
        i = item.index
        break
      }
    }
     //清空同级选择
    for(let item of ditielist){
      for(let key of item){
        key.select = false
        key.classname = ""
      }
    }
    //清空地区 选择
    for (let item of this.data.selectcontent[1]){
      item.classname = ""
      item.select = false
    }
    console.log(this.data.selectcontent)
     //----------
    let inner = ditielist[i]
    for(let item of inner){
      item.select = false;
      item.classname = ""
    }
    inner[index].select = true
    inner[index].classname = "active-content"
    subcontent = inner
    sub.content = subcontent
    this.setData({
      sublist: sub,
      selectcontent: this.data.selectcontent,
      ditielist:ditielist,
    })
  },
  choosearea(e){
    //选择地区
    let index = e.currentTarget.dataset.optionindex
    let nowlist = this.data.nowlist
    for (let item of nowlist) {
      item.select = false;
      item.classname = ""
    }
    //清除地铁口选择
    for(let item of this.data.ditielist){
      for(let key of item){
        key.classname = ""
        key.select = false
      }
    }
    nowlist[index].select = true;
    nowlist[index].classname = "active-content"
    this.setData({
      nowlist: nowlist,
      ditielist:this.data.ditielist
    })
  },
  sx(){
    let userselect = wx.getStorageSync("userSelect")
    //判断附近:
    for (let item of this.data.selectcontent[0]){
      console.log(item)
      if(item.select){
        console.log(item.value)
        userselect.distance = item.value
      }
    }
    wx.setStorageSync("fjlist", this.data.selectcontent[0])//修改本地缓存
    console.log(userselect)
    //改变地区和地铁 地区和地铁反正只有一个坐标 但是 地区 地铁和地铁口 三个状态的缓存要保存
    for (let item of this.data.selectcontent[1]){
      if(item.select&&item.name!=="不限"){
        userselect.lat = item.location.lat
        userselect.lng = item.location.lng
      }
    }
    for(let item of this.data.ditielist){
      for(let key of item){
        if (key.select) {
          userselect.lat = key.location.lat
          userselect.lng = key.location.lng
        }
      }
    }
    wx.setStorageSync("arealist", this.data.selectcontent[1])
    let subObj = wx.getStorageSync("subwayObject")
    subObj.sublist = this.data.ditielist
    subObj.subtitle = this.data.selectcontent[2]
    wx.setStorageSync("subwayObject", subObj)
    wx.setStorageSync("userSelect", userselect)
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectcontent: [
        wx.getStorageSync("fjlist"),//附近 列表
        wx.getStorageSync("arealist"),
        wx.getStorageSync("subwayObject").subtitle
      ],
      ditielist: wx.getStorageSync("subwayObject").sublist
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
    console.log(wx.getStorageSync("arealist"))
    let sublist = {
      list: [],
      content: []
    }
    sublist.list = this.data.selectcontent[this.data.selectbtn[2].listindex]
    // sublist.content = this.data.ditielist[0]

    this.setData({
      nowlist: this.data.selectcontent[0],
      hasSub: this.data.selectbtn[0].hasSub,
      sublist: sublist
    })
  },
  toprice(){
    wx.redirectTo({
      url: '../price2/price2',
    })
  },
  tosort(){
    wx.redirectTo({
      url: '../price/price',
    })
  },
  tohx() {
    wx.redirectTo({
      url: '../hx/hx',
    })
  },
  tosaixuan() {
    wx.redirectTo({
      url: '../saixuan/saixuan',
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