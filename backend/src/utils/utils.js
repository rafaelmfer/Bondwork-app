function calculateDayOfWeekDifference(today) {
    return today === 0 ? -6 : 1 - today;
    // Example: Returns 0 if today is Monday
    // Example: Returns -1 if today is Tuesday
    // Example: Returns -6 if today is Sunday
}

// Calculating in GMT-0
const getPeriodDates = (unit, date) => {
    let startCurrent, endCurrent, startPrevious, endPrevious;

    switch (unit) {
        case "week":
            // Get the current date and adjust it to the start of the week (Monday)
            startCurrent = new Date(date);
            startCurrent.setHours(0, 0, 0, 0);
            // Monday of the current week
            startCurrent.setDate(
                startCurrent.getDate() +
                    calculateDayOfWeekDifference(startCurrent.getDay())
            );
            // GMT-7 so we need to offset the start of the day in the GMT-0 time zone
            startCurrent.setHours(-7);

            // Set to end of the day
            endCurrent = new Date(startCurrent);
            endCurrent.setDate(startCurrent.getDate() + 7);
            endCurrent.setHours(16, 59, 59, 999);

            // Calculate the start and end of the previous week
            startPrevious = new Date(startCurrent);
            // Monday of the previous week
            startPrevious.setDate(startPrevious.getDate() - 7);
            endPrevious = new Date(startCurrent);
            // End of the previous week (Sunday)
            endPrevious.setDate(endPrevious.getDate());
            // Set to end of the day
            endPrevious.setHours(16, 59, 59, 999);
            break;

        case "month":
            startCurrent = new Date(
                new Date(date).getFullYear(),
                new Date(date).getMonth(),
                1
            );
            startCurrent.setHours(-7);
            endCurrent = new Date(
                new Date(date).getFullYear(),
                new Date(date).getMonth() + 1,
                0
            );
            endCurrent.setHours(16, 59, 59, 999);

            startPrevious = new Date(
                new Date(date).getFullYear(),
                new Date(date).getMonth() - 1,
                1
            );
            startPrevious.setHours(-7);
            endPrevious = new Date(startCurrent);
            endPrevious.setDate(startCurrent.getDate());
            endPrevious.setHours(16, 59, 59, 999);
            break;

        case "quarter":
            const currentQuarter = Math.floor(
                (new Date(date).getMonth() + 3) / 3
            );
            startCurrent = new Date(
                new Date(date).getFullYear(),
                (currentQuarter - 1) * 3,
                1
            );
            startCurrent.setHours(-7);
            endCurrent = new Date(
                new Date(date).getFullYear(),
                currentQuarter * 3,
                0
            );
            endCurrent.setHours(16, 59, 59, 999);

            startPrevious = new Date(
                new Date(date).getFullYear(),
                (currentQuarter - 2) * 3,
                1
            );
            startPrevious.setHours(-7);
            endPrevious = new Date(startCurrent);
            endPrevious.setDate(startCurrent.getDate());
            endPrevious.setHours(16, 59, 59, 999);
            break;

        case "annual":
            startCurrent = new Date(new Date(date).getFullYear(), 0, 1);
            startCurrent.setHours(-8);
            endCurrent = new Date(new Date(date).getFullYear(), 11, 31);
            endCurrent.setHours(15, 59, 59, 999);

            startPrevious = new Date(new Date(date).getFullYear() - 1, 0, 1);
            startPrevious.setHours(-8);
            endPrevious = new Date(startCurrent);
            endPrevious.setDate(startCurrent.getDate());
            endPrevious.setHours(15, 59, 59, 999);
            break;

        default:
            throw new Error("Invalid unit");
    }

    return { startCurrent, endCurrent, startPrevious, endPrevious };
};

module.exports = { getPeriodDates };
