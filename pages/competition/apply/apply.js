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
    competitionData:"",
    competitionHeight:"",
    uploadData:{
      "capData":[],
      "personData":[],
      "competitionData":[],
    },
    //比赛填报数据（处理后）
    comAppyData:[],
    //所有picker的管理器
    pickerIndex:"",
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
    //this.data.comAppyData.maxPeople-
    if(this.data.personInfor.length<2){
      
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
   * picker改变时
   * @param {picker参数} e 
   */
  pickerChange:function(e){
    let pickerIndex=this.data.pickerIndex;
    pickerIndex[e.currentTarget.dataset.name]=e.detail.value;
    this.setData({
      pickerIndex:pickerIndex,
    })
  },
  /**
   * 表单提交
   */
  formSubmit:function(e){
    console.log(e);
    let flag=true;
    let uploadData=this.data.uploadData;
    let submitData=e.detail.value;
    console.log(submitData)
    uploadData.personData=[];
    //队长信息
    uploadData.capData=[];
    //队伍信息
    uploadData.competitionData=[];
    let dataforms = this.selectAllComponents('.personForm');
    console.log(dataforms)
    if(dataforms.length<this.data.competitionData.minPeople-1){
      flag=false
    }
    for(let i=0;i<dataforms.length;i++){
      let data=dataforms[i].uploadDataToFather();
      if(data.length<this.data.competitionData.perApplyType.length){
        flag=false;
      }
      for(let j=0;j<data.length;j++){
        if(data[j].value==""){
          flag=false
        }
      }
      uploadData.personData.push(dataforms[i].uploadDataToFather());
    }
    //获取队长信息
    for(let i=0;i<this.data.competitionData.capApplyType.length;i++){
      let inputName=this.data.competitionData.capApplyType[i].inputName;
      if(submitData[inputName]===""){
        console.log(inputName)
        flag=false;
      }
      let data={
        name: inputName,
        value:submitData[inputName],
      }
      uploadData.capData.push(data);
    }
    //获取队伍信息
    for(let i=0;i<this.data.competitionData.comApplyType.length;i++){
      let inputName=this.data.competitionData.comApplyType[i].inputName;
      if(submitData[inputName]===""){
        console.log(inputName)
        flag=false;
      }
      let data={
        name: inputName,
        value:submitData[inputName],
      }
      uploadData.competitionData.push(data);
    }
    console.log(flag)
    if(flag){
      console.log(this.data.competitionData.competitionId)
      wx.request({
        url: 'https://www.xzyhyfw.com:7443/Apply/submitInformation',
        method:'POST',
        data:{
          "userId":global.openId,
          "competitionId":this.data.competitionData.competitionId,
          "capData":uploadData.capData,
          "competitionData":uploadData.competitionData,
          "personData":uploadData.personData
        },
        success:(res)=>{
          if(res.data){
            wx.showModal({
              title: '报名成功',
              content: '在我的比赛中可以查看',
              showCancel:false,
              success (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 2,
                  });
                }
              },
            })
          }else{
            wx.showToast({
              title: '报名失败',
              icon:'none'
            })
          }
          console.log(res)
        },
      })
    }else{
      wx.showToast({
        title: '信息输入不合法',
        icon:'none'
      })
    }
    console.log(uploadData);
  },
  torecruit:function(){
    wx.navigateTo({
      url: '/pages/recruit/create/create',
    })
  },
  toproblem:function(){
    wx.navigateTo({
      url: '/pages/extra/problem/problem',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.xzyhyfw.com:7443/Apply/getApplyInformation?competitionId='+options.competitionId,
      success:(res)=>{
        console.log(res.data);
        this.setData({
          competitionData:res.data
        })
        wx.hideLoading({
          complete: (res) => {
            this.handlerData();
            const query = wx.createSelectorQuery()
            query.select('.model').boundingClientRect()
            query.selectViewport().scrollOffset()
            query.exec((res)=>{
              console.log(res)
              this.setData({
              personHeight:res[0].height,
              })
            console.log(res)
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
        })
      },
    })
    this.setData({
      competitionId:options.competitionId,
    })
    console.log(options.competitionId);
  },
   /**
   * 处理后端来的数据，主要用于非普通类型数据的数组化
   */
  handlerData:function(){
    let data=this.data.competitionData.comApplyType;
    let pickerIndex={};
    for(let i=0;i<data.length;i++){
      //radio类型
      if(data[i].type==1){
        let radios=data[i].radioName.split(",");
        data[i].radioName=radios;
      }
      //picker 类型
      else if(data[i].type==2){
        let pickers=data[i].value.split(",");
        data[i].value=pickers;
        let name=data[i].inputName;
        pickerIndex[name]=0;
      }
    }
    console.log(data);
    console.log(pickerIndex)
    this.setData({
      comAppyData:data,
      pickerIndex:pickerIndex,
    })
    console.log(data)

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