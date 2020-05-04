// pages/personal/myCompetition/details/applyDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    competitionData:{
      "competitionId": "202003200001",
      "minPeople": 2,
      "maxPeople": 0,
      "capApplyType": [
          {
              "name": "姓名",
              "maxLength": "6",
              "type": "0",
              "inputName": "202003200001-0-1"
          },
          {
              "name": "学号",
              "maxLength": "15",
              "type": "0",
              "inputName": "202003200001-0-2"
          },
          {
              "name": "专业班级",
              "maxLength": "16",
              "type": "0",
              "inputName": "202003200001-0-3"
          },
          {
              "name": "邮箱",
              "maxLength": "32",
              "type": "0",
              "inputName": "202003200001-0-4"
          },
          {
              "name": "学院",
              "maxLength": "16",
              "type": "0",
              "inputName": "202003200001-0-5"
          }
      ],
      "perApplyType": [
          {
              "name": "姓名",
              "maxLength": "6",
              "type": "0",
              "inputName": "202003200001-0-1"
          },
          {
              "name": "学号",
              "maxLength": "15",
              "type": "0",
              "inputName": "202003200001-0-2"
          },
          {
              "name": "专业班级",
              "maxLength": "16",
              "type": "0",
              "inputName": "202003200001-0-3"
          }
      ],
      "comApplyType": [
          {
              "name": "参赛项目名称",
              "maxLength": "10",
              "type": "0",
              "inputName": "202003200001-0-6"
          },
          {
              "name": "赛道",
              "value": "A,B",
              "type": 2,
              "inputName": "202003200001-0-0"
          },
          {
              "name": "是否参加其他作品",
              "radioName": "是,否",
              "type": 1,
              "inputName": "202003200001-1-1"
          },
          {
              "name": "参赛项目简介",
              "type": 3,
              "inputName": "202003200001-3-0"
          }
      ]
    },
    applyData:{
      "host": null,
      "code": 0,
      "errorMessage": "操作成功",
      "data": {
          "userId": null,
          "competitionId": null,
          "capData": [
              {
                  "name": "202003200001-0-1",
                  "value": "01"
              },
              {
                  "name": "202003200001-0-2",
                  "value": "12"
              },
              {
                  "name": "202003200001-0-3",
                  "value": "12"
              },
              {
                  "name": "202003200001-0-4",
                  "value": "123"
              },
              {
                  "name": "202003200001-0-5",
                  "value": "23"
              }
          ],
          "competitionData": [
              {
                  "name": "202003200001-0-6",
                  "value": "213"
              },
              {
                  "name": "202003200001-0-0",
                  "value": "213"
              },
              {
                  "name": "202003200001-1-1",
                  "value": "1"
              },
              {
                  "name": "202003200001-3-0",
                  "value": "213"
              }
          ],
          "personData": [
              [
                  {
                      "name": "202003200001-0-1",
                      "value": "123"
                  },
                  {
                      "name": "202003200001-0-2",
                      "value": "213"
                  },
                  {
                      "name": "202003200001-0-3",
                      "value": "213"
                  }
              ],
              [
                  {
                      "name": "202003200001-0-1",
                      "value": "123"
                  },
                  {
                      "name": "202003200001-0-2",
                      "value": "213"
                  },
                  {
                      "name": "202003200001-0-3",
                      "value": "213"
                  }
              ]
          ]
      }
    },
    comApplyData:[],
    comNameValue:[],
    capNameValue:[],
    perNameValue:[],
    pickerIndex:[],
  },

  /**
   * 数据处理
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
    //console.log(data);
    //console.log(pickerIndex)
    this.setData({
      comApplyData:data,
      pickerIndex:pickerIndex,
    })

  },
  /**
   * 获取比赛对应信息的值
   * @param {信息id} name 
   */
  getComValue:function(name){
    let data=this.data.applyData.competitionData
    for(let i=0;i<data.length;i++){
      if(data[i].name===name){
        return data[i].value;
      }
    }
  },
    /**
   * 获取队长对应信息的值
   * @param {信息id} name 
   */
  getCapValue:function(name){
    let data=this.data.applyData.capData
    for(let i=0;i<data.length;i++){
      if(data[i].name==name){
        return data[i].value;
      }
    }
  },
  getPerValue:function(name){
    let data=this.data.competitionData.perApplyType;
    for(let i=0;i<data.length;i++){
      if(data[i].inputName===name){
        return data[i].name;
      }
    }
  },
  initComData(){
    let comApplyData=this.data.comApplyData;
    let comdata=[];
    console.log(comApplyData)
    for(let i=0;i<comApplyData.length;i++){
      if(comApplyData[i].type==2){
        let data={
          "name":comApplyData[i].name,
          "value":comApplyData[i].value[parseInt(this.getComValue(comApplyData[i].inputName))],
          }
          console.log
          comdata.push(data);
      }else{
        let data={
        "name":comApplyData[i].name,
        "value":this.getComValue(comApplyData[i].inputName)
        }
        comdata.push(data);
      }
    }
    this.setData({
      comNameValue:comdata,
    })
    console.log(comdata)
  },
  initCapData(){
    let capApplyData=this.data.competitionData.capApplyType;
    let capdata=[];
    for(let i=0;i<capApplyData.length;i++){
      let data={
        "name":capApplyData[i].name,
        "value":this.getCapValue(capApplyData[i].inputName)
      }
      capdata.push(data);
    }
    this.setData({
      capNameValue:capdata,
    })
  },
  initPerData(){
    let perApplyData=this.data.applyData.personData;
    let perData=[]
    for(let i=0;i<perApplyData.length;i++){
      let datas=[];
      for(let j=0;j<perApplyData[i].length;j++){
        let data={
          "name":this.getPerValue(perApplyData[i][j].name),
          "value":perApplyData[i][j].value
        }
        datas.push(data)
      }
      console.log(datas)
      perData.push(datas);
    }
    this.setData({
      perNameValue:perData,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let competiitonId=options.competitionId;
    let teamId=options.teamId;
    wx.getStorage({
      key: competiitonId,
      success:(res)=>{
        console.log(res.data)
        this.setData({
          competitionData:res.data
        })
        this.handlerData()
      },
      fail:(res)=>{
        console.log(res)
        wx.request({
          url: 'https://www.xzyhyfw.com:7443/Apply/getApplyInformation?competitionId='+this.properties.competitionId,
          success:(res)=>{
            console.log(res)
            this.setData({
              competitionData:res.data,
            })
            wx.setStorage({
              key:this.properties.competitionId,
              data:res.data
            })
            this.handlerData()
          }
        })
      }
    })
    wx.getStorage({
      key: teamId,
      success:(res)=>{
        this.setData({
          applyData:res.data
        })
        this.initComData()
        this.initCapData()
        this.initPerData()
        console.log(res.data)
      },
      fail:(res)=>{
        wx.request({
          url: 'https://www.xzyhyfw.com:7443/Apply/getCompetitionDetails?teamId='+this.properties.teamid,
          success:(res)=>{
            console.log(res)
            if(res.data.code==0){
              this.setData({
                applyData:res.data.data
              })
              wx.setStorage({
                data: res.data.data,
                key: this.properties.teamid,
              })
              this.initComData()
              this.initCapData()
              this.initPerData()
            }
          }
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