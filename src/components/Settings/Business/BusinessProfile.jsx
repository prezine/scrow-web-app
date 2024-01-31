import React, { useEffect, useState } from 'react'
import AuthInput from '../../Auth/Elements/Form/AuthInput'
import AuthSelect from '../../Auth/Elements/Form/AuthSelect'
import Alert from '../../Elements/Alerts/Alert'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import FormFileInput from '../../Elements/Form/FormFileInput'
import FormOption from '../../Elements/Form/FormOption'
import PhoneInput from '../../Elements/Form/PhoneInput'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useUser from '../../../hooks/stores/useUser'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import useFormatPhoneTest from '../../../utils/useFormatPhoneTest'
import useFormatPhoneNumber from '../../../utils/useFormatPhoneNumber'
import useFileUpload from '../../../utils/CloudinaryUpload/useFileUpload'
import useIsFileObject from '../../../utils/useIsFileObject'

const BusinessProfile = () => {

  const {userDataValue, businessDataValue} = useUser()
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
      businessname:'',
      businessemail:'',
      businessaddress:'',
      businessphone:"",
      businesslogo:""
    },
    validationSchema : Yup.object({
      businessname : Yup.string()
        .min(2, 'Business name should be two or more characters')
        .required('Business name required'),
      businessemail: Yup
        .string()
        .email('Invalid email address')
        .required('Email Required'),
      businessphone: Yup
        .string()
        .required('Phone number required')
        .min(11, 'Phone number must be at least 11 digits')
        .max(14, 'Phone number must not be more than 14 digits')
        .test('isValid', 'Invalid businessphone number', function(value) {
          const formattedPhoneNumber = useFormatPhoneTest(value);
          return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
        }),     
        businessaddress: Yup.string()
        .required("Enter Address"),       
        businesslogo : Yup.mixed()
        .nullable()
        .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
          return value && value.size <= import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE;
        })
    })
  })

  useEffect(() => {
    if(userDataValue && businessDataValue){
      formik.setFieldValue('businessname', businessDataValue && businessDataValue.businessname)
      formik.setFieldValue('businessemail', businessDataValue && businessDataValue.businessemail)
      formik.setFieldValue('businessphone', businessDataValue && businessDataValue.businessphone)
      formik.setFieldValue('businessaddress', businessDataValue && businessDataValue.businessaddress)
      formik.setFieldValue('businesslogo', businessDataValue && businessDataValue.businesslogo)

    }
  }, [])

  const handleSubmit = (e) => {
    if(formik.errors.businessname || !formik.values.businessname || formik.errors.businessemail || !formik.values.businessemail || formik.errors.businessphone || !formik.values.businessphone || formik.errors.businessaddress || !formik.values.businessaddress){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('businessname', `${formik.values.businessname}`)
    formData.append('businessemail', formik.values.businessemail)
    formData.append('businessphone', formik.values.businessphone)
    formData.append('businessaddress', formik.values.businessaddress)
    formData.append('businesslogo', uploadedImageUrl ? uploadedImageUrl : useIsFileObject(formik.values.businesslogo) ? '' : formik.values.businesslogo)


    try {

      axios.post(`${import.meta.env.VITE_BASEURL}/setting/profile/business?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
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
    handleChange({ target: { name: 'businessphone', value: formattedPhoneNumber } });
  }

  const {uploading, uploadedImageUrl, errorUpload, handleFileUpload, setErrorUpload, setUploadedImageUrl} = useFileUpload(formik.values.businesslogo, 'image', 'business')

  const handleCancel = () => {
    formik.setFieldValue('businesslogo', '')
    setUploadedImageUrl('')
  }
  

  return (
    <div className='w-full pb-16 pt-24'>
        <form method="post" action="" className='sm:w-ninetyPercent md:w-eightyPercent mds:w-ninetyFivePercent lg:w-sixtyFivePercent max-w-lg mx-auto flex flex-col gap-5'>
          
          <FormFileInput formik={formik} fileValue={formik.values.businesslogo} errorUpload={errorUpload} setErrorUpload={setErrorUpload} setUploadedImageUrl={setUploadedImageUrl} handleCancel={handleCancel} handleFileUpload={handleFileUpload} uploading={uploading} uploadedImageUrl={uploadedImageUrl} actionText={'Choose Business Icon'} fileInputId={'businesslogo'} fileInputName={'businesslogo'} handleBlur={formik.handleBlur} fieldError={formik.touched.businesslogo && formik.errors.businesslogo} />


          <div className='flex flex-col md:flex-row md:items-end gap-x-4 gap-y-5'>
            <div className="md:w-fiftyPercent">
              <AuthInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.businessname} fieldError={((!userDataValue || !businessDataValue) && formik.touched.businessname) || (formik.touched.businessname && formik.errors.businessname)} paddingY={'py-3'} inputLabel={'Business name'} inputName={'businessname'} inputId={'businessname'} />
            </div>
            <div className="md:w-fiftyPercent">
            <AuthInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.businessemail} fieldError={((!userDataValue || !businessDataValue) && formik.touched.businessemail) || (formik.touched.businessemail && formik.errors.businessemail)} paddingY={'py-3'} inputLabel={'Contact Email'} inputType={'email'} inputName={'businessemail'} inputId={'businessemail'} />
            </div>
          </div>

          <fieldset className={`gap-2.5 flex flex-col`}>
            <label htmlFor={'businessphone'} className={`text-xs font-spaceGroteskLight text-brandGray14x`}>{"Phone Number"}</label>
            <PhoneInput onBlur={formik.handleBlur} value={formik.values.businessphone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} name="businessphone" id="businessphone" className={`px-4 py-4 text-xs bg-transparent rounded-five border-2 ${((!userDataValue || !businessDataValue) && formik.touched.businessphone) || (formik.touched.businessphone && formik.errors.businessphone) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} />
          </fieldset>

          <div className="">
            <AuthInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.businessaddress} fieldError={((!userDataValue || !businessDataValue) && formik.touched.businessaddress) || (formik.touched.businessaddress && formik.errors.businessaddress)} paddingY={'py-3'} inputLabel={'Business Address'} inputPlaceholder={'Enter Address'} inputId={'businessaddress'} inputName={'businessaddress'} />
          </div>

          <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
            <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} paddingY={'py-3'} text={'Save my changes'} type={'button'} width={'w-full'} />
          </div>

        </form>

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />


    </div>
  )
}

export default BusinessProfile