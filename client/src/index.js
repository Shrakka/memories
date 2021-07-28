import "./assets/_globals.scss"
import { startGame } from "./game";
import { saveStatistic, fetchOrderedStatistics, buildStatisticHTML } from "./home";

document.addEventListener("DOMContentLoaded", setupHome);
document.addEventListener("game:victory", returnHomeAfterVictory);
document.addEventListener("game:time-up", returnHomeAfterDefeat);

function setupHome() {
    bindButtonAction();
    fetchAndDisplayStatistics();
}

async function returnHomeAfterVictory(event) {
    await promptAndSaveUserScore();
    hideGame();
    displayHome();
    await fetchAndDisplayStatistics(); // In case some users made attempts while user was still playing, better fetch everything again!


    async function promptAndSaveUserScore() {
        const completionTimeMS = event.detail;
        const completionTimeSeconds = Math.floor(completionTimeMS / 1000);
        const userName = prompt(`
            You won in ${completionTimeSeconds} seconds!\n
            Enter your name to appear in the leaderboard!\n
            And win your chance to get a free JavaScript lessons at Ecole O'clock!\n
        `);
        if (userName && userName.trim() !== "") {
            await saveStatistic({ userName, completionTimeMS });
        }
    }
}

async function returnHomeAfterDefeat() {
    alert(`
        Times up!\n
        Unfortunately you have reached the countdown limit... 😿\n
        Try again!
    `);
    hideGame();
    displayHome();
    await fetchAndDisplayStatistics();
}

function bindButtonAction() {
    const buttonElement = document.getElementById("button");
    buttonElement.addEventListener("click", () => {
        hideHome();
        startGame();
    });
}

async function fetchAndDisplayStatistics() {
    const statisticsElement = document.getElementById("statistics");
    statisticsElement.innerHTML = "";

    const statistics = await fetchOrderedStatistics();
    statistics.forEach(statistic => {
        statisticsElement.insertAdjacentHTML("beforeend", buildStatisticHTML(statistic));
    });
}

function hideGame() {
    document.getElementById("board-container").innerHTML = "";
    document.getElementById("timer-container").innerHTML = "";
}

function hideHome() {
    const homeElement = document.getElementById("home");
    homeElement.style.display = "none";
}

function displayHome() {
    const homeElement = document.getElementById("home");
    homeElement.style.display = "";
}
