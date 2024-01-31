import React, {useLayoutEffect} from 'react'
import useIsAuthPage from '../../hooks/stores/useIsAuthPage'
import useMobileNav from '../../hooks/stores/useMobileNav'
import Logo from '../../assets/media/logos/logo-blue-text.png'
import { NavLink, useLocation } from 'react-router-dom'
import NavItemsData from '../../data/NavItemsData'
import useComponentVisible from '../../hooks/useHideOnClickOutside'
import UserAvatar from '../../assets/media/avatars/avatar-1.png'
import useUser from '../../hooks/stores/useUser'


const NavTemplate = () => {
    const navState = useMobileNav(state => state.showMobileNav)
    const isAuthPage = useIsAuthPage(state => state.isAuthPage)


    const closeNav = useMobileNav(state => state.closeMobileNav)


    const location = useLocation();
    

    const handleMobileNav = () =>{
      closeNav()
    }

    useComponentVisible('#nav', '#menu', ()=> handleMobileNav())

    useLayoutEffect(() => {
      handleMobileNav()
    }, [location])

    
    const {userDataValue} = useUser()


    

  return (
    <nav id='nav' className={`${isAuthPage && 'hidden'} fixed top-0 left-0 z-50 ${navState || '-translate-x-oneFiftyPercent'} bg-brandLightBlue1x shadow-md xl:shadow-none xl:-translate-x-0 transition-transform duration-500 ease-in-out xl:static xs:w-full w-72 h-full xl:h-screen max-h-screen`}>
      <div className='transition-transform duration-500 ease-in-out bg-brandLightBlue1x h-full max-h-screen font-avenirRegular max-w-sm flex flex-col w-full'>
          <NavLink to="/" className={`xs:px-4 px-9 pt-10`}>
            <img src={Logo} alt='logo' className='xs:w-22 w-28' />
          </NavLink>
          <div className='xs:fixed xs:top-10 xs:right-4 xs:block hidden xs:z-70'>
            <button id='closeMobileNav' aria-label='close menu' onClick={handleMobileNav} className={ `h-full z-70 ${navState && ''} transition-all duration-300 space-y-1 xl:hidden group`}>
                  <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${navState ? 'rotate-45 origin-center translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                  <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten  ${navState ? 'hidden transition-all duration-100 ease-in-out' : 'transition-all duration-300 ease-in-out group-hover:bg-brandBlue1x'}`}></div>
                  <div className={`bg-brandGray1x w-6 h-0.5 rounded-ten group-hover:bg-brandBlue1x ${navState ? '-rotate-45 origin-center  -translate-y-0.75' : ''} transition-all duration-300 ease-in-out`}></div>
                  <span className="sr-only">Menu</span>
            </button>
          </div>
          <div className={`h-full flex flex-col justify-between pb-5 xs:pt-5 pt-8 overflow-y-auto xs:text-xs `}>
            <div className='flex flex-col xs:gap-2 gap-4 h-fit xs:pt-5 pt-10 xs:px-2 px-4 overflow-y-auto'>
                {NavItemsData.map((item, idx)=>{
                    return <div key={idx} title={`Complete Compliance Data to Unlock`} className={idx == 0 ? 'text-brandDarkViolet1x bg-white nav--shadow rounded-five active--icon flex flex-row gap-tenPixel items-center xs:px-2 px-6 py-3 w-ninetyPercent font-avenirRoman' : 'hover:bg-white/60 text-brandGray1x rounded-five not--active--icon flex flex-row gap-tenPixel items-center xs:px-2 px-6 py-3 w-ninetyPercent transition ease-in-out duration-400 font-avenirRoman'}>
                        <div className={`h-4 w-4 ${idx == 0 ? 'bg-brandDarkViolet1x/20' : 'bg-brandGray4x/20'} rounded-five`}></div>
                        <div className={`h-4 w-full ${idx == 0 ? 'bg-brandDarkViolet1x/20' : 'bg-brandGray4x/20'} rounded-five`}></div>
                  </div>
                })}
                {/* {NavItemsData.map((item, idx)=>{
                    return <div key={idx} title={`Complete Compliance Data to Unlock`} className={location.pathname == item.link ? 'text-brandDarkViolet1x bg-white nav--shadow rounded-five active--icon flex flex-row gap-tenPixel items-center xs:px-2 px-6 py-3 w-ninetyPercent font-avenirRoman' : 'hover:bg-white/60 text-brandGray1x rounded-five not--active--icon flex flex-row gap-tenPixel items-center xs:px-2 px-6 py-3 w-ninetyPercent transition ease-in-out duration-400 font-avenirRoman'}>
                        <div className={`h-4 w-4 ${location.pathname == item.link ? 'bg-brandDarkViolet1x/20' : 'bg-brandGray4x/20'} rounded-five`}></div>
                        <div className={`h-4 w-full ${location.pathname == item.link ? 'bg-brandDarkViolet1x/20' : 'bg-brandGray4x/20'} rounded-five`}></div>
                  </div>
                })} */}
            </div>
          </div>

           <div className='text-black justify-self-end px-4 py-4 relative'>     
                <button type='button' id='' className={`w-full flex xs:flex-col xs:items-start flex-row gap-3 items-center bg-brandWhite1x transition-all duration-200 ease-linear z-20 rounded-five mx-auto px-2 xs:py-2 py-3 relative`}>
                    <div className='absolute top-0 left-0 h-full w-full bg-brandWhite1x/50 rounded-five'></div>
                    <span className='w-full max-w-fit h-fit'>
                        <img src={(userDataValue && userDataValue.dp_url) ? userDataValue.dp_url : UserAvatar} alt="user" className='rounded-full xs:h-6 xs:w-6 h-9 w-9 aspect-square' />
                    </span>
                    <div className='flex xs:w-full w-full gap-3 items-center justify-between'>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className={`h-2 w-sixtyPercent bg-brandGray4x/20 rounded-five`}></div>
                            <div className={`h-4 w-eightyPercent bg-brandGray4x/20 rounded-five`}></div>
                        </div>

                        <svg width="11" height="22" viewBox="0 0 11 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.71503 7.0844L5.86253 4.2319C5.52566 3.89503 4.97441 3.89503 4.63753 4.2319L1.78503 7.0844" stroke="#292D32" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8.71503 14.9158L5.86253 17.7683C5.52566 18.1051 4.97441 18.1051 4.63753 17.7683L1.78503 14.9158" stroke="#292D32" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </button>
            </div>
      </div>
    </nav>
  )
}

export default NavTemplate