/**
 * Created by lenovo on 2017/7/3.
 */
var babyObj = function () {
    this.x;
    this.y;
    this.angle;
    // this.babyEye = new Image();
    this.babyBody = new Image();
    // this.babyTail = new Image();

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
};
babyObj.prototype.init = function () {
    this.x = canWidth * 0.5 +50;
    this.y = cabHeight * 0.5 + 50;
    this.angle = 0;
    // this.babyEye.src = './src/babyEye0.png';
    this.babyBody.src = './src/babyFade0.png';
    // this.babyTail.src = './src/babyTail0.png';
};
babyObj.prototype.draw = function () {
    this.x = lerpDistance(mom.x + 75, this.x, 0.93);
    this.y = lerpDistance(mom.y, this.y, 0.93);

    //delta angle
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    var deta = Math.atan2(deltaY, deltaX) + Math.PI;

    // lerp angle 计算角度
    this.angle = lerpAngle(deta, this.angle, 0.6);

    //计数工作
    this.babyTailTimer += deltaTime;  // 计时器累加时间
    if (this.babyTailTimer > 50){
        this.babyTailCount = (this.babyTailCount + 1) % 8;  // 在0-7之间循环
        this.babyTailTimer %= 50;
    }


    // 眼睛的计数工作
    this.babyEyeTimer += deltaTime;
    if (this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;

        if (this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        } else {
            this.babyEyeInterval = 200;
        }
    }

    // 身体的计数工作
    this.babyBodyTimer += deltaTime;
    if (this.babyBodyTimer > 300){
        this.babyBodyCount = this.babyBodyCount + 1;
        this.babyBodyTimer %= 300;
        if (this.babyBodyCount > 19){
            this.babyBodyCount = 19;

            // game over 游戏结束时
            data.gameOver = true;
        }
    }

    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);

    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width * 0.5 + 23, -babyTail[babyTailCount].height * 0.5);

    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount], -babyBody[babyBodyCount].width * 0.5, -babyBody[babyBodyCount].height * 0.5);

    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5, -babyEye[babyEyeCount].height * 0.5);
    // console.log(this.x)
    ctx1.restore();
};