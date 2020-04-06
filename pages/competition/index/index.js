// pages/competition/index/index.js
Page({
  /**
   * 页面主要函数
   */
  search: function (e) {
    console.log(e.detail.value);
    /**
     * 请求资源
     * 
     */
    // wx.request({
    //   url: '',
    // })

  },
  bindchange:function(e){
    //console.log(e);
  },
  /**
   * 页面的初始数据
   */
  data: {
    backgroundHeight:"100%",
    swiperImage: ["../image/swiper1.png", "../image/swiper1.png", "../image/swiper1.png"],
    showLoading:false,
    competitionInfor:[
      {
        competitionId:"1",
        competitionName:"2020微信小程序大赛",
        competitionApplyBeginTime:"03.20",
        competitionApplyEndTime: "05.20",
        competitionObject:"全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      }
    ],
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
    let systemInfo = wx.getSystemInfoSync();
    // px转换到rpx的比例
    let pxToRpxScale = 750 / systemInfo.windowWidth;
    // 状态栏的高度
    let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
    // 导航栏的高度
    let navigationHeight = 44 * pxToRpxScale
    // window的高度
    let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
    // 屏幕的高度
    let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale
    console.log(ktxScreentHeight,ktxWindowHeight);
    this.setData({
      backgroundHeight: ktxScreentHeight-10+"rpx",
    })
    // 底部tabBar的高度
    let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("1");
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
    wx.startPullDownRefresh();
    let data=[
      {
        competitionId: "1",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      }
    ];
    this.setData({
      competitionInfor:data,
    })
    setTimeout(()=>{
      wx.stopPullDownRefresh({
        complete: (res) => {
        },
      })
    },2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let data=[
      {
        competitionId: "1",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      },
      {
        competitionId: "2",
        competitionName: "2020微信小程序大赛",
        competitionApplyBeginTime: "03.20",
        competitionApplyEndTime: "05.20",
        competitionObject: "全体大学生"
      }
    ];
    this.setData({
      showLoading:true,
    })
    var currentData = this.data.competitionInfor;
    setTimeout(()=>{
      for (var i = 0; i < data.length; i++) {
        currentData.push(data[i]);
      }
      this.setData({
        competitionInfor: currentData,
        showLoading:false,
        backgroundHeight:this.data.backgroundHeight+374,
      })
    },3000);
    console.log("1");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})