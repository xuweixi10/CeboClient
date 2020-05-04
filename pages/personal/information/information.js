// pages/personal/information/information.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolArray:["中南大学"],
    schoolIndex:0,
    status:"warn",
    buttonText:"修改",
    sending:false,
    disable:true,
    formStatus:"",
    studentId:"",
  },

  bindSchoolChange:function(e){
    this.setData({
      schoolIndex:e.detail.value,
    })
  },
  changeInformation:function(){
    this.setData({
      disable:false,
      buttonText:"提交",
      formStatus:"submit",
      status:"primary",
    })
  },
  formSubmit:function(e){
    if(e.detail.value.studentId!=null){
      this.setData({
        sending:true,
      })
      wx.request({
      url: 'https://www.xzyhyfw.com:7443/account/schoolInformation',
      method:'POST',
      data:{
        "uuid":global.openId,
        "schoolId":e.detail.value.school,
        "studentId":e.detail.value.studentId
      },
      success:(res)=>{
        console.log(res);
        this.setData({
          sending:false,
        })
        if(res.data.code==1002){
          wx.showToast({
            title: '修改失败',
            icon:'none',
          })
        }else{
          wx.showToast({
            title: '修改成功',
          })
          wx.getStorage({
            key: 'accountData',
            success:(res)=>{
              res.data.studentId=e.detail.value.studentId;
              wx.setStorage({
                data: res.data,
                key: 'accountData',
              })
            }
          })
          this.setData({
            buttonText:"修改",
            sending:false,
            disable:true,
          })
          wx.setStorage({
            key: 'accountStatus',
            data:0
          })    
          global.status=0
        }
      },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取数据
    if(global.userData!=null&&global.userData.studentId!=null){
      this.setData({
        studentId:global.userData.studentId,
      })
    }else{
      wx.request({
        url: 'https://www.xzyhyfw.com:7443/account//information?openId='+global.openId,
        success:(res)=>{
          if(res.data.code==0){
            this.setData({
              studentId:res.data.data.studentId
            })
            wx.setStorage({
              data: res.data.data,
              key: 'accountData',
            })
          }else{
            wx.showToast({
              title: '没有找到数据',
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