import React from 'react'

const AuthInput = ({display, colSpan, rowSpan, inputWidth, inputValue, labelColor, bgColor, labelFont, labelFontSize, handleChange, handleBlur, fieldError, inputLabel, inputName, inputRequired, inputType, inputPlaceholder, inputId, paddingY, paddingX, fontSize}) => {
  return (
    <fieldset className={`gap-2.5 ${display ? display : 'flex flex-col'} ${colSpan ? colSpan : 'col-span-1'} `}>
        <label htmlFor={inputId || 'fullName'} className={`${labelFontSize ? labelFontSize : 'text-sm'} ${labelFont ? labelFont : 'font-spaceGroteskMedium'} ${labelColor ? labelColor : 'text-brandGray14x'}`}>{inputLabel || "What's your fullname"}</label>
        <input type={inputType || "text"} onChange={handleChange} value={inputValue} onBlur={handleBlur} id={inputId || 'fullName'} name={inputName || 'fullName'} placeholder={inputPlaceholder || ''} className={`${paddingX ? paddingX : 'px-4 '} ${paddingY ? paddingY : 'py-2.5 '} ${fontSize || 'text-sm'} ${bgColor ? bgColor : 'bg-transparent'} autofill:bg-transparent rounded-five border-2 ${fieldError ? 'border-brandRed1x' : 'border-brandGray16x'} ${inputWidth ? inputWidth : 'w-full'}`} required={inputRequired || true } />
    </fieldset>
  )
}

export default AuthInput