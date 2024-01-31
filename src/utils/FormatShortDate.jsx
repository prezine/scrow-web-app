import React from 'react'

const formatShortDate = (date) => {
    const dateString = date;
    const [day, month, year] = dateString.split("-");
    const dateObject = new Date(year, month - 1, day);
    console.log('dateObject', dateObject); // Output: Sun May 06 2023 00:00:00 GMT-0400 (Eastern Daylight Time)
    return dateObject
}

export default formatShortDate