"use strict";

function is_eating(){
    if((SAPP.snake.xpos[0] === SAPP.food.xpos) && (SAPP.snake.ypos[0] === SAPP.food.ypos)){
        SAPP.food.eaten = true;
        SAPP.snake.length++;

        // determine position of tail from head
        if(SAPP.snake.length == 2){
            SAPP.snake.xpos.push(SAPP.snake.xpos[0]);
            SAPP.snake.ypos.push(SAPP.snake.ypos[0]);

            switch(SAPP.snake.direction){
                case 'right':
                    SAPP.snake.xpos[1]--;
                    break;
                case 'left':
                    SAPP.snake.xpos[1]++;
                    break;
                case 'up':
                    SAPP.snake.ypos[1]++;
                    break;
                case 'down':
                    SAPP.snake.ypos[1]--;
                    break;
            }
        }
        // determine position from last two peices from tail
        else{
            SAPP.snake.xpos.push(SAPP.snake.xpos[SAPP.snake.length-1]);
            SAPP.snake.ypos.push(SAPP.snake.ypos[SAPP.snake.length-1]);

            if(SAPP.snake.xpos[SAPP.snake.length-2] - SAPP.snake.xpos[SAPP.snake.length-1] > 1)
                SAPP.snake.xpos[SAPP.snake.length]--;
            else SAPP.snake.xpos[SAPP.snake.length]++;

            if(SAPP.snake.ypos[SAPP.snake.length-2] - SAPP.snake.ypos[SAPP.snake.length-1] > 1)
                SAPP.snake.ypos[SAPP.snake.length]--;
            else SAPP.snake.ypos[SAPP.snake.length]++;
        }
    }
}

function respawn_food(){
    if(SAPP.ctime - SAPP.stime > 10000){
        SAPP.food.eaten = false;
        SAPP.food.xpos = Math.floor(Math.random()*(TCOLS));
        SAPP.food.ypos = Math.floor(Math.random()*(TROWS));
        SAPP.stime = Date.now();
    }
    if(SAPP.food.eaten === false){
        setCell(SAPP.food.xpos, SAPP.food.ypos, '$', TNAME);
    }
}

//cant store functions in object for sessionStorage
function is_dead() {
    if(SAPP.snake.xpos[0] < 0 || SAPP.snake.ypos[0] < 0 || SAPP.snake.xpos[0] >= TROWS || SAPP.snake.ypos[0] >= TCOLS){
        SAPP.snake.xpos[0] = 0;
        SAPP.snake.ypos[0] = 0;
        SAPP.snake.length = 1;
    }
}

function setCell(col = 0, row = 0, val = 0, eid = "tmatrix"){
    let rows = document.getElementById(eid).getElementsByTagName("tr");

    if(row < 0 || col < 0 || row > rows.length-1 || col > rows[row].childElementCount-1) return;

    rows[row].childNodes[col].innerText = val;
}

function testTable(){
    for(let i = 0;i<TROWS;i++){
        for(let j = 0;j<TCOLS;j++){
            setCell(i,j,j,"tmatrix");
        }
    }
}

function drawTable(cols = 1, rows = 1, eid = "body", val = null, name = "tmatrix"){
    let frag = document.createDocumentFragment();

    frag.appendChild(document.createElement("table"));
    frag.childNodes[0].appendChild(document.createElement("caption"));
    frag.childNodes[0].childNodes[0].appendChild(document.createTextNode(SAPP.snake.length));

    if(name === null) name = "tmatrix";
    frag.childNodes[0].setAttribute("id", name);

    for(let i = 1;i < rows+1;i++){
        frag.childNodes[0].appendChild(document.createElement("tr"));
        for(let j = 0;j < cols;j++){
            frag.childNodes[0].childNodes[i].appendChild(document.createElement("td"));

            if(val == null) val = "";

            frag.childNodes[0].childNodes[i].childNodes[j].appendChild(document.createTextNode(val));
        }
    }

    document.querySelector(eid).appendChild(frag);
}