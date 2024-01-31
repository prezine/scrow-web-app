
const formatDate = (date) => {
    // 1. Create a new Date object from the timestamp string
    const timestamp = new Date(date);

    // 2. Extract the day, month, and year from the Date object
    const day = timestamp.getUTCDate();
    const month = timestamp.getUTCMonth() + 1; // Months are zero-indexed, so add 1 to get the actual month number
    const year = timestamp.getUTCFullYear();

    // 3. Format the date string in the desired format
    const dateStr = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    return dateStr

    // returns 08-12-2022 format
  }

export default formatDate