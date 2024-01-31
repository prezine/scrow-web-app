import React, {useState, useEffect} from 'react'
import useMobileNav from '../../../hooks/stores/useMobileNav'
import Header from '../Sections/Header'
import Logo from '../../../assets/media/logos/logo-blue-text.png'
import { NavLink } from 'react-router-dom'
import AltHeader from '../Sections/AltHeader'
import Nav from '../../Navigation/Nav'

const SettingsTemplatePage = ({id, children, headerTitle, altContent, isInnerPage, setIsInnerPage, headerDescription, hasButton, centerHeader, levelTwoRef, paddingBottom, btnText, handleClick }) => {
  
  const navState = useMobileNav(state=>state.showMobileNav)
  const toggleMobileNav = useMobileNav(state=>state.toggleMobileNav)
  const [isSettings, setIsSettings] = useState(false);

    
  useEffect(() => {
    if (location.pathname === '/settings') {
      setIsSettings(true);
    } else {
      setIsSettings(false);
    }
  }, [location]);


  return (
    <div className='flex'>
      <div className=''>
        <Nav />
      </div>
      <div id={id} className={`bg-brandGray3x h-screen overflow-hidden w-full ${paddingBottom ? 'pb-20' : 'pb-7'}`}>
          <div className='py-3 border-b-0.5 border-b-brandGray2x'>
            <div className='w-full px-8 md:px-10'>
            {isInnerPage && <button onClick={()=>setIsInnerPage && setIsInnerPage(false)} className='w-fit text-sm text-brandGray1x flex gap-2 items-center group pt-1 pb-5'>
                          <svg className='trans-all-500-ease-in-out group-hover:-translate-x-1' width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.1775 4.94751L2.625 9.50001L7.1775 14.0525" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                              <path opacity="0.4" d="M15.3754 9.5H2.75293" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          Settings
                      </button>
                      }
            </div>
          <div className={`flex h-full ${altContent ? 'flex-col md:flex-row w-full' : 'items-center flex-row gap-10'} justify-between px-8 md:px-10`}>
                <div className={`flex justify-between gap-10 w-full ${altContent ? 'items-center' : ''}`}>
                  <div className='font-avenirHeavy text-2xl pb-1 text-black'>
                    <h1>{headerTitle || 'Settings'}</h1>
                  </div>
                  {
                    altContent
                    &&
                    <button id='menu' onClick={toggleMobileNav} aria-label='Open Menu' className='flex xl:hidden gap-1 flex-col'>
                          <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${navState ? 'rotate-45 origin-center translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                          <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten  ${navState ? 'hidden transition-all duration-100 ease-in-out' : 'transition-all duration-300 ease-in-out group-hover:bg-brandBlue1x'}`}></div>
                          <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${navState ? '-rotate-45 origin-center  -translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                  </button>

                  }
                </div>
                <div className='md:justify-self-end flex flex-col items-end w-full'>
                {
                    !altContent
                    &&
                    <button id='menu' onClick={toggleMobileNav} aria-label='Open Menu' className='flex xl:hidden gap-1 flex-col'>
                          <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${navState ? 'rotate-45 origin-center translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                          <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten  ${navState ? 'hidden transition-all duration-100 ease-in-out' : 'transition-all duration-300 ease-in-out group-hover:bg-brandBlue1x'}`}></div>
                          <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${navState ? '-rotate-45 origin-center  -translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                  </button>

                  }
                  <div className='pt-5 xl:pt-0 w-full'>
                    {altContent}
                  </div>
                </div>
              </div>
          </div>
          <div className='pb-48 lg:pb-24 px-8 md:px-10 overflow-y-auto h-full max-w-full overflow-x-hidden'>
              {/* {
                centerHeader
                ?
                <AltHeader  pageTitle={headerTitle} pageDescription={headerDescription} />
                :
                <Header pageTitle={headerTitle} pageDescription={headerDescription} hasButton={hasButton} handleClick={handleClick} btnText={btnText} />
              } */}
              
              {/* Main content here */}
              {children}
        </div>
      </div>
    </div>
  )
}

export default SettingsTemplatePage