import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

const AuthPassword = ({display, colSpan, eyeIcon, rowSpan, handleBlur, labelColor, inputRequired, inputValue, fieldError, labelFont, forgot, labelFontSize, handleChange, inputLabel, inputName, inputType, inputPlaceholder, inputId, paddingY, paddingX, fontSize}) => {
    const [visible, setVisible] = useState(false)

    const handlePasswordVisibility = () => {
        setVisible(!visible)
    }
 
    return (
    <fieldset className={`gap-2.5 flex flex-col ${colSpan ? colSpan : 'col-span-1'}`}>
        <div className='flex flex-col sm:flex-row gap-5 md:gap-10 justify-between'>
            <label htmlFor={inputId || 'password'} className={`${labelFontSize ? labelFontSize : 'text-sm'} ${labelFont ? labelFont : 'font-spaceGroteskMedium'} ${labelColor ? labelColor : 'text-brandGray14x'}`}>{inputLabel || "Password"}</label>
            {forgot && <NavLink to={'/auth/forgot/password'} className={`text-sm sm:text-base text-brandBlue1x font-avenirMedium self-end sm:self-auto`} >Forgot your password?</NavLink>}
        </div>
        <div className={`w-full rounded-five border-2 ${fieldError ? 'border-brandRed1x focus-within:border-brandRed1x' : 'border-brandGray16x focus-within:border-black'} flex flex-row items-center justify-between ${paddingX ? paddingX : 'pr-4 '} focus-within:border-2`}>
            <input type={visible ? 'text' : 'password'} onChange={handleChange} onBlur={handleBlur} value={inputValue} id={inputId || 'password'} name={inputName || 'password'} placeholder={inputPlaceholder || ''} className={`${paddingY ? paddingY : 'py-2.5 '} pl-4 focus:outline-none autofill:bg-transparent ${fontSize || 'text-sm'} w-full bg-transparent`} required={inputRequired || true } />
            {eyeIcon &&  
                <button onClick={handlePasswordVisibility} type="button" className='relative w-fit group'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={`group-hover:stroke-brandBlue1x`} opacity="0.4" d="M12.9833 10C12.9833 11.65 11.6499 12.9833 9.99993 12.9833C8.34993 12.9833 7.0166 11.65 7.0166 10C7.0166 8.35 8.34993 7.01667 9.99993 7.01667C11.6499 7.01667 12.9833 8.35 12.9833 10Z" stroke="#999DA2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path  className={`group-hover:stroke-brandBlue1x`} d="M10.0001 16.8917C12.9418 16.8917 15.6834 15.1583 17.5918 12.1583C18.3418 10.9833 18.3418 9.00833 17.5918 7.83333C15.6834 4.83333 12.9418 3.1 10.0001 3.1C7.05845 3.1 4.31678 4.83333 2.40845 7.83333C1.65845 9.00833 1.65845 10.9833 2.40845 12.1583C4.31678 15.1583 7.05845 16.8917 10.0001 16.8917Z" stroke="#999DA2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className={` ${visible || 'hidden'} group-hover:bg-brandBlue1x absolute top-fiftyPercent left-fiftyPercent -translate-x-fiftyPercent -translate-y-fiftyPercent h-6 w-0.5 rotate-45 bg-brandGray18x`}></div>
                </button>
            }
        </div>
    </fieldset>
  )
}

export default AuthPassword