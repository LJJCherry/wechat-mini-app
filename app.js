//app.js
const defaultTime = {
  defaultWorkTime: 25,
  defaultRestTime: 5
}

App({
  globalData:{
    userInfo: null
  },
  onLaunch: function() {
    let workTime = wx.getStorageSync('workTime')
    let restTime = wx.getStorageSync('restTime')
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }
    if (!restTime) {
      wx.setStorage({
        key: 'restTime',
        data: defaultTime.defaultRestTime
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this;
    if(that.globalData.userInfo){
      typeof cb == "function" &&cb(that.globalData.userInfo)
    }else{
      wx.login({
        success: function(res){
          wx.getUserInfo({
             success: function(res){
                that.globalData.userInfo = res.userInfo;
                typeof cb == "function" &&cb(that.globalData.userInfo)
             }
          })
       }
      })
    }
  }
})
