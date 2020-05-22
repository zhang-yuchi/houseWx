const app = getApp()
module.exports = {
  requestByGet(url,data,callback){
    wx.request({
      url: `${app.data.requestHost}${url}`,
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
      url: `${app.data.requestHost}${url}`,
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
  },
  requestByDelete(url, data, callback){
    wx.request({
      url: `${app.data.requestHost}${url}`,
      data: data,
      method: "DELETE",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization": wx.getStorageSync("token")
      },
      success(res) {
        callback(res)
      },
    })
  },
  requestByPut(url, data, callback) {
    wx.request({
      url: `${app.data.requestHost}${url}`,
      data: data,
      method: "PUT",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization": wx.getStorageSync("token")
      },
      success(res) {
        callback(res)
      },
    })
  },

}