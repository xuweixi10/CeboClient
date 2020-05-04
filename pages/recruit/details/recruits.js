// pages/recruit/details/recruits.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.comId
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/recruit/v1/recruitDetails?postId='+id,
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            details:res.data.data
          })
        }else{
          wx.showToast({
            title: '获取信息失败',
            icon:'none'
          })
        }
        
      }
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