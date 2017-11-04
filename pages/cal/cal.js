Page({

  /**
   * 页面的初始数据
   */
  data: {
    id1:"back",
    id2:"clear",
    id3:"negative",
    id4:"+",
    id5: "9",
    id6: "8",
    id7: "7",
    id8: "-",
    id9: "6",
    id10: "5",
    id11: "4",
    id12: "*",
    id13: "3",
    id14: "2",
    id15: "1",
    id16: "/",
    id17: "0",
    id18: ".",
    id19: "log",
    id20: "=",
    screenData: "0",
    lastIsOperator: "false"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  },

  btnClick: function (event) {
    console.log(event.target.id);
    var id = event.target.id;
    var sd = this.data.screenData;
    var data;

    //叠加运算符时的判断，运算符不重复，初始界面为0时不叠加
    if(id==this.data.id4||id==this.data.id8||id==this.data.id12||id==this.data.id16){
      if(this.data.lastIsOperator==true||this.data.screenData==0){
        return ;
      }
    }

    //显示输入字符
    if (sd == 0){
      data = id;
    }
    else{
      data = sd + id; //相加要注意前后顺序，这是字符的连接
    }
    this.setData({screenData:data});

    //设置运算符不能连续添加
    if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
      this.setData({ lastIsOperator: true });
    }
    else {
      this.setData({ lastIsOperator: false });
    }
  }
})