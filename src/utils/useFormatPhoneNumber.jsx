import React from 'react'

const useFormatPhoneNumber = (phoneNumber, e) => {
    const keyCode = e ? e.keyCode || e.which : null;
    let formattedPhoneNumber = phoneNumber.trim();

    
    if(e && (keyCode !== 46 && keyCode !== 8)){

      if (formattedPhoneNumber.startsWith('+234')) {
        return formattedPhoneNumber; // Return phone number as is
      }
    
        if (formattedPhoneNumber.length === 0) {
          return formattedPhoneNumber; // Return empty string if input is empty
        }
    
        if (formattedPhoneNumber.length < 10) {
          return formattedPhoneNumber; // Return empty string if input is empty
        }
        
        if (formattedPhoneNumber.startsWith('0')) {
          formattedPhoneNumber = '+234' + formattedPhoneNumber.slice(1);
        } else if (formattedPhoneNumber.startsWith('234') && !formattedPhoneNumber.startsWith('+234')) {
          if ((formattedPhoneNumber.length > 11) || formattedPhoneNumber.length < 14) {
            formattedPhoneNumber = '+' + formattedPhoneNumber
          }
        }else if (!(formattedPhoneNumber.startsWith('234')) && !(formattedPhoneNumber.startsWith('+234')) && !(formattedPhoneNumber.startsWith('0')) && formattedPhoneNumber.length == 10 ){
          formattedPhoneNumber = '+234' + formattedPhoneNumber
        }
        
        // formattedPhoneNumber = formattedPhoneNumber.replace(/\D/g, ''); // Remove all non-numeric characters
        
        else if (formattedPhoneNumber.startsWith('+') && (formattedPhoneNumber.length < 11 || formattedPhoneNumber.length > 14)) {
            return formattedPhoneNumber
        }
    }else {
        return formattedPhoneNumber
    }
    
    return formattedPhoneNumber;
}

export default useFormatPhoneNumber