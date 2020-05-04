// pages/personal/myCompetition/competition.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    competitionData:[]
  },

  toDetails:function(e){
    console.log(e);
    let competitionId=e.currentTarget.dataset.competitionid
    let teamId=e.currentTarget.dataset.teamud
    wx.navigateTo({
      url: './details/applyDetails?competitionId='+competitionId+"&teamId="+teamId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(global.openId)
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/Apply/getAllApplyCompetition?openId='+global.openId,
      success:(res)=>{
        if(res.data.code==0){
          console.log(res.data)
          this.setData({
            competitionData:res.data.data
          })
        }else{
          wx.showToast({
            title: '拉取数据错误',
            icon:'none'
          })
        }
        console.log(res)
      }
    })
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