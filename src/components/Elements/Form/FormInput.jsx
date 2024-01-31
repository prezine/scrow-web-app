import React from 'react'

const FormInput = ({fieldsetId, display, colSpan, rowSpan, inputRequired, inputValue, maxLength, fieldError, handleChange, handleBlur, labelColor, labelFont, inputLabel, inputName, inputType, inputPlaceholder, inputId, ...rest}) => {
  return (
    <fieldset id={fieldsetId} className={`gap-2.5 flex flex-col ${colSpan ? colSpan : 'col-span-1'} w-full`}>
        <label htmlFor={inputId || 'fullName'} className={`text-xs ${labelFont ? labelFont : 'font-spaceGroteskMedium'} ${labelColor ? labelColor : 'text-brandGray14x'}`}>{inputLabel || "What's your fullname"}</label>
        <input type={inputType || "text"} {...rest} maxLength={maxLength} value={inputValue} onChange={handleChange} onBlur={handleBlur} required={inputRequired || true} id={inputId || 'fullName'} name={inputName || 'fullName'} placeholder={inputPlaceholder || 'Enter fullname'} className={`px-4 py-2 text-sm rounded-five text-black placeholder:text-brandGray32x font-spaceGroteskRegular w-full border-2 ${fieldError ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2 bg-transparent`} />
    </fieldset>
  )
}

export default FormInput