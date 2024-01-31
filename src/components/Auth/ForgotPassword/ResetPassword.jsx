import React, { useEffect, useLayoutEffect, useState } from 'react'
import useIsAuthPage from '../../../hooks/stores/useIsAuthPage'
import AuthFormWrap from '../Elements/Form/AuthFormWrap'
import AuthWrap from '../Elements/Wrap/AuthWrap'
import useDocTitle from '../../../hooks/DocumentTitle'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import AuthPassword from '../Elements/Form/AuthPassword'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import Alert from '../../Elements/Alerts/Alert'
import useCrypto from '../../../utils/useCrypto'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


YupPassword(Yup)

const ResetPassword = () => {

    useDocTitle('Pandascrow - Forgot Password')

    const [submitting, setSubmitting] = useState(false)
    const [minimumEight, setMinimumEight] = useState(0);
    const [oneUpper, setOneUpper] = useState(0);
    const [oneLower, setOneLower] = useState(0);
    const [oneNumber, setOneNumber] = useState(0);
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    const location = useLocation()

    const {requestHeaders} = useRequestHeaders()

    const {encryptData} = useCrypto()

  
    const setIsAuthPage = useIsAuthPage(state=>state.setIsAuthPage)

    const formik = useFormik({
      initialValues:{
        password:'',
        confirmPassword:''
      },
      validationSchema:Yup.object({
        password: Yup
          .string()
          .required('Password Required')
          .minLowercase(1, 'Password must contain at least 1 lower case letter')
          .minUppercase(1, 'Password must contain at least 1 upper case letter')
          .minNumbers(1, 'Password must contain at least 1 number')
          // .minSymbols(1, 'Password must contain at least 1 special character'),
          .min(8, 'Password must be up to eight (8) characters'),
        confirmPassword: Yup
        .string()
        .required('Password Required')
        .minLowercase(1, 'Password must contain at least 1 lower case letter')
        .minUppercase(1, 'Password must contain at least 1 upper case letter')
        .minNumbers(1, 'Password must contain at least 1 number')
        .min(8, 'Password must be up to eight (8) characters')
        .oneOf([Yup.ref('password')], 'Passwords must match')
      })  
    })

    const handleReset = (e) => {
      if((formik.errors.password || formik.errors.confirmPassword) || !location.pathname.split('/')[4]){
        return
      }
      
      setOpenAlert(false)
      setSubmitting(true)

      const formData = new FormData()
      formData.append('password', encryptData(formik.values.password))
      formData.append('token', location.pathname.split('/')[4])

      try {
        axios.post(`${import.meta.env.VITE_BASEURL}/auth/new/password`, formData,  requestHeaders)
        .then((res)=>{
          if(res.data.status == false && res.data.data.message){
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
              console.log(res.data.data.message);
          }else if (res.data.status == true && res.data.data.message) {
              setOpenAlert(true)
              setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
            setTimeout(() => {
              window.location.href = '/auth/login'
            }, 1000);
          }

      })
      .catch((err)=>{
        console.error(err)
      })
      } catch (error) {
        console.error(error);
      }
    }

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

  return (
    <AuthWrap altAction altActionCentered>
        <AuthFormWrap handleSubmit={formik.handleSubmit}>
            <div>
              <AuthPassword paddingY={'py-3'} eyeIcon handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.password && formik.errors.password} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputLabel={'New Password'} />
              <div className='pt-4'>
                {(formik.touched.password && formik.errors.password) && <p className="text-xs text-brandRed1x pb-4">{formik.errors.password}</p>}
                <div className={`bg-brandGray42x h-2 w-full`}>
                  <div className={`transition-all duration-500 ease-in-out ${strength == 1 && 'bg-brandRed1x'} ${strength == 2 && 'bg-brandOrange2x'} ${strength == 3 && 'bg-brandGreen1x/50'} ${strength == 4 && 'bg-brandGreen1x'} h-full`} style={{width:`calc((${strength}/4) * 100%)`}} >
                  </div>
                </div>
              </div>
            </div>
            <div>
                <AuthPassword paddingY={'py-3'} eyeIcon handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.confirmPassword && formik.errors.confirmPassword} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputLabel={'Confirm Password'} inputName={'confirmPassword'} inputId={'confirmPassword'} />
                {(formik.touched.confirmPassword && formik.errors.confirmPassword)  && <p className='text-sm py-2 text-brandRed1x'>{'Passwords must match'}</p>}
            </div>
            <div>
                <ButtonPrimary handleClick={handleReset} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Reset Password'} type={'button'} width={'w-full'} paddingY={'py-3'}  />
            </div>
        </AuthFormWrap>

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </AuthWrap>
  )
}

export default ResetPassword