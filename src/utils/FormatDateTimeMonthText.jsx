import React from 'react'

const formatDateTimeMonthText = (timestamp) => {
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    const dateObj = new Date(timestamp);
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const suffixes = ["th", "st", "nd", "rd"];
    let suffix;
    if (day % 10 === 1 && day !== 11) {
    suffix = suffixes[1];
    } else if (day % 10 === 2 && day !== 12) {
    suffix = suffixes[2];
    } else if (day % 10 === 3 && day !== 13) {
    suffix = suffixes[3];
    } else {
    suffix = suffixes[0];
    }
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedDate = `${month} ${day}${suffix}, ${year}. ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    return formattedDate;  
    
    // returns August 24th, 2022. 12:00 PM format
}

export default formatDateTimeMonthText