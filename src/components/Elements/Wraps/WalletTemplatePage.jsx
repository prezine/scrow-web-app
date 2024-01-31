import React, { useState } from 'react'
import useMobileNav from '../../../hooks/stores/useMobileNav'
import Header from '../Sections/Header'
import Logo from '../../../assets/media/logos/logo-blue-text.png'
import { NavLink } from 'react-router-dom'
import useComponentVisible from '../../../hooks/useHideOnClickOutside'
import WalletLoader from '../../Wallet/WalletLoader'
import FetchError from '../../Errors/FetchError'
import Nav from '../../Navigation/Nav'


const WalletTemplatePage = ({id, children, headerTitle, headerDescription, paddingBottom, pageError, pageLoading,  btnText, handleClick, hasButton, buttons, walletCurrency, setWalletCurrency }) => {
  
    const [currencySelectOpen, setCurrencySelectOpen] = useState(false)
    const [currency, setCurrency] = useState(walletCurrency || 'NGN')
    const [flag, setFlag] = useState('/src/assets/media/flags/emojione_flag-for-nigeria.svg')

    const navState = useMobileNav(state=>state.showMobileNav)
    const toggleMobileNav = useMobileNav(state=>state.toggleMobileNav)

    const countries = [
      {
        currency:'NGN',
        flag:'/src/assets/media/flags/emojione_flag-for-nigeria.svg'
      },
      {
        currency:'GH',
        flag:'/src/assets/media/flags/emojione_flag-for-ghana.svg'
      },
      {
        currency:'ZA',
        flag:'/src/assets/media/flags/emojione_flag-for-south-africa.svg'
      },
      {
        currency:'CAD',
        flag:'/src/assets/media/flags/emojione_flag-for-canada.svg'
      },
  ]

    const handleCurrencyChange = (flag, curr) => {
        setFlag(flag)
        setCurrency(curr)
        setWalletCurrency(curr)
        setCurrencySelectOpen(false)
    }

    useComponentVisible('#countrySelector', '#countryDropDown', ()=>setCurrencySelectOpen(false))

    // const childrenWithProps = React.Children.map(children, (child) => {
    //     // Clone the child with a new prop 'currency'
    //     return React.cloneElement(child, { currency:currency });
    //   });

  return (
    <div className='flex'>
      <div className=''>
        <Nav />
      </div>
      <div id={id} className={`bg-brandGray3x h-screen overflow-hidden w-full ${paddingBottom ? 'pb-20' : 'pb-7'}`}>
        {/* add xl:hidden to classList beside (h-60px) if currency picker uncommented */}
          <div className=' h-60px border-b-0.5 border-b-brandGray2x'>
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
          {
            pageLoading
            ?
            <WalletLoader />
            :
            pageError  
            ?
            <FetchError />
            :
            <>
            {/* currency picker */}
              {/* <div className='h-60px bg-brandGray3x px-8 md:px-10 border-b-0.5 border-b-brandGray2x'>
                <div className='w-full flex justify-end items-center h-full'>
                    <div className='flex gap-4 w-fit items-center h-full relative'>
                        <p className='text-brandBlack2x font-avenirMedium'>Wallet Currency</p>
                        <div className='relative w-fit'>
                            <button id='countrySelector' type='button' onClick={()=>setCurrencySelectOpen(prevCurrencySelectOpen => !prevCurrencySelectOpen)} className={`bg-brandBlue1x w-28 text-white px-1 py-2 rounded-fifty flex items-center gap-3.5`}>
                                <img src={walletCurrency ? flag : '/src/assets/media/flags/emojione_flag-for-nigeria.svg'} alt="" className={`rounded-full h-6 w-6 min-w-6 aspect-square skeleton`} />
                                <div className='flex h-full items-center gap-3 w-full justify-between'>
                                    <p className={`font-avenirHeavy`}>{walletCurrency}</p>
                                    <svg className={`${currencySelectOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300 ease-in-out`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.5914 6.84171C15.514 6.76361 15.4218 6.70161 15.3202 6.6593C15.2187 6.617 15.1098 6.59521 14.9998 6.59521C14.8898 6.59521 14.7808 6.617 14.6793 6.6593C14.5777 6.70161 14.4856 6.76361 14.4081 6.84171L10.5914 10.6584C10.514 10.7365 10.4218 10.7985 10.3202 10.8408C10.2187 10.8831 10.1098 10.9049 9.99977 10.9049C9.88976 10.9049 9.78083 10.8831 9.67929 10.8408C9.57774 10.7985 9.48557 10.7365 9.4081 10.6584L5.59143 6.84171C5.51396 6.76361 5.4218 6.70161 5.32025 6.6593C5.2187 6.617 5.10978 6.59521 4.99977 6.59521C4.88976 6.59521 4.78083 6.617 4.67928 6.6593C4.57774 6.70161 4.48557 6.76361 4.4081 6.84171C4.25289 6.99785 4.16577 7.20906 4.16577 7.42921C4.16577 7.64937 4.25289 7.86058 4.4081 8.01671L8.2331 11.8417C8.70185 12.3099 9.33726 12.5728 9.99977 12.5728C10.6623 12.5728 11.2977 12.3099 11.7664 11.8417L15.5914 8.01671C15.7466 7.86058 15.8338 7.64937 15.8338 7.42921C15.8338 7.20906 15.7466 6.99785 15.5914 6.84171Z" fill="white"/>
                                    </svg>
                                </div>
                            </button>
                            <div id='countryDropDown' className={`${currencySelectOpen ? 'unclip--path visible opacity-100' : 'clip--path invisible opacity-0'} transition-all duration-300 ease-in-out absolute text-sm font-avenirMedium shadow-lg  border border-brandGray9x py-2 bg-white text-black rounded-b-ten left-fiftyPercent -translate-x-fiftyPercent top-ninetyEightPercent w-eightyPercent`}>
                                {countries.map((country, idx)=> {
                                    return <button type='button' onClick={()=>handleCurrencyChange(country.flag, country.currency)} key={idx} className={`${country.currency == currency ? 'bg-brandGray7x' : 'hover:bg-brandGray7x/80'} cursor-pointer transition-all ease-in-out duration-300 px-2 py-1.5 flex gap-3 w-full last:rounded-b-ten`}>
                                        <img src={country.flag} alt={country.currency} className={`rounded-full h-4 w-4`} />
                                        <p>{country.currency}</p>
                                    </button>
                                })}
                            </div>
                        </div>

                      
                    </div>
                </div>
              </div> */}
              <div className='pb-48 lg:pb-24 pt-8 px-8 md:px-10 overflow-y-auto h-full max-w-full overflow-x-hidden'>
                  {/* Main content here */}
                  <Header pageTitle={headerTitle} pageDescription={headerDescription} buttons={buttons} hasButton={hasButton} handleClick={handleClick} btnText={btnText} />
                  {children}
                  {/* {childrenWithProps} */}
              </div>
            </>
          }
      </div>
    </div>
  )
}

export default WalletTemplatePage