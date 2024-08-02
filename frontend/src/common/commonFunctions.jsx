// Method to format the date in eg. Jul 01, 2024
export function formatDate(date) {
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
}

// Gives the correct date
export function formatDate2(dateString) {
    const date = new Date(dateString + "T00:00:00");
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
}
// Function to change the first letter to uppercase
export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
