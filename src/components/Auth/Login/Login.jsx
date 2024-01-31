import React, { useEffect, useLayoutEffect, useState } from 'react'
import useIsAuthPage from '../../../hooks/stores/useIsAuthPage'
import AuthFormWrap from '../Elements/Form/AuthFormWrap'
import AuthWrap from '../Elements/Wrap/AuthWrap'
import useDocTitle from '../../../hooks/DocumentTitle'
import AuthInput from '../Elements/Form/AuthInput'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import AuthPassword from '../Elements/Form/AuthPassword'
import AltActionTwo from '../Elements/Sections/AltActionTwo'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import Alert from '../../Elements/Alerts/Alert'
import axios from 'axios'
import PhoneInput from '../../Elements/Form/PhoneInput'
import useCrypto from '../../../utils/useCrypto'
import useFormatPhoneNumber from '../../../utils/useFormatPhoneNumber'
import useFormatPhoneTest from '../../../utils/useFormatPhoneTest'
import useRequestHeaders from '../../../utils/useRequestHeaders'


YupPassword(Yup)



const Login = () => {
    
  useDocTitle('Pandascrow - Login')

  const {requestHeaders} = useRequestHeaders()

  const [minimumEight, setMinimumEight] = useState(0);
  const [oneUpper, setOneUpper] = useState(0);
  const [oneLower, setOneLower] = useState(0);
  const [oneNumber, setOneNumber] = useState(0);
  const [submitting, setSubmitting] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })


  const {encryptData, decryptData} = useCrypto()
  
  const setIsAuthPage = useIsAuthPage(state=>state.setIsAuthPage)
  

  const formik = useFormik({
    initialValues:{
        phone:"",
        password:""
    },

    validationSchema:Yup.object({
        phone: Yup
            .string()
            .required('Phone number required')
            .min(11, 'Phone number must be at least 11 digits')
            .max(14, 'Phone number must not be more than 14 digits')
            .test('isValid', 'Invalid phone number', function(value) {
              const formattedPhoneNumber = useFormatPhoneTest(value);
              return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
            }),
        password: Yup
            .string()
            .required('Password Required')
            .min(8, 'Password must be up to eight (8) characters')
            .minLowercase(1, 'Password must contain at least 1 lower case letter')
            .minUppercase(1, 'Password must contain at least 1 upper case letter')
            .minNumbers(1, 'Password must contain at least 1 number')
            // .minSymbols(1, 'Password must contain at least 1 special character')
            
    })  
  })

  

  const handleLogin = (e) => {
    if(formik.errors.phone || formik.errors.password){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)
    try {
      
      const formData = new FormData();

      formData.append('phone', formik.values.phone);
      formData.append('password', encryptData(formik.values.password));

      axios.post(`${import.meta.env.VITE_BASEURL}/auth/login`, formData, requestHeaders)
      .then((res) => {
        if(res.data.status == false && res.data.data.message) {
          // console.log('Login Response', res.data.data.message)
          localStorage.removeItem('panda_businessData')
          localStorage.removeItem('panda_userData')
          // console.log(res.data)
          setOpenAlert(true)
          setAlertValues({
            ...alertValues, 
            message:res.data.data.message, 
            type:`danger`
          })

        } else if(res.data.status == true && res.data.data.user) {

          // Store the data in local storage
          localStorage.setItem('panda_userData', JSON.stringify(res.data));

          axios.get(`${import.meta.env.VITE_BASEURL}/business/fetch?userID=${res.data.data.user.userID}`, requestHeaders)
          .then((res) => {
            if(res.data.status == false && res.data.data.message){
              // console.log(res.data.data.message);
            } else if(res.data.status == true && res.data.data.business) {
              localStorage.setItem('panda_businessData', JSON.stringify(res.data))
            }
          })
          .catch((err) => {
              console.error(err)
          })

          // navigate to dashboard
          setTimeout(() => {
            window.location.href = '/'
          }, 1000);

          setOpenAlert(true)
          setAlertValues({...alertValues, message:'Logged in successfully. Redirecting ...', type:`success` })

        } else if (res.data.status == true && res.data.data.userID && res.data.data.verification_type) {
          setOpenAlert(true)
          setAlertValues({
            ...alertValues, 
            message:res.data.data.message, 
            type:`warning`
          })
          localStorage.setItem('panda_userID', JSON.stringify(res.data.data.userID))
          axios.get(`${import.meta.env.VITE_BASEURL}/user/profile/fetch?userID=${res.data.data.userID}`, requestHeaders)
          .then((res) => {

            if(res.data.status == true && res.data.data.user){
              localStorage.setItem('panda_userData', JSON.stringify(res.data))
            }

          })
          .catch((err)=>{
            console.error('Fetch user verify error login', err)
          })
          if(res.data.data.verification_type == 'phone'){
            setTimeout(() => {
              window.location.href = '/auth/verify/phone'
            }, 1000);
          }else if(res.data.data.verification_type == 'email'){
            setTimeout(() => {
              window.location.href = '/auth/verify/email'
            }, 1000);
          }
        } else{

          // console.log(res);
          setOpenAlert(true)
          setAlertValues({
            ...alertValues, 
            message:'Error logging in, Try again later', 
            type:`danger`
          })
        }
        setSubmitting(false)
      })
      .catch(err => console.error(err))

    } catch (error) {
      console.error(error);
    }
  }

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
    <AuthWrap altAction altActionCentered altActionLink={'/auth/join'}>
      <AuthFormWrap handleSubmit={formik.handleSubmit}>

        <fieldset className='gap-2.5 flex flex-col col-span-1'>
          <label htmlFor="phone" className='text-black font-avenirMedium text-lg'>Phone</label>
          <PhoneInput maxLength={15} id={'phone'} name={'phone'} value={formik.values.phone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} className={`px-4 py-3 text-sm bg-transparent autofill:bg-transparent rounded-five border-2 ${formik.touched.phone && formik.errors.phone ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} required />
          {(formik.touched.phone && formik.errors.phone) && <p className="text-xs text-brandRed1x">{formik.errors.phone}</p>}
        </fieldset>
        <div>

          <AuthPassword forgot paddingY={'py-3'} eyeIcon handleChange={formik.handleChange} inputValue={formik.values.password} fieldError={formik.touched.password && formik.errors.password} handleBlur={formik.handleBlur} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputName={'password'} inputId={'password'} />
          {/* <div className={'pt-4'}>
            {(formik.touched.password && formik.errors.password) && <p className="text-xs text-brandRed1x pb-4">{formik.errors.password}</p>}
            <div className={`bg-brandGray42x h-2 w-full`}>
              <div className={`transition-all duration-500 ease-in-out ${strength == 1 && 'bg-brandRed1x'} ${strength == 2 && 'bg-brandOrange2x'} ${strength == 3 && 'bg-brandGreen1x/50'} ${strength == 4 && 'bg-brandGreen1x'} h-full`} style={{width:`calc((${strength}/4) * 100%)`}} >
              </div>
            </div>
          </div> */}
        </div>
        <fieldset className='flex items-center gap-3'>
          <input type="checkbox" name="staySignedIn" id="staySignedIn" className='checked:accent-brandBlue1x hover:accent-brandBlue1x/70' />
          <label htmlFor="staySignedIn" className='font-avenirMedium text-sm cursor-pointer'>Stay signed in for a week</label>
        </fieldset>
        
        <div>
          <ButtonPrimary handleClick={handleLogin} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Continue'} type={'button'} width={'w-full'} paddingY={'py-3'}  />
          <AltActionTwo link={'/auth/login/sso'} />
        </div>
      </AuthFormWrap>
      <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
    </AuthWrap>
  )
}

export default Login