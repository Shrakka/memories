import "./card.scss";

export function buildCardHTML(cardIndex) {
    return /*html*/ `
        <div class="card">
            <div class="icon icon-${cardIndex}"></div>
        </div>
    `;
}
