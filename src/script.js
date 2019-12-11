const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard; 
let count = 0;

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;
    checkMatch();

}

function checkMatch(){
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        count++;
    } else {
        unFlipCards();    
    }
    if (count == 6) {
        setTimeout(() => {
            alert("Won!!!");
        }, 500)
    }
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);       
    secondCard.removeEventListener('click', flipCard); 
    resetBoard();

}

function unFlipCards() {
    lockBoard = true;
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard, secondCard]=[null,null];
}


(function shuffle(){
    cards.forEach( cards => {
        let shuffler = Math.floor(Math.random() * 12);
        cards.style.order = shuffler;
    }

    )
})();

function restart(){
    var okToRefresh = confirm("Do you want to play again?");
    if (okToRefresh){
        setTimeout("location.reload(true);",500);
        shuffle();
    }
 
}


cards.forEach(card => card.addEventListener('click', flipCard));

module.exports = {
    restart,shuffle, flipCard,unFlipCards,resetBoard,disableCards
}