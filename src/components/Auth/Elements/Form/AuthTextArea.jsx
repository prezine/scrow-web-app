import React from 'react'

const AuthTextArea = ({display, colSpan, textAreaCols, textAreaRows, textAreaWidth, textAreaValue, labelColor, bgColor, labelFont, labelFontSize, handleChange, handleBlur, fieldError, textAreaLabel, textAreaName, textAreaRequired, textAreaPlaceholder, textAreaId, paddingY, paddingX, resize, fontSize}) => {
  return (
    <fieldset className={`gap-2.5 ${display ? display : 'flex flex-col'} ${colSpan ? colSpan : 'col-span-1'} `}>
        <label htmlFor={textAreaId || 'description'} className={`${labelFontSize ? labelFontSize : 'text-sm'} ${labelFont ? labelFont : 'font-spaceGroteskMedium'} ${labelColor ? labelColor : 'text-brandGray14x'}`}>{textAreaLabel || "Product Description"}</label>
        <textarea onChange={handleChange} cols={`${textAreaCols || 30}`} rows={`${textAreaRows || 5}`} value={textAreaValue} onBlur={handleBlur} id={textAreaId || 'description'} name={textAreaName || 'description'} placeholder={textAreaPlaceholder || ''} className={`${paddingX ? paddingX : 'px-4 '} ${resize ? resize : 'resize-none'} ${paddingY ? paddingY : 'py-2.5 '} ${fontSize || 'text-sm'} ${bgColor ? bgColor : 'bg-transparent'} autofill:bg-transparent rounded-five border-2 ${fieldError ? 'border-brandRed1x' : 'border-brandGray16x'} ${textAreaWidth ? textAreaWidth : 'w-full'}`} required={textAreaRequired || true } ></textarea>
    </fieldset>
  )
}

export default AuthTextArea