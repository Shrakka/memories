export class Timer {
    constructor({ maxTimeMS }) {
        this.maxTimeMS = maxTimeMS;
        this.timeSpentMS = 0;
    }

    getCompletionInPercent() {
        return 100 * this.timeSpentMS / this.maxTimeMS;
    }

    getTimeSpentMS() {
        return this.timeSpentMS;
    }

    increment(timeMS) {
        this.timeSpentMS += timeMS;
    }

    isFinished() {
        return this.timeSpentMS > this.maxTimeMS;
    }
}
