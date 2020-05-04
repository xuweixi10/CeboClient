// pages/personal/component/competitionBasic/competitionBasic.js
Component({

  lifetimes: {
    attached: function() {
      wx.showLoading({
        title: '加载中',
      })
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
          }
        }
      })
    },
    ready:function(){
      console.log(this.properties.competitionId)
      wx.hideLoading({
        complete: (res) => {
          wx.showToast({
            title: '加载成功',
          })
        },
      })
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
          this.initComData()
          wx.hideLoading({
            complete: (res) => {

            },
          })
        }
      })
      wx.request({
        url: 'https://www.xzyhyfw.com:7443/api/competition/v1/detail?compId='+this.properties.competitionId,
        success:(res)=>{
          let data=res.data.data
          if(res.data.code==0){
            this.setData({
              name:data.compName
            })
          }       
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    "teamid":{
      type:String,
      value:""
    },
    "competitionId":{
      type:String,
      value:""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    competitionData:"",
    applyData:"",
    name:"",
    comApplyData:[],
    comNameValue:[],
    pickerIndex:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetails:function(){
      console.log(1)
      wx.navigateTo({
        url: '/pages/personal/myCompetition/details/applyDetails?teamId='+
        this.properties.teamid+"&competitionId="+this.properties.competitionId,
      })
    },
      /**
   * 数据处理
   */
  handlerData:function(){
    let data=this.data.competitionData.comApplyType;
    console.log(data)
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
    console.log(this.data.applyData.competitionData)
    let data=this.data.applyData.competitionData
    for(let i=0;i<data.length;i++){
      if(data[i].name===name){
        return data[i].value;
      }
    }
  },
  initComData(){
    console.log(this.data.comApplyData)
    let comApplyData=this.data.comApplyData
    let comdata=[];
    console.log(comApplyData)
    for(let i=0;i<comApplyData.length;i++){
      if(comApplyData[i].type==2){
        console.log(comApplyData[i].name)
        console.log(this.getComValue(comApplyData[i].inputName))
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
  }
})
