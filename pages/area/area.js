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
      ditielist:ditielist,
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