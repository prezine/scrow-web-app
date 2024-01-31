import React, { useEffect, useLayoutEffect, useState } from 'react'
import useIsAuthPage from '../../../hooks/stores/useIsAuthPage'
import useUser from '../../../hooks/stores/useUser'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import AuthFormWrap from '../../Auth/Elements/Form/AuthFormWrap'
import AuthInput from '../../Auth/Elements/Form/AuthInput'
import Alert from '../../Elements/Alerts/Alert'
import SecuredByPandascrow from '../../Elements/Cards/SecuredByPandascrow'
import InvalidURL from '../../Elements/Sections/InvalidURL'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import useSWR from 'swr'
import useDocTitle from '../../../hooks/DocumentTitle'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import LogoWhite from '../../../assets/media/logos/logo-white.png'
import LogoWhiteOrangeText from '../../../assets/media/logos/logo-white-text-orange-line.png'
import CrowdPayBanner from '../../../assets/media/crowdpay-dummy-banner.png'
import PageLoaderNoNav from '../../Elements/Loaders/PageLoaderNoNav'
import FetchErrorNoNav from '../../Errors/FetchErrorNoNav'
import ShowMoreText from '../../Elements/Sections/ShowMoreText'
import useGetNumberOfLines from '../../../utils/useGetNumberOfLines'
import he from 'he'
import useAmountFormat from '../../../utils/useAmountFormat'

const CrowdPayDonate = () => {

    useDocTitle('Pandascrow - Crowdpay')
    const [token, setToken] = useState(location.pathname.split('donate/')[1])
    const [tokenExists, setTokenExists] = useState(false)
    const [hasToken, setHasToken] = useState(location.pathname.split('donate/')[1] !== undefined)
    const [submitting, setSubmitting] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [userID, setUserID] = useState('')
    const [numberOfLines, setNumberOfLines] = useState(0)
    const [numberOfTitleLines, setNumberOfTitleLines] = useState(0)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    const [fundImage, setFundImage] = useState('')
    const [fundTitle, setFundTitle] = useState('')
    const [fundDescription, setFundDescription] = useState('')

    const {requestHeaders} = useRequestHeaders()

    const {userDataValue} = useUser()

    const setIsAuthPage = useIsAuthPage(state=>state.setIsAuthPage)

    const fetcher = async (url) => {
        const res =  await axios.get(url, requestHeaders)
            return res
    };

    const formik = useFormik({
        initialValues : {
          first_name:'',
          last_name:'',
          email:'',
          amount_donate:"",
        },
        validationSchema : Yup.object({
            first_name : Yup.string()
                .min(2, 'Firstname should be two or more characters')
                .required('Firstname required'),
            last_name : Yup.string()
                .min(2, 'Lastname should be two or more characters')
                .required('Lastname required'),
            email: Yup
                .string()
                .email('Invalid email address')
                .required('Email Required'),
            amount_donate: Yup.number()
            .transform((value, originalValue) => {
              // Remove commas from the value
              if (typeof originalValue === "string") {
                return originalValue.replace(/,/g, "");
              }
              return originalValue;
            })
            .test("is-number", "Invalid number", (value) => {
              if (value) {
                // Check if the transformed value is a valid number
                return !isNaN(Number(value));
              }
              return true;
            })
            .transform((value, originalValue) => {
              // Convert the transformed value to a number
              return parseFloat(value);
            })
            .required("Amount required"),
        })
      })

    useLayoutEffect(() => {
        setIsAuthPage(true)
        
        return () => {
            setIsAuthPage(false)
        };
    }, [])

    const handleLines = () => {
        setNumberOfLines(useGetNumberOfLines())
        setNumberOfTitleLines(useGetNumberOfLines('title'))
    }

    useEffect(() => {
        handleLines()
    }, [fundDescription, fundTitle])


    useEffect(() => {
      window.addEventListener('resize', ()=>handleLines())
    
      return () => {
        window.removeEventListener('resize', ()=>handleLines())
      }
    }, [])
    
    

    const handleSubmit = () => {
        if(formik.errors.first_name || formik.errors.last_name || formik.errors.email || formik.errors.address || formik.errors.amount_donate || !token || token == undefined){
            return
        }

        setOpenAlert(false)
        setSubmitting(true)
        const formData = new FormData()
        formData.append('first_name', formik.values.first_name)
        formData.append('last_name', formik.values.last_name)
        formData.append('email', formik.values.email)
        formData.append('currency', 'NGN')
        formData.append('payref', hasToken && token)
        formData.append('amount_donate', formik.values.amount_donate.replaceAll(',', ''))

        try {

            const formValues = Object.fromEntries(formData.entries());
            console.log(formValues);
    
            axios.post(`${import.meta.env.VITE_BASEURL}/escrow/crowdpay/donate`, formData, requestHeaders)
            .then((res)=>{
                // console.log(res);
                if(res.data.status == false && res.data.data.message){
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                }else if (res.data.status == true && res.data.data.message) {
                    formik.resetForm()
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
                    setTimeout(() => {
                        window.location.href = res.data.data.paymentURL
                    }, 1000);
                }
    
                setSubmitting(false)
                
            })
            .catch((err)=>{
                console.error(err);
            })
            
        } catch (error) {
            console.error(error)
        }
    }
    
    const fetchToken = useSWR(`${import.meta.env.VITE_BASEURL}/crowdpay/validate/ref?payref=${token}`, fetcher, {
        onSuccess: (data) => {
            // console.log('Donate token validate => ', data);
            if(data.data.status == true){
                setTokenExists(true)
                setFundImage(data.data.data.donation_data.project_image)
                setFundTitle(he.decode(data.data.data.donation_data.project_name).replace('\\r\\n', ' '))
                setFundDescription(he.decode(data.data.data.donation_data.project_description).split('\\r\\n'))
            }else{
                setTokenExists(false)
            }
        }
    })

    if(!fetchToken.data) return <PageLoaderNoNav />
    if(fetchToken.error) return <FetchErrorNoNav />

  return (
    <div id={'donate'} className='bg-brandLightBlue2x min-h-screen w-full'>
        <div className='z-10 w-full h-72 lg:h-350 relative'>
            <img src={fundImage ? fundImage : CrowdPayBanner} alt="Crowdpay banner" className='object-cover aspect-video h-full w-full' />
            {fundImage && 
            <div className={`z-20 absolute top-0 left-0 bg-black/50 h-full w-full pt-5 px-4 sm:px-8 md:px-10 py-10`}>
                <img src={LogoWhite} alt="Pandascrow Logo" className='xs:w-10 w-12' />
            </div>}
        </div>
        <div className='w-full'>
            <div className='px-4 sm:px-8 md:px-10 pt-20 relative z-30 w-full -translate-y-80 lg:-translate-y-96'>
                <div className='sm:w-ninetyPercent md:w-eightyPercent mx-auto'>
                    <div className='text-center py-8 w-full'>
                        {/* <img src={LogoWhite} alt="Pandascrow Logo" className='w-12 py-8' /> */}
                        <h1 className='text-white font-avenirHeavy text-2xl lg:text-3xl text-center w-full one-lined-text'>{fundTitle || 'Title Donation'}</h1>
                        
                        {/* duplicated and hidden to ensure we get correct number of lines */}
                        <p id='title' className='text-white font-avenirHeavy text-2xl lg:text-3xl text-center w-full px-4 sm:px-8 md:px-10 invisible fixed top-0 left-0 sm:w-ninetyPercent md:w-eightyPercent -translate-y-hundredPercent'>{fundTitle || 'Title Donation'}</p>
                        
                        {
                            !fundDescription
                            ?
                            <p className='text-white pt-5'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <span className=''>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit. </span> 
                                <span className='underline font-avenirHeavy'> see more</span>
                            </p>
                            :
                            <p className='text-white pt-5 text-center'>
                                {/* duplicated and hidden to ensure we get correct number of lines */}
                                <p id={'terms'} className={`font-avenirLight px-4 sm:px-8 md:px-10 invisible fixed top-0 left-0 sm:w-ninetyPercent md:w-eightyPercent -translate-y-hundredPercent`}>
                                    {
                                        fundDescription.map((desc, idx)=>{
                                            return <span key={idx}>{desc}</span>
                                        })
                                    }
                                </p>
                                <p className={`font-avenirLight ${'two-lined-text'}`}>
                                    {
                                        fundDescription.map((desc, idx)=>{
                                            return <span key={idx}>{desc}</span>
                                        })
                                    }
                                </p>
                                {(numberOfLines > 2 || numberOfTitleLines > 1) && <button type='button' onClick={()=>setShowMore(prevShowMore => !prevShowMore)} className='font-avenirHeavy underline underline-offset-2 cursor-pointer text-right py-2 w-full'>{showMore ? 'Show less' : 'Show more'}</button>}
                            </p>
                        }
                    </div>
                    <div className='sm:w-ninetyPercent md:w-eightyPercent lg:w-sixtyPercent max-w-lg mx-auto'>
                        <AuthFormWrap  handleSubmit={formik.handleSubmit} gap={'gap-4'}>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className='w-full md:w-fiftyPercent'>
                                    <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.first_name} fieldError={formik.touched.first_name && formik.errors.first_name} inputLabel={'First name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'first_name'} inputId={'first_name'}  />
                                </div>
                                <div className='w-full md:w-fiftyPercent'>
                                    <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.last_name} fieldError={formik.touched.last_name && formik.errors.last_name} inputLabel={'Last name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'last_name'} inputId={'last_name'}  />
                                </div>
                            </div>
                            <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} inputLabel={'Email address'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'email'} inputName={'email'} inputId={'email'}  />
                            <fieldset className={`w-full gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                                <label htmlFor="amount_donate" className='text-lg font-avenirMedium text-black'>{`Amount to donate`}</label>
                                <div className="relative w-full">
                                    <input name='amount_donate' id='amount_donate' onChange={(e) => {useAmountFormat(e, formik, 'amount_donate')}} onBlur={formik.handleBlur} value={formik.values.amount_donate} className={`pl-12 pr-4 py-4 w-full font-spaceGroteskLight text-black placeholder:text-brandGray32x rounded-five border-2 ${formik.touched.amount_donate && formik.errors.amount_donate ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2`} />
                                    <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>NGN</span>
                                </div>
                            </fieldset>
                            <ButtonPrimary disabled={submitting} disabledBgColor={'bg-brandGray16x'} handleClick={handleSubmit} text={'Donate Now'} type={'button'} width={'w-full'} paddingY={'py-3'} />
                        </AuthFormWrap>
                        <div className='pt-9 mx-auto w-fit'>
                            <SecuredByPandascrow />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {fetchToken.data && !tokenExists && <InvalidURL />}

        <ShowMoreText modalState={showMore} handleModal={()=>{setShowMore(false)}} title={fundTitle} description={fundDescription ? fundDescription : []} buttonText={'Close Description'} />

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
    </div>
  )
}

export default CrowdPayDonate