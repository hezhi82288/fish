/**
 * Created by lenovo on 2017/6/29.
 */
var can1;
var can2;

var canWidth;
var cabHeight;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

// 小鱼结构
var babyTail = [];
var babyEye = [];
var babyBody = [];

// 大鱼结构
var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;

var wave;

var halo;

var dust;
var dustPic = [];

var bgPic = new Image();

document.body.onload = game;

function game() {
    init();
    lastTime = Date.now();
    deltaTime = 0;
    gameloop();
}

// 初始化init()
function init() {
    //  获得canvas
    can1 = document.getElementById('canvas1');  // fishes, dust, UI, circle
    ctx1 = can1.getContext('2d');
    // console.log(can1)

    can2 = document.getElementById('canvas2');
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove',onMouseMove, false);

    bgPic.src = "./src/background.jpg";

    canWidth = can1.width;
    cabHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = cabHeight * 0.5;

    // 小鱼的初始化，尾巴、眼睛、身体
    for (var i = 0; i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = './src/babyTail' + i + '.png'
    }

    for (var i = 0; i < 2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = './src/babyEye' + i + '.png';
    }

    for (var i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = './src/babyFade' + i + '.png'
    }

    // 大鱼的初始化，尾巴、眼睛、身体
    for (var i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = './src/bigTail' + i + '.png';
    }

    for (var i = 0; i < 2; i++){
        momEye[i] = new Image();
        momEye[i].src = './src/bigEye' + i + '.png';
    }

    data = new dataObj();

    for (var i = 0; i < 8;i++){
        momBodyOra[i] = new Image();
        momBodyBlue[i] = new Image();

        momBodyOra[i].src = './src/bigSwim' + i + '.png';
        momBodyBlue[i].src = './src/bigSwimBlue' + i + '.png';
    }

    ctx1.font = '30px Verdana';
    ctx1.textAlign = 'center';

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    for (var i = 0; i < 7; i++){
        dustPic[i] = new Image();
        dustPic[i].src = './src/dust' + i + '.png';
    }
    dust = new dustObj();
    dust.init();
}

function gameloop() {
    requestAnimationFrame(gameloop);   // 相比于setInterval与setTimeout来说更科学
    // console.log('loop')
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    // console.log(deltaTime);

    if (deltaTime > 40) deltaTime = 40;

    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0, 0, canWidth, cabHeight);
    mom.draw();
    baby.draw();

    momFruitsCollsion();
    momBabyCollsion();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e) {
    if (!data.gameOver){
        // 控制鼠标
        if (e.offSetX || e.layerX){
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
            // console.log(mx)
        }
    }
}

function lerpDistance(aim, cur, radio) {
    var delta = cur - aim;
    return aim + delta * radio;
}

function lerpAngle(a, b, t) {
    var d = b - a;
    if (d > Math.PI) d = d - 2 * Math.PI;
    if (d < -Math.PI) d = d + 2* Math.PI;
    return a + d * t;
}

function calLength2(x1, y1, x2, y2) {
    return Math.pow(x1 - x2, 2) + Math.pow(y1- y2, 2)
}