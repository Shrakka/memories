import "./assets/_globals.scss"
import { startGame } from "./game";
import { loadLeaderBoard } from "./leaderboard"
import { saveStatistic } from "./leaderboard/service";

document.addEventListener("DOMContentLoaded", setupLeaderboard);
document.addEventListener("game:victory", returnToLeaderBoardAfterVictory);
document.addEventListener("game:time-up", returnToLeaderBoardAfterDefeat);


async function returnToLeaderBoardAfterVictory(event) {
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

    setupLeaderboard();
}

async function returnToLeaderBoardAfterDefeat() {
    alert(`
        Times up!\n
        Unfortunately you have reached the countdown limit... 😿\n
        Try again!
    `
    );
    setupLeaderboard();
}

function setupLeaderboard() {
    loadLeaderBoard(startGame);
}
