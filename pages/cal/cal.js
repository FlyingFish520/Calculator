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
    lastIsOperator: "false",
    arr:[],
    logs:[]

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

  log: function(){
    wx.navigateTo({
      url: '../list/list',
    })
  },

  btnClick: function (event) {
    console.log(event.target.id);
    var id = event.target.id;
    var sd = this.data.screenData;
    var data;

    //退格
    if(id == this.data.id1){
      var data = this.data.screenData;
      if(data == 0){
        return ;
      }
      data = data.substring(0,data.length-1);
      if(data==""||data=="-"){
        data=0;
      }
      this.setData({screenData:data});
      this.data.arr.pop();  //退格清掉数组
    }

    //清屏操作
    else if(id ==this.data.id2){
      this.setData({screenData:"0"});
      this.data.arr.length=0;
    }
    
    //正负转换
    else if(id ==this.data.id3){
      var data = this.data.screenData;
      if(data==0){
        return ;
      }
      var firstWord = data.substring(0,1);
      if(firstWord == "-"){
        data = data.substring(1,data.length);
        this.data.arr.shift();
      }
      else{
        data = "-"+data;
        this.data.arr.unshift("-");
      }
      this.setData({screenData:data});
    }
    
    //等号操作
    else if(id == this.data.id20){
      var data = this.data.screenData;
      if(data==0){
        return ;
      }
      var lastWord = data.substring(data.length-1,data.length);//等号前必须是数字
      if (isNaN(lastWord)) {   //NaN 属性是代表非数字值的特殊值，该属性用于指示某个值不是数字。
        return ;
      }

      var num = "";
      var lastOperator;
      var arr = this.data.arr; //储存输入字符数组
      var optarr = [];  //储存运算式
      for(var i in arr){
        if(isNaN(arr[i])==false||arr[i]==this.data.id18||arr[i]==this.data.id3){
          num += arr[i];
        }
        else{
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      optarr.push(Number(num));
      var result = Number(optarr[0])*1.0;
      console.log(result+"(结果)");
      for(var i=1;i<optarr.length;i++){
        if(isNaN(optarr[i])){  //判断运算符及其操作
          if(optarr[i]==this.data.id4){
            result += Number(optarr[i+1]); 
          }
          else if (optarr[i] == this.data.id8){
            result -= Number(optarr[i + 1]);
          }
          else if (optarr[i] == this.data.id12) {
            result *= Number(optarr[i + 1]);
          }
          else if (optarr[i] == this.data.id16) {
            result /= Number(optarr[i + 1]);
          }
        }
      }

      this.data.logs.push(data+"="+result);
      wx.setStorageSync("callogs",this.data.logs);  //存日志

      //算完清空数组
      this.data.arr.length = 0;
      this.data.arr.push(result);
      this.setData({screenData:result+""});
    } 

    //显示屏
    else{
      //叠加运算符时的判断，运算符不重复，初始界面为0时不叠加
      if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
        if (this.data.lastIsOperator == true || this.data.screenData == 0) {
          return;
        }
      }

      //显示输入字符
      if (sd == 0) {
        data = id;
      }
      else {
        data = sd + id; //相加要注意前后顺序，这是字符的连接
      }
      this.setData({ screenData: data });
      this.data.arr.push(id);

      //设置运算符不能连续添加
      if (id == this.data.id4 || id == this.data.id8 || id == this.data.id12 || id == this.data.id16) {
        this.setData({ lastIsOperator: true });
      }
      else {
        this.setData({ lastIsOperator: false });
      }
    }
  }
})