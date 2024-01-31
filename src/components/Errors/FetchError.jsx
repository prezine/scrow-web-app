import React from 'react'
import { NavLink } from 'react-router-dom'
import TemplatePage from '../Elements/Wraps/TemplatePage'

const FetchError = ({message, goHome}) => {

    const handleReload = () => {
        window.location.reload();
    }

  return (
    <TemplatePage isLoaderOrError headerDescription={' '} headerTitle={' '} bgColor={'bg-white'}>
        <div className='px-8 md:px-10 py-40 min-h-screen max-w-650 mx-auto'>
            <div className='flex flex-col text-center'>
                <div>
                    <h1 className='font-avenirHeavy text-10xl'>404</h1>
                    <p className='text-lg'>{message || `We couldn't get the data you're looking for.`}</p>
                    <div className='flex gap-4 w-full justify-center items-center pt-10'>
                        <NavLink to={`/`} className={'px-6 flex flex-row items-center w-fit gap-3 rounded-ten bg-transparent py-3 text-brandDarkViolet1x font-avenirMedium'}>
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className='stroke-brandDarkViolet1x' d="M7.1775 4.94751L2.625 9.50001L7.1775 14.0525" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path className='stroke-brandDarkViolet1x' opacity="0.7" d="M15.3754 9.5H2.75293" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Home
                            {/* <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.7" d="M8.68572 3.46336C8.17822 3.31169 7.61822 3.21252 6.99988 3.21252C4.20572 3.21252 1.94238 5.47586 1.94238 8.27002C1.94238 11.07 4.20572 13.3334 6.99988 13.3334C9.79405 13.3334 12.0574 11.07 12.0574 8.27586C12.0574 7.23752 11.7424 6.26919 11.2057 5.46419" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.40922 3.60329L7.72339 1.66663" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.40919 3.60339L7.44336 5.03839" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> */}
                        </NavLink>
                        <button onClick={handleReload} className={'px-6 flex flex-row items-center w-fit gap-3 rounded-ten bg-brandDarkViolet1x py-3 text-white font-avenirMedium'}>
                            Refresh
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.7" d="M8.68572 3.46336C8.17822 3.31169 7.61822 3.21252 6.99988 3.21252C4.20572 3.21252 1.94238 5.47586 1.94238 8.27002C1.94238 11.07 4.20572 13.3334 6.99988 13.3334C9.79405 13.3334 12.0574 11.07 12.0574 8.27586C12.0574 7.23752 11.7424 6.26919 11.2057 5.46419" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.40922 3.60329L7.72339 1.66663" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9.40919 3.60339L7.44336 5.03839" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </TemplatePage>
  )
}

export default FetchError