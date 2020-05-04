// pages/recruit/recruitType/typeRecruit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitData:[],
    tips:"我是有底线的",
  },
  toDetail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../details/recruits?comId='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/recruit/v1/getHotRecruit?name='+options.name,
      success:(res)=>{
        console.log(res.data)
        if(res.data.code==0){
          if(res.data.data.length==0){
            this.setData({
              tips:"暂时没有数据"
            })
          }
          if(res.data.data.length>0){
            this.setData({
              recruitData:res.data.data,
            })
          }
          else{
            wx.showToast({
              title: '暂时没有数据',
              icon:'none'
            })
          }
        }else{
          wx.showToast({
            title: '获取数据失败',
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.showToast({
          title: '连接服务器失败',
          icon:'none'
        })
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