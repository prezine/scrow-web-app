import React from 'react'
import useMobileNav from '../../../hooks/stores/useMobileNav'
import Header from '../Sections/Header'
import Logo from '../../../assets/media/logos/logo-blue-text.png'
import { NavLink } from 'react-router-dom'
import AltHeader from '../Sections/AltHeader'
import Nav from '../../Navigation/Nav'

const AppTemplatePage = ({id, children, appName, paddingBottom, btnText, handleClick }) => {
  
  const navState = useMobileNav(state=>state.showMobileNav)
  const toggleMobileNav = useMobileNav(state=>state.toggleMobileNav)

  return (
    <div className='flex'>
      <div className=''>
        <Nav />
      </div>
      <div id={id} className={`bg-brandGray3x h-screen overflow-hidden w-full ${paddingBottom ? 'pb-20' : 'pb-7'}`}>
          <div className=' h-60px xl:hidden border-b-0.5 border-b-brandGray2x'>
            <div className='flex xl:hidden h-full items-center justify-between gap-10 px-8 md:px-10'>
              <NavLink to="/" className=''>
                <img src={Logo} alt='logo' className='xs:w-20 w-24' />
              </NavLink>
              <button id='menu' onClick={toggleMobileNav} aria-label='Open Menu' className='flex gap-1 flex-col'>
                      <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${navState ? 'rotate-45 origin-center translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                      <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten  ${navState ? 'hidden transition-all duration-100 ease-in-out' : 'transition-all duration-300 ease-in-out group-hover:bg-brandBlue1x'}`}></div>
                      <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${navState ? '-rotate-45 origin-center  -translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
              </button>
            </div>
          </div>
          <div className='h-60px bg-white px-8 md:px-10 border-b-0.5 border-b-brandGray2x'>
              <div className='flex items-center h-full gap-3'>
                  <p className='text-base font-avenirBlack'>Apps</p>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.4248 16.5999L12.8581 11.1666C13.4998 10.5249 13.4998 9.4749 12.8581 8.83324L7.4248 3.3999" stroke="#D2D2D2" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p className='font-avenirMedium text-sm text-brandGray16x'>{appName || 'Dojah Inc'}</p>

              </div>
          </div>
          <div className='pb-48 lg:pb-24 pt-8 overflow-y-auto h-full max-w-full overflow-x-hidden'>
              {/* Main content here */}
              {children}
        </div>
      </div>
    </div>
  )
}

export default AppTemplatePage