var QQMapWX = require("./qqmap-wx-jssdk.min.js")
module.exports = {
  arr: [],
  _getAllsubway: function (city, page) {
    let qqMap = new QQMapWX({
      key: 'OVUBZ-MLPL6-MQPSJ-MR2KT-MWFIK-O6FUE' // 必填
    });
    // console.log(11)
    return new Promise((resolve, reject) => {
      qqMap.search({
        keyword: "地铁",
        success: function (res) {
          let result = {
            arr: [],//获取到的地铁数组
            isnull: false
          }
          if (res.data.length === 0) {
            result.isnull = true
            result.arr = []
          } else {
            result.arr = res.data
          }
          // console.log(result)
          resolve(result)
        },
        page_size: 20,
        page_index: page,
        region: city,
       
      })
    })
  },
  calcCount: async function (city) {
    let qqMap = new QQMapWX({
      key: 'OVUBZ-MLPL6-MQPSJ-MR2KT-MWFIK-O6FUE' // 必填
    });
    let page = 0
    return new Promise((resolve) => {
      qqMap.search({
        keyword: "地铁",
        region: city,
        success(res) {
          page = Math.ceil(res.count / 20)
          
          resolve(page)
        },
        fail(res) {
          console.log(res)
        }
      })
    })
  },
  getAllsubway: async function (city) {
    let qqMap = new QQMapWX({
      key: 'OVUBZ-MLPL6-MQPSJ-MR2KT-MWFIK-O6FUE' // 必填
    });
    let that = this
    let page = 0
    //计算page
    page = await this.calcCount(city)
    // console.log(page)
    let subways = []
    for (let i = 1; i <= page; i++) {
      let res = await this._getAllsubway(city, i)
      for (let item of res.arr) {
        subways.push(item)
      }
    }
    // this.setData({
    //   arr: subways
    // })
    this.arr = subways

  },
  sortByLine(linearr) {
    //通过线路排序
    let noline = []
    let lines = []
    for (let item of linearr) {
      let flag = false
      for (let i = 1; i <= 9; i++) {
        if (item.indexOf(i) != -1) {
          lines.push(item)
          break
        }
        if (i == 9) {
          noline.push(item)
        }
      }
    }
    //对lines进行排序
    lines.sort((a, b) => {
      let aindex = 0
      let bindex = 0
      for (let i = 1; i <= 9; i++) {
        if (a.indexOf(i) != -1) {
          aindex = a.indexOf(i)
          break
        }
      }
      for (let i = 1; i <= 9; i++) {
        if (b.indexOf(i) != -1) {
          bindex = b.indexOf(i)
          break
        }
      }
      if (Number(a[aindex]) == Number(b[bindex])) {
        //如果都是一号 比较下一位
        let checka = a[aindex + 1] > '9' || a[aindex + 1] < '0'
        let checkb = b[bindex + 1] > '9' || b[bindex + 1] < '0'
        if (!checka && !checkb) {
          //a,b都有下一位,则看谁的更大
          return Number(a[aindex + 1]) - Number(b[bindex + 1])
        }
        if (checka && !checkb) {
          //b有下一位 b更大
          return -1
        }
        if (!checka && checkb) {
          return 1
        }
      } else {
        if (Number(a[aindex]) > Number(b[bindex])) {
          if (b[bindex + 1] <= '9' && b[bindex + 1] >= '0') {
            return -1
          }
        }
        if (Number(a[aindex]) < Number(b[bindex])) {
          if (a[aindex + 1] <= '9' && a[aindex + 1] >= '0') {
            return 1
          }
        }
      }
      //不一样,直接比较
      return Number(a[aindex]) - Number(b[bindex])
    })
    return lines.concat(noline)
  },
  mergeIntoSubway(subwaylist, arr) {
    let subwayObj = []
    for (let list of subwaylist) {
      //初始化subwayObj
      let options = {
        name: list,
        subways: []
      }
      subwayObj.push(options)
    }
    // console.log(subwayObj)
    for (let list of subwayObj) {
      let listname = list.name
      for (let item of arr) {
        // console.log(item)
        let address = item.address
        if (address.indexOf(',') == -1) {
          //只有一个地址
          // console.log("---------")
          // console.log(listname)
          // console.log(address.replace("地铁", ""))
          // console.log("---------")
          if (listname == address.replace("地铁", "")) {//之前有个地方把地铁两个字去掉了,这里也要去掉
            item.title = item.title.replace("[地铁站]", "")
            list.subways.push(item)
          }
        } else {
          let addrs = address.split(',')//划分成数组
          // console.log(addrs)
          for (let adr of addrs) {
            // console.log(adr)
            if (listname == adr.replace("地铁", "")) {
              item.title = item.title.replace("[地铁站]", "")
              list.subways.push(item)
              break
            }
          }
        }
      }
    }
    return subwayObj

  },
  sendSubWay(city, callback) {
    //调用这个函数,阔以得到一个当前城市的所有地铁与地铁口列表,并存入缓存,名为subwayObject
    wx.showLoading({
      title: '正在配置位置信息',
    })
    console.log(this.getAllsubway)
    this.getAllsubway(city).then(() => {
      let subway = this.arr
      console.log(subway)
      let subwaynames = []
      for (let item of subway) {
        let addrarr = item.address
        if (addrarr.indexOf(',') === -1) {
          //只有一个的
          subwaynames.push(addrarr)
        } else {
          //有多个的
          let namearr = addrarr.split(',')
          for (let item of namearr) {
            subwaynames.push(item)
          }
        }
      }
      let newarr = subwaynames.filter((item, index, arr) => {
        return arr.indexOf(item, 0) === index
      }).map((item, index) => {
        return item.replace("地铁", "")
      })
      //对数组进行排序
      newarr = this.sortByLine(newarr)
      // console.log(newarr)
      let sublist = this.mergeIntoSubway(newarr, this.arr)
      //将sublist写入缓存
      let subObj = {
        subtitle:[{
          index:0,
          name:"全城",
          select:false,
          classname:""
        }],
        sublist:[]
      }

      //录入全城信息
      let allsubway = []
      for(let index in sublist){
        //载入subtitle
        
        subObj.subtitle.push({
          name:sublist[index].name,
          select:false,
          index: parseInt(index)+1,
          classname:""
        })
        for (let key of sublist[index].subways){
          // console.log(key)
          allsubway.push({
            title:key.title,
            select:false,
            classname:"",
            location:key.location
          })
        }
      }
      //去重
      // for(let i = 0;i<allsubway.length-1;i++){
      //   for(let j = i+1;i<allsubway.length;j++){
      //     // console.log(allsubway[i].title)
      //   }
      // }
      allsubway = allsubway.filter((item,index,arr)=>{
        for(let i =0;i<index;i++){
          if(arr[i].title===item.title){
            return false
          }
        }
        return true
      })
      subObj.sublist.push(allsubway)
      // console.log(sublist)
      for(let item of sublist){
        let arr = []
        for(let key of item.subways){
          key.select = false
          key.classname = ""
          arr.push(key)
        }
        subObj.sublist.push(arr)
      }
      console.log(subObj)
      //分别录入subObj
      wx.setStorageSync("subwayObject", subObj)
      wx.hideLoading()//关闭加载提示框
      callback()
    })
  },
}