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
      wx.setStorageSync("userSelect", {
        area:"",
        price: "",
        hx: "",
        saixuan: {
          direction: "",
          condition: ""
        },
        area: {
          fj: "",
          dq: "",
          subway: "",
        }
      })
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
            // wx.setStorage({
            //   key: 'arealist',
            //   data: arealist,
            //   success(){
                
            //   }
            // })
            wx.getStorage({
              key: 'arealist',
              success: function (res) {
                console.log(res)
              },
            })
            // console.log(wx.getStorageSync("arealist"))
          },
          fail(res){
            console.log(res)
          }
        })
      }
    })
  }
}