/**
 * Created by lenovo on 2017/6/29.
 */
var aneObj = function(){
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];
    this.alpha = 0;
};
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    for (var i = 0; i < this.num;i++){
        this.rootx[i] = i * 16 + Math.random() * 20;  // random会返回[0,1)之间的数值
        this.headx[i] = this.rootx[i];
        this.heady[i] = cabHeight - 250 + Math.random() * 50;
        this.amp[i] = Math.random() * 50 + 50;
    }
    // console.log('a')
};
aneObj.prototype.draw = function () {
    this.alpha += deltaTime * 0.001;
    var l = Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 10;  // 直线的宽度
    ctx2.lineCap = 'round';   // 线段结束时的样式
    ctx2.strokeStyle = '#3b154e';
    for (var i =0;i<this.num;i++){
        // beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, lineCap,  globalAlpha
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i], cabHeight);  // 起始坐标
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i], cabHeight - 100, this.headx[i], this.heady[i]);  // 路劲到达坐标
        ctx2.stroke();
    }
    ctx2.restore();
};