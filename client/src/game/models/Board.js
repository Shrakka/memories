export class Board {
    constructor({ nbOfCards }) {
        this.cardIndexes = generateRandomCardIndexes(nbOfCards);
        this.lastSelectedCardPosition = null;
        this.alreadyMatchedIndexes = [];
    };

    getCardIndexes() {
        return this.cardIndexes;
    }

    getLastSelectedCardPosition() {
        return this.lastSelectedCardPosition;
    }

    isCardAlreadyVisible(cardPosition) {
        return cardPosition === this.lastSelectedCardPosition;
    }

    isCardMatchingLastPick(cardPosition) {
        return this.cardIndexes[cardPosition] === this.cardIndexes[this.lastSelectedCardPosition];
    }

    isFirstPick() {
        return this.lastSelectedCardPosition === null;
    }

    isWinningPosition() {
        return this.alreadyMatchedIndexes.length === (this.cardIndexes.length / 2);
    }

    resetLastPick() {
        this.lastSelectedCardPosition = null;
    }

    selectCard(cardPosition) {
        this.lastSelectedCardPosition = cardPosition;
    }

    validatePair(cardPosition) {
        const cardIndex = this.cardIndexes[cardPosition];
        this.alreadyMatchedIndexes.push(cardIndex);
    }
}

function generateRandomCardIndexes(nbOfCards) {
    // We better use 'lodash' for this utility, but it's not that long to build, and interesting!
    // Example for nbOfCards = 4
    // Returns [4, 1, 4, 2, 3, 3, 1, 2];
    const maxIndexValue = Math.floor(nbOfCards / 2);
    const arrayOfIndexes = [...Array(maxIndexValue).keys()];
    const indexes = [...arrayOfIndexes, ...arrayOfIndexes];
    return shuffle(indexes);

    function shuffle(array) {
        // Algo taken from https://stackoverflow.com/a/6274381/6844880
        for (let index = array.length - 1; index > 0; index--) {
            const newIndex = Math.floor(Math.random() * (index + 1));
            [array[index], array[newIndex]] = [array[newIndex], array[index]];
        }
        return array;
    }
}
