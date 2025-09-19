class TimeUtil {
    constructor() {
    }
 convertTo12HourFormat(time24) {
    // Split the input time into hours and minutes
    const [hours, minutes] = time24.split(':').map(Number);

    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const hours12 = hours % 12 || 12; // Converts "0" or "12" to "12", "13" to "1", etc.

    // Format the minutes with leading zero if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Return the formatted 12-hour time string
    return `${hours12}:${formattedMinutes} ${period}`;
}
}
module.exports = TimeUtil;