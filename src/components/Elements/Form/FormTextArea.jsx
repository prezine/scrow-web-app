import React from 'react'

const FormTextArea = ({fieldsetId, display, selectRequired, colSpan, rowSpan, handleChange, inputValue,  handleBlur, fieldError, textAreaLabel, textAreaName, textAreaCols, resize, textAreaRows, textAreaPlaceholder, textAreaId, ...rest}) => {
  return (
    <fieldset id={fieldsetId} className={`gap-2.5 flex flex-col ${colSpan ? colSpan : 'col-span-1'}`}>
        <label htmlFor={textAreaId || 'message'} className='text-xs font-spaceGroteskMedium text-brandGray14x'>{textAreaLabel || "What's your message"}</label>
        <textarea name={textAreaName || 'message'} required={selectRequired || true} value={inputValue} {...rest} onChange={handleChange} onBlur={handleBlur} id={textAreaId || 'message'} cols={textAreaCols || "30"} rows={textAreaRows || "6"} placeholder={textAreaPlaceholder || `Enter your message here...`} className={`px-4 py-2.5 text-sm font-spaceGroteskRegular text-black placeholder:text-brandGray32x rounded-five border-2 ${fieldError ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2 ${resize ? '' : 'resize-none'} w-full`}></textarea>
    </fieldset>
  )
}

export default FormTextArea