import React, { useEffect, useState } from 'react'
import AuthPassword from '../../Auth/Elements/Form/AuthPassword'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import useCrypto from '../../../utils/useCrypto'
import useUser from '../../../hooks/stores/useUser'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import Alert from '../../Elements/Alerts/Alert'
import PasswordStrength from '../../Elements/Sections/PasswordStrength'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


YupPassword(Yup)


const Settlement = () => {

  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const [submitting, setSubmitting] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

  const navigate = useNavigate()

  const {encryptData, decryptData} = useCrypto()




  const formik = useFormik({
    initialValues:{
      new_password:"",
      old_password:""
    },

    validationSchema:Yup.object({
      new_password: Yup
            .string()
            .required('Password Required'),
            // .min(8, 'Password must be up to eight (8) characters')
            // .minLowercase(1, 'Password must contain at least 1 lower case letter')
            // .minUppercase(1, 'Password must contain at least 1 upper case letter')
            // .minNumbers(1, 'Password must contain at least 1 number'),
            // .minSymbols(1, 'Password must contain at least 1 special character'),
          old_password: Yup
            .string()
            .required('Password Required')
            .min(8, 'Password must be up to eight (8) characters')
            .minLowercase(1, 'Password must contain at least 1 lower case letter')
            .minUppercase(1, 'Password must contain at least 1 upper case letter')
            .minNumbers(1, 'Password must contain at least 1 number'),
            // .minSymbols(1, 'Password must contain at least 1 special character'),
            
    })  
  })


  const handleSubmit = (e) => {
    if(formik.errors.old_password || formik.errors.new_password || !formik.values.old_password || !formik.values.new_password){
      return
    }
    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('old_password', encryptData(formik.values.old_password))
    formData.append('new_password', encryptData(formik.values.new_password))

    // if(formik.values.old_password == formik.values.new_password){
    //   setOpenAlert(true)
    //   setAlertValues({...alertValues, message:'New Password cannot be the same as Old Password', type:`danger` })
    //   setSubmitting(false)
    //   return
    // }
    
    try {

        // console.log(formik.values);

        // const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);

        axios.post(`${import.meta.env.VITE_BASEURL}/setting/reset/password?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
          // console.log(res);
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`danger` })
                console.log(res.data.data.message);
            }else if (res.data.status == true && res.data.data.message) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
                setTimeout(() => {
                  navigate('/auth/login')
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

  return (
    <div className='w-full pb-16 pt-24'>
        <form method="post" action="" className='sm:w-ninetyPercent md:w-eightyPercent mds:w-ninetyFivePercent lg:w-sixtyFivePercent max-w-lg mx-auto flex flex-col gap-5'>
          
          <div className="">
            <AuthPassword handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.old_password} fieldError={formik.touched.old_password && formik.errors.old_password} fontSize={'text-sm font-avenirMedium'} paddingY={'py-3'} eyeIcon inputId={'old_password'} inputName={'old_password'} inputLabel={'Enter current password'} />
          </div>

          <div className="">
            <AuthPassword handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.new_password} fieldError={formik.touched.new_password && formik.errors.new_password} inputLabel={'Password'} inputName={'new_password'} inputId={'new_password'} fontSize={'text-sm font-avenirMedium'} paddingY={'py-3'} eyeIcon />
          </div>
          <PasswordStrength formik={formik} testValueId={'new_password'} />


          <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
            <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} paddingY={'py-3'} text={'Save my changes'} type={'button'} width={'w-full'} />
          </div>

        </form>

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default Settlement