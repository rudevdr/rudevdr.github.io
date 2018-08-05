//This varaible will be shuffled
var deck = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

//Initials variables and their values
let timerRunning = false;		//whether timer is running
enableClicking = true;			//clicking on deck is disabled when congratulation popup is running
showingCard = false;
var dealingCards = [];			//stores all cards after shuffling
matchedCard = 0;
stars = 3;
movesNeededToWin = 8;
numOfMoves = 0;
timeInSeconds = 0;
twoStar = 14;					//how many moves required to get 2 star rating
threeStar = 20;					//how many moves required to get 3 star rating

//the congratulation popup will be hidden by default
document.querySelector(".win-dialog").style.visibility = "hidden";
document.querySelector(".deck").style.opacity = "1";

//shuffles the deck and assigns each card with randomn item in the deck
function cardsArrange() {
	deck = shuffle(deck);
	var index = 0;
	$.each($(".card i"), function(){
		$(this).attr("class", "fa " + deck[index]);
		index++;
	});
};

//sets and starts the timer
function timerManage() {
	if (timerRunning) {
		//To Update Moves Counter
		timeInSeconds++;
		$(".timer").text(timeInSeconds);
		setTimeout(timerManage, 1000);
	}
	else {
		timeInSeconds = timeInSeconds;
		$(".timer").text(timeInSeconds);

	}
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

//open a closed card
function displayCard(card) {
	if (!card.hasClass("open")) {
		card.toggleClass("open");
		card.toggleClass("show");
		dealingCards.push(card);
	}
};

//open a closed card and match with last card which is still opened
function displayAndMatch(card) {
	displayCard(card);
	showingCard = false;
	moveAndRating();

	//also check here if game is finshed
	if (dealingCards[0].children().attr("class") === dealingCards[1].children().attr("class")) {
		matchedCard++;
		dealingCards = [];

		//each time checking if won
		checkWon();
	}
	else {
		setTimeout(notMatchedCard, 600);
	}
};

//runs when restart is clicked in homepage or congratulation popup
var onRestart = function() {
	//Resetting the timer
	timerRunning = false;
	timeInSeconds = 0;
	$(".timer").text(timeInSeconds);

	//Resetting the number of moves
	numOfMoves = 0;
	$(".moves").text(numOfMoves);

	//Resetting the number of Rating
	$(".fa-star-o").attr("class", "fa fa-star");

	//Hide all cards
	showingCard = false;
	$.each($(".card"), function(){
		$(this).removeClass("open");
		$(this).removeClass("show");
	});
	dealingCards = [];

	//Making matched cards 0
	matchedCard = 0;

	enableClicking = true;
	document.querySelector(".win-dialog").style.visibility = "hidden";
	document.querySelector(".deck").style.opacity = "1";

	document.querySelector(".timer").style.display = "inline";
	document.querySelector(".timer-unit").style.display = "inline";

	//Shuffling the cards on Reset
	cardsArrange();
};

//when cards don't open, this function is called
function notMatchedCard(card) {
	dealingCards.forEach(function(card) {
		card.toggleClass("open");
		card.toggleClass("show");
	});

	dealingCards = [];
};

//manages moves counter and rating counter
function moveAndRating() {

	//To Update Moves Counter
	numOfMoves++;
	$(".moves").text(numOfMoves);

	//To Update Rating Counter
	if (numOfMoves === twoStar || numOfMoves === threeStar ) {
		let stars = $(".fa-star");
		$(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
	}
};

//is called when a card in the deck is clicked
function cardClick() {
	if (enableClicking){
		//Display only if card is not being displayed and is not matched
		if (!$(this).hasClass("open") || $(this).hasClass("match")) {

			//If a card is already being shown then display both and check if they match and if they match then check if game done
			if(showingCard && dealingCards.length === 1 ) {
				displayAndMatch( $(this) )
			}
			else if (!showingCard && dealingCards.length < 1) {
				showingCard = true;
				displayCard( $(this) )
			}
		}
		if (!timerRunning) {
			//on first click start the timer
			timerRunning = true;
			setTimeout(timerManage, 1000);
		}
	}
};

//runs everytime matching function is run
function checkWon() {

	if (matchedCard === movesNeededToWin ) {
		//stopping the timer
		timerRunning = false;

		//showing congratulation popup dialog on winning
		document.querySelector(".win-dialog").style.visibility = "inherit";
		enableClicking = false;
		//fading the deck
		document.querySelector(".deck").style.opacity = "0.2";

		//final time taken
		$("#win-time").text(timeInSeconds);

		//rating
		if (numOfMoves <= twoStar) {
			star = "3";
		}
		else if (numOfMoves <= threeStar) {
			star = "2";
		}
		else {
			star = "1";
		}
		$("#win-stars").text(star);

		//repeat button
		$("#win-repeat").click(onRestart);

		//hides timer
		document.querySelector(".timer").style.display = "none";
		document.querySelector(".timer-unit").style.display = "none";
	}
};


$(".card").click(cardClick); //on clicking of card
$(".restart").click(onRestart); //on clicking restart button

$(cardsArrange);
