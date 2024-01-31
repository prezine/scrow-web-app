import React from 'react'

const useIsOver13YearsOld = (dateString) => {
    const today = new Date();
    const dob = new Date(dateString);
    let ageDiff = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        ageDiff--;
    }
    return ageDiff >= 13;
}

export default useIsOver13YearsOld