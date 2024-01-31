import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import UserAvatar from '../../assets/media/avatars/avatar-1.png'
import useUser from '../../hooks/stores/useUser'
import useComponentVisible from '../../hooks/useHideOnClickOutside'
import useGetDuration from '../../utils/useGetDuration'
import useGetUser from '../../utils/useGetUser'



const ProfileMenu = ({}) => {

    const [profileMenuOpen, setProfileMenuOpen] = useState(false)

    useComponentVisible('#profileMenuBtn', "#user_menu_dropdown", ()=>setProfileMenuOpen(false))

    const { userDataValue, businessDataValue } = useUser()

    const {logout} = useGetUser() 
    
  return (
    <div className='text-black justify-self-end px-4 py-4 relative'>
            <div className="relative w-full ">
              <button type='button' id='profileMenuBtn' aria-label={`${profileMenuOpen ? 'Close Profile Menu' : 'Open Profile Menu'}`} onClick={()=>setProfileMenuOpen(prevProfileMenuOpen => !prevProfileMenuOpen)} className={`w-full flex xs:flex-col xs:items-start flex-row gap-3 items-center ${profileMenuOpen ? 'bg-white' : 'bg-brandWhite1x'} transition-all duration-200 ease-linear z-20 rounded-five mx-auto px-2 xs:py-2 py-3`}>
                    <span className='w-full max-w-fit h-fit'>
                      <img src={(userDataValue && userDataValue.dp_url) ? userDataValue.dp_url : UserAvatar} alt="user" className='rounded-full xs:h-6 xs:w-6 h-9 w-9 aspect-square' />
                    </span>
                    <span className='flex xs:w-full w-full gap-3 items-center justify-between'>
                      <span className='text-left'>
                        <p className='text-xxs font-avenirLight whitespace-nowrap overflow-hidden text-ellipsis text-brandDarkViolet1x'>{(businessDataValue && businessDataValue.businessname) ? businessDataValue.businessname : ''}</p>
                        <h3 className='font-avenirHeavy whitespace-nowrap overflow-hidden text-ellipsis xs:text-xs text-sm'>{(userDataValue && userDataValue.name) ? userDataValue.name : ''}</h3>
                      </span>
                      <svg width="11" height="22" viewBox="0 0 11 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={`${profileMenuOpen ? 'stroke-brandDarkViolet1x' : 'stroke-brandGray1x'} transition-all duration-200 ease-linear`} d="M8.71503 7.0844L5.86253 4.2319C5.52566 3.89503 4.97441 3.89503 4.63753 4.2319L1.78503 7.0844" stroke="#292D32" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path className={`${profileMenuOpen ? 'stroke-brandDarkViolet1x' : 'stroke-brandGray1x'} transition-all duration-200 ease-linear`} d="M8.71503 14.9158L5.86253 17.7683C5.52566 18.1051 4.97441 18.1051 4.63753 17.7683L1.78503 14.9158" stroke="#292D32" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
              </button>

              <div id="user_menu_dropdown" onClick={()=>setProfileMenuOpen(false)} className={`w-full min-w-full z-10 h-180px px-3 pb-5 rounded-ten bg-white absolute -bottom-oneFiftyPercent -translate-y-ninetyPercent left-fiftyPercent -translate-x-fiftyPercent ${profileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'} transition-all duration-200 ease-in-out`}>
                  <div className="w-full h-full flex flex-col pt-3">
                      <div className="flex flex-col gap-2.5 pb-18px">
                          <p className="text-black text-sm">Business ID: <span className="">{businessDataValue ? businessDataValue.businessID.toString().padStart(7, '0') : ''}</span></p>
                          <button type="button" className="flex flex-row text-sm items-center justify-between">
                          <p className="text-brandDarkViolet1x text-sm">New Business</p>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 11H13V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H11V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18C12.2652 18 12.5196 17.8946 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V13H17C17.2652 13 17.5196 12.8946 17.7071 12.7071C17.8946 12.5196 18 12.2652 18 12C18 11.7348 17.8946 11.4804 17.7071 11.2929C17.5196 11.1054 17.2652 11 17 11Z" fill="#182CD1"/>
                          </svg>                           
                          </button>
                      </div>
                      <div className="flex flex-col gap-18px pt-18px border-t-0.5 border-t-brandDashGray25x">
                          <NavLink to="/settings" className="flex flex-row gap-18px items-center text-sm">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path opacity="0.34" d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M1.66602 10.7329V9.26621C1.66602 8.39954 2.37435 7.68287 3.24935 7.68287C4.75768 7.68287 5.37435 6.61621 4.61602 5.30787C4.18268 4.55787 4.44102 3.58287 5.19935 3.14954L6.64102 2.32454C7.29935 1.93287 8.14935 2.16621 8.54102 2.82454L8.63268 2.98287C9.38268 4.29121 10.616 4.29121 11.3743 2.98287L11.466 2.82454C11.8577 2.16621 12.7077 1.93287 13.366 2.32454L14.8077 3.14954C15.566 3.58287 15.8243 4.55787 15.391 5.30787C14.6327 6.61621 15.2494 7.68287 16.7577 7.68287C17.6244 7.68287 18.341 8.39121 18.341 9.26621V10.7329C18.341 11.5995 17.6327 12.3162 16.7577 12.3162C15.2494 12.3162 14.6327 13.3829 15.391 14.6912C15.8243 15.4495 15.566 16.4162 14.8077 16.8495L13.366 17.6745C12.7077 18.0662 11.8577 17.8329 11.466 17.1745L11.3743 17.0162C10.6243 15.7079 9.39102 15.7079 8.63268 17.0162L8.54102 17.1745C8.14935 17.8329 7.29935 18.0662 6.64102 17.6745L5.19935 16.8495C4.44102 16.4162 4.18268 15.4412 4.61602 14.6912C5.37435 13.3829 4.75768 12.3162 3.24935 12.3162C2.37435 12.3162 1.66602 11.5995 1.66602 10.7329Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <p>Settings</p>
                          </NavLink>
                          <button type={'button'} onClick={logout} className="flex flex-row gap-18px items-center text-sm">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.99935 1.66699C5.39935 1.66699 1.66602 5.40033 1.66602 10.0003C1.66602 14.6003 5.39935 18.3337 9.99935 18.3337C14.5993 18.3337 18.3327 14.6003 18.3327 10.0003" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <g opacity="0.4">
                                <path d="M10.834 9.16732L17.6673 2.33398" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.3336 5.69199V1.66699H14.3086" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                            </svg>                        
                            <p>Log Out</p>
                          </button>
                      </div>
                  </div>
              </div>
            </div>
          </div>
  )
}

export default ProfileMenu