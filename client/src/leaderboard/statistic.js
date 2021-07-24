import "./statistic.scss";

export function buildStatisticHTML({ userName, completionTimeMS }) {
    return /* html */`
        <li class="statistic">
            <div class="value">
                <div>${userName}</div>
                <div>${Math.round(completionTimeMS / 1000)} seconds</div>
            </div>
        </li>
    `;
}
