// pages/recruit/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0,
    recruitData:[],
    hotCompetition:[],
  },

  toType:function(e){
    console.log(e)
    let name=e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../recruitType/typeRecruit?name='+name,
    })
  },
  todetails:function(e){
    console.log(e)
    let id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../details/recruits?comId='+id,
    })
  },
  toAdd:function(e){
    if(global.status==0){
      wx.getStorage({
        key: 'recruitNum',
        success:(res)=>{
          if(res.data>9){
            wx.showModal({
              cancelColor: 'cancelColor',
              showCancel:false,
              title:"招募帖子有限",
              content:"请在我的帖子中删除多余的帖子"
            })
          }
        }
      })
      wx.navigateTo({
        url: '../create/create',
      })
    }else{
      wx.showToast({
        title: '请先登录或绑定学号',
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
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/recruit/v1/1',
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            recruitData:res.data.data,
            page:this.data.page+1
          })
        }
        else{
          wx.showToast({
            title: '服务器内部错误',
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.showToast({
          title: '服务器连接失败',
          icon:'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/recruit/v1/hotcompetitions',
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            hotCompetition:res.data.data
          })
        }else{
          wx.showToast({
            title: '信息有误',
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
    wx.hideLoading({
      complete: (res) => {

      },
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
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/recruit/v1/1',
      success:(res)=>{
        if(res.data.code==0){
          this.setData({
            recruitData:res.data.data,
            page:this.data.page+1
          })
        }
        else{
          wx.showToast({
            title: '服务器内部错误',
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.showToast({
          title: '服务器连接失败',
          icon:'none'
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let data=this.data.recruitData
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/api/recruit/v1/'+this.data.page,
      success:(res)=>{
        if(res.data.code==0){
          data.push(...res.data.data)
          this.setData({
            recruitData:data,
            page:this.data.page+1
          })
        }
        else{
          wx.showToast({
            title: '服务器内部错误',
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.showToast({
          title: '服务器连接失败',
          icon:'none'
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})