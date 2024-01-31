import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useIsAuthPage from '../../../hooks/stores/useIsAuthPage'
import AuthFormWrap from '../Elements/Form/AuthFormWrap'
import AuthWrap from '../Elements/Wrap/AuthWrap'
import useDocTitle from '../../../hooks/DocumentTitle'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import { NavLink, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import Alert from '../../Elements/Alerts/Alert'
import axios from 'axios'
import useUser from '../../../hooks/stores/useUser'
import useGetUser from '../../../utils/useGetUser'

const VerifyOTP = () => {

    useDocTitle('Pandascrow - Verify Phone')

    const [submitting, setSubmitting] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    const navigate = useNavigate()

    const otpRef = useRef(null)
  
    const setIsAuthPage = useIsAuthPage(state=>state.setIsAuthPage)

    const [otpDigits, setOTPDigits] = useState('')

    const {requestHeaders} = useRequestHeaders()

    const {userDataValue} = useUser()

    const {userData} = useGetUser()
    

    const formik = useFormik({
      initialValues:{
        digit1:'',
        digit2:'',
        digit3:'',
        digit4:'',
        digit5:'',
        digit6:'',
      },
      // onSubmit: () => {
      //   console.log(formik.values)
      // },
      validationSchema:Yup.object({
          digit1: Yup
            .string()
            .required()
            .max(1)
            .min(1),
          digit2: Yup
            .string()
            .required()
            .max(1)
            .min(1),
          digit3: Yup
            .string()
            .required()
            .max(1)
            .min(1),
          digit4: Yup
            .string()
            .required()
            .max(1)
            .min(1),
          digit5: Yup
            .string()
            .required()
            .max(1)
            .min(1),
          digit6: Yup
            .string()
            .required()
            .max(1)
            .min(1),
              
              
      })  
    })

    const handleVerify = (e) => {
      if(formik.errors.digit1 || formik.errors.digit2 || formik.errors.digit3 || formik.errors.digit4 || formik.errors.digit5 || formik.errors.digit6){
        return
      }
  
      setOpenAlert(false)
      setSubmitting(true)
      const formData = new FormData()
      formData.append('code', `${formik.values.digit1}${formik.values.digit2}${formik.values.digit3}${formik.values.digit4}${formik.values.digit5}${formik.values.digit6}`)
      formData.append('userID', localStorage.getItem('panda_userID'))

    try {

        // console.log(formik.values);

        axios.post(`${import.meta.env.VITE_BASEURL}/auth/verify/phone`, formData, requestHeaders)
        .then((res)=>{
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
                console.log(res.data.data.message);
                
            }else if (res.data.status == true && res.data.data.message) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
                
                axios.get(`${import.meta.env.VITE_BASEURL}/user/profile/fetch?userID=${localStorage.getItem('panda_userID')}`, requestHeaders)
                .then((res) => {
                  // console.log(res);

                    if(res.data.data.user.verification_status.email == 1){
                      setTimeout(() => {
                        navigate('/auth/login')
                      }, 1000);
                    }else{
                      setTimeout(() => {
                        navigate('/auth/verify/email')
                      }, 1000);
                    }
                    // setTimeout(() => {
                    //   window.location.href = '/auth/login'
                    // }, 1000);

                })
                .catch((err)=>{
                  console.error('OTP', err)
                })

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

    useEffect(() => {
      setOTPDigits(`${formik.values.digit1}${formik.values.digit2}${formik.values.digit3}${formik.values.digit4}${formik.values.digit5}${formik.values.digit6}`)
    

    }, [formik.values])
    
    const handlePaste = (e) => {
      const paste = e.clipboardData.getData('text/plain');
      const otpClean = paste.replace(/[^a-zA-Z0-9]/g, '');
    
      const otp = otpClean.trim().slice(0, 6);
    
      const regex = /^[0-9]+$/;
      if (regex.test(otp) && otp.length === 6) {
        formik.setFieldValue('digit1', otp[0]);
        formik.setFieldValue('digit2', otp[1]);
        formik.setFieldValue('digit3', otp[2]);
        formik.setFieldValue('digit4', otp[3]);
        formik.setFieldValue('digit5', otp[4]);
        formik.setFieldValue('digit6', otp[5]);
        const otpForm = new FormData();
        otpForm.append('code', otp);
        otpForm.append('userID', localStorage.getItem('panda_userID'));

        // Submit OTP form
        handleVerify()
      }

      
    };
    
  
    useLayoutEffect(() => {
      setIsAuthPage(true)
    
      return () => {
        setIsAuthPage(false)
      };
    }, [])

    // useEffect(()=>{

    //   otpRef.current.addEventListener('paste', (e)=>{handlePaste(e)})


    // }, [])

    var otp_boxes = document.querySelectorAll('.otp-digits')
    otp_boxes.forEach((otp_box, index) => {
        otp_box.dataset.id = index
        let box_len = otp_boxes.length
        box_len = box_len - 1
        otp_box.addEventListener('input', (e)=>{
            // if(e.target.value == 1){
            //   e.preventDefault()
            // } 
            if (e.target.value.length > 1) {
              e.target.value = e.target.value.slice(0,1); // prevent further input if length > 1
            }
           if(index < box_len){
                if (otp_box.value.length == 1){
                   otp_boxes[parseInt(index) + 1].focus()
                }
            }
           if(index > 0){
                if (otp_box.value.length == 0){
                    otp_boxes[parseInt(index) - 1].focus()
                }
            }
        })
    });


    const resendOTP = () => {
      let user = localStorage.getItem('panda_userID')
      let formData = new FormData()

      setOpenAlert(false)

      formData.append('userID', user)
      axios.post(`${import.meta.env.VITE_BASEURL}/auth/resend/otp`, formData, requestHeaders)
      .then((res) => {
        if(res.data.status == false && res.data.data.message){
          setOpenAlert(true)
          setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
          console.log(res.data.data.message);
          axios.get(`${import.meta.env.VITE_BASEURL}/user/profile/fetch?userID=${localStorage.getItem('panda_userID')}`, requestHeaders)
          .then((res) => {
            console.log(res);
            if(res.data.status == true && res.data.data.user){
              localStorage.setItem('panda_userData', JSON.stringify(res.data))
              // if(res.data.data.user.verification_status.email == 1){
              //   setTimeout(() => {
              //     window.location.href = '/auth/login'
              //   }, 1000);
              // }else{
              //   setTimeout(() => {
              //     window.location.href = '/auth/verify/email'
              //   }, 1000);
              // }
            }else{
              console.log(res);
            }

          })
          .catch((err)=>{
            console.error('OTP', err)
          })
      }else if (res.data.status == true && res.data.data.message && res.data.data.userID) {
          setOpenAlert(true)
          localStorage.setItem('panda_userID', JSON.stringify(res.data.data.userID))
          setAlertValues({...alertValues, message:res.data.data.message , type:`success` })
          axios.get(`${import.meta.env.VITE_BASEURL}/user/profile/fetch?userID=${localStorage.getItem('panda_userID')}`, requestHeaders)
          .then((res) => {
            console.log(res);
            if(res.data.status == true && res.data.data.user){
              localStorage.setItem('panda_userData', JSON.stringify(res.data))
              // if(res.data.data.user.verification_status.email == 1){
              //   setTimeout(() => {
              //     window.location.href = '/auth/login'
              //   }, 1000);
              // }else{
              //   setTimeout(() => {
              //     window.location.href = '/auth/verify/email'
              //   }, 1000);
              // }
            }else{
              console.log(res);
            }

          })
          .catch((err)=>{
            console.error('OTP', err)
          })
      }
      })
      .catch((err)=>{
        console.error('Resend OTP', err);
      })
    }

  return (
    <AuthWrap tip={'For security reasons, please do not share this OTP with anyone else. No one from Pandascrow would call and request for you OTP code.'}>
        <AuthFormWrap handleSubmit={formik.handleSubmit} gap={'gap-7'}>
            <div className='text-center'>
                <h1 className='text-24 font-spaceGroteskBold pb-2.5 text-brandDarkViolet1x'>Verify Phone Number</h1>
                <p className="text-brandGray19x text-sm font-avenirMedium">We've sent a code to the number ending in <span className='font-avenirBlack'>*{(userDataValue && userDataValue.phone) ? userDataValue.phone.substr(userDataValue.phone.length - 4) : (userData && userData.phone) ? userData.phone.substr(userData.phone.length - 4) : ''}</span>, Please check your SMS and provide the code below. Alternatively check your email for Phone OTP</p>
            </div>
            <div>
                <div className="grid grid-cols-12  pt-5 gap-2 pb-4 lg:pb-8 sm:gap-4 xs:flex xs:flex-wrap xs:justify-around xs:gap-2">
                    <input onPaste={(e)=>handlePaste(e)} type="number" id="digit1" maxLength={1} required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.digit1} name="digit1" data-next="digit2" className={`otp-digits bg-transparent border ${(formik.touched.digit1 && formik.errors.digit1) ? 'border-brandRed1x' : 'border-brandGray22x'} col-span-2 hover:border-brandBlue1x hover:border-1 focus:border-brandBlue1x focus:ring-2 border-1 focus:outline-none rounded-ten w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:text-2xl text-center`} />
                    <input type="number" id="digit2" maxLength={1} required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.digit2} name="digit2" data-next="digit3" data-previous="digit1" className={`otp-digits bg-transparent border ${(formik.touched.digit2 && formik.errors.digit2) ? 'border-brandRed1x' : 'border-brandGray22x'} col-span-2 hover:border-brandBlue1x hover:border-1 focus:border-brandBlue1x focus:ring-2 border-1 focus:outline-none rounded-ten w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:text-2xl text-center`} />
                    <input type="number" id="digit3" maxLength={1} required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.digit3} name="digit3" data-next="digit4" data-previous="digit2" className={`otp-digits bg-transparent border ${(formik.touched.digit3 && formik.errors.digit3) ? 'border-brandRed1x' : 'border-brandGray22x'} col-span-2 hover:border-brandBlue1x hover:border-1 focus:border-brandBlue1x focus:ring-2 border-1 focus:outline-none rounded-ten w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:text-2xl text-center`}/>
                    <div className="hidden xs:block xs:w-full bg-transparent h-0"></div>
                    <input type="number" id="digit4" maxLength={1} required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.digit4} name="digit4" data-next="digit5" data-previous="digit3" className={`otp-digits bg-transparent border ${(formik.touched.digit4 && formik.errors.digit4) ? 'border-brandRed1x' : 'border-brandGray22x'} col-span-2 hover:border-brandBlue1x hover:border-1 focus:border-brandBlue1x focus:ring-2 border-1 focus:outline-none rounded-ten w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:text-2xl text-center`} />
                    <input type="number" id="digit5" maxLength={1} required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.digit5} name="digit5" data-next="digit6" data-previous="digit4" className={`otp-digits bg-transparent border ${(formik.touched.digit5 && formik.errors.digit5) ? 'border-brandRed1x' : 'border-brandGray22x'} col-span-2 hover:border-brandBlue1x hover:border-1 focus:border-brandBlue1x focus:ring-2 border-1 focus:outline-none rounded-ten w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:text-2xl text-center`} />
                    <input type="number" id="digit6" maxLength={1} required onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.digit6} name="digit6" data-previous="digit5" className={`otp-digits bg-transparent border ${(formik.touched.digit6 && formik.errors.digit6) ? 'border-brandRed1x' : 'border-brandGray22x'} col-span-2 hover:border-brandBlue1x hover:border-1 focus:border-brandBlue1x focus:ring-2 border-1 focus:outline-none rounded-ten w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:text-2xl text-center`} />
                </div>
            </div>
           
            <div>
                <div className={`${'text-center'} pb-5`}>
                    <p className={`font-avenirMedium`}>Didn't see code? <button type='button' onClick={resendOTP} className={`text-brandBlue1x`}>Resend OTP</button></p>
                </div>
                <ButtonPrimary disabled={submitting} disabledBgColor={'bg-brandGray16x'} handleClick={handleVerify} text={'Continue'} type={'button'} width={'w-full'} paddingY={'py-3'}  />
            </div>
        </AuthFormWrap>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </AuthWrap>
  )
}

export default VerifyOTP