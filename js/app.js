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

// Show Cards
function showCard(card) {
    card.addClass('open show');
}

// Check Cards
function checkCards(card) {
    let cardSymbol = card.children('i').attr('class');
    if (openCards.length > 0) {
        openCards.push(card);
        let lastCard = openCards[openCards.length - 2];
        let lastCardSymbol = lastCard.children('i').attr('class');

        if (lastCardSymbol === cardSymbol) {
            lockCard(card);
            lockCard(lastCard);
            openCards = [];
            checkMatched();
        } else { // not matched
            hideCard(card, openCards);
            hideCard(lastCard, openCards);
        }
        updateMoves();
    } else { // add to open list
        openCards.push(card);
    }
}

// Lock last opened card and set its status to 'match'
function lockCard(card) {
    card.removeClass("open show");
    card.addClass("match");
}

// Remove a card from the open card list and hide the card's symbol when not match
function hideCard(card, openCards) {
    card.addClass("not-match");
    setTimeout(function () {
        card.removeClass("open show not-match");
        openCards.pop();
    }, 400);
}

// Check if all cards matched, switch the display of the win message
function checkMatched() {
    let matchedNum = $('.match').length;

    if(matchedNum === $('.deck li').length){
        timer.stop();
        $(".container").hide();
        $(".win-container").show();
    } else{
        $(".container").show();
        $(".win-container").hide();
    }
}

// Initialize Move value
function initMoves() {
    moves = 0;
    $('.moves').text(moves);
}

// Update Move value
function updateMoves() {
    moves++;
    $('.moves').text(moves);
    updateStars();
}

// Initialize Stars value
function initStars() {
    stars = 3;
    $('.stars i').removeClass("fa-star-o");
    $('.stars i').addClass("fa-star");
    updateStars();
}

// Rules of Stars
function updateStars() {
    if (moves <= 12) {
        $('.stars .fa').addClass("fa-star");
        stars = 3;
    } else if(moves >= 13 && moves <= 14){
        $('.stars li:last-child .fa').removeClass("fa-star");
        $('.stars li:last-child .fa').addClass("fa-star-o");
        stars = 2;
    } else if (moves >= 15 && moves <20){
        $('.stars li:nth-child(2) .fa').removeClass("fa-star");
        $('.stars li:nth-child(2) .fa').addClass("fa-star-o");
        stars = 1;
    } else if (moves >=20){
        $('.stars li .fa').removeClass("fa-star");
        $('.stars li .fa').addClass("fa-star-o");
        stars = 0;
    }
    $('.win-container .stars-number').text(stars);

}

// Timer @with easyTimer.js from https://github.com/albert-gonzalez/easytimer.js by Albert Gonzalez
let timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('time').html(timer.getTimeValues().toString());
});

// Initialize the game
function init() {
    initMoves();
    initStars();
    shuffleCards();
    timer.start();
    checkMatched();
}

// Reset the Game
$('.restart').on('click', function (event) {
    event.preventDefault();
    timer.reset();
    init();
});

// Start the Game
$(function () {
    init();
});