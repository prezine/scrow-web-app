import React from 'react'

const FormatUTC = (timestamp) => {
    const givenTimestamp = timestamp;
    const date = new Date(givenTimestamp);

    const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Africa/Lagos",
    timeZoneName: "short"
    };

    const formattedTimestamp = date.toLocaleString("en-US", options);

    console.log('formattedTimestamp', new Date().toUTCString());

    return formattedTimestamp


}

export default FormatUTC
// import React from 'react'

// const FormatUTC = (timestamp) => {
//     const date = new Date(timestamp);
    
//     // Convert to UTC
//     const utcTimestamp = date.toISOString();
    
//     // Convert to the desired format
//     const options = {
//       weekday: "short",
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       timeZone: "Africa/Lagos", // West Africa Standard Time
//       timeZoneName: "short"
//     };
    
//     const formattedTimestamp = new Intl.DateTimeFormat("en-US", options).format(date);
    
//     console.log('formattedTimestamp', formattedTimestamp);
//     return formattedTimestamp
// }

// export default FormatUTC