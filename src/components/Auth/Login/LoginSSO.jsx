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


const LoginSSO = () => {

    useDocTitle('Pandascrow - Forgot Password')
  
    const [submitting, setSubmitting] = useState(false)

    const setIsAuthPage = useIsAuthPage(state=>state.setIsAuthPage)
    
    const [formData, setFormData] = useState({
      email:''
    })

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

    const handleLogin = (e) => {
      if(formik.errors.email){
        return
      }
  
      setSubmitting(true)
      try {
        console.log(formik.values);
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
    <AuthWrap altAction>
        <AuthFormWrap handleSubmit={formik.handleSubmit}>
            <AuthInput paddingY={'py-3'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.email && formik.errors.email} inputValue={formik.values.email} inputLabel={'Email'} labelColor={'text-black'} labelFontSize={'text-lg'} labelFont={'font-avenirMedium'} inputType={'email'} inputName={'email'} inputId={'email'}  />
            <div>
                <ButtonPrimary handleClick={handleLogin} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Continue with SSO'} type={'button'} width={'w-full'} paddingY={'py-3'}  />
                <AltActionTwo text={'Use Password Instead'} link={'/auth/login'} />
            </div>
        </AuthFormWrap>
    </AuthWrap>
  )
}

export default LoginSSO