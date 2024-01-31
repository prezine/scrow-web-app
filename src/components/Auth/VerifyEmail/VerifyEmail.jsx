import React, {useEffect, useLayoutEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../../../assets/media/logos/logo-blue-text.png'
import useIsAuthPage from '../../../hooks/stores/useIsAuthPage'
import EmailVerified from '../../../assets/media/images/email-verified.png'
import useUser from '../../../hooks/stores/useUser'
import axios from 'axios'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import useGetUser from '../../../utils/useGetUser'
import useSWR from 'swr'
import {PuffLoader } from 'react-spinners'
import Alert from '../../Elements/Alerts/Alert'


const VerifyEmail = ({id}) => {

    const {userDataValue} = useUser()

    const {userData} = useGetUser()

    const [code, setCode] = useState(location.pathname.split('email/')[1])
    const [hasCode, setHasCode] = useState(location.pathname.split('email/')[1] !== undefined)
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
        message:"",
        type:'warning',
        duration:2500
      })

    const [emailVerified, setEmailVerified] = useState(false)
  
    const setIsAuthPage = useIsAuthPage(state=>state.setIsAuthPage)

    const {requestHeaders} = useRequestHeaders()

    useLayoutEffect(() => {
        setIsAuthPage(true)
      
        return () => {
          setIsAuthPage(false)
        };
      }, [])

    const fetcher = async (url) => {
        const formData = new FormData()
        if(hasCode && code.length > 2){
            formData.append('code', code.split('/')[0])
            formData.append('userID', code.split('/')[1])
        }
        const res =  await axios.post(url, formData, requestHeaders)
            return res
    };
      
    const email = useSWR(`${import.meta.env.VITE_BASEURL}/auth/verify/email`, fetcher, {
        onSuccess: (data)=>{
            console.log(data.data.status);
            setOpenAlert(false)
            if(data.data.status == true && data.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`${data.data.data.message}`, type:`success` })
                setEmailVerified(true)
            }else if(data.data.status == false && data.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`${data.data.data.message}`, type:`warning` })
            }
        },
        onError: (err) => {
            console.log(err);
        }
    })

    
    if(hasCode && code.length > 2 && emailVerified == false) {
        return  <div className='bg-brandLightBlue2x min-h-screen px-4 sm:px-8 md:px-10'>
            <div className='sm:w-ninetyPercent md:w-eightyPercent lg:w-sixtyPercent max-w-lg mx-auto py-32 flex flex-col items-center'>
                <div className='pb-9'>
                    <img src={Logo} alt='logo' className='xs:w-28 w-32' />
                </div>
                <div className='py-28'>
                    <div className='mx-auto w-fit'>
                        <PuffLoader color={'#2A2AB2'} />
                    </div>

                    <div className='pt-12 text-center'>
                        <h1 className='text-2xl md:text-3xl text-brandDarkViolet1x font-avenirHeavy'>Email Verifying <span className='animate-pulse'>...</span></h1>
                        <p className='text-sm md:text-base pt-5 text-brandGray6x'>Hi there, Patiently wait as we verify your email. It will take less than 60 seconds</p>
                    </div>

                </div>
            </div>
            <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
        </div>
    }




    // if(!data) return <div>ji</div>
    // if(error) return <div>jim</div>

    // console.log(data);

    // useEffect(()=>{
    //     setTimeout(() => {
    //         window.location.href = '/auth/login'
    //     }, 2000);
    // }, [emailVerified])
  
    return (
    <div id={id} className='bg-brandLightBlue2x min-h-screen px-4 sm:px-8 md:px-10'>
        <div className='sm:w-ninetyPercent md:w-eightyPercent lg:w-sixtyPercent max-w-lg mx-auto py-32 flex flex-col items-center'>
            <div className='pb-9'>
                <img src={Logo} alt='logo' className='xs:w-28 w-32' />
            </div>
            {
                emailVerified
                ?
                <div className='py-28'>
                    <div className='mx-auto w-fit'>
                        <div className='mx-auto w-fit'>
                            <img className='w-40' src={EmailVerified} alt="Male outline holding green checkmark" />
                        </div>
                    </div>

                    <div className='pt-12 text-center w-full'>
                        <h1 className='text-2xl md:text-3xl text-brandDarkViolet1x font-avenirHeavy'>Great Job, Email confirmed 🎉</h1>
                        <p className='text-sm md:text-base py-5 text-brandGray6x'>Your email has been verified successfully. Join thousands of users to stay from Scams by proceeding to your Pandascrow dashboard.</p>
                        <NavLink to={'/auth/login'} className={`flex text-center justify-center bg-brandDarkViolet1x w-full min-w-full text-white py-3 px-6 text-sm md:text-base rounded-ten`}>Continue with Login</NavLink>
                    </div>

                </div>
                :
                <div className='py-28'>
                    <div className='mx-auto w-fit'>
                        <svg width="105" height="116" viewBox="0 0 105 116" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.25 46.5V105C1.25 110.523 5.72715 115 11.25 115H93.75C99.2728 115 103.75 110.523 103.75 105V46.5M1.25 46.5L12.75 36M1.25 46.5L12.75 55.5673M103.75 46.5L94.25 36M103.75 46.5L94.25 54.2129M94.25 36V11C94.25 5.47715 89.7728 1 84.25 1H22.75C17.2272 1 12.75 5.47715 12.75 11V36M94.25 36V54.2129M12.75 36V55.5673M12.75 55.5673L53.25 87.5L94.25 54.2129" stroke="#2A2AB3" stroke-width="2"/>
                            <circle cx="52.25" cy="41.5" r="22" stroke="#2A2AB3" stroke-width="2"/>
                            <g clip-path="url(#clip0_16294_32306)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M36.25 41C36.25 36.7565 37.9357 32.6869 40.9363 29.6863C43.9369 26.6857 48.0065 25 52.25 25C56.4935 25 60.5631 26.6857 63.5637 29.6863C66.5643 32.6869 68.25 36.7565 68.25 41C68.25 45.2435 66.5643 49.3131 63.5637 52.3137C60.5631 55.3143 56.4935 57 52.25 57C48.0065 57 43.9369 55.3143 40.9363 52.3137C37.9357 49.3131 36.25 45.2435 36.25 41V41ZM51.3369 47.848L60.5487 36.3323L58.8847 35.0011L51.0297 44.8165L45.466 40.1808L44.1007 41.8192L51.3369 47.8501V47.848Z" fill="#30C56B"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_16294_32306">
                            <rect width="32" height="32" fill="white" transform="translate(36.25 25)"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div className='pt-12 text-center'>
                        <h1 className='text-2xl md:text-3xl text-brandDarkViolet1x font-avenirHeavy'>Check your email for verification link</h1>
                        <p className='text-sm md:text-base pt-5 text-brandGray6x'>We've sent an email to your inbox <span className='font-avenirBlack'>{userDataValue ? userDataValue.email : userData ? userData.email : ''}</span>, Check your email and confirm to activate your account.</p>
                    </div>

                </div>
            }

        </div>
    </div>
  )
}

export default VerifyEmail