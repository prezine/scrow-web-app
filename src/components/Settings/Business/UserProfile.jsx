import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/stores/useUser'
import AuthInput from '../../Auth/Elements/Form/AuthInput'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import PhoneInput from '../../Elements/Form/PhoneInput'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useIsOver13YearsOld from '../../../utils/useIsOver13YearsOld'
import AuthSelect from '../../Auth/Elements/Form/AuthSelect'
import Alert from '../../Elements/Alerts/Alert'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import useFormatPhoneTest from '../../../utils/useFormatPhoneTest'
import useFormatPhoneNumber from '../../../utils/useFormatPhoneNumber'

const UserProfile = () => {

  const {userDataValue} = useUser()
  const [submitting, setSubmitting] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

  const {requestHeaders} = useRequestHeaders()


  const formik = useFormik({
    initialValues : {
      firstName:'',
      lastName:'',
      email:'',
      gender:'',
      country:'',
      dob:''
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
      dob:Yup.date()
        .required('Date of birth required')
        .nullable()
        .max(new Date(), 'Birthday cannot be in the future')
        .test('age', 'You must be at least 13 years old to use our services', function (value) {
          return useIsOver13YearsOld(value);
        }),
      phone: Yup
        .string()
        .required('Phone number required')
        .min(11, 'Phone number must be at least 11 digits')
        .max(14, 'Phone number must not be more than 14 digits')
        .test('isValid', 'Invalid phone number', function(value) {
          const formattedPhoneNumber = useFormatPhoneTest(value);
          return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
        }),
      gender: Yup.string()
        .required("Please select an option"),       
    })
  })

  useEffect(() => {
    if(userDataValue){
      formik.setFieldValue('firstName', userDataValue && userDataValue.name.split(' ')[0])
      formik.setFieldValue('lastName', userDataValue && userDataValue.name.split(' ')[1])
      formik.setFieldValue('email', userDataValue && userDataValue.email)
      formik.setFieldValue('phone', userDataValue && userDataValue.phone)
      formik.setFieldValue('gender', userDataValue && userDataValue.gender ? userDataValue.gender : '' )
      formik.setFieldValue('dob', userDataValue && userDataValue.dob ? userDataValue.dob : '')
    }
  }, [])

  const handleSubmit = (e) => {
    if(formik.errors.firstName || !formik.values.firstName || formik.errors.lastName || !formik.values.lastName || formik.errors.email || !formik.values.email || formik.errors.phone || !formik.values.phone || formik.errors.gender || !formik.values.gender || formik.errors.dob || !formik.values.dob){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('name', `${formik.values.firstName} ${formik.values.lastName}`)
    formData.append('email', formik.values.email)
    formData.append('phone', formik.values.phone)
    formData.append('gender', formik.values.gender)
    formData.append('dob', formik.values.dob)

    try {

      axios.post(`${import.meta.env.VITE_BASEURL}/setting/profile/user?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
      .then((res)=>{
        console.log(res);
          if(res.data.status == false && res.data.data.message){
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
              console.log(res.data.data.message);
          }else if (res.data.status == true && res.data.data.message) {
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`success` })
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

  
  const handlePhoneInputChange = (e, handleChange) => {
    const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
    handleChange({ target: { name: 'phone', value: formattedPhoneNumber } });
  }
  
  

  return (
    <div className='w-full pb-16 pt-24'>
        <form method="post" action="" className='sm:w-ninetyPercent md:w-eightyPercent mds:w-ninetyFivePercent lg:w-sixtyFivePercent max-w-lg mx-auto flex flex-col gap-5'>
          
          <div className='flex flex-col md:flex-row md:items-end gap-x-4 gap-y-5'>
            <div className="md:w-fiftyPercent">
              <AuthInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.firstName} fieldError={(!userDataValue && formik.touched.firstName) || (formik.touched.firstName && formik.errors.firstName)} paddingY={'py-3'} inputLabel={'First name'} inputName={'firstName'} inputId={'firstName'} />
            </div>
            <div className="md:w-fiftyPercent">
              <AuthInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.lastName} fieldError={(!userDataValue && formik.touched.lastName) || (formik.touched.lastName && formik.errors.lastName)} paddingY={'py-3'} inputLabel={'Last name'} inputName={'lastName'} inputId={'lastName'} />
            </div>
          </div>

          <div className="">
            <AuthInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={(!userDataValue && formik.touched.email) || (formik.touched.email && formik.errors.email)} paddingY={'py-3'} inputLabel={'Email address'} inputName={'email'} inputId={'email'} inputType={'email'} />
          </div>

          <fieldset className={`gap-2.5 flex flex-col`}>
            <label htmlFor={'phone'} className={`text-xs font-spaceGroteskLight text-brandGray14x`}>{"Phone Number"}</label>
            <PhoneInput onBlur={formik.handleBlur} value={formik.values.phone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} name="phone" id="phone" className={`px-4 py-4 text-xs bg-transparent rounded-five border-2 ${(!userDataValue && formik.touched.phone) || (formik.touched.phone && formik.errors.phone) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} />
          </fieldset>

          <div className='flex flex-col md:flex-row md:items-end gap-x-4 gap-y-5'>
            <div className="md:w-fiftyPercent">
              <AuthSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} selectValue={formik.values.gender} fieldError={(!userDataValue && formik.touched.gender) || (formik.touched.gender && formik.errors.gender)} paddingY={'py-3'} selectLabel={'Gender'} selectName={'gender'} selectId={'gender'} >
                <option value="">Choose gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </AuthSelect>
            </div>
            <div className="md:w-fiftyPercent">
              <AuthInput inputType={'date'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.dob} fieldError={(!userDataValue && formik.touched.dob) || (formik.touched.dob && formik.errors.dob)} paddingY={'py-3'} inputLabel={'Date of Birth'} inputName={'dob'} inputId={'dob'} />
            </div>
          </div>

          <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
            <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'}  paddingY={'py-3'} text={'Save my changes'} type={'button'} width={'w-full'} />
          </div>

        </form>

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default UserProfile