// pages/recruit/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit:function(e){
    console.log(e)
    let comName=e.detail.value.competitionName
    let intro=e.detail.value.intro
    let wanted=e.detail.value.wanted
    if(comName==""||intro==""||wanted==""){
      wx.showToast({
        title: '填写正确的信息',
        icon:'none'
      })
    }
    else{
      wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/recruit/v1/addRecruit',
      method:'POST',
      data:{
        "postedId": global.openId,
        "compName": comName,
        "wantedPerson": wanted,
        "introduction": intro,
        "extraInfo": ""
      },
      success:(res)=>{
        if(res.data.code==0){
          wx.showModal({
            title: '发布成功',
            content: '在我的招募中可以查看',
            showCancel:false,
            success (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2,
                });
              }
            },
          })
        }
        else{
          wx.showToast({
            title: '发生错误，稍后再试',
            icon:'none'
          })
        }
      }
      })
    }
    
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