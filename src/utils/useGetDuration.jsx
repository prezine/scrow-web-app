import React from 'react'
import moment from 'moment';

const useGetDuration = (start, end) => {
    console.log('end', end);
    console.log('start', start);
    const startDate = moment(start);
    const endDate = moment(end);
    
    const duration = moment.duration(endDate.diff(startDate));
    const years = duration.years();
    const months = duration.months();
    const weeks = duration.weeks();
    const days = duration.days();
    
    let output = '';
    if (years > 0) {
      output += `${years} year${years > 1 ? 's' : ''} `;
    }
    if (months > 0) {
      output += `${months} month${months > 1 ? 's' : ''} `;
    }
    if (weeks > 0) {
      output += `${weeks} week${weeks > 1 ? 's' : ''} `;
    }
    if (days > 0) {
      output += `${days} day${days > 1 ? 's' : ''}`;
    }
    
    console.log('output', output); // Output: 1 week 3 days
    return output
}

export default useGetDuration