import "./game.scss";
import { Board, Timer } from "./models";
import { buildBoardHTML, buildTimerHTML } from "./components";

let cardElements; // Reference to cards DOM elements
let timerElement; // Reference to timer DOM element

let board; // Model for the board game
let timer; // Model for the timer

let interval; // timer setInterval reference

export function startGame() {
    board = new Board({ nbOfCards: 10 });
    timer = new Timer({ maxTimeMS: 60 * 1000 });

    loadBoard();
    loadTimer();
}

function loadBoard() {
    const boardContainerElement = document.getElementById("board-container");
    const cardIndexes = board.getCardIndexes();
    boardContainerElement.innerHTML = buildBoardHTML(cardIndexes);

    cardElements = document.querySelectorAll(".card");
    cardElements.forEach((cardElement, cardPosition) => {
        cardElement.addEventListener("click", () => handleCardClick(cardPosition));
    });
}

function loadTimer() {
    const timerContainerElement = document.getElementById("timer-container");
    timerContainerElement.insertAdjacentHTML("beforeend", buildTimerHTML());
    timerElement = document.getElementById("timer");
    startTimer();
}


// ----------- GAME MAIN LOGIC -----------

let isViewFrozen = false; // To prevent users from clicking on other cards, while the non-matching pair is being flipped over during the setTimeout delay

function handleCardClick(cardPosition) {
    if (isViewFrozen) { return; }
    if (board.isCardAlreadyVisible(cardPosition)) { return; }

    showCard(cardPosition);

    if (board.isFirstPick()) {
        board.selectCard(cardPosition);
        return;
    }

    if (board.isCardMatchingLastPick(cardPosition)) {
        board.validatePair(cardPosition);
        board.resetLastPick();
    } else {
        flipOverNonMatchingCards();
    }

    if (board.isWinningPosition()) {
        handleVictory();
    }


    function showCard(cardPosition) {
        cardElements[cardPosition].classList.add("selected");
    }

    function hideCard(cardPosition) {
        cardElements[cardPosition].classList.remove("selected");
    }

    function flipOverNonMatchingCards() {
        isViewFrozen = true;

        setTimeout(() => {
            hideCard(cardPosition);

            const lastSelectedCardPosition = board.getLastSelectedCardPosition();
            hideCard(lastSelectedCardPosition);

            board.resetLastPick();
            isViewFrozen = false;
        }, 1000);
    }

    async function handleVictory() {
        clearInterval(interval); // Avoid memory leak: clear your intervals!
        const timeSpentMS = timer.getTimeSpentMS();
        document.dispatchEvent(new CustomEvent("game:victory", { detail: timeSpentMS }));
    }
}


// ----------- TIMER -----------

function startTimer() {
    const incrementationTimeMS = 100; // Every 100ms, lets increment the timer.

    interval = setInterval(() => {
        if (timer.isFinished()) {
            clearInterval(interval); // Avoid memory leak: clear your intervals!
            document.dispatchEvent(new Event("game:time-up"));
        } else {
            timer.increment(incrementationTimeMS);
            const percent = timer.getCompletionInPercent();
            timerElement.querySelector(".progress-bar").style.width = `${percent}%`;
        }
    }, incrementationTimeMS);
}
