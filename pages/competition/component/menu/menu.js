// pages/competition/component/menu/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "menuItems":{
      type:Array,
      value:""
    },
    "menuTitle":{
      type:String,
      value:"",
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    status:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ChangeStatus:function(data){
      this.setData({
        status:!this.data.status,
      })
    },
    ToContent:function(event){
      let contentId=event.currentTarget.dataset.contentid
      this.triggerEvent('toContent',contentId)
      wx.pageScrollTo({
        selector:contentId,
        complete: (res) => {
          console.log(res)
        },
      })
    }
  }
})
