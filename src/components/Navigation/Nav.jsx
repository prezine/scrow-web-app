import React, {useLayoutEffect} from 'react'
import useIsAuthPage from '../../hooks/stores/useIsAuthPage'
import useMobileNav from '../../hooks/stores/useMobileNav'
import Logo from '../../assets/media/logos/logo-blue-text.png'
import { NavLink, useLocation } from 'react-router-dom'
import NavItemsData from '../../data/NavItemsData'
import useComponentVisible from '../../hooks/useHideOnClickOutside'
import ProfileMenu from './ProfileMenu'
import useGetUser from '../../utils/useGetUser'
import useUser from '../../hooks/stores/useUser'
import NavTemplate from './NavTemplate'

const Nav = () => {
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
    <div>
      {
        (userDataValue && (userDataValue.kyc_status.progress == 100))
        ?

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
                <div className='flex flex-col xs:gap-2 gap-2 h-fit xs:pt-5 pt-10 xs:px-2 px-4 overflow-y-auto'>
                    {NavItemsData.map((item, idx)=>{
                        return <NavLink exact="true" key={idx} end={item.end && 'true'} to={item.link} className={({isActive}) => (isActive ? 'text-brandDarkViolet1x bg-white nav--shadow rounded-five flex flex-row gap-tenPixel items-center xs:px-2 px-6 py-eightPixel w-ninetyPercent font-avenirRoman' : 'hover:bg-white/60 text-brandGray1x rounded-five flex flex-row gap-tenPixel items-center xs:px-2 px-6 py-eightPixel w-ninetyPercent transition ease-in-out duration-400 font-avenirRoman')}>
                        {location.pathname == item.link ? item.activeIcon : item.icon}
                        <p className='whitespace-nowrap text-md'>{item.pageName}</p>
                      </NavLink>
                    })}
                </div>
              </div>


              <ProfileMenu />

          </div>
        </nav>
        :
        <NavTemplate />
      }
    </div>
  )
}

export default Nav