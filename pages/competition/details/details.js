// pages/competition/details/details.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    leftStatus:false,
    showRightAnimation:"",
    showRight:"false",
    filter:0,
    right:"",
    content:"",
    menu:{
      "comprtitionId": "1",
	    "comprtitionName": "2020 微信小程序大赛",
	    "competitionMeun": [{
		      "bigMeun": "大赛总体规程",
		      "childMeun": [{
				  "name": "参赛对象",
				  "url": "test1"
			  },
			  {
				  "name": "赛道设置",
				  "url": "test2"
			  },
			  {
				  "name": "竞赛报名",
				  "url": "test3"
			  }
		    ]
      },
      {
          "bigMeun": "大赛总体规程1",
          "childMeun": [{
          "name": "参赛对象",
          "url": "test4"
        },
        {
          "name": "赛道设置",
          "url": "test5"
        },
        {
          "name": "竞赛报名",
          "url": "test6"
        }
        ]
      }]
    },
  },
  moveright:function(){
    if(!this.data.leftStatus){
      this.showLeft();
      this.setData({
        filter:5,
        leftStatus:!this.data.leftStatus,
      })
    }
  },
  moveleft:function(){
    if(this.data.leftStatus){
      this.setData({
      filter:0,
      leftStatus:!this.data.leftStatus,
    })
    this.hiddenLeft();
    }
    
  },
  /**
   * 侧拉栏右移
   */
  showLeft:function(){
    var winWidth = wx.getSystemInfoSync().windowWidth;
    let option = {
      duration: 500, // 动画执行时间
      timingFunction: 'ease-out' // 动画执行效果
    };
    let moveLeft = wx.createAnimation(option);
    let right=wx.createAnimation(option)
    right.backgroundColor("rgba(96, 102, 102, 0.9)").step();
    moveLeft.translateX(300*winWidth/750).step();
    this.setData({
      showLeftAnimation:moveLeft.export(),
      right:right.export()
    })
  },
  hiddenLeft:function(){
    let option = {
      duration: 800, // 动画执行时间
      timingFunction: 'ease' // 动画执行效果
    };
    let moveLeft = wx.createAnimation(option);
    let right=wx.createAnimation(option)
    right.backgroundColor("rgba(255, 255, 255, 0.9)").step();
    moveLeft.translateX(0).step();
    this.setData({
      showLeftAnimation:moveLeft.export(),
      right:right,
    })
  },
  toContent:function(data){
    wx.pageScrollTo({
      selector:"#"+data.detail,
      success: (res) => {
        this.moveleft()
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },
  /**
   * 前往报名页面
   */
  toApply:function(event){
    let id=event.currentTarget.dataset.comid
    wx.navigateTo({
      url: '/pages/competition/apply/apply?competitionId='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      competitionId:options.competitionId,
    })
    console.log(options.competitionId)
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