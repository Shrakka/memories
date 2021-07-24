export async function fetchOrderedStatistics() {
    const statistics = await fetchStatistics();
    return statistics.sort(sortByMinimumCompletionTime);

    function sortByMinimumCompletionTime(stat1, stat2) { // Could be done in the backend, but comparison functions are interesting too :)
        if (stat1.completionTimeMS > stat2.completionTimeMS) { return 1; }
        if (stat1.completionTimeMS < stat2.completionTimeMS) { return -1; }
        return 0;
    }
}

async function fetchStatistics() {
    const httpResponse = await fetch("/api/statistics");
    return httpResponse.json();
}

export async function saveStatistic({ userName, completionTimeMS }) {
    await fetch("/api/statistics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userName: userName.trim(),
            completionTimeMS
        })
    });
}
