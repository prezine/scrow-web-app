import React from 'react'


const AuthSelect = ({display, colSpan, rowSpan, labelColor, handleBlur, fieldError, selectValue, labelFont, labelFontSize, handleChange, selectLabel, selectName, selectRequired, selectPlaceholder, selectId, paddingY, paddingX, children, fontSize}) => {
  return (
    <fieldset className={`gap-2.5 flex flex-col ${colSpan ? colSpan : 'col-span-1'}`}>
        <label htmlFor={selectId || 'country'} className={`${labelFontSize ? labelFontSize : 'text-sm'} ${labelFont ? labelFont : 'font-spaceGroteskMedium'} ${labelColor ? labelColor : 'text-brandGray14x'}`}>{selectLabel || "What's your fullname"}</label>
        <select onChange={handleChange} onBlur={handleBlur} id={selectId || 'country'} value={selectValue} name={selectName || 'country'} placeholder={selectPlaceholder || ''} className={`${paddingX ? paddingX : 'px-4 '} ${paddingY ? paddingY : 'py-2.5 '} ${fontSize || 'text-sm'} ${selectValue ? 'text-black' : 'text-brandGray21x'} bg-transparent rounded-five border-2 ${fieldError ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} required={selectRequired || true } >
            {selectPlaceholder && <option value={''} selected disabled>{selectPlaceholder || 'select'}</option>}
            {children}
        </select>
    </fieldset>
  )
}


export default AuthSelect