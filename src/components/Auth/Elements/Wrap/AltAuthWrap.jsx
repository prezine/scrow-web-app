import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../../../assets/media/logos/logo-blue-text.png'
import useComponentVisible from '../../../../hooks/useHideOnClickOutside'
import SecurityTip from '../Sections/SecurityTip'


const AltAuthWrap = ({id, children, tip, altAction, altActionCentered, altActionText, altActionLinkText, altActionLink}) => {
    const [toggleInfo, setToggleInfo] = useState(false)
    const [width, setWidth] = useState(document.body.clientWidth)
  
    useComponentVisible('#info', '#toggleInfo', ()=>setToggleInfo(false))

    useEffect(() => {
        const body = document.querySelector('body');
        const scrollPosition = window.pageYOffset;
        if (toggleInfo) {
          body.style.overflow = 'hidden';
          body.style.height = '100vh';
        } else {
          body.style.overflow = '';
          body.style.height = '';
        }
        window.scrollTo(0, scrollPosition);
      }, [toggleInfo]);

      const updateSize = () => {
        setWidth(document.body.clientWidth)
        width >= 1024 && setToggleInfo(false)
      }

      useEffect(() => {
        window.addEventListener('resize', ()=>updateSize())
      
        return () => {
            window.removeEventListener('resize', ()=>updateSize())
        }
      }, [])

     
      

    return (
    <div id={id} className='bg-brandLightBlue2x min-h-screen px-4 sm:px-8 md:px-10 lg:pl-20 flex flex-col lg:flex-row gap-8 lg:gap-16 py-24'>
        <div className='sm:w-ninetyPercent md:w-eightyPercent lg:w-sixtyPercent max-w-lg'>
            <div className='pb-9'>
                <img src={Logo} alt='logo' className='xs:w-28 w-32' />
            </div>
            {/* {width} */}
            <div className={`fixed top-0 left-0 bg-black/50 ${toggleInfo ? 'h-screen w-full visible' : 'h-screen w-full invisible'} lg:hidden transition-all duration-200 ease-in-out z-20 backdrop-blur-sm cursor-pointer`} title='Close Info' onClick={()=>setToggleInfo(false)}></div>
            <div id='info' className={`w-full lg:w-eightyPercent z-20 py-10 fixed bottom-0 left-0 ${toggleInfo ? 'translate-y-0' : 'translate-y-hundredPercent'} border-2 border-brandGray2x lg:border-0 trans-all-500-ease-in-out lg:transition-none lg:translate-y-0 rounded-t-thirty px-10 lg:px-0 lg:rounded-none shadow-2xl lg:shadow-none lg:static bg-white lg:bg-transparent`}>
                <div className='flex gap-3 py-4'>
                    <svg className='min-w-6' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_15318_26725)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.5C0 9.3174 1.26428 6.26516 3.51472 4.01472C5.76516 1.76428 8.8174 0.5 12 0.5C15.1826 0.5 18.2348 1.76428 20.4853 4.01472C22.7357 6.26516 24 9.3174 24 12.5C24 15.6826 22.7357 18.7348 20.4853 20.9853C18.2348 23.2357 15.1826 24.5 12 24.5C8.8174 24.5 5.76516 23.2357 3.51472 20.9853C1.26428 18.7348 0 15.6826 0 12.5H0ZM11.3152 17.636L18.224 8.9992L16.976 8.0008L11.0848 15.3624L6.912 11.8856L5.888 13.1144L11.3152 17.6376V17.636Z" fill="#2A2AB3"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_15318_26725">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div>
                        <h2 className='text-xl font-avenirHeavy text-brandBlack1x'>Get started quickly</h2>
                        <p className='font-avenirBook text-brandGray6x text-sm lg:text-base'>Integrate with developer-friendly APIs or choose low-code or pre-built solutions.</p>
                    </div>
                </div>
                <div className='flex gap-3 py-4'>
                    <svg className='min-w-6' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_15318_26725)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.5C0 9.3174 1.26428 6.26516 3.51472 4.01472C5.76516 1.76428 8.8174 0.5 12 0.5C15.1826 0.5 18.2348 1.76428 20.4853 4.01472C22.7357 6.26516 24 9.3174 24 12.5C24 15.6826 22.7357 18.7348 20.4853 20.9853C18.2348 23.2357 15.1826 24.5 12 24.5C8.8174 24.5 5.76516 23.2357 3.51472 20.9853C1.26428 18.7348 0 15.6826 0 12.5H0ZM11.3152 17.636L18.224 8.9992L16.976 8.0008L11.0848 15.3624L6.912 11.8856L5.888 13.1144L11.3152 17.6376V17.636Z" fill="#2A2AB3"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_15318_26725">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div>
                        <h2 className='text-xl font-avenirHeavy text-brandBlack1x'>Support any business model</h2>
                        <p className='font-avenirBook text-brandGray6x text-sm lg:text-base'>E-commerce, subscriptions, SaaS platforms, marketplaces, and more—all within a unified platform.</p>
                    </div>
                </div>
                <div className='flex gap-3 py-4'>
                    <svg className='min-w-6' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_15318_26725)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12.5C0 9.3174 1.26428 6.26516 3.51472 4.01472C5.76516 1.76428 8.8174 0.5 12 0.5C15.1826 0.5 18.2348 1.76428 20.4853 4.01472C22.7357 6.26516 24 9.3174 24 12.5C24 15.6826 22.7357 18.7348 20.4853 20.9853C18.2348 23.2357 15.1826 24.5 12 24.5C8.8174 24.5 5.76516 23.2357 3.51472 20.9853C1.26428 18.7348 0 15.6826 0 12.5H0ZM11.3152 17.636L18.224 8.9992L16.976 8.0008L11.0848 15.3624L6.912 11.8856L5.888 13.1144L11.3152 17.6376V17.636Z" fill="#2A2AB3"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_15318_26725">
                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div>
                        <h2 className='text-xl font-avenirHeavy text-brandBlack1x'>Join millions of businesses</h2>
                        <p className='font-avenirBook text-brandGray6x text-sm lg:text-base'>Pandascrow is trusted by ambitious startups and enterprises of every size.</p>
                    </div>
                </div>
            </div>

            {altAction
            ?
            <div className={`${altActionCentered ? 'text-center' : 'text-left'} pt-9 pb-5`}>
                <p className={`font-avenirMedium`}>Don't have an account? <NavLink to={altActionLink || '/auth/join'} className={`text-brandBlue1x underline underline-offset-2`}>Sign up</NavLink></p>
            </div>
            :
            ''
            }

            <div className={`${altAction ? 'pt-5' : 'pt-10'} hidden lg:block`}>
                <SecurityTip tip={'Choose a strong and unique password that includes a combination of letters, numbers, and special characters. Avoid using personal information such as your name or birthdate, and never reuse passwords across different accounts. Enabling two-factor authentication can also add an extra layer of security to your account.'} />
            </div>

        </div>
        <div className='w-full lg:w-fortyPercent'>
            {children}
        </div>
        <div className={`${altAction ? 'pt-5' : 'pt-10'} block lg:hidden`}>
            <SecurityTip tip={tip} />
        </div>
        <button id='toggleInfo' onClick={()=>setToggleInfo(prevInfo => !prevInfo)} className={`z-30 bottom-6 right-6 fixed lg:hidden ${toggleInfo ? 'bg-brandBlue1x hover:bg-white/80' : 'bg-white hover:bg-brandBlue1x/80'} w-fit h-fit drop-shadow-md rounded-fiftyPercent`} type='button' aria-label='Open Info' title='Open Info'>
            <svg className='h-10 w-10' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_14964_25267)">
                <path d="M7.74231 0.5C6.35784 0.5 5.00446 0.910543 3.85332 1.67971C2.70218 2.44888 1.80497 3.54213 1.27516 4.82122C0.745343 6.1003 0.606719 7.50777 0.876816 8.86563C1.14691 10.2235 1.8136 11.4708 2.79257 12.4497C3.77153 13.4287 5.01881 14.0954 6.37668 14.3655C7.73455 14.6356 9.14201 14.497 10.4211 13.9672C11.7002 13.4373 12.7934 12.5401 13.5626 11.389C14.3318 10.2378 14.7423 8.88447 14.7423 7.5C14.7403 5.6441 14.0022 3.86479 12.6898 2.55247C11.3775 1.24015 9.59821 0.502007 7.74231 0.5V0.5ZM7.74231 13.3333C6.58859 13.3333 5.46077 12.9912 4.50149 12.3502C3.5422 11.7093 2.79453 10.7982 2.35302 9.73232C1.9115 8.66642 1.79598 7.49353 2.02107 6.36197C2.24615 5.23042 2.80172 4.19102 3.61752 3.37521C4.43333 2.5594 5.47273 2.00383 6.60429 1.77875C7.73584 1.55367 8.90873 1.66919 9.97463 2.1107C11.0405 2.55221 11.9516 3.29989 12.5926 4.25917C13.2335 5.21846 13.5756 6.34628 13.5756 7.5C13.5739 9.04658 12.9588 10.5293 11.8652 11.6229C10.7716 12.7165 9.28889 13.3316 7.74231 13.3333Z" fill="#C0C0C0"/>
                <path d="M7.74223 6.3335H7.15889C7.00418 6.3335 6.85581 6.39495 6.74642 6.50435C6.63702 6.61375 6.57556 6.76212 6.57556 6.91683C6.57556 7.07154 6.63702 7.21991 6.74642 7.32931C6.85581 7.4387 7.00418 7.50016 7.15889 7.50016H7.74223V11.0002C7.74223 11.1549 7.80368 11.3032 7.91308 11.4126C8.02248 11.522 8.17085 11.5835 8.32556 11.5835C8.48027 11.5835 8.62864 11.522 8.73804 11.4126C8.84743 11.3032 8.90889 11.1549 8.90889 11.0002V7.50016C8.90889 7.19074 8.78597 6.894 8.56718 6.67521C8.34839 6.45641 8.05164 6.3335 7.74223 6.3335Z" fill="#C0C0C0"/>
                <path d="M7.74231 5.1665C8.22556 5.1665 8.61731 4.77475 8.61731 4.2915C8.61731 3.80825 8.22556 3.4165 7.74231 3.4165C7.25906 3.4165 6.86731 3.80825 6.86731 4.2915C6.86731 4.77475 7.25906 5.1665 7.74231 5.1665Z" fill="#C0C0C0"/>
                </g>
                <defs>
                <clipPath id="clip0_14964_25267">
                <rect width="14" height="14" fill="white" transform="translate(0.74231 0.5)"/>
                </clipPath>
                </defs>
            </svg>
        </button>
    </div>
  )
}

export default AltAuthWrap