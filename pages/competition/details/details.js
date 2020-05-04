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
    console.log(data)
    wx.pageScrollTo({
      selector:"#m"+data.detail,
      success: (res) => {
        console.log(res)
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
    let flag=0
    let id=event.currentTarget.dataset.comid
    console.log(global.openId)
    if(global.status==0){
      wx.getStorage({
      key: 'joinCompetition',
      success:(res)=>{
        let comdata=res.data;
        for(let i=0;i<comdata.length;i++){
          if(comdata[i].competitionId==id){
            flag=1;
          }
        }
        if(flag==0){
          wx.navigateTo({
            url: '/pages/competition/apply/apply?competitionId='+id,
          })
        }else if(flag==1){
          wx.showToast({
            title: '你已参加该比赛',
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.request({
          url: 'https://www.xzyhyfw.com:7443/Apply/getAllApplyCompetition?openId='+global.openId,
          success:(res)=>{
            let comdata=res.data.data;
            wx.setStorage({
              data: comdata,
              key: 'joinCompetition',
            })
            for(let i=0;i<comdata.length;i++){
              if(comdata[i].competitionId==id){
                flag=1;
              }
            }
            if(flag==0){
              wx.navigateTo({
                url: '/pages/competition/apply/apply?competitionId='+id,
              })
            }else if(flag==1){
              wx.showToast({
                title: '你已参加该比赛',
                icon:'none'
              })
            }else{
              wx.showToast({
                title: '服务器错误',
                icon:'none'
              })
            }
          },
          fail:(res)=>{
            flag=2
          }
        })
      }
    })
    }else{
      wx.showToast({
        title: '请先登录或完善个人信息',
        icon:'none'
        })
    }
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
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/competition/v1/detail?compId='+options.competitionId,
      success:(res)=>{
        console.log(res.data)
        let data=res.data.data
        if(res.data.code==0){
          wx.hideLoading({
            complete: (res) => {
              if(data.competitionDetail.length==0){
                wx.navigateBack({
                  complete: (res) => {
                    wx.showToast({
                      title: '数据错误',
                      icon:'none'
                    })
                  },
                })
              }
            },
          })
          this.setData({
            menu:res.data.data
          })
        }       
      }
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