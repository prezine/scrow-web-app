import React, { useEffect, useRef, useState } from 'react'
import ModalWrap from '../../Elements/Modal/ModalWrap'
import TemplatePage from '../../Elements/Wraps/TemplatePage'
import KYC from './KYC/KYC.jsx'
import JumpQ from '../../../assets/media/logos/jumpQ.png'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import AccountTypeModal from './KYC/KYCModals/AccountTypeModal'
import useUser from '../../../hooks/stores/useUser'
import Alert from '../../Elements/Alerts/Alert'

const NewUser = ({handleSubmitClick, submitting}) => {


    const [openIntro, setOpenIntro] = useState(false)
    const [openAccountModal, setOpenAccountModal] = useState(false)
    const {userDataValue, businessDataValue}  = useUser()
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    const timerRef = useRef(null)

    useEffect(() => {
        if(userDataValue && userDataValue.pops.welcome_pop == 0){
            timerRef.current = setTimeout(() => {
                setOpenIntro(true)
            }, 500);
        }else{
            if((userDataValue && userDataValue.pops.select_account_pop == 0)){
                timerRef.current = setTimeout(() => {
                    setOpenAccountModal(true)
                }, 500);
            }
        }
    
      return () => {
        clearTimeout(timerRef.current)
      }
    }, [])

    useEffect(() => {
        let timeoutId;
        if (openAlert) {
          timeoutId = setTimeout(() => {
            setOpenAlert(false);
          }, alertValues.duration);
        }
        return () => {
          clearTimeout(timeoutId);
        };
      }, [openAlert]);

    
  return (
    <TemplatePage centerHeader headerTitle={`Welcome ${userDataValue ? userDataValue.name.split(' ')[0] : ''}`} headerDescription={'Lets get you started with Pandascrow 🚀'}>
        <div className='mx-auto pt-16 pb-14 sm:w-ninetyPercent md:w-eightyPercent mds:w-ninetyFivePercent lg:w-sixtyFivePercent max-w-650'>
            <div className="bg-white border-2 border-brandGray2x rounded-twenty mx-auto px-8 py-4">
                <div className='flex flex-col md:flex-row justify-between gap-10 py-4'>
                    <div className='flex items-center gap-5'>
                        <svg width="37" height="37" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13.125" cy="13.125" r="13.125" fill="#0B0B0C"/>
                            <path opacity="0.4" d="M12.75 19.75C16.2018 19.75 19 16.9518 19 13.5C19 10.0482 16.2018 7.25 12.75 7.25C9.29822 7.25 6.5 10.0482 6.5 13.5C6.5 16.9518 9.29822 19.75 12.75 19.75Z" fill="white"/>
                            <path d="M10.25 15.2187C10.1313 15.2187 10.0125 15.1749 9.91876 15.0812L8.66876 13.8312C8.48751 13.6499 8.48751 13.3499 8.66876 13.1687L9.91876 11.9187C10.1 11.7374 10.4 11.7374 10.5813 11.9187C10.7625 12.0999 10.7625 12.3999 10.5813 12.5812L9.66251 13.4999L10.5813 14.4187C10.7625 14.5999 10.7625 14.8999 10.5813 15.0812C10.4875 15.1749 10.3688 15.2187 10.25 15.2187Z" fill="white"/>
                            <path d="M15.25 15.2187C15.1312 15.2187 15.0125 15.1749 14.9187 15.0812C14.7375 14.8999 14.7375 14.5999 14.9187 14.4187L15.8375 13.4999L14.9187 12.5812C14.7375 12.3999 14.7375 12.0999 14.9187 11.9187C15.1 11.7374 15.4 11.7374 15.5812 11.9187L16.8312 13.1687C17.0125 13.3499 17.0125 13.6499 16.8312 13.8312L15.5812 15.0812C15.4875 15.1749 15.3687 15.2187 15.25 15.2187Z" fill="white"/>
                            <path d="M12.125 15.4249C12.0625 15.4249 12 15.4124 11.9438 15.3874C11.7063 15.2874 11.5938 15.0124 11.7 14.7686L12.95 11.8498C13.05 11.6123 13.325 11.4998 13.5625 11.6061C13.8 11.7061 13.9125 11.9811 13.8062 12.2249L12.5562 15.1436C12.4812 15.3186 12.3062 15.4249 12.125 15.4249Z" fill="white"/>
                        </svg>
                        <p className='font-avenirHeavy'>Try Pandascrow in Sandbox</p>
                    </div>
                    <button type="button" className='flex items-center self-end lg:self-auto gap-3 text-brandBlue1x text-xs' aria-label='click to view sandbox details' title='click to view sandbox details'>
                        Sandbox details
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.19 6.8374L10.3 11.7274C9.7225 12.3049 8.7775 12.3049 8.2 11.7274L3.31 6.8374" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div className='flex flex-col md:flex-row justify-between gap-10 py-4'>
                    <div className='flex items-center gap-5'>
                        <svg width="37" height="37" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13.125" cy="13.375" r="13.125" fill="#FF9800"/>
                            <path opacity="0.4" d="M17.1688 18.6374C17.05 18.6374 16.9313 18.5937 16.8375 18.4999C16.6563 18.3187 16.6563 18.0187 16.8375 17.8374C19.0938 15.5812 19.0938 11.9124 16.8375 9.66245C16.6563 9.4812 16.6563 9.1812 16.8375 8.99995C17.0188 8.8187 17.3188 8.8187 17.5 8.99995C20.1188 11.6187 20.1188 15.8812 17.5 18.4999C17.4063 18.5937 17.2875 18.6374 17.1688 18.6374Z" fill="white"/>
                            <path opacity="0.4" d="M8.33126 18.6374C8.21251 18.6374 8.09376 18.5937 8.00001 18.4999C5.38126 15.8812 5.38126 11.6187 8.00001 8.99995C8.18126 8.8187 8.48126 8.8187 8.66251 8.99995C8.84376 9.1812 8.84376 9.4812 8.66251 9.66245C6.40626 11.9187 6.40626 15.5874 8.66251 17.8374C8.84376 18.0187 8.84376 18.3187 8.66251 18.4999C8.56876 18.5937 8.45001 18.6374 8.33126 18.6374Z" fill="white"/>
                            <path opacity="0.4" d="M12.75 20.4437C11.9688 20.4375 11.225 20.3125 10.5313 20.0687C10.2875 19.9812 10.1563 19.7125 10.2438 19.4687C10.3313 19.225 10.5938 19.0937 10.8438 19.1812C11.4438 19.3875 12.0813 19.5 12.7563 19.5C13.425 19.5 14.0688 19.3875 14.6625 19.1812C14.9063 19.1 15.175 19.225 15.2625 19.4687C15.35 19.7125 15.2188 19.9812 14.975 20.0687C14.275 20.3125 13.5313 20.4437 12.75 20.4437Z" fill="white"/>
                            <path opacity="0.4" d="M14.8125 8.33743C14.7625 8.33743 14.7063 8.33116 14.6563 8.31241C14.0563 8.10616 13.4125 7.99365 12.7438 7.99365C12.075 7.99365 11.4375 8.10616 10.8375 8.31241C10.5938 8.39366 10.325 8.26868 10.2375 8.02493C10.15 7.78118 10.2813 7.51242 10.525 7.42492C11.2188 7.18117 11.9688 7.05615 12.7438 7.05615C13.5188 7.05615 14.2688 7.18117 14.9625 7.42492C15.2063 7.51242 15.3375 7.78118 15.25 8.02493C15.1875 8.21868 15.0063 8.33743 14.8125 8.33743Z" fill="white"/>
                            <path d="M10.7125 13.7501V12.7063C10.7125 11.4063 11.6313 10.8751 12.7563 11.5251L13.6625 12.0501L14.5688 12.5751C15.6938 13.2251 15.6938 14.2876 14.5688 14.9376L13.6625 15.4626L12.7563 15.9876C11.6313 16.6376 10.7125 16.1063 10.7125 14.8063V13.7501Z" fill="white"/>
                        </svg>
                        <p className='font-avenirHeavy'>Learn how to integrate Pandascrow</p>
                    </div>
                    <a href="https://pandascrow.readme.io/" target='_blank' className='flex items-center self-end lg:self-auto gap-3 text-brandBlue1x text-xs'>
                        See documentation
                        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4857 15.3053L17.4857 8.86705L11.0475 8.86705" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path opacity="0.4" d="M8.47011 17.8827L17.3956 8.95728" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>


                <div className='flex flex-col md:flex-row justify-between gap-10 py-4'>
                    <div className='flex items-center gap-5'>
                        <svg width="37" height="37" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13.125" cy="13.625" r="13.125" fill="#3BB75E"/>
                            <path d="M14.3375 7.67505C13.5688 7.67505 12.9438 8.30005 12.9438 9.0688V11.9688C12.9438 12.7376 13.5688 13.3626 14.3375 13.3626C15.1063 13.3626 15.7313 12.7376 15.7313 11.9688V9.0688C15.7313 8.3063 15.1063 7.67505 14.3375 7.67505Z" fill="white"/>
                            <path opacity="0.4" d="M17.8625 10.9436C17.1937 10.9436 16.65 11.4874 16.65 12.1561V13.1374C16.65 13.2686 16.7562 13.3749 16.8875 13.3749H17.8687C18.5375 13.3749 19.0812 12.8311 19.0812 12.1624C19.0812 11.4936 18.5312 10.9436 17.8625 10.9436Z" fill="white"/>
                            <path d="M10.5625 10.8687H7.6625C6.89375 10.8687 6.26875 11.4937 6.26875 12.2624C6.26875 13.0312 6.89375 13.6562 7.6625 13.6562H10.5625C11.3313 13.6562 11.9562 13.0312 11.9562 12.2624C11.9562 11.4937 11.3313 10.8687 10.5625 10.8687Z" fill="white"/>
                            <path opacity="0.4" d="M10.7437 7.51245C10.075 7.51245 9.53123 8.0562 9.53123 8.72495C9.53123 9.3937 10.075 9.93745 10.7437 9.93745H11.725C11.8562 9.93745 11.9625 9.8312 11.9625 9.69995V8.7187C11.9562 8.06245 11.4125 7.51245 10.7437 7.51245Z" fill="white"/>
                            <path d="M11.1437 14.6438C10.375 14.6438 9.74997 15.2688 9.74997 16.0376V18.9376C9.74997 19.7063 10.375 20.3313 11.1437 20.3313C11.9125 20.3313 12.5375 19.7063 12.5375 18.9376V16.0376C12.5375 15.2688 11.9125 14.6438 11.1437 14.6438Z" fill="white"/>
                            <path opacity="0.4" d="M8.59998 14.6438H7.61873C6.94998 14.6438 6.40623 15.1876 6.40623 15.8563C6.40623 16.5251 6.94998 17.0688 7.61873 17.0688C8.28748 17.0688 8.83123 16.5251 8.83123 15.8563V14.8751C8.83123 14.7501 8.72498 14.6438 8.59998 14.6438Z" fill="white"/>
                            <path d="M17.8187 14.3562H14.9187C14.15 14.3562 13.525 14.9812 13.525 15.75C13.525 16.5187 14.15 17.1437 14.9187 17.1437H17.8187C18.5875 17.1437 19.2125 16.5187 19.2125 15.75C19.2125 14.9812 18.5875 14.3562 17.8187 14.3562Z" fill="white"/>
                            <path opacity="0.4" d="M14.7375 18.0437H13.7562C13.625 18.0437 13.5187 18.1499 13.5187 18.2812V19.2624C13.5187 19.9312 14.0625 20.475 14.7312 20.475C15.4 20.475 15.9437 19.9312 15.9437 19.2624C15.95 18.5874 15.4062 18.0437 14.7375 18.0437Z" fill="white"/>
                        </svg>
                        <p className='font-avenirHeavy'>Join our developer community</p>
                    </div>
                    <a href="https://join.slack.com/t/pandascrowhq/shared_invite/zt-18ib5j3o0-jXSR1~3bS_8F0vr8LPGwMw" target='_blank' className='flex items-center self-end lg:self-auto gap-3 text-brandBlue1x text-xs'>
                        Join Slack
                        <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4857 15.3053L17.4857 8.86705L11.0475 8.86705" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path opacity="0.4" d="M8.47011 17.8827L17.3956 8.95728" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>

            {/* <p>{userDataValue.acc_type == 1 ? 'business' : 'personal'} {userDataValue.acc_type}</p> */}

            <div>
                <KYC key={'kyc'} handleSubmitClick={handleSubmitClick} submitting={submitting} currentAccountType={userDataValue ? userDataValue.acc_type == 1 ? 'business' : 'personal' : 'personal'} />
            </div>

            <ModalWrap key={'openIntroModal'} id={'openIntroModal'} modalState={openIntro} handleModal={()=>{setOpenIntro(false); setOpenAccountModal(true)}}>
                <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-sm h-fit'>
                    <div className="w-fit mx-auto pb-3">
                        {/* <img src={JumpQ} alt="" className='w-12 aspect-square' /> */}
                        <svg className='h-12 w-12' width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.2385 11.3964C38.5936 13.9623 39.3033 16.8215 39.3058 19.7252C39.2664 24.3892 37.4678 28.8653 34.2717 32.2532C31.0756 35.641 26.7191 37.6894 22.0784 37.9862V31.6826C23.5651 31.3427 24.8748 30.4655 25.7574 29.2184C26.64 27.9713 27.0337 26.4417 26.8632 24.922C26.6927 23.4022 25.97 21.9986 24.8332 20.9794C23.6963 19.9603 22.225 19.3969 20.7002 19.3969C19.1755 19.3969 17.7041 19.9603 16.5673 20.9794C15.4304 21.9986 14.7078 23.4022 14.5373 24.922C14.3668 26.4417 14.7604 27.9713 15.6431 29.2184C16.5257 30.4655 17.8354 31.3427 19.322 31.6826V38C14.6814 37.7032 10.3248 35.6549 7.12873 32.267C3.93263 28.8791 2.13403 24.403 2.09469 19.739C2.07459 17.0638 2.65391 14.4182 3.78986 11.9977C2.86287 11.6052 2.04502 10.9924 1.40687 10.2121C0.768714 9.43177 0.329429 8.50743 0.126913 7.51884C-0.0756029 6.53024 -0.0352668 5.50706 0.244441 4.53759C0.524149 3.56812 1.03483 2.68147 1.73241 1.95414C2.43 1.22681 3.29355 0.680649 4.24854 0.36278C5.20353 0.0449107 6.22129 -0.0351203 7.214 0.129592C8.20672 0.294305 9.14457 0.698814 9.94663 1.30822C10.7487 1.91762 11.3909 2.71362 11.8178 3.62753C14.365 2.27879 17.1854 1.53046 20.0643 1.43943C22.9433 1.34841 25.805 1.91709 28.4319 3.10223C28.9001 2.29159 29.5448 1.5975 30.3179 1.07178C31.091 0.546049 31.9725 0.202261 32.8966 0.0660753C33.8207 -0.0701105 34.7636 0.00482371 35.6548 0.285284C36.5459 0.565744 37.3625 1.04448 38.0434 1.68577C38.7243 2.32706 39.252 3.11433 39.5871 3.98881C39.9222 4.86329 40.0561 5.8024 39.9787 6.73604C39.9013 7.66967 39.6147 8.57372 39.1402 9.38069C38.6657 10.1877 38.0156 10.8767 37.2385 11.3964Z" fill="#BABABA"/>
                        </svg>
                    </div>
                    <div className='text-center'>
                        <h1 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>{businessDataValue ? businessDataValue.businessname : ''}</h1>
                        <p className='text-sm text-black'>Welcome to Pandascrow</p>
                    </div>
                    <div className='py-5 text-center'>
                        <p>Your account is presently restricted pending completion of your KYC process. Please provide your compliance document to activate your account.</p>
                    </div>
                    <div className='mx-auto flex justify-center'>
                        <ButtonPrimary text={'Let’s go'} handleClick={()=>{setOpenIntro(false); setOpenAccountModal(true)}} />
                    </div>
                </div>
            </ModalWrap>

            <AccountTypeModal key={'accountTypeModal'} isModalOpen={openAccountModal} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={()=>setOpenAccountModal(false)} setAccountType={''} />
        </div>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </TemplatePage>
  )
}

export default NewUser