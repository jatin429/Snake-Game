// Game Constants & Variables
let inputDir={x: 0, y: 0};
const foodSound=new Audio('food.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('move.mp3');
const musicSound=new Audio('music.mp3');
let lastPaintTime=0;
let speed=7;
let score=0;
let scoreBox=document.getElementById("scoreBox");
let card_board = document.getElementById("card-board");
let hiscoreBox = document.getElementById("hiscoreBox");
let snakeArr=[
    // snake head
    {x:13,y:15}
];
let food={x:13,y:12};
// Game Functions
const main=(currtime)=>{
//    to call main function again and again
window.requestAnimationFrame(main);
// console.log(currtime);
// render after 0.5 seconds
if((currtime-lastPaintTime)/1000 < 1/speed){
    return ;
}

lastPaintTime=currtime;
gameEngine();
}

const isCollide=(snake)=>{
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        return true;
    }
}
// if you bump into the wall
if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0 ){
    return true;
}    
}

const gameEngine=()=>{
    // Updating the snake array && food
   if(isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir={x:0, y:0};
    scoreBox.innerHTML="Score: " +0;
    alert("Game Over. Press any Key to play again!");
    snakeArr=[{x:13,y:15}];
    musicSound.play();
    score=0;
    
   }

//    After eating the food, increment the score and regenerate the food
if(snakeArr[0].y ===food.y && snakeArr[0].x ===food.x){
   
    foodSound.play(); 
    score+=1;
    if(score>hiscoreval){
        hiscoreval=score;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
    hiscoreBox.innerHTML="HiScore: "+ hiscoreval;
    }
    scoreBox.innerHTML="Score: " + score;   
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
   let a=2;
   let b=16;
   food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
}

//  Moving the Snake
// start from last idx
for (let i =snakeArr.length-2;i>=0; i--) {
    snakeArr[i+1]={...snakeArr[i]};
}

snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;

 // Display the snake
card_board.innerHTML = "";
snakeArr.forEach((ele,idx)=>{
     snakeElement=document.createElement('div');
snakeElement.style.gridRowStart   =ele.y;
snakeElement.style.gridColumnStart=ele.x;
if(idx === 0){
    snakeElement.classList.add('head');
}
else{
    snakeElement.classList.add('snake');
}
card_board.appendChild(snakeElement);
});
 // Display the food
 foodElement=document.createElement('div');
 foodElement.style.gridRowStart   =food.y;
 foodElement.style.gridColumnStart=food.x;
 foodElement.classList.add('food');
 card_board.appendChild(foodElement);
}

// Main logic of game 

// main function in requestAnimationFrame will be called just before the browser performs the next repaint.
let hiscore=localStorage.getItem("hiscore")
if(hiscore === null){
    // hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(0))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    musicSound.play();
    inputDir={x:0,y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;  
            
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;  

        default:
            break;
    }
    
})

