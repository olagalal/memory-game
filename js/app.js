// Cards Array
const cards = ["diamond", "diamond", "paper-plane", "paper-plane", "anchor", "anchor", "bolt", "bolt", "cube", "cube", "leaf", "leaf", "bicycle", "bicycle", "bomb", "bomb"];

// Variables
let openCards = [];
let moves = 0;
let stars = 3;

// Variables for Timer
let seconds = 0;
let minutes = 0;
let hours = 0;

//Shuffle Array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle Cards
function shuffleCards() {
    let newSetOfCards = shuffle(cards);
    openCards = [];
    const deck = $('.deck').empty();
    for (let card of newSetOfCards) {
        let cardContainer = $('<li class="card"><i class="fa" aria-hidden="true"></i></li>');
        deck.append(cardContainer);
        let iconClass = "fa-" + card;
        cardContainer.find('.fa').addClass(iconClass);
    }
}

// Click a card on the deck to show cards and check the matching of cards
$('.deck').on('click', '.card', function (event) {
    // open the clicked card
    let clickedCard = $(event.target);

    showCard(clickedCard);

    setTimeout(function () {
        checkCards(clickedCard);
    }, 600);

});
