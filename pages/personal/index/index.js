// pages/personal/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    studentId:"请绑定学号",
    avatarUrl:"/image/icon/load.png",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      avatarUrl:e.detail.userInfo.avatarUrl,
      hasUserInfo: true
    })
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/account/status',
      method:'POST',
      data:{
        "uuid":global.openId,
        "nickName":e.detail.userInfo.nickName
      },
      success:(res)=>{
        console.log(res);
      },
    })
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/account/information?openId='+global.openId,
      success:(res)=>{
        console.log(res)
        if(res.data.code==0){
          global.userData=res.data.data;
          if(res.data.data.studentId==null){
            wx.showToast({
            title: '请在个人信息中绑定学号',
            icon:'none'
            })
          }else{
            this.setData({
              studentId:res.data.data.studentId
            })
          }
          
        }
      },
      fail:function(){
        wx.showToast({
          title: '获取账号信息失败',
          icon:'none'
        })
      }
    })
    console.log(global.code)
  },
  /**
   * 去我的比赛界面
   */
  toMyCompetition:function(){
    wx.navigateTo({
      url: '../myCompetition/competition',
    })
  },
  /**
   * 去我的招募界面
   */
  toMyRecruit:function(){
    wx.navigateTo({
      url: '../myRecruit/recruits',
    })
  },
  /**
   * 去往个人信息界面
   */
  toInformation:function(){
    if(this.data.userInfo==null){
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }
    wx.navigateTo({
      url: '../information/information',
    })
  },
  toQuestion:function(){
    wx.navigateTo({
      url: '/pages/extra/problem/problem',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        avatarUrl:app.globalData.userInfo.avatarUrl,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          avatarUrl:res.userInfo.avatarUrl,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            avatarUrl:res.userInfo.avatarUrl,
            hasUserInfo: true
          })
        }
      })
    }
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
    wx.getStorage({
      key: "accountData",
      success:(res)=>{
        if(res.data.studentId==null){
            
        }else{
          this.setData({
            studentId:res.data.studentId
          })
          global.status=0
        }       
      },
      fail:(res)=>{
        wx.request({
          url: 'https://www.xzyhyfw.com:7443/account/information?openId='+global.openId,
          success:(res)=>{
            console.log(res)
            if(res.data.code==0){
              global.userData=res.data.data;
              if(res.data.data.studentId==null){
                
              }else{
                this.setData({
                  studentId:res.data.data.studentId
                })
                wx.setStorage({
                  data: res.data.data,
                  key: 'accountData',
                })
                global.status=0
              }        
            }
          },
          fail:function(){
            wx.showToast({
              title: '获取账号信息失败',
              icon:'none'
            })
          }
        })
      }
    })
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