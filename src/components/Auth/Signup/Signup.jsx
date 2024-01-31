import React, { useEffect, useLayoutEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useDocTitle from '../../../hooks/DocumentTitle'
import useIsAuthPage from '../../../hooks/stores/useIsAuthPage'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import AltAuthWrap from '../Elements/Wrap/AltAuthWrap'
import AuthFormWrap from '../Elements/Form/AuthFormWrap'
import AuthInput from '../Elements/Form/AuthInput'
import AuthPassword from '../Elements/Form/AuthPassword'
import AuthSelect from '../Elements/Form/AuthSelect'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import axios from 'axios'
import useSWR from 'swr'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import useFormatPhoneNumber from '../../../utils/useFormatPhoneNumber'
import useFormatPhoneTest from '../../../utils/useFormatPhoneTest'
import PhoneInput from '../../Elements/Form/PhoneInput'
import useCrypto from '../../../utils/useCrypto'
import Alert from '../../Elements/Alerts/Alert'

YupPassword(Yup)



const Signup = () => {

  useDocTitle('Pandascrow - Sign Up')
  const location = useLocation()

  const {requestHeaders} = useRequestHeaders()

  
  const [submitting, setSubmitting] = useState(false)
  const [referralCode, setReferralCode] = useState(location.pathname.split('join/')[1])
  const [referrerName, setReferrerName] = useState('')
  const [referrerCodeValid, setReferrerCodeValid] = useState(false)
  const [referrerMessage, setReferrerMessage] = useState('')
  const [hasReferrer, setHasReferrer] = useState(location.pathname.split('join/')[1] !== undefined)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

  const {encryptData, decryptData} = useCrypto()



  

  const setIsAuthPage = useIsAuthPage(state=>state.setIsAuthPage)

  const [minimumEight, setMinimumEight] = useState(0);
  const [oneUpper, setOneUpper] = useState(0);
  const [oneLower, setOneLower] = useState(0);
  const [oneNumber, setOneNumber] = useState(0);
  
  const fetcher = async (url) => axios.get(url, requestHeaders)

  const refData = useSWR(`${import.meta.env.VITE_BASEURL}/user/ref?ref_token=${referralCode || ""}`, fetcher, {
    onSuccess: (data) => {
      // console.log('data', data);
      if(data.data.data.name && data.data.status == true){
        setReferrerCodeValid(true)
        setReferrerName(data.data.data.name)
        setReferrerMessage(data.data.data.message)
      }else if(data.data.status == false){
        setReferrerCodeValid(false)
        setReferrerMessage(data.data.data.message)
      }
      // console.log(hasReferrer);
      // console.log(referrerName);
      // console.log(referrerMessage);
    }
  })

  const formik = useFormik({
    initialValues : {
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      country:'',
      phone:''
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
      password: Yup
        .string()
        .required('Password Required')
        .minLowercase(1, 'Password must contain at least 1 lower case letter')
        .minUppercase(1, 'Password must contain at least 1 upper case letter')
        .minNumbers(1, 'Password must contain at least 1 number')
        // .minSymbols(1, 'Password must contain at least 1 special character'),
        .min(8, 'Password must be up to eight (8) characters'),
        phone: Yup
        .string()
        .required('Phone number required')
        .min(11, 'Phone number must be at least 11 digits')
        .max(14, 'Phone number must not be more than 14 digits')
        .test('isValid', 'Invalid phone number', function(value) {
          const formattedPhoneNumber = useFormatPhoneTest(value);
          return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
        }),
      country: Yup.string()
        .required("Please select an option")      
    })
  })

  const strength = minimumEight + oneNumber + oneUpper + oneLower
  

  useEffect(() => {
    if (formik.values.password.length >= 8) {
      setMinimumEight(1);
    }else{
      setMinimumEight(0);
    }
    if (/[A-Z]/.test(formik.values.password)) {
      setOneUpper(1);
    }else{
      setOneUpper(0)
    }
    if (/[a-z]/.test(formik.values.password)) {
      setOneLower(1);
    }else{
      setOneLower(0)
    }
    if (/[0-9]/.test(formik.values.password)) {
      setOneNumber(1);
    }else{
      setOneNumber(0)
    }
  }, [formik.values.password]);
  
  // console.log({ minimumEight, oneUpper, oneLower, oneNumber });
  


  const handleSignUp = (e) => {
    e.preventDefault()
    if(formik.errors.firstName || formik.errors.lastName || formik.errors.country || formik.errors.phone ||  formik.errors.email || formik.errors.password){
      return
    }


    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('name', `${formik.values.firstName} ${formik.values.lastName}`)
    formData.append('email', formik.values.email)
    formData.append('password', encryptData(formik.values.password))
    formData.append('country', formik.values.country)
    formData.append('phone', formik.values.phone)
    if(refData.data && hasReferrer && referrerName && referralCode && referrerCodeValid){
      formData.append('ref_token', referralCode)
    }

    try {

        // console.log(formik.values);
        // const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);

        axios.post(`${import.meta.env.VITE_BASEURL}/auth/signup`, formData, requestHeaders)
        .then((res)=>{
          // console.log('signup', res);
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
                // console.log(res.data.data.message);
            }else if (res.data.status == true && res.data.data.message && res.data.data.userID) {
                setOpenAlert(true)
                localStorage.setItem('panda_userID', JSON.stringify(res.data.data.userID))
                axios.get(`${import.meta.env.VITE_BASEURL}/user/profile/fetch?userID=${res.data.data.userID}`, requestHeaders)
                .then((res)=>{
                  // console.log('Signup user ', res);
                  if(res.data.status == true && res.data.data.user){
                    localStorage.setItem('panda_userData', JSON.stringify(res.data))
                  }
                  else if(res.data.status == false && res.data.data.message){
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
                    // console.log(res.data.data.message);
                  }
                })
                setAlertValues({...alertValues, message:`Sign up successful. Redirecting to verify phone. `, type:`success` })

                setTimeout(() => {
                  window.location.href = '/auth/verify/phone'
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


  useLayoutEffect(() => {
    setIsAuthPage(true)
  
    return () => {
      setIsAuthPage(false)
    };

  }, [])

  

  const handlePhoneInputChange = (e, handleChange) => {
    const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
    handleChange({ target: { name: 'phone', value: formattedPhoneNumber } });
  }
  

  return (
    <AltAuthWrap tip={'Choose a strong and unique password that includes a combination of letters, numbers, and special characters. Avoid using personal information such as your name or birthdate, and never reuse passwords across different accounts. Enabling two-factor authentication can also add an extra layer of security to your account.'}>
      <AuthFormWrap handleSubmit={formik.handleSubmit} gap={'gap-4'}>
        {
          (refData.data && hasReferrer && referrerName && referralCode && referrerCodeValid) &&
          <div className={`px-4 md:px-8 py-3.5 border-2 border-brandLightBlue1x bg-brandLightBlue4x rounded-five text-left`}>
            <p className={`text-brandGray43x text-xs md:text-sm`} >{referrerMessage}</p>
          </div>
        }
        {
          (refData.data && hasReferrer && !referrerName && referralCode && !referrerCodeValid) &&
          <div className={`px-4 md:px-8 py-3.5 border-2 border-brandLightRed2x ${(!refData.data || !referrerMessage || referrerCodeValid) ? '' : 'bg-brandLightRed3x'} rounded-five text-left`}>
            <p className={`text-brandRed1x text-xs md:text-sm`} >{referrerMessage}</p>
          </div>
        }
        <div className="flex flex-col md:flex-row gap-6">
          <div className='w-full md:w-fiftyPercent'>
            <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.firstName} fieldError={formik.touched.firstName && formik.errors.firstName} inputLabel={'First name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'firstName'} inputId={'firstName'}  />
          </div>
          <div className='w-full md:w-fiftyPercent'>
            <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.lastName} fieldError={formik.touched.lastName && formik.errors.lastName} inputLabel={'Last name'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'text'} inputName={'lastName'} inputId={'lastName'}  />
          </div>
        </div>
        <AuthInput paddingY={'py-3'} fontSize={'text-base'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} inputLabel={'Email address'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'email'} inputName={'email'} inputId={'email'}  />
        <AuthPassword handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.password} fieldError={formik.touched.password && formik.errors.password} inputLabel={'Password'} inputName={'password'} inputId={'password'} paddingY={'py-3'} fontSize={'text-base'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} eyeIcon />
        {(formik.touched.password && formik.errors.password) && <p className="text-xs text-brandRed1x">{formik.errors.password}</p>}
        <div className={`bg-brandGray42x h-2 w-full`}>
          <div className={`transition-all duration-500 ease-in-out ${strength == 1 && 'bg-brandRed1x'} ${strength == 2 && 'bg-brandOrange2x'} ${strength == 3 && 'bg-brandGreen1x/50'} ${strength == 4 && 'bg-brandGreen1x'} h-full`} style={{width:`calc((${strength}/4) * 100%)`}} >
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className='w-full md:w-fiftyPercent'>
            <AuthSelect paddingY={'h-14'} fontSize={'text-base'}  selectPlaceholder={'Select'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} selectValue={formik.values.country} fieldError={formik.touched.country && formik.errors.country} selectLabel={'Country'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} selectName={'country'} selectId={'country'} >
              <option value={'Nigeria'}>Nigeria</option>
              <option value={'Ghana'}>Ghana</option>
              <option value={'Kenya'}>Kenya</option>
              <option value={'United States'}>United States</option>
            </AuthSelect>
          </div>
         <div className='w-full md:w-fiftyPercent'>
          <fieldset className='gap-2.5 flex flex-col col-span-1'>
            <label htmlFor="phone" className='text-black font-avenirMedium text-lg'>Phone</label>
            <PhoneInput maxLength={15} id={'phone'} name={'phone'} value={formik.values.phone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} className={`px-4 py-3 text-sm bg-transparent autofill:bg-transparent rounded-five border-2 ${formik.touched.phone && formik.errors.phone ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} required />
            {/* {(formik.touched.phone && formik.errors.phone) && <p className="text-xs text-brandRed1x">{formik.errors.phone}</p>} */}
          </fieldset>
         </div>
        </div>

        <div>
          <p className='text-xs text-brandGray20x text-center'>On Clicking “Create my account” you agree to the Scrow <NavLink to={'#'} className="text-brandDarkViolet1x">Privacy Policy</NavLink> and <NavLink to={'#'} className="text-brandDarkViolet1x">Terms of Service</NavLink>. You will receive an email verification link and also receive a one-time verification code to your phone number by SMS. Message and data rates may apply.</p>
        </div>

        <ButtonPrimary disabled={submitting} disabledBgColor={'bg-brandGray16x'} handleClick={handleSignUp} text={'Create my account'} type={'button'} width={'w-full'} />
        <div className={`text-center`}>
            <p className={`font-avenirMedium`}>Have an account? <NavLink to={'/auth/login'} className={`text-brandBlue1x underline underline-offset-2`}>Sign In </NavLink></p>
        </div>
      </AuthFormWrap>
      <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
    </AltAuthWrap>
  )
}

export default Signup