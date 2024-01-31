import React from 'react'

const useFormatPhoneTest = (phoneNumber) => {
    let formattedPhoneNumber = phoneNumber.trim().replace(/\s+/g, '');
    if (formattedPhoneNumber.startsWith('0')) {
      formattedPhoneNumber = '+234' + formattedPhoneNumber.substr(1);
    } else if (formattedPhoneNumber.startsWith('234') && formattedPhoneNumber.length < 14) {
      formattedPhoneNumber = '+' + formattedPhoneNumber;
    } else if (!/^(0|234|\+)\d{10,13}$/.test(formattedPhoneNumber)) {
      return ''; // Return empty string if phone number is invalid
    }
    if (formattedPhoneNumber.length < 14) {
      return ''; // Return empty string if phone number is invalid
    }
    return formattedPhoneNumber;
}

export default useFormatPhoneTest