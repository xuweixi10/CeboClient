// pages/competition/component/competitionInfo/comInfor.js
Component({
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toApply:function(){
      wx.navigateTo({
        url: '../apply/apply?competitionId='+this.properties.competitionId,
      })
    },
    toDetails:function(){
      wx.navigateTo({
        url: '../details/details?competitionId='+this.properties.competitionId,
      })
      console.log("1");
    }
  }
})
