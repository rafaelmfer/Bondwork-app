// Method to format the date in eg. Jul 01, 2024
export function formatDate(date) {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
}
