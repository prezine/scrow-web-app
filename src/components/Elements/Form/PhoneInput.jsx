import React, { useEffect, useState } from 'react';
import intlTelInput from 'intl-tel-input';
import clsx from 'clsx';
import 'intl-tel-input/build/css/intlTelInput.css';


const PhoneInput=({disabled, id, ...rest})=>{
//rest may include-name, onChange, etc
    const [options,toggleOptions]=useState({
        allowDropdown:true,
        autoHideDialCode:false,
        initialCountry: "ng",
        separateDialCode:false,
        nationalMode:false,
        hadInitialPlaceholder:true,
        preferredCountries: ['ng', 'gh', 'ke', 'za'],
        // utilsScript: process.env.REACT_APP_PHONE_UTIL_SCRIPT,
        geoIpLookup: async function(callback) {
           await fetch(process.env.REACT_APP_GEOIP_SERVICE)
           .then(res=>res.json())
           .then(({country})=>{
               callback(country)
           })},
        customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
            return "e.g. " + selectedCountryPlaceholder;
        },
    })
    useEffect(()=>{
        const input = document.querySelector(id ? `#${id}` : '#phone');
        if(!input) return;
        const iti=intlTelInput(input, {
            ...options
        });
        return()=>{
            iti.destroy();
        }
    },[])
    useEffect(()=>{
          toggleOptions(o=>({
              ...o,
              allowDropdown:!disabled
              //disable dropdown when disable flag is set
          }));
    },[disabled])
    return(
         <input
            disabled={disabled}
            type="tel"
            id={id || `phone`}
            {...rest}
        />
    )
}

export default PhoneInput