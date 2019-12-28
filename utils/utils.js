var subwayUtil = require('./subwayUtil.js')
var QQMap = require('./qqmap-wx-jssdk.min.js')
let qqMap = new QQMap({
  key: "OVUBZ-MLPL6-MQPSJ-MR2KT-MWFIK-O6FUE"
})
module.exports = {
  //给出一个城市的信息,重新改变地铁页和位置页
  initIndex(city,that){//that用于渲染首页上的地址信息
    subwayUtil.sendSubWay(city, function () {
      wx.setStorageSync("citychanges", false)
      //获取用户选择
      // wx.setStorageSync("citylist", null)
      that.setData({
        nowcity: city
      })
    })
    //获取城区信息
    qqMap.getCityList({
      success(res) {
        let citycode = ""
        let provinces = res.result[0]
        let citys = res.result[1]
        let areas = res.result[2]
        let citylist = wx.getStorageSync("citylist")
        //找到市码 然后找区即可
        for (let item of citys) {
          if (item.name == citylist.city) {
            citycode = item.id
          }
          console.log(citycode)
        }
        if(!citycode){
          for (let item of provinces) {
            if (item.name == citylist.city) {
              citycode = item.id
            }
          }
        }
        qqMap.getDistrictByCityId({
          id: citycode,
          success(res) {
            let arealist = [{
              name: "不限",
              select: false,
              classname: ""
            }]
            console.log(res)
            // console.log(res.result)
            for (let item of res.result[0]) {
              console.log(item)
              let content = {}
              content.name = item.fullname
              content.location = item.location
              content.select = false
              content.classname = ""
              arealist.push(content)
            }
            wx.setStorageSync("arealist", arealist)
            console.log(wx.getStorage({
              key: 'arealist',
              success: function (res) {
                
              },
            }))
          },
          fail(res){
            console.log(res)
          }
        })
      }
    })
  },
  initSelect(callback){
    wx.getLocation({
      success: function (res) {
        console.log(res)
        wx.setStorageSync("userSelect", {
          lat: res.latitude,
          lng: res.longitude,
          district: '',
          houseType: '',
          cashType: '',
          girlShared: '',
          boyShared: '',
          hasBalcony: '',
          rentType: '',
          hasComplete: '',
          shortRent: '',
          orientation:"",
          price:"",
          cash: '',
          latest:''
        })
        callback()
      },
    })
  },
  initList(obj){
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
    new Promise((resolve, reject) => {
      wx.getLocation({
        success: function (res) {
          qqMap.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success(res) {
              let addr = res.result.address
              let sheng = addr.indexOf('省')
              let shi = addr.indexOf('市')
              let checkSheng = addr.indexOf('省') != -1
              let checkshi = addr.indexOf('市') != -1
              let citylist = {
                provicename: "",
                city: "",
                same: false
              }
              if (checkSheng && checkshi) {
                //有省也有市
                citylist.city = addr.substring(sheng + 1, shi)
                citylist.provicename = addr.substring(0, sheng)
              } else if (!checkSheng && checkshi) {
                //没有省只有市
                citylist.city = addr.substring(sheng + 1, shi)
                citylist.provicename = city
                citylist.same = true
              }
              wx.setStorageSync("citylist", citylist)
              resolve()
            }
          })
        },
      })
    }).then(() => {
      let city = wx.getStorageSync("citylist").city
      obj.setData({
        nowcity: city
      })
      //获取城市地铁列表
      that.initIndex(city, obj)
    })
  

  },
  initAsDongGuan(that,callback,loading){
    //起始地改为东莞
    console.log(wx.getStorageSync("citylist"))

    let citylist = {
      city:"东莞"
    }
    // citylist.city = "东莞"
    wx.setStorageSync("citylist",citylist)
    that.setData({
      nowcity:"东莞"
    })
    qqMap.geocoder({
      address:"东莞",
      success(res){
        //获取东莞的坐标
        console.log(res)
        let result = res.result.location
        wx.setStorageSync("userSelect", {
          lat: result.lat,
          lng: result.lng,
          district: '',
          houseType: '',
          cashType: '',
          girlShared: '',
          boyShared: '',
          hasBalcony: '',
          rentType: '',
          hasComplete: '',
          shortRent: '',
          orientation: "",
          price: "",
          cash: '',
          latest: ''
      })
      subwayUtil.sendSubWay("东莞",function(){
        if(loading){
          wx.showLoading({
            title: '加载中',
          })
        }
        //获取arealist
        qqMap.getCityList({
          success(res){
            let arr = res.result[1]
            let code = 441999 //东莞的编号
            // for(let item of arr){
            //   if(item.name == "东莞"){
            //     // console.log(item)
            //     code = item.id
            //     break
            //   }
            // }
            console.log(code)
            qqMap.getDistrictByCityId({
              id:code,
              success(res){
                let arealist = [{
                  name: "不限",
                  select: false,
                  classname: ""
                }]
                console.log(res)
                // console.log(res.result)
                for (let item of res.result[0]) {
                  console.log(item)
                  let content = {}
                  content.name = item.fullname
                  content.location = item.location
                  content.select = false
                  content.classname = ""
                  arealist.push(content)
                }
                wx.setStorageSync("arealist", arealist)
                if(callback){
                  callback()
                }
                
              }
            })
          }
        })
      })
    }
  })},
  tagsToArr(tags){
    if(tags){
      tags = tags.replace("{","")
      tags = tags.replace("}","")
      let arr = tags.split(',')
      let newarr = arr.map((item,index)=>{
        let str = item
        str = str.replace("\"","")
        str = str.replace("\"", "")
        return str
      })
      console.log(newarr)
      return newarr
    }
    return []
  }
}