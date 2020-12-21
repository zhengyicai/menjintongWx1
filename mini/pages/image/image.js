// pages/image/image.js
const app = getApp()

const url = app.globalData.url

Page({
  

  /**
   * 组件的初始数据
   */
  data: {
    avatar:"",
    phone:"",

  },
  onLoad: function (options) {
    console.log("asdf");
    var that = this;
    that.getImgaeAuth();
  },
 
    //点击图片选择手机相册或者电脑本地图片
  changeAvatar: function(e) {
    var _this = this　　
    wx.chooseImage({
      count: 1,// 默认9
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //这里是上传操作
        wx.uploadFile({
          url: url+'/equipment/appphotoUpload', //里面填写你的上传图片服务器API接口的路径 
          filePath: tempFilePaths[0],//要上传文件资源的路径 String类型 
          method: "POST",
          name: 'file',//按个人情况修改，文件对应的 key,开发者在服务器端通过这个 key 可以获取到文件二进制内容，(后台接口规定的关于图片的请求参数)
          header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          formData: {
            'mobile':wx.getStorageSync('phone'),
            'id':wx.getStorageSync('residentId')

          },
          success: function(res) {
            //当调用uploadFile成功之后，再次调用后台修改的操作，这样才真正做了修改头像
          
              wx.showToast({
                title: '修改成功',
                icon: 'success',
                duration: 2500
              })

              //wx.uploadFile自已有一个this，我们刚才上面定义的var _this = this 把this带进来
              _this.setData({
                "avatar": tempFilePaths[0]
              });
            
          }
        })
      }
    })
  },
  getImgaeAuth:function(){
    var that = this;

  
    that.setData({
      phone: wx.getStorageSync('phone')
    });

    console.log("test11111");
    wx.request({
      url: url+'/equipment/getPhoneImage', 
      data: {'phone':that.data.phone},
      header: {
      'content-type': 'application/json' // 默认值
      },success: function(res) {

        if(res.data.data==null || res.data.data=="" ){
          // that.setData({
          //   imageState: '待上传人脸照片'
          // })
        }else{
          that.setData({
            avatar:  "http://image.szrunlifang.com/"+res.data.data.imageUrl
          })
          console.log(res.data.data.imageUrl)
          
        }

       
      }
      
    })
  },

  
})
