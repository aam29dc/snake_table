"use strict";

const TNAME = "tmatrix";
const TROWS = 10;
const TCOLS = 10;

// INIT START
if(sessionStorage.getItem("SAPP")===null){
    sessionStorage.clear();

    let SAPP = {
        stime: Date.now(),
        ctime: Date.now(),
        snake: {
            length:1,
            xpos: [0],
            ypos: [0],
            direction:'down',
        },
        food: {
            eaten: false,
            xpos: Math.floor(TROWS/2),
            ypos: Math.floor(TCOLS/2),
        },
    };

    sessionStorage.setItem("SAPP", JSON.stringify(SAPP));
}
let SAPP = JSON.parse(sessionStorage.getItem("SAPP"));

drawTable(TROWS,TCOLS,"body",0,TNAME);

window.onkeypress = function(key){
    switch(key.key){
        case 'w':
            SAPP.snake.direction = 'up';
        break;
        case 's':
            SAPP.snake.direction = 'down';
        break;
        case 'a':
            SAPP.snake.direction = 'left';
        break;
        case 'd':
            SAPP.snake.direction = 'right';
        break;
    }
    sessionStorage.setItem("SAPP", JSON.stringify(SAPP));
};

//UPDATE Snake
    //update tail
for(let i = SAPP.snake.length;i>0;i--){
    SAPP.snake.xpos[i] = SAPP.snake.xpos[i-1];
    SAPP.snake.ypos[i] = SAPP.snake.ypos[i-1];
}
    //update head
switch(SAPP.snake.direction){
    case 'right':
        SAPP.snake.xpos[0]++;
        break;
    case 'left':
        SAPP.snake.xpos[0]--;
        break;
    case 'up':
        SAPP.snake.ypos[0]--;
        break;
    case 'down':
        SAPP.snake.ypos[0]++;
        break;
}

is_dead();
respawn_food();
is_eating();

//DRAW Snake
    //draw head
    setCell(SAPP.snake.xpos[0], SAPP.snake.ypos[0], '@', TNAME);
    //draw tail
for(let i = 1;i<SAPP.snake.length;i++){
    setCell(SAPP.snake.xpos[i], SAPP.snake.ypos[i], '&', TNAME);
}

//UPDATE SAPP
SAPP.ctime = Date.now();
sessionStorage.setItem("SAPP", JSON.stringify(SAPP));

//RELOAD
setTimeout(function(){window.location.reload();}, 750);
