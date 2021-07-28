import "./leaderboard.scss";
import { buildStatisticHTML } from "./statistic";
import { fetchOrderedStatistics } from "./service";

let leaderboardElement;

export async function loadLeaderBoard(buttonCallback) {
    bindButtonActions();
    fetchAndDisplayStatistics();

    async function fetchAndDisplayStatistics() {
        const statisticsElement = document.getElementById("statistics");
        statisticsElement.innerHTML = "";

        const statistics = await fetchOrderedStatistics();
        statistics.forEach(statistic => {
            statisticsElement.insertAdjacentHTML("beforeend", buildStatisticHTML(statistic));
        });
    }

    function bindButtonActions() {
        const buttonElement = document.getElementById("button");
        buttonElement.addEventListener("click", () => {
            leaderboardElement = document.getElementById("leaderboard");
            leaderboardElement.style.display = "none";
            buttonCallback();
        });
    }
}
