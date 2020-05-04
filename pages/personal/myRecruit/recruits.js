// pages/personal/myRecruit/recruits.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitData:[],
    recruitNum:0,
  },
  todetails:function(e){
    wx.navigateTo({
      url: '../../recruit/details/recruits?comId='+e.currentTarget.dataset.id,
    })
  },
  deleteRecruit:function(e){
    let id=e.currentTarget.dataset.id
    console.log(this.data.recruitData);
    console.log(id)
    let data=this.data.recruitData;
    for(let i=0;i<data.length;i++){
      if(data[i].id==id){
        data.splice(i,1)
        break;
      }
    }
    this.setData({
      recruitData:data
    })
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/recruit/v1/deleteRecruit?id='+id+"&userId="+global.openId,
      success:(res)=>{
        if(res.data.code==0){
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })
          this.setData({
            recruitNum:this.data.recruitNum-1,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/recruit/v1/myRecruit?userId='+global.openId,
      success:(res)=>{
        this.setData({
          recruitData:res.data.data,
          recruitNum:res.data.data.length
        })
        wx.setStorage({
          data: res.data.data.length,
          key: 'recruitNum',
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