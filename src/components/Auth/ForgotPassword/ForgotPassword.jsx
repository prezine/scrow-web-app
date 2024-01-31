import React, { useLayoutEffect, useState } from 'react'
import useIsAuthPage from '../../../hooks/stores/useIsAuthPage'
import AuthFormWrap from '../Elements/Form/AuthFormWrap'
import AuthWrap from '../Elements/Wrap/AuthWrap'
import useDocTitle from '../../../hooks/DocumentTitle'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import AuthInput from '../Elements/Form/AuthInput'
import AltActionTwo from '../Elements/Sections/AltActionTwo'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import Alert from '../../Elements/Alerts/Alert'

const ForgotPassword = () => {

    useDocTitle('Pandascrow - Forgot Password')

    const [submitting, setSubmitting] = useState(false)
  
    const setIsAuthPage = useIsAuthPage(state=>state.setIsAuthPage)
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    const {requestHeaders} = useRequestHeaders()

    const formik = useFormik({
      initialValues:{
        email:""
      },
      validationSchema:Yup.object({
        email: Yup
          .string()
          .email('Invalid email address')
          .required('Email Required')
      })  
    })

    const handleForgot = (e) => {
      if(formik.errors.email){
        return
      }
  
      setOpenAlert(false)
      setSubmitting(true)

      const formData = new FormData()
      formData.append('email', formik.values.email)

      try {
        axios.post(`${import.meta.env.VITE_BASEURL}/auth/forgot/password`, formData,  requestHeaders)
        .then((res)=>{
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
                console.log(res.data.data.message);
            }else if (res.data.status == true && res.data.data.message) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
            }
  
        })
        .catch((err)=>{
          console.error(err)
        })
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => {
        setSubmitting(false)
      }, 3000);
    }
    
  
    useLayoutEffect(() => {
      setIsAuthPage(true)
    
      return () => {
        setIsAuthPage(false)
      };
    }, [])

  return (
    <AuthWrap altAction altActionCentered>
        <AuthFormWrap handleSubmit={formik.handleSubmit} gap={'gap-7'}>
            <div>
                <h1 className='text-24 font-spaceGroteskBold pb-2.5'>Reset your password</h1>
                <p className="text-brandGray19x text-sm font-avenirMedium">Enter the email address associated with your account and we'll send you a link to reset your password.</p>
            </div>
            <AuthInput paddingY={'py-3'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.email && formik.errors.email} inputValue={formik.values.email} inputLabel={'Email'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'email'} inputName={'email'} inputId={'email'}  />
            <div>
                <ButtonPrimary handleClick={handleForgot} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Continue'} type={'button'} width={'w-full'} paddingY={'py-3'}  />
                <AltActionTwo text={'Return to sign in'} link={'/auth/login'} />
            </div>
        </AuthFormWrap>

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </AuthWrap>
  )
}

export default ForgotPassword