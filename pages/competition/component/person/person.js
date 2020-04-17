// pages/competition/component/person/person.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "personHeight":{
      type:String,
      value:""
    },
    "formData":{
      type:Array,
      value:[],
    },
    "index":{
      type:String,
      value:"",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hiddenInfor:"",
    deleteInfor:"",
    change:"收起",
    hiddenStatus:0,
    detail1Value:"",
    detail2Value:"",
    applyformData:[],

  },

  /**
   * 组件渲染时
   */
  attached:function(){
    console.log(this.properties.index)
    // const query = wx.createSelectorQuery()
    // query.select('.model').boundingClientRect()
    // query.selectViewport().scrollOffset()
    // query.exec((res)=>{
    //   console.log(res)
    //   this.setData({
    //     personHeight:res[0].height,
    //   })
    //   //res[0].top       // #the-id节点的上边界坐标
    //   //res[1].scrollTop // 显示区域的竖直滚动位置
    // })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hiddenInfor:function(){
      if(this.data.hiddenStatus==0){
        let option = {
          duration: 500, // 动画执行时间
          timingFunction: 'ease-out' // 动画执行效果
        };
        let hiddenInfor = wx.createAnimation(option);
        hiddenInfor.height("100rpx").step()
        this.setData({
          change:"修改",
          hiddenInfor:hiddenInfor.export(),
          hiddenStatus:1,
        })
      }else{
        let option = {
          duration: 500, // 动画执行时间
          timingFunction: 'ease-out' // 动画执行效果
        };
        let hiddenInfor = wx.createAnimation(option);
        hiddenInfor.height(this.data.personHeight).step()
        this.setData({
          change:"收起",
          hiddenInfor:hiddenInfor.export(),
          hiddenStatus:0,
        })
      }
    },
    deleteInfor:function(){
      var winWidth = wx.getSystemInfoSync().windowWidth;
      let option = {
        duration: 500, // 动画执行时间
        timingFunction: 'ease-out' // 动画执行效果
      };
      let deleteInfor = wx.createAnimation(option);
      deleteInfor.translateX(-630*winWidth/750).step()
      this.setData({
        hiddenInfor:deleteInfor.export(),
      })
      setTimeout(()=>{
        deleteInfor.translateX(0).step()
        this.setData({
          hiddenInfor:deleteInfor.export(),
        })
      },500)
    },
    ValueChange:function(event){
      if(event.target.dataset.name===this.properties.formData[0].inputName){
        this.setData({
        detail1Value:event.detail.value,
        })
      }else if(event.target.dataset.name===this.properties.formData[1].inputName){
        this.setData({
          detail2Value:event.detail.value,
          })
      }
      this.inputChange(event);
    },
    detail2ValueChange:function(event){
      this.setData({
        detail2Value:event.detail.value
      })
      this.inputChange(event);
    },
    inputChange:function(event){
      let data={
        name:event.target.dataset.name,
        value:event.detail.value,
      }
      this.updateData(data);
    },
    delete:function(){
      if(this.properties.index=="0"){
        wx.showModal({
          showCancel:false,
          content:"必须有一个队员",
        })
      }
      else{
        this.deleteInfor()
        console.log(this.properties.index)
        setTimeout(()=>{
          this.triggerEvent("deleteInfor",this.properties.index)
        },500)
      }
      
    },
    /**
     * 更新组件数据
     * @param {*改变的值} data 
     */
    updateData:function(data){
      let array=this.data.applyformData;
      let index=this.findIndex(data);
      if(index===-1){
        array.push(data);
        this.setData({
          applyformData:array,
        })
      }
      else{
        array[index].value=data.value;
        this.setData({
          applyformData:array,
        })
      }
    },
    /**
     * 判断数组中是否已有该数据
     */
    findIndex:function(data){
      let array=this.data.applyformData;
      for(let i=0;i<array.length;i++){
        if(data.name===array[i].name){
          return i;
        }
      }
      return -1;
    },
    /**
     * 传输数据给父组件
     */
    uploadDataToFather:function(){
      return this.data.applyformData;
    },
  }
})
