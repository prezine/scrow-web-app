import React from 'react'
import { NavLink } from 'react-router-dom'

const LinkPrimaryIcon = ({id, fontSize, link, icon, svgStrokeColor, fontStyle, flexDirection, disabled, disabledBgColor, gap, border, textColor, text, bgColor, paddingY, paddingX, borderRadius, width, textNoWrap}) => {
  return (
    <NavLink to={link || ''} id={id} disabled={disabled} className={`${flexDirection} flex items-center ${gap || 'gap-2.5'} ${border && border} h-fit ${width ? width : 'w-fit'} ${paddingY || 'py-1.5'} ${paddingX || 'px-3.5'} ${borderRadius || 'rounded-five'} ${disabled ? `${disabledBgColor}` : ''} ${textColor || 'text-white'} ${bgColor || 'bg-brandDarkViolet1x'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        {
          icon
          ?
          icon
          :
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={`${svgStrokeColor}`} d="M17 11H13V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11Z" fill="white"/>
          </svg>
        }
        <span className={`${fontSize || 'md:text-lg '} ${fontStyle || 'font-spaceGroteskRegular'} ${textNoWrap ? 'whitespace-nowrap' : 'whitespace-normal'}`}>{text || 'New Transaction'}</span>
    </NavLink>
  )
}

export default LinkPrimaryIcon