// pages/competition/component/paragraphChild/paragraphChild.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "title":{
      type:String,
      value:""
    },
    "contentUrl":{
      type:String,
      value:null
    },
    "id":{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached:function(){
    wx.request({
      url: this.properties.contentUrl,
      success:res=>{
        this.setData({
          content:res.data
        })
        wx.hideLoading({
          complete: (res) => {
            
          },
        })
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
