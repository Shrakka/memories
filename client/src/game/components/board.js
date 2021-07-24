import "./board.scss";
import { buildCardHTML } from "./card";

export function buildBoardHTML(cardIndexes) {
    return /* html */ `
        <div class="board">
            ${cardIndexes.map(buildCardHTML).join("")}
        </div>
    `;
}
