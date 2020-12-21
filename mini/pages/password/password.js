// pages/register/register.js
// pages/login/login.js

//const url = 'https://wx.szrunlifang.com/app'

const app = getApp()

const url = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    smsCode:'',
    time: "获取验证码",
    suffix:'',
    currentTime: 61,
    disabled:false,
    disabled1:false,
    array: [],
    array2: [3,6,9,12,24],
    index:"",
    index2:"",
    index22:0,
    communityId:'',
    comunityName1:'',
    equipmentId:'',
    equipmentId1:'',
    equipmentName1:'',
    cardNo:'',
    name:'',
    remark:'',
    time1:'',
    times:''

  },

  nameblur:function(e){
    //console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
 },
 bindPickerChangeTime: function(e) {

  var that = this;
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index22: e.detail.value
  })
  this.setData({
    time1: "1"
  })
  this.setData({
    times: that.data.array2[e.detail.value]
  })



 },
 bindPickerChange: function(e) {
   var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })

    this.setData({
      communityId: that.data.array[e.detail.value].communityId 
    })

    this.setData({
      comunityName1: that.data.array[e.detail.value].equipmentName 
    })

    this.setData({
      equipmentId1: that.data.array[e.detail.value].id 
    })
    


    

   // this.getEquipmentList();

},
bindPickerChange2: function(e) {
  var that = this;
  console.log('picker发送选择改变，携带值为', e.detail.value)
  this.setData({
    index2: e.detail.value
  })

  this.setData({
    equipmentId: that.data.array2[e.detail.value].id 
  })

  this.setData({
    equipmentName1: that.data.array2[e.detail.value].equid 
  })

  if(that.data.array2[e.detail.value].equCode.length==8){
    this.setData({
      cardNo: that.data.array2[e.detail.value].equCode.substr(4,8)      
    })
       
  }else{
    this.setData({
      cardNo: ""      
    })
  }
},



 getInputValue:function(e){
  var that = this;
  let _this = this;
  

  if(that.data.phone==""){
    wx.showToast({
        title:"请输入手机号",
        icon:'none',
        duration:2000
    });
    return;
  }


  if (!_this.data.disabled) {
    let interval = null;
    let currentTime = _this.data.currentTime;
  
    interval = setInterval(function() {
      currentTime--;
      _this.setData({
        time: currentTime,
        suffix: 's可重新获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        _this.setData({
          time: '重新发送',
          suffix: '',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  }
  _this.setData({
    disabled: true
  })

  wx.request({
    url: url+'/common/sms', 
    data: {'mobile':that.data.phone},
  
    header: {
    
    'content-type': 'application/json' // 默认值
    
    },success: function(res) {
        wx.showToast({
          title:'发送验证码成功',
          icon:'success',
          duration:2000
      });

   
    }
    
  })
  

},

  getCommunityList:function(){
    var that = this;
   // that.getEquipmentList();
  },


  getEquipmentList1(){

    var that = this;
    var residentId = wx.getStorageSync('residentId');
    
    var phone = wx.getStorageSync('phone');



    that.setData({
      equipmentId1:"" 
    })


    wx.request({
      url: url+'/equipment/getEquipmentList', //仅为示例，并非真实的接口地址
      data: {'phone':phone,'id':residentId},
      
      header: {
      
      'content-type': 'application/json' // 默认值
      
      },success: function(res) {
      
            that.setData({
              array:res.data.data
            })  
        }
      
      })




  },

  getEquipmentList:function(){
    var that = this;
    wx.request({
      url: url+'/equipment/findCommunitys', 
      data: {'communityId':that.data.communityId},
      header: {
      'content-type': 'application/json' // 默认值
      },success: function(res) {
        console.log(res.data.data)
        that.setData({
          array: res.data.data
        })
      }
      
    })
  },
  loadPwd:function(){
    var that = this;
    that.setData({
      cardNo:Math.floor(Math.random()*9000)+1000
    }); 

  },
  createData:function(data){
    // var phone='13536524756';
     var that = this;

  
    
     //console.log("ddddddddddd"+cardNo);
     var residentId = wx.getStorageSync('residentId');    
     var phone = wx.getStorageSync('phone');
     var communityId = wx.getStorageSync('communityId');    
 

     if(that.data.equipmentId1==''){
      wx.showToast({
          title:"请选择设备",
          icon:'none',
          duration:1000
      });
       return;
     }

     

     if( that.data.times==''){
      wx.showToast({
          title:"请选择有效期",
          icon:'none',
          duration:1000
      });
       return;
     }

     

     that.setData({
      disabled1: true
    })


    var person={
      communityId:communityId,
      phone:phone,
      equipmentId:that.data.equipmentId1,
      residentId:residentId,
      onePassword:that.data.cardNo,
      time:that.data.times,
      remark:"" 

    }

    console.log(person);
    

    //return;

    
     wx.request({
       url: url+'/equipment/addOnelock', //仅为示例，并非真实的接口地址
       data: person,
       method: "POST",
       header: {
       
       'content-type': 'application/json' // 默认值
       
       },success: function(res) {
        if(res.data.code=="0000"){
       
         
        wx.showToast({
            title:'密码设置成功',
            icon:'none',
            duration:2000
        });  

        setTimeout(function () {      
          that.setData({
            disabled1: false
          })
        }, 1500) //延迟时间 这里是1秒  
          


          // setTimeout(function () {      
          //   wx.reLaunch({     //跳转至指定页面并关闭其他打开的所有页面（这个最好用在返回至首页的的时候）
          //     url:'/pages/home/home'       
          //   })
          // }, 2000) //延迟时间 这里是1秒  
         



        }else{
          wx.showToast({
              title:res.data.message,
              icon:'none',
              duration:2000
          });
        that.setData({
          disabled1: false
        })


        }
      
       }
       
       })
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getEquipmentList1();
    this.getCommunityList();

    var that = this;

    console.log("password");

    
    that.setData({
      cardNo:Math.floor(Math.random()*9000)+1000
    }); 
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo.avatarUrl);
              
              // that.setData({
              //   name:res.userInfo.nickName
              // }); 
            


              
            }
          })
        }else{
         
        }
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