import React from 'react'
import useMobileNav from '../../../hooks/stores/useMobileNav'
import Header from '../Sections/Header'
import Logo from '../../../assets/media/logos/logo-blue-text.png'
import { NavLink } from 'react-router-dom'
import AltHeader from '../Sections/AltHeader'
import Nav from '../../Navigation/Nav'

const TemplatePage = ({id, children, headerTitle, headerDescription, isLoaderOrError, wrapDisplay, bgColor, hasButton, buttons, centerHeader, levelTwoRef, paddingBottom, btnText, handleClick }) => {
  
  const navState = useMobileNav(state=>state.showMobileNav)
  const toggleMobileNav = useMobileNav(state=>state.toggleMobileNav)

  return (
    <div className='flex w-full'>
      <div className=''>
        <Nav />
      </div>
        <div id={id} className={`${bgColor ? bgColor : 'bg-brandGray3x'} h-screen overflow-hidden w-full ${paddingBottom ? 'pb-20' : 'pb-7'}`}>
          <div className='h-60px border-b-0.5 border-b-brandGray2x'>
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
          <div className='pb-48 lg:pb-24 pt-8 px-8 md:px-10 overflow-y-auto h-full w-full flex flex-col max-w-full overflow-x-hidden'>
            <div>
              {
                  centerHeader
                  ?
                  <AltHeader  pageTitle={headerTitle} pageDescription={headerDescription} />
                  :
                  <Header pageTitle={headerTitle} pageDescription={headerDescription} buttons={buttons} hasButton={hasButton} handleClick={handleClick} btnText={btnText} />
                }
            </div>
              
              {/* Main content here */}
              <div className={`w-full max-w-full ${isLoaderOrError ? 'flex h-full' : ''} ${wrapDisplay ? wrapDisplay : ''}`}>
                {children}
              </div>
        </div>
        </div>
    </div>
  )
}

export default TemplatePage