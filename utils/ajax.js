module.exports = {
  requestByGet(url,data,callback){
    wx.request({
      url: url,
      data:data,
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization":wx.getStorageSync("token")
      },
      success(res){
        callback(res)
      }
    })
  },
  requestByPost(url,data,callback){
    wx.request({
      url: url,
      data:data,
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization": wx.getStorageSync("token")
      },
      success(res){
        callback(res)
      },
    })
  }
}