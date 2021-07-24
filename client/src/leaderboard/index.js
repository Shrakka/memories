import "./leaderboard.scss";
import { buildStatisticHTML } from "./statistic";
import { fetchOrderedStatistics } from "./service";

let leaderboardElement;

export async function loadLeaderBoard(buttonCallback) {
    leaderboardElement = document.getElementById("leaderboard");

    loadTitle();
    loadButton();
    loadStatistics();

    function loadTitle() {
        const titleElement = document.createElement("h1");
        titleElement.innerText = "Memories";
        leaderboardElement.appendChild(titleElement);
    }

    async function loadStatistics() {
        const statisticsElement = document.createElement("ol");
        leaderboardElement.appendChild(statisticsElement);

        const statistics = await fetchOrderedStatistics();
        statistics.forEach(statistic => {
            statisticsElement.insertAdjacentHTML("beforeend", buildStatisticHTML(statistic));
        });
    }

    function loadButton() {
        const button = document.createElement("button");
        button.innerHTML = "Start Game!";
        leaderboardElement.appendChild(button);

        button.addEventListener("click", () => {
            leaderboardElement.innerHTML = "";
            buttonCallback();
        });
    }
}
