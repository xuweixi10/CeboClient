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
    backgroundHeight:"",
    swiperData:[],
    competitionPage:1,
    showLoading:false,
    competitionInfor:[],
  },

  swipclick:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../details/details?competitionId='+e.currentTarget.dataset.comid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/competition/v1/basic?page=1',
      success:(res)=>{
        console.log(res)
        this.setData({
          competitionInfor:res.data.data,
        })
      },
      fail:(e)=>{
        wx.showToast({
          title: '数据错误',
          icon:'none'
        })
      }
    })
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
      backgroundHeight: ktxScreentHeight+10+"rpx",
    })
    // 底部tabBar的高度
    let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/competition/v1/index/swiperImage',
      success:(res)=>{
        console.log(res)
        this.setData({
          swiperData:res.data.data
        })
      },
      fail:()=>{

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
    wx.startPullDownRefresh();
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/competition/v1/basic?page=1',
      success:(res)=>{
        console.log(res.data)
        this.setData({
          competitionPage:1,
          competitionInfor:res.data.data,
        })
        wx.stopPullDownRefresh({
          complete: (res) => {
            wx.showToast({
              title: '刷新成功',
            })
            console.log(res)
          },
        })
      },
      fail:(e)=>{
        wx.stopPullDownRefresh({
          complete: (res) => {
          },
        })
        wx.showToast({
          title: '数据错误',
          icon:'none'
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      showLoading:true,
    })
    let data=[]
    let page=this.data.competitionPage+1
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/competition/v1/basic?page='+page,
      success:(res)=>{
        data=res.data.data;
        if(data.length>0){
          var currentData = this.data.competitionInfor;
          for (var i = 0; i < data.length; i++) {
            currentData.push(data[i]);
          }
          this.setData({
            competitionPage:page,
            competitionInfor: currentData,
            showLoading:false,
            backgroundHeight:this.data.backgroundHeight+184+"rpx",
          })
        }
        else{
          this.setData({
            showLoading:false,
          })
          wx.showToast({
            title: '没有更多数据了',
            icon:'none',
          })
        }
      },
      fail:(e)=>{
        console.log(e)
      }
    })
    console.log(this.data.competitionPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})