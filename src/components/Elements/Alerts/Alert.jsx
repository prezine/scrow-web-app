import React, { useEffect, useRef, useState } from 'react'

const Alert = ({type, message, duration, open}) => {

    const [timer, setTimer] = useState(duration || 2000)
    const [alertOpen, setAlertOpen] = useState(open)
    const timerRef = useRef(null)

    const alertType = {
        "success":{
            "title":"I'm a Success Alert",
            "message":"Explaining the alert and what to do about it",
            "icon":<svg className="w-7 h-7 md:w-9 md:h-9" width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41 21C41 9.9543 32.0457 1 21 1C9.9543 1 1 9.9543 1 21C1 32.0457 9.9543 41 21 41C32.0457 41 41 32.0457 41 21Z" fill="#3BB75E"/>
            <path d="M10.1851 21.113L17.1436 27.8174L31.0604 14.4087" fill="#3BB75E"/>
            <path d="M10.7055 20.5729C10.4072 20.2855 9.93243 20.2944 9.64503 20.5927C9.35763 20.891 9.36646 21.3657 9.66475 21.6531L10.7055 20.5729ZM17.1436 27.8174L16.6232 28.3575C16.9137 28.6374 17.3735 28.6374 17.6639 28.3575L17.1436 27.8174ZM31.5808 14.9488C31.8791 14.6614 31.8879 14.1866 31.6005 13.8883C31.3131 13.59 30.8383 13.5812 30.54 13.8686L31.5808 14.9488ZM21 1.75C31.6315 1.75 40.25 10.3685 40.25 21H41.75C41.75 9.54009 32.4599 0.25 21 0.25V1.75ZM40.25 21C40.25 31.6315 31.6315 40.25 21 40.25V41.75C32.4599 41.75 41.75 32.4599 41.75 21H40.25ZM21 40.25C10.3685 40.25 1.75 31.6315 1.75 21H0.25C0.25 32.4599 9.54009 41.75 21 41.75V40.25ZM1.75 21C1.75 10.3685 10.3685 1.75 21 1.75V0.25C9.54009 0.25 0.25 9.54009 0.25 21H1.75ZM9.66475 21.6531L16.6232 28.3575L17.6639 27.2773L10.7055 20.5729L9.66475 21.6531ZM17.6639 28.3575L31.5808 14.9488L30.54 13.8686L16.6232 27.2773L17.6639 28.3575Z" fill="white"/>
            </svg>,
            "bgColor":"bg-brandGreen4x",
            "titleColor":"text-brandDarkGreen1x",
            "messageColor":"text-brandDarkGreen2x",
            "linkTextColor":"text-brandDarkGreen3x"        
        },
        "warning":{
            "title":"I'm a Warning Alert",
            "message":"Explaining the alert and what to do about it",
            "icon":<svg className="w-7 h-7 md:w-9 md:h-9" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M36.2667 26.5333L25.6 7.33325C24.1667 4.74992 22.1834 3.33325 20 3.33325C17.8167 3.33325 15.8334 4.74992 14.4 7.33325L3.73336 26.5333C2.38336 28.9833 2.23336 31.3333 3.31669 33.1833C4.40002 35.0333 6.53336 36.0499 9.33336 36.0499H30.6667C33.4667 36.0499 35.6 35.0333 36.6834 33.1833C37.7667 31.3333 37.6167 28.9666 36.2667 26.5333Z" fill="#D2830D"/>
            <path d="M20 24.5833C19.3167 24.5833 18.75 24.0167 18.75 23.3333V15C18.75 14.3167 19.3167 13.75 20 13.75C20.6833 13.75 21.25 14.3167 21.25 15V23.3333C21.25 24.0167 20.6833 24.5833 20 24.5833Z" fill="#D2830D"/>
            <path d="M20 30.0001C19.9 30.0001 19.7833 29.9834 19.6666 29.9668C19.5666 29.9501 19.4666 29.9168 19.3666 29.8668C19.2666 29.8334 19.1666 29.7834 19.0666 29.7168C18.9833 29.6501 18.9 29.5834 18.8166 29.5168C18.5166 29.2001 18.3333 28.7668 18.3333 28.3334C18.3333 27.9001 18.5166 27.4668 18.8166 27.1501C18.9 27.0834 18.9833 27.0168 19.0666 26.9501C19.1666 26.8834 19.2666 26.8334 19.3666 26.8001C19.4666 26.7501 19.5666 26.7168 19.6666 26.7001C19.8833 26.6501 20.1166 26.6501 20.3166 26.7001C20.4333 26.7168 20.5333 26.7501 20.6333 26.8001C20.7333 26.8334 20.8333 26.8834 20.9333 26.9501C21.0166 27.0168 21.1 27.0834 21.1833 27.1501C21.4833 27.4668 21.6666 27.9001 21.6666 28.3334C21.6666 28.7668 21.4833 29.2001 21.1833 29.5168C21.1 29.5834 21.0166 29.6501 20.9333 29.7168C20.8333 29.7834 20.7333 29.8334 20.6333 29.8668C20.5333 29.9168 20.4333 29.9501 20.3166 29.9668C20.2166 29.9834 20.1 30.0001 20 30.0001Z" fill="#D2830D"/>
            </svg>,
            "bgColor":"bg-brandYellow3x",
            "titleColor":"text-brandDarkOrange1x",
            "messageColor":"text-brandDarkOrange2x",
            "linkTextColor":"text-brandDarkOrange3x"                               
        },
        "danger":{
            "title":"I'm a Danger Alert",
            "message":"Explaining the alert and what to do about it",
            "icon":<svg className="w-7 h-7 md:w-9 md:h-9" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M20 36.6666C29.2047 36.6666 36.6666 29.2047 36.6666 19.9999C36.6666 10.7952 29.2047 3.33325 20 3.33325C10.7952 3.33325 3.33331 10.7952 3.33331 19.9999C3.33331 29.2047 10.7952 36.6666 20 36.6666Z" fill="#D95126"/>
            <path d="M20 22.9166C20.6833 22.9166 21.25 22.3499 21.25 21.6666V13.3333C21.25 12.6499 20.6833 12.0833 20 12.0833C19.3167 12.0833 18.75 12.6499 18.75 13.3333V21.6666C18.75 22.3499 19.3167 22.9166 20 22.9166Z" fill="#D95126"/>
            <path d="M21.5333 26.0333C21.45 25.8333 21.3333 25.65 21.1833 25.4833C21.0166 25.3333 20.8333 25.2166 20.6333 25.1333C20.2333 24.9666 19.7666 24.9666 19.3666 25.1333C19.1666 25.2166 18.9833 25.3333 18.8166 25.4833C18.6666 25.65 18.55 25.8333 18.4666 26.0333C18.3833 26.2333 18.3333 26.45 18.3333 26.6666C18.3333 26.8833 18.3833 27.1 18.4666 27.3C18.55 27.5166 18.6666 27.6833 18.8166 27.85C18.9833 28 19.1666 28.1166 19.3666 28.2C19.5666 28.2833 19.7833 28.3333 20 28.3333C20.2166 28.3333 20.4333 28.2833 20.6333 28.2C20.8333 28.1166 21.0166 28 21.1833 27.85C21.3333 27.6833 21.45 27.5166 21.5333 27.3C21.6166 27.1 21.6666 26.8833 21.6666 26.6666C21.6666 26.45 21.6166 26.2333 21.5333 26.0333Z" fill="#D95126"/>
            </svg> ,
            "bgColor":"bg-brandRed6x",
            "titleColor":"text-brandDarkRed1x",
            "messageColor":"text-brandDarkOrange2x",
            "linkTextColor":"text-brandDarkOrange3x"         
                       
        }
    }
    

    useEffect(() => {
      setAlertOpen(open)
      timerRef.current = setTimeout(() => {
        setAlertOpen(false)
      }, timer);
    
      return () => {
        setAlertOpen(false)
        clearTimeout(timerRef.current)
      }
    }, [open])

    const closeAlert = () => {
      setAlertOpen(false)
      clearTimeout(timerRef.current)
    }
    
    

  return (
    <div className={`fixed left-0 ${alertOpen ? 'top-0' : '-top-hundredPercent'} z-70 transition-all duration-500 ease-in-out px-4 sm:px-6 py-2 w-full justify-between shadow-md ${alertType[type] ? alertType[`${type ? type : 'success'}`]["bgColor"] : 'bg-brandYellow3x'} flex flex-row sm:items-center`}>
        <div className='flex items-center gap-3 w-full'>
            {/* {alertType[type] ? alertType[`${type ? type : 'success'}`]["icon"] : alertType['warning']["icon"]} */}
            <div className='w-full'>
                {/* <h3 className={`${alertType[type] ? alertType[`${type ? type : 'success'}`]["titleColor"] : alertType['warning']["titleColor"]}} sm:text-lg font-avenirHeavy`}>{title ? title : alertType[type] ? alertType[`${type ? type : 'success'}`]["title"] : 'Invalid Alert Type!'}</h3> */}
                <p className='text-sm text-white text-center'>{alertType[type] ? message ? message : alertType[`${type ? type : 'success'}`]["message"] : 'Invalid Alert Type! Types are: success, warning and danger'}</p>
            </div>
            <div>
              <button onClick={closeAlert} aria-label='Close Alert' title='Close' className={`hover:bg-white/30 transition-all duration-500 ease-in-out rounded-five p-2`}>
                <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11.5L11 1.5M11 11.5L1 1.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
        </div>
    </div>
  )
}

export default Alert