// pages/register/register.js
// pages/login/login.js

//const url = 'https://wx.szrunlifang.com/app'

const app = getApp()

const url = app.globalData.url


var page = 1  //初始化页数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    residentId:'',
    array2:'',
    lists: [],
    lastpage:0,
  },
  //数据加载
  loadData:function(page){
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    //获取上次加载的数据
    var oldlists = this.data.lists;
    var residentId = wx.getStorageSync('residentId');    
    //获取数据
    wx.request({
      url: url+'/equipment/getOnePasswordResident', //接口地址 填你的数据接口
      data: {'residentId':residentId},
      success: function (res) {
        console.log(res) //查看数据结构
        var newlists = oldlists.concat(res.data.data) //合并数据 res.data 你的数组数据
        setTimeout(() => {
          that.setData({
            lists: newlists,
            lastpage: 2 //你的总页数
          });
        //隐藏 加载中的提示
          wx.hideLoading();
        }, 1500)
      },
    })
  },
  //加载更多
  onReachBottom: function () {
    console.log("123444");
    page++
    if(this.data.lastpage > page){
      this.loadData(page); 
    }else{
      wx.showModal({
        title: '到底了',
        content: '请休息一会再看呗！',
      })
    }
  }, 
  getEquipmentList:function(){
    var that = this;
    var residentId = wx.getStorageSync('residentId');    
    wx.request({
      url: url+'/equipment/getOnePasswordResident', 
      data: {'residentId':residentId},
      header: {
      'content-type': 'application/json' // 默认值
      },success: function(res) {
        that.setData({
          array2: res.data.data
        })
      }
      
    })
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    console.log("asdff");
    var that = this;    
  //  that.getEquipmentList();
    that.loadData(0);

    
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