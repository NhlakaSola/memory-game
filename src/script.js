let tileImages = [];
let tileArray = [];
let tileFlippedOver = [];
let cardFlipped = -1;
let timer = '';
var playLockout = false;
let startButton = document.getElementById('start');
let gameBoard = document.getElementById('gameBoard');
let gamePlay = false;


startButton.addEventListener('click',startGame);


function startGame(){
    cardFlipped = -1;
    playLockout = false;
    startButton.style.display='none';
    if(!gamePlay){
        gamePlay = true;
        buildArray();
        tileArray = tileImages.concat(tileImages);
        shuffleArray(tileArray);
        buildBoard();
        
    }
}

function buildArray(){
    for (let i = 1; i < 7; i++){
        tileImages.push(i+'.png');
      } 
}

function buildBoard(){
    var html = "";
    for (var x = 0; x <= (tileArray.length -1); x++) {
        html += '<div class = "gameTile"><div class = "gameTile">';
        html += '<img id="cards' + x + '" src="img/back.png" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';  
    }
    gameBoard.innerHTML = html;
}

function pickCard(tileIndex,t) {
    if (!inArray(t.id,tileFlippedOver) && !playLockout) {
        if (cardFlipped >=0) {
            cardFlip(t,tileIndex);
            playLockout = true;
        if (checkSrc(tileFlippedOver[tileFlippedOver.length-1]) == checkSrc(tileFlippedOver[tileFlippedOver.length-2])) {
            playLockout = false;
            cardFlipped = -1;
            if (tileFlippedOver.length == tileArray.length) {
                gameOver();
            }
        }else{
            timer = setInterval(hideCard, 1000);
        }
    }else{
        cardFlipped = tileIndex;
        cardFlip(t,tileIndex); 
    }
   }
}

function hideCard() {
    for (let x = 0; x < 2; x++) {
        let vid = tileFlippedOver.pop();
        document.getElementById(vid).src = "img/back.png" 
    }
    clearInterval(timer);
    playLockout = false;
    cardFlipped = -1;
}

function gameOver() {
    startButton.style.display = 'block';
    gamePlay = false;
    tileImages = [];
    tileFlippedOver = [];
    setTimeout(function(){ alert("Click start for new game"); }, 200);
  }

function inArray(x,array) {
    return array.indexOf(x) > -1;
}

function cardFlip(t,ti) {
    t.src = "img/"+tileArray[ti];
    tileFlippedOver.push(t.id);
}

function checkSrc(v) {
    var v = document.getElementById(v).src;
    return v;
}

function shuffleArray(array){
    for (let j = array.length - 1; j >0; j--) {
        let holder = Math.floor(Math.random() * (j+1));
        var itemValue = array[j];
        array[j] = array[holder];
        array[holder] = itemValue;
    }
    return array;
}

module.exports = {shuffleArray,checkSrc,cardFlip,isInArray,gameOver,startGame,buildArray,buildBoard, hideCard, pickCard}