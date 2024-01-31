import React from 'react'

const ButtonPrimary = ({id, fontSize, type, handleClick, fontStyle, flexDirection, disabled, disabledBgColor, gap, textColor, text, bgColor, border, paddingY, paddingX, borderRadius, width}) => {
  return (
    <button type={type || 'button'} onClick={handleClick} id={id} disabled={disabled} className={`${flexDirection} flex items-center justify-center ${gap || 'gap-2.5'} h-fit ${paddingY || 'py-2'} ${width ? width : 'w-fit'} ${paddingX || 'px-3.5'} ${border && border} ${borderRadius || 'rounded-five'} ${disabled ? `${disabledBgColor}` : ''} ${textColor || 'text-white'} ${bgColor || 'bg-brandDarkViolet1x'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <span className={`${fontSize || 'md:text-base'} ${fontStyle || 'font-spaceGroteskRegular'}`}>{text || 'New Transaction'}</span>
    </button>
  )
}

export default ButtonPrimary