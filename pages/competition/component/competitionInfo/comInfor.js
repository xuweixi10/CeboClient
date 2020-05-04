// pages/competition/component/competitionInfo/comInfor.js
Component({
  lifetimes:{
    attached:function(){
      console.log(this.properties.competitionApplyBeginTime.slice(5,10))
      this.setData({
        begin:this.properties.competitionApplyBeginTime.slice(5,10),
        end:this.properties.competitionApplyEndTime.slice(5,10)
      })
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    'competitionId':{
      type:String,
      value:"1",
    },
    'competitionName':{
      type:String,
      value:"Unknown",
    },
    'competitionApplyBeginTime':{
      type:String,
      value:"01.01",
    },
    'competitionApplyEndTime':{
      type:String,
      value:"05.20",
    },
    'competitionObject':{
      type:String,
      value:"没有限制",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    begin:"",
    end:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toApply:function(){
      let flag=0;
      console.log(this.properties.competitionId)
      if(global.status==0){
        wx.request({
          url: 'https://www.xzyhyfw.com:7443/Apply/getAllApplyCompetition?openId='+global.openId,
          success:(res)=>{
            let comdata=res.data.data;
            wx.setStorage({
              data: comdata,
              key: 'joinCompetition',
            })
            for(let i=0;i<comdata.length;i++){
              console.log(this.properties.competitionId==comdata[i].competitionId)
              if(comdata[i].competitionId==this.properties.competitionId){
                flag=1;
              }
            }
            if(flag==0){
              wx.navigateTo({
                url: '../apply/apply?competitionId='+this.properties.competitionId,
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
        console.log(flag)
      }else{
        wx.showToast({
          title: '请先登录且绑定学号',
          icon:'none'
        })
      }
      
    },
    toDetails:function(){
      wx.navigateTo({
        url: '../details/details?competitionId='+this.properties.competitionId,
      })
      console.log("1");
    }
  }
})
