import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/stores/useUser'
import useRequestHeaders from '../../utils/useRequestHeaders'
import PageLoader from '../Elements/Loaders/PageLoader'
import SettingsTemplatePage from '../Elements/Wraps/SettingsTemplatePage'
import FetchError from '../Errors/FetchError'
import InnerSettings from './InnerSettings'
import useSWR from 'swr'
import useComponentVisible from '../../hooks/useHideOnClickOutside'
import CopyPayMeLink from '../Transaction/Payme/CopyPayMeLink'

const Settings = () => {

    const [isInnerPage, setIsInnerPage] = useState(false)
    const [appSelectOpen, setAppSelectOpen] = useState(false)
    const [currentTab, setCurrentTab] = useState('userProfile')
    const [currentTabHeader, setCurrentTabHeader] = useState('Your Profile')
    const [appName, setAppName] = useState('')
    const [appId, setAppId] = useState('')
    const [auditTab, setAuditTab] = useState('')

    const {userDataValue} = useUser()

    const {requestHeaders} = useRequestHeaders()

    const fetcher = async (url) => axios.get(url, requestHeaders)

    const appsDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/app/fetch?userID=${userDataValue && userDataValue.userID}`, fetcher)

    // console.log(appsDataFetched.data && appsDataFetched.data.data.data.apps);

    const dataIsFetched = appsDataFetched.data && appsDataFetched.data.data.status

    const settings = [
        {
            name:"Account settings",
            categories:[
                {
                    name:"Business",
                    icon:<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="23" cy="23" r="23" fill="#3BB75E"/>
                    <path opacity="0.6" d="M21.11 15C21.03 15.3 21 15.63 21 16V19H16V17C16 15.9 16.9 15 18 15H21.11Z" fill="white"/>
                    <path d="M21 30V19H16C14 19 13 20 13 22V30C13 32 14 33 16 33H24C22 33 21 32 21 30ZM17.75 28C17.75 28.41 17.41 28.75 17 28.75C16.59 28.75 16.25 28.41 16.25 28V24C16.25 23.59 16.59 23.25 17 23.25C17.41 23.25 17.75 23.59 17.75 24V28Z" fill="white"/>
                    <path opacity="0.4" d="M25 33H24C22 33 21 32 21 30V16C21 14 22 13 24 13H30C32 13 33 14 33 16V30C33 32 32 33 30 33H29" fill="white"/>
                    <path d="M29 29V33H25V29C25 28.45 25.45 28 26 28H28C28.55 28 29 28.45 29 29Z" fill="white"/>
                    <path d="M25 24.75C24.59 24.75 24.25 24.41 24.25 24V19C24.25 18.59 24.59 18.25 25 18.25C25.41 18.25 25.75 18.59 25.75 19V24C25.75 24.41 25.41 24.75 25 24.75Z" fill="white"/>
                    <path d="M29 24.75C28.59 24.75 28.25 24.41 28.25 24V19C28.25 18.59 28.59 18.25 29 18.25C29.41 18.25 29.75 18.59 29.75 19V24C29.75 24.41 29.41 24.75 29 24.75Z" fill="white"/>
                    </svg>,
                    description:"Setup your business",
                    tabs:[
                        {
                            name:"User Profile",
                            id:"userProfile",
                            header:"Your Profile"
                        },
                        {
                            name:"Business Profile",
                            id:"businessProfile",
                            header:"Business Information"
                        },
                        {
                            name:"Team",
                            id:"team",
                            header:"Team"
                        },
                        {
                            name:"Settlement",
                            id:"settlement",
                            header:"Settlement Account"
                        },
                        {
                            name:"Preferences",
                            id:"preferences",
                            header:"Preferences"
                        }
                    ]                   
                },
                {
                    name:"Security",
                    icon:<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="23" cy="23" r="23" fill="#2A2AB3"/>
                    <path opacity="0.4" d="M23.0001 28.35C23.9003 28.35 24.6301 27.6202 24.6301 26.72C24.6301 25.8197 23.9003 25.09 23.0001 25.09C22.0999 25.09 21.3701 25.8197 21.3701 26.72C21.3701 27.6202 22.0999 28.35 23.0001 28.35Z" fill="white"/>
                    <path d="M27.65 20.4399H18.35C14.25 20.4399 13 21.6899 13 25.7899V27.6499C13 31.7499 14.25 32.9999 18.35 32.9999H27.65C31.75 32.9999 33 31.7499 33 27.6499V25.7899C33 21.6899 31.75 20.4399 27.65 20.4399ZM23 29.7399C21.33 29.7399 19.98 28.3799 19.98 26.7199C19.98 25.0599 21.33 23.6999 23 23.6999C24.67 23.6999 26.02 25.0599 26.02 26.7199C26.02 28.3799 24.67 29.7399 23 29.7399Z" fill="white"/>
                    <path opacity="0.4" d="M18.1197 20.45V19.28C18.1197 16.35 18.9497 14.4 22.9997 14.4C27.0497 14.4 27.8797 16.35 27.8797 19.28V20.45C28.3897 20.46 28.8497 20.48 29.2797 20.54V19.28C29.2797 16.58 28.6297 13 22.9997 13C17.3697 13 16.7197 16.58 16.7197 19.28V20.53C17.1397 20.48 17.6097 20.45 18.1197 20.45Z" fill="white"/>
                    </svg>,
                    description:"Secure your account",
                    tabs:[
                        {
                            name:"Reset Password",
                            id:"resetPassword",
                            header:"Reset Password"
                        },
                        {
                            name:"Audit Log",
                            id:"auditLog",
                            header:"Log System"
                        },
                        {
                            name:"Two-factor authentication",
                            id:"twoFactorAuthentication",
                            header:"Two-factor authentication"
                        }
                    ]                   
                },
                {
                    name:"General",
                    icon:<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="23" cy="23" r="23" fill="#D2830D"/>
                    <path opacity="0.4" d="M13 20.75C12.59 20.75 12.25 20.41 12.25 20V17.5C12.25 14.6 14.61 12.25 17.5 12.25H20C20.41 12.25 20.75 12.59 20.75 13C20.75 13.41 20.41 13.75 20 13.75H17.5C15.43 13.75 13.75 15.43 13.75 17.5V20C13.75 20.41 13.41 20.75 13 20.75Z" fill="white"/>
                    <path d="M33 20.75C32.59 20.75 32.25 20.41 32.25 20V17.5C32.25 15.43 30.57 13.75 28.5 13.75H26C25.59 13.75 25.25 13.41 25.25 13C25.25 12.59 25.59 12.25 26 12.25H28.5C31.39 12.25 33.75 14.6 33.75 17.5V20C33.75 20.41 33.41 20.75 33 20.75Z" fill="white"/>
                    <path opacity="0.4" d="M28.5 33.75H27C26.59 33.75 26.25 33.41 26.25 33C26.25 32.59 26.59 32.25 27 32.25H28.5C30.57 32.25 32.25 30.57 32.25 28.5V27C32.25 26.59 32.59 26.25 33 26.25C33.41 26.25 33.75 26.59 33.75 27V28.5C33.75 31.4 31.39 33.75 28.5 33.75Z" fill="white"/>
                    <path d="M20 33.75H17.5C14.61 33.75 12.25 31.4 12.25 28.5V26C12.25 25.59 12.59 25.25 13 25.25C13.41 25.25 13.75 25.59 13.75 26V28.5C13.75 30.57 15.43 32.25 17.5 32.25H20C20.41 32.25 20.75 32.59 20.75 33C20.75 33.41 20.41 33.75 20 33.75Z" fill="white"/>
                    <path d="M19.5001 22.38C21.0907 22.38 22.3801 21.0906 22.3801 19.5C22.3801 17.9094 21.0907 16.62 19.5001 16.62C17.9095 16.62 16.6201 17.9094 16.6201 19.5C16.6201 21.0906 17.9095 22.38 19.5001 22.38Z" fill="white"/>
                    <path opacity="0.4" d="M18.5001 29.38C19.5384 29.38 20.3801 28.5383 20.3801 27.5C20.3801 26.4617 19.5384 25.62 18.5001 25.62C17.4618 25.62 16.6201 26.4617 16.6201 27.5C16.6201 28.5383 17.4618 29.38 18.5001 29.38Z" fill="white"/>
                    <path opacity="0.4" d="M27.5001 20.38C28.5384 20.38 29.3801 19.5383 29.3801 18.5C29.3801 17.4617 28.5384 16.62 27.5001 16.62C26.4618 16.62 25.6201 17.4617 25.6201 18.5C25.6201 19.5383 26.4618 20.38 27.5001 20.38Z" fill="white"/>
                    <path d="M26.5001 29.38C28.0907 29.38 29.3801 28.0906 29.3801 26.5C29.3801 24.9094 28.0907 23.62 26.5001 23.62C24.9095 23.62 23.6201 24.9094 23.6201 26.5C23.6201 28.0906 24.9095 29.38 26.5001 29.38Z" fill="white"/>
                    </svg>,
                    description:"Do more with Pandascrow",
                    tabs:[
                        {
                            name:"Referrals",
                            id:"referrals",
                            header:"Referrals"
                        },
                        {
                            name:"Connect Apps",
                            id:"connectApps",
                            header:"Connect Apps"
                        },
                        {
                            name:"Launch Apps",
                            id:"launchApps",
                            header:"Launch Apps"
                        }
                    ]                   
                },
            ]

        },
        {
            name:"Bill Manager",
            categories:[
                {
                    name:"Plans & System",
                    icon:<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="23" cy="23" r="23" fill="#161616"/>
                    <path opacity="0.4" d="M23 33C28.5228 33 33 28.5228 33 23C33 17.4772 28.5228 13 23 13C17.4772 13 13 17.4772 13 23C13 28.5228 17.4772 33 23 33Z" fill="white"/>
                    <path d="M21.5804 26.5801C21.3804 26.5801 21.1904 26.5001 21.0504 26.3601L18.2204 23.5301C17.9304 23.2401 17.9304 22.7601 18.2204 22.4701C18.5104 22.1801 18.9904 22.1801 19.2804 22.4701L21.5804 24.7701L26.7204 19.6301C27.0104 19.3401 27.4904 19.3401 27.7804 19.6301C28.0704 19.9201 28.0704 20.4001 27.7804 20.6901L22.1104 26.3601C21.9704 26.5001 21.7804 26.5801 21.5804 26.5801Z" fill="white"/>
                    </svg>,
                    description:"Setup your business",
                    tabs:[
                        {
                            name:"Billing Plan",
                            id:"billingPlan",
                            header:"Plan & Billing"
                        },
                        {
                            name:"Early access features",
                            id:"earlyAccessFeatures",
                            header:"Join early access users"
                        }
                    ]                   
                }
            ]

        },
    ]

    const handleSettingsTabs = (tab, header) => {
        setIsInnerPage(true)
        setCurrentTab(tab)
        setCurrentTabHeader(header)
    }

    useComponentVisible('#appSelector', '#appSelectDrop', ()=>setAppSelectOpen(false))

    useEffect(() => {
      if(isInnerPage){
          document.title = `Pandascrow Settings - ${currentTabHeader}`
      }else{
        document.title = `Pandascrow Settings`
      }
    
      return () => {
        document.title = ``
      }
    }, [isInnerPage, currentTab])

    if (!appsDataFetched.data) return <PageLoader />;
    if (appsDataFetched.error) return <FetchError />;

    const altHeader = <div className={`flex flex-col md:flex-row gap-5 md:gap-10 w-full justify-end`}>
        {(auditTab == 'webhook' || auditTab == 'api') && currentTab == 'auditLog'
        &&
        <div className='relative w-fit bg-transparent z-20'>
            <button disabled={(appsDataFetched && !appsDataFetched.data.data.data.apps)} id='appSelector' type='button' onClick={()=>setAppSelectOpen(prevAppSelectOpen => !prevAppSelectOpen)} className={`${(appName || appSelectOpen) ? 'min-w-160px' : ''} max-w-240px disabled:bg-brandGray16x z-10 justify-between self-end bg-brandDarkViolet1x rounded-fifty py-2 text-white px-4 flex flex-row items-center gap-3 text-sm`}>
                <span className={`whitespace-nowrap overflow-hidden text-ellipsis`}>App: <span>{appName ? appName : (appsDataFetched && !appsDataFetched.data.data.data.apps) ? 'No app(s)' : 'Select'}</span></span>
                <svg className={`${appSelectOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300 ease-in-out`}  width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5917 6.84122C15.5142 6.76312 15.422 6.70112 15.3205 6.65882C15.2189 6.61651 15.11 6.59473 15 6.59473C14.89 6.59473 14.7811 6.61651 14.6795 6.65882C14.578 6.70112 14.4858 6.76312 14.4083 6.84122L10.5917 10.6579C10.5142 10.736 10.422 10.798 10.3205 10.8403C10.2189 10.8826 10.11 10.9044 10 10.9044C9.89 10.9044 9.78108 10.8826 9.67953 10.8403C9.57798 10.798 9.48581 10.736 9.40834 10.6579L5.59168 6.84122C5.51421 6.76312 5.42204 6.70112 5.32049 6.65882C5.21894 6.61651 5.11002 6.59473 5.00001 6.59473C4.89 6.59473 4.78108 6.61651 4.67953 6.65882C4.57798 6.70112 4.48581 6.76312 4.40834 6.84122C4.25313 6.99736 4.16602 7.20857 4.16602 7.42872C4.16602 7.64888 4.25313 7.86009 4.40834 8.01622L8.23334 11.8412C8.70209 12.3094 9.33751 12.5723 10 12.5723C10.6625 12.5723 11.2979 12.3094 11.7667 11.8412L15.5917 8.01622C15.7469 7.86009 15.834 7.64888 15.834 7.42872C15.834 7.20857 15.7469 6.99736 15.5917 6.84122Z" fill="white"/>
                </svg>
            </button>
            <div id='appSelectDrop' className={`${appSelectOpen ? 'unclip--path visible opacity-100' : 'clip--path invisible opacity-0'} transition-all duration-300 ease-in-out absolute text-sm font-avenirMedium shadow-lg  border border-brandGray9x py-2 bg-white text-black rounded-b-ten left-fiftyPercent -translate-x-fiftyPercent top-ninetyEightPercent w-eightyPercent`}>
                {(dataIsFetched ? appsDataFetched.data.data.data.apps : []).map((app, idx)=> {
                    return <button type='button' onClick={()=>{setAppName(app.appname); setAppId(app.appid); setAppSelectOpen(false)}} key={idx} className={`${app.appid == appId ? 'bg-brandGray7x' : 'hover:bg-brandGray7x/80'} cursor-pointer transition-all ease-in-out duration-300 px-2 py-1.5 flex gap-3 w-full last:rounded-b-ten`}>
                        <p>{app.appname}</p>
                    </button>
                })}
            </div>
        </div>}
        {currentTab == 'referrals'
        &&
        <div className='relative w-full flex flex-col md:flex-row gap-3 bg-transparent py-1 items-end md:items-center'>
            <input readOnly value={userDataValue && userDataValue.invite_url} className="text-xs no--zoom text-brandBlack1x w-full py-1.5 px-3 rounded-fifty bg-brandLightBlue1x flex items-center font-avenirHeavy" />
            <CopyPayMeLink text={userDataValue && userDataValue.invite_url} linkName={'Referral Link'} />
        </div>}
    </div>

    
    

  return (
    <SettingsTemplatePage isInnerPage={isInnerPage} setIsInnerPage={setIsInnerPage} headerTitle={isInnerPage ? currentTabHeader : 'Settings'} altContent={isInnerPage ? (currentTab == 'auditLog' || currentTab == 'referrals') && altHeader : ''} headerDescription={'Personal Details'}>
        {/* {currentTab} */}
        {/* {auditTab} */}
        {
            isInnerPage
            ?
            <InnerSettings key={currentTab} tab={currentTab} appId={appId} setAuditTab={setAuditTab} />
            :
            <div className='py-12'>
                {
                    settings.map((setting, idx)=>{
                        return <div key={idx} className="pb-12" >
                            <h1 className='font-avenirHeavy text-2xl pb-7 border-b-0.5 border-b-brandGray8x text-black'>{setting.name}</h1>
                            <div className='py-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10'>
                                {setting.categories && setting.categories.map((cat, index)=>{
                                    return <div key={index}>
                                        <div className='flex gap-3'>
                                            <div>
                                                {cat.icon}
                                            </div>
                                            <div className=''>
                                                <div className='pb-4'>
                                                    <h2 className='text-lg font-avenirHeavy'>{cat.name}</h2>
                                                    <h3 className='text-brandGray11x'>{cat.description}</h3>
                                                </div>

                                                <ul>
                                                    {cat.tabs && cat.tabs.map((tab, i)=>{
                                                        return <li key={i} className={'py-2 first:pt-0 last:pb-0'}>
                                                            <button onClick={()=>handleSettingsTabs(tab.id, tab.header)} className='text-sm text-brandGray11x group flex gap-2 items-center' aria-label={`Go to ${tab.name} setting`}>
                                                                {tab.name}
                                                                <svg className="trans-all-500-ease-in-out group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0 -translate-x-6 invisible opacity-0" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8.41797 3.45911L11.9588 6.99994L8.41797 10.5408" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                                    <path opacity="0.4" d="M2.04199 7H11.8595" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                                                </svg>
                                                            </button>
                                                        </li>
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    })
                }
            </div>
        }
        
    </SettingsTemplatePage>
  )
}

export default Settings
