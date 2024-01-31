import React from 'react'

const FormSelect = ({ fieldsetId, selectLabel, selectId, selectValue, handleBlur, fieldError,  required, selectName, colSpan, handleChange, children, ...rest }) => {
  return (
    <fieldset id={fieldsetId} className={`gap-2.5 flex flex-col ${colSpan ? colSpan : 'col-span-1'}`}>
        <label htmlFor={selectId} className='text-xs font-spaceGroteskMedium text-brandGray14x'>
            {selectLabel || "What's your fullname"}
        </label>
        <select required={required || true} onChange={handleChange} onBlur={handleBlur} name={selectName} {...rest} id={selectId} value={selectValue} className={`px-4 py-2.5 h-11 w-full text-sm font-spaceGroteskRegular ${selectValue ? 'text-black' : 'text-brandGray32x'} rounded-five border-2 ${fieldError ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2 bg-transparent`} >
            {children}
        </select>
    </fieldset>
  )
}

export default FormSelect