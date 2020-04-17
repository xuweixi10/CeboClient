// pages/competition/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topAnimation:"",
    bottomAnimation:"",
    hiddenInfor:"",
    teamStatus:"block",
    competitionStatus:"none",
    competitionId:"unknown",
    personNum:0,
    personInfor:[],
    personHeight:"",
    array: ['A', 'B'],
    index:0,
    items:[{name:"Y",value:"是"},
           {name:"N",value:"否"}],
    formdata:{
      "competitonId": "1",
      "minPeople": 2,
      "maxPeople": 5,
      "captainInformation": ["姓名",
        "学号",
        "学院",
        "专业班级",
        "邮箱"
      ],
      "personInformation": ["name", "studentId",
        "college",
        "majorAndClass"
      ]
    },
    competitionData:{
      "competitionId": "123",
      "minPeople": 2,
      "maxPeople": 0,
      "capApplyType": [
          {
              "name": "姓名",
              "maxLength": "6",
              "type": "0",
              "inputName": "com123-1"
          },
          {
              "name": "学号",
              "maxLength": "15",
              "type": "0",
              "inputName": "com123-2"
          },
          {
              "name": "专业班级",
              "maxLength": "16",
              "type": "0",
              "inputName": "com123-3"
          },
          {
              "name": "邮箱",
              "maxLength": "32",
              "type": "0",
              "inputName": "com123-4"
          },
          {
              "name": "学院",
              "maxLength": "16",
              "type": "0",
              "inputName": "com123-5"
          }
      ],
      "perApplyType": [
          {
              "name": "姓名",
              "maxLength": "6",
              "type": "0",
              "inputName": "com123-1"
          },
          {
              "name": "学号",
              "maxLength": "15",
              "type": "0",
              "inputName": "com123-2"
          },
          {
              "name": "专业班级",
              "maxLength": "16",
              "type": "0",
              "inputName": "com123-3"
          }
      ]
    },
    uploadData:{
      "capData":[],
      "personData":[],
      "competitionData":[],
    },
    
  },
  /**
   * 动画模块
   */
  toCompetition:function(){
    this.toTop();
    this.setData({
      competitionStatus:"block",
    })
    var winWidth = wx.getSystemInfoSync().windowWidth;
    let option = {
      duration: 500, // 动画执行时间
      timingFunction: 'ease-out' // 动画执行效果
    };
    let topAnimation = wx.createAnimation(option);
    let bottomAnimation=wx.createAnimation(option);
    bottomAnimation.translateX(-760*winWidth/750).step();
    topAnimation.translateX(262.5*winWidth/750).step()
    this.setData({
      onTeam:false,
      topAnimation:topAnimation.export(),
      bottomAnimation:bottomAnimation.export()
    })
    setTimeout(()=>{
      this.setData({
        teamStatus:"none",
      })
    },500)
  },
  toTeam:function(){
    this.toTop();
    this.setData({
      teamStatus:"block",
    })
    let option = {
      duration: 500, // 动画执行时间
      timingFunction: 'ease-out' // 动画执行效果
    };
    let topAnimation = wx.createAnimation(option);
    let bottomAnimation=wx.createAnimation(option);
    topAnimation.translateX(0).step();
    bottomAnimation.translateX(0).step();
    this.setData({
      onTeam:true,
      topAnimation:topAnimation.export(),
      bottomAnimation:bottomAnimation.export()
    });
    setTimeout(()=>{
      this.setData({
        competitionStatus:"none",
      })
    },500)
  },
  hiddenInfor:function(){
    console.log(1)
    let option = {
      duration: 1000, // 动画执行时间
      timingFunction: 'ease-in' // 动画执行效果
    };
    let hiddenInfor = wx.createAnimation(option);
    hiddenInfor.height("100rpx").step()
    this.setData({
      hiddenInfor:hiddenInfor.export(),
    })
  },
  //滑动到最上面
  toTop:function(){
    wx.pageScrollTo({
      scrollTop:0,
      complete: (res) => {},
    })
  },
  //功能模块
  /**
   * 添加队员
   */
  addPerson:function(){
    console.log(1)
    if(this.data.personInfor.length<this.data.formdata.maxPeople-2){
      
      let arraydata=this.data.personNum
      let array=this.data.personInfor
      arraydata+=1
      array.push(arraydata)
      this.setData({
        personNum:arraydata,
        personInfor:array,
      })
      console.log(this.data.personInfor)
    }
  },
  /**
   * 删除队员
   */
  deleteInfor:function(event){
    console.log(event)
    let array=this.data.personInfor
    let index=array.indexOf(event.detail)
    array.splice(index,1)
    this.setData({
      personInfor:array
    })
  },
  /**
   * 表单提交
   */
  formSubmit:function(e){
    console.log(e);
    let uploadData=this.data.uploadData
    var dataforms = this.selectAllComponents('.personForm');
    for(let i=0;i<dataforms.length;i++){
      uploadData.personData.push(dataforms[i].uploadDataToFather());
    }
    console.log(uploadData);
    wx.createSelectorQuery().select(".captainForm").fields((res)=>{
      console.log(res);
    }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:8080/Apply/getApplyInformation?competitionId=123',
      success:function(res){
        console.log(res.data);
      },
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
    const query = wx.createSelectorQuery()
    query.select('.model').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res)=>{
      this.setData({
        personHeight:res[0].height,
      })
      console.log(res)
      //res[0].top       // #the-id节点的上边界坐标
      //res[1].scrollTop // 显示区域的竖直滚动位置
    })
    //改变两块区域高度
    let query2=wx.createSelectorQuery()
    query2.select('.competition').boundingClientRect()
    query2.selectViewport().scrollOffset()
    query2.exec((res)=>{
      console.log(res[0].height);
      this.setData({
        competitionHeight:res[0].height+200,
      })
      console.log(res)  
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

  },
  onPageScroll:function(e){
    // if(e.scrollTop>300){
    //   if(!this.data.onTeam){
    //     wx.pageScrollTo({
    //     scrollTop:300,
    //     complete: (res) => {},
    //   })
    //   }
      
    // }
  }
})