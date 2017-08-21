/**
 * Created by lenovo on 2017/7/3.
 */
// 判断大鱼和果实之间的距离
function momFruitsCollsion() {
    if (!data.gameOver){
        for (var i = 0; i < fruit.num; i++){
            if (fruit.alive[i]){
                var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
                if (l < 900){
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.momBodyCount++;
                    if (mom.momBodyCount > 7) mom.momBodyCount = 7;
                    if (fruit.fruitType[i] == 'blue'){
                        data.double = 2;
                    }
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}

// 大鱼喂小鱼
function momBabyCollsion() {
    if (data.fruitNum > 0 && !data.gameOver){  // 当大鱼吃到果实大于0的时候
        var l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if (l < 900){
            baby.babyBodyCount = 0;
            // data.reset();
            mom.momBodyCount = 0;

            data.addScore();

            halo.born(baby.x, baby.y);
        }
    }
}