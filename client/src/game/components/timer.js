import "./timer.scss";

export function buildTimerHTML() {
    // Could easily use <progress> tag, but this solution is one way to study CSS `position: absolute/relative`

    return /* html */ `
        <div id="timer">
            <div class="progress-bar-container"></div>
            <div class="progress-bar"></div>
        </div>
    `;
}
