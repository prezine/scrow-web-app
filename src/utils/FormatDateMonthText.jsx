import React from 'react'

const formatDateMonthText = (timestamp) => {
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
      const formattedDate = `${month} ${day}${suffix}, ${year}`;
      return formattedDate;

      // returns August 24th, 2022. format
}

export default formatDateMonthText