import "./assets/_globals.scss"
import { startGame } from "./game";
import { loadLeaderBoard } from "./leaderboard"
import { saveStatistic } from "./leaderboard/service";

document.body.innerHTML = /* html */`
    <div id="leaderboard"></div>
    <div id="game"></div>
`;

document.addEventListener("DOMContentLoaded", setupLeaderboard);
document.addEventListener("game:victory", returnToLeaderBoardAfterVictory);
document.addEventListener("game:time-up", returnToLeaderBoardAfterDefeat);


async function returnToLeaderBoardAfterVictory(event) {
    const completionTimeMS = event.detail;
    const userName = prompt(`
        You won! Congratulations!\n
        Enter your name to get a chance to appear in the leaderboard!\n
        And win a chance to get a free JavaScript lessons at Ecole O'clock!\n
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
