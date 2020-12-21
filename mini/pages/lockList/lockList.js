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
    residentId:'',
    array2:''
   
   
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
    that.getEquipmentList();

    
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