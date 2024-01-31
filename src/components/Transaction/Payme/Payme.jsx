import React, { useLayoutEffect, useState } from 'react'
import useIsAuthPage from '../../../hooks/stores/useIsAuthPage'
import useUser from '../../../hooks/stores/useUser'
import Logo from '../../../assets/media/logos/logo-blue.png'
import AuthFormWrap from '../../Auth/Elements/Form/AuthFormWrap'
import AuthInput from '../../Auth/Elements/Form/AuthInput'
import PhoneInput from '../../Elements/Form/PhoneInput'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import Alert from '../../Elements/Alerts/Alert'
import PageLoaderNoNav from '../../Elements/Loaders/PageLoaderNoNav'
import useDocTitle from '../../../hooks/DocumentTitle'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import useFormatPhoneTest from '../../../utils/useFormatPhoneTest'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import useSWR from 'swr'
import useFormatPhoneNumber from '../../../utils/useFormatPhoneNumber'
import AuthTextArea from '../../Auth/Elements/Form/AuthTextArea'
import SecuredByPandascrow from '../../Elements/Cards/SecuredByPandascrow'
import InvalidURL from '../../Elements/Sections/InvalidURL'
import FetchErrorNoNav from '../../Errors/FetchErrorNoNav'
import useAmountFormat from '../../../utils/useAmountFormat'


const Payme = () => {
    useDocTitle('Pandascrow - Payme')
    const [nick, setNick] = useState(location.pathname.split('payme/')[1])
    const [nickExists, setNickExists] = useState(false)
    const [hasNick, setHasNick] = useState(location.pathname.split('payme/')[1] !== undefined)
    const [submitting, setSubmitting] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [userID, setUserID] = useState('')
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    const {requestHeaders} = useRequestHeaders()

    const {userDataValue} = useUser()

    const setIsAuthPage = useIsAuthPage(state=>state.setIsAuthPage)

    const formik = useFormik({
        initialValues : {
          firstName:'',
          lastName:'',
          email:'',
          address:'',
          phone:'',
          amount:"",
          description:"",
          screenshot:''
        },
        validationSchema : Yup.object({
            firstName : Yup.string()
                .min(2, 'Firstname should be two or more characters')
                .required('Firstname required'),
            lastName : Yup.string()
                .min(2, 'Lastname should be two or more characters')
                .required('Lastname required'),
            email: Yup
                .string()
                .email('Invalid email address')
                .required('Email Required'),
            address: Yup
                .string()
                .required('Delivery address required'),
            amount: Yup.number()
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
            description: Yup
                .string()
                .required('Description required'),
            phone: Yup
                .string()
                .required('Phone number required')
                .min(11, 'Phone number must be at least 11 digits')
                .max(14, 'Phone number must not be more than 14 digits')
                .test('isValid', 'Invalid phone number', function(value) {
                    const formattedPhoneNumber = useFormatPhoneTest(value);
                    return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
                }),  
            screenshot: Yup
            .string()  
            .url('Invalid Url')
            .nullable()
        })
      })

    useLayoutEffect(() => {
        setIsAuthPage(true)
        
        return () => {
            setIsAuthPage(false)
        };
    }, [])

    const fetcher = async (url) => {
        const formData = new FormData()
        if(hasNick && nick.length > 2){
            formData.append('nick', nick)
            formData.append('userID', userID)
        }
        const res =  await axios.post(url, formData, requestHeaders)
            return res
    };

   

    const handlePhoneInputChange = (e, handleChange) => {
        const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
        handleChange({ target: { name: 'phone', value: formattedPhoneNumber } });
    }

    const handleSubmit = () => {
        if(formik.errors.firstName || formik.errors.lastName || formik.errors.email || formik.errors.phone || formik.errors.address || formik.errors.amount || !userID || !nick){
            return
        }

        setOpenAlert(false)
        setSubmitting(true)
        const formData = new FormData()
        formData.append('userID', userID)
        formData.append('fullname', `${formik.values.firstName} ${formik.values.lastName}`)
        formData.append('email', formik.values.email)
        formData.append('phone', formik.values.phone)
        formData.append('address', formik.values.address)
        formData.append('amount', formik.values.amount.replaceAll(',', ''))
        formData.append('description', formik.values.description)
        formData.append('payme_nick', nickExists && nick)
        formData.append('screenshot', `https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZG9jdW1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60`)

        try {

            const formValues = Object.fromEntries(formData.entries());
            console.log(formValues);
    
            axios.post(`${import.meta.env.VITE_BASEURL}/escrow/payme-transaction`, formData, requestHeaders)
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
                        window.location.href = res.data.data.payment_data.authorization_url
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

    const fetchNick = useSWR(`${import.meta.env.VITE_BASEURL}/payme/check-nick`, fetcher, {
        onSuccess: (data) => {
            // console.log('Inner Payme', data.data.status);
            if(data.data.status !== true && data.data.data.userID){
                setUserID(data.data.data.userID)
                setNickExists(true)
            }else{
                setNickExists(false)
            }
        }
    })

    if(!fetchNick.data) return <PageLoaderNoNav />
    if(fetchNick.error) return <FetchErrorNoNav />

  return (
    <div id={'payme'} className='bg-brandLightBlue2x min-h-screen px-4 sm:px-8 md:px-10 py-10'>
    <div className='flex flex-col md:flex-row gap-8 md:gap-0 h-full'>
            <div className='pb-9'>
                <img src={Logo} alt='logo' className='xs:w-10 w-12' />
            </div>
            <div className='w-full flex h-full md:px-8'>
                <div className='w-full sm:w-ninetyPercent md:w-eightyPercent lg:w-sixtyPercent max-w-lg mx-auto'>
                    <AuthFormWrap  handleSubmit={formik.handleSubmit} gap={'gap-4'}>
            
                        <div className="flex flex-col md:flex-row gap-6">
                        <div className='w-full md:w-fiftyPercent'>
                            <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.firstName} fieldError={formik.touched.firstName && formik.errors.firstName} inputLabel={'First name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'firstName'} inputId={'firstName'}  />
                        </div>
                        <div className='w-full md:w-fiftyPercent'>
                            <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.lastName} fieldError={formik.touched.lastName && formik.errors.lastName} inputLabel={'Last name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'lastName'} inputId={'lastName'}  />
                        </div>
                        </div>
                        <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} inputLabel={'Email address'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'email'} inputName={'email'} inputId={'email'}  />
                        <fieldset className={`w-full gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                            <label htmlFor="amount" className='text-lg font-avenirMedium text-black'>{`Amount`}</label>
                            <div className="relative w-full">
                                <input name='amount' id='amount' onChange={(e) => {useAmountFormat(e, formik, 'amount')}} onBlur={formik.handleBlur} value={formik.values.amount} className={`pl-12 pr-4 py-4 w-full font-spaceGroteskLight text-black placeholder:text-brandGray32x rounded-five border-2 ${formik.touched.amount && formik.errors.amount ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2`} />
                                <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>NGN</span>
                            </div>
                        </fieldset>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className='w-full md:w-fiftyPercent'>
                                <fieldset className='gap-2.5 flex flex-col col-span-1'>
                                    <label htmlFor="phone" className='text-black font-avenirMedium text-lg'>Phone</label>
                                    <PhoneInput maxLength={15} id={'phone'} name={'phone'} value={formik.values.phone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} className={`px-4 py-3 text-base bg-transparent autofill:bg-transparent rounded-five border-2 ${formik.touched.phone && formik.errors.phone ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} required />
                                    {/* {(formik.touched.phone && formik.errors.phone) && <p className="text-xs text-brandRed1x">{formik.errors.phone}</p>} */}
                                </fieldset>
                            </div>
                            <div className='w-full md:w-fiftyPercent'>
                                <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.address} fieldError={formik.touched.address && formik.errors.address} inputLabel={'Delivery Address'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputName={'address'} inputId={'address'}  />
                            </div>
                        </div>
                        <AuthTextArea paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} textAreaValue={formik.values.description} fieldError={formik.touched.description && formik.errors.description} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} />
                        <fieldset className='py-2'>
                            <label htmlFor='screenshot' className='text-sm font-spaceGroteskRegular text-brandGreen1x' >+ Upload screenshot (Optional)</label>
                            <input type="file" name='screenshot' id='screenshot' className='hidden' />
                        </fieldset>
                        <ButtonPrimary disabled={submitting} disabledBgColor={'bg-brandGray16x'} handleClick={handleSubmit} text={'Pay Now'} type={'button'} width={'w-full'} paddingY={'py-3'} />
                    </AuthFormWrap>
                    <div className='pb-5 pt-9 mx-auto w-fit'>
                        <SecuredByPandascrow />
                    </div>
                    {fetchNick.data && !nickExists && <InvalidURL />}
                    <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
                </div>
            </div>
    </div>
    </div>
  )
}

export default Payme