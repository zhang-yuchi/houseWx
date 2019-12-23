module.exports = {
  requestByGet(url,callback){
    wx.request({
      url: url,
      header:{
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization":wx.getStorageSync("token")
      },
      success(res){
        callback(res)
      }
    })
  },
  requestByPost(url,data){
    wx.request({
      url: url,
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