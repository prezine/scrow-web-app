import React, {useEffect, useRef, useState} from 'react'
import FormInput from '../../Elements/Form/FormInput'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import FormTextArea from '../../Elements/Form/FormTextArea'
import FormFileInput from '../../Elements/Form/FormFileInput'
import FormSelect from '../../Elements/Form/FormSelect'
import FormOption from '../../Elements/Form/FormOption'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import useUser from '../../../hooks/stores/useUser'
import slugify from 'react-slugify';
import useFileUpload from '../../../utils/CloudinaryUpload/useFileUpload'
import useIsFileObject from '../../../utils/useIsFileObject'
import GetState from '../../Elements/Form/GetState'


const EditStore = ({closeModal, setOpenAlert, setAlertValues, alertValues, mutate, storeData}) => {

  const [submitting, setSubmitting] = useState(false)
  const [slugAvailable, setSlugAvailable] = useState('')
  const [slugMessage, setSlugMessage] = useState('')


  const {requestHeaders} = useRequestHeaders()

  const {userDataValue} = useUser()


  const formik = useFormik({
    initialValues:{
      store_address:'',
      store_interest:'',
      store_country:'',
      store_state:'',
      storefront_currency:'',
      store_logo:""
    },

    validationSchema:Yup.object({
      store_address: Yup.string()
        .min(4, 'Address should be four or more characters')
        .required('Address required'),
      store_interest: Yup.string()
        .min(4, 'Description should be four or more characters')
        .required('Description required'),
      storefront_currency:Yup.string()
        .required('Currency required'),
      store_state:Yup.string()
        .required('State required'),
      store_country:Yup.string()
        .required('Country required'),
      store_logo : Yup.mixed()
        .nullable()
        .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
          return value && value.size <= import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE;
        })
    })  
  })

  useEffect(() => {
    if(storeData){
      formik.setFieldValue('store_address', storeData.location.store_address || '')
      formik.setFieldValue('store_country', storeData.location.store_country || '')
      formik.setFieldValue('store_state', storeData.location.store_state || '')
      formik.setFieldValue('store_interest', storeData.store_interest || '')
      formik.setFieldValue('store_logo', storeData.store_logo || '')
      formik.setFieldValue('storefront_currency', storeData.storefront_currency || '')
    }
  }, [])

  

  const handleSubmit = (e) => {
    if(formik.errors.store_address || !formik.values.store_address || formik.errors.store_country || !formik.values.store_country || formik.errors.storefront_currency || !formik.values.storefront_currency || formik.errors.store_state || !formik.values.store_state || formik.errors.store_interest || !formik.values.store_interest){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    // change
    formData.append('storeID', storeData.storeID)
    formData.append('store_address', formik.values.store_address)
    formData.append('store_interest', formik.values.store_interest)
    formData.append('store_country', formik.values.store_country)
    formData.append('storefront_currency', formik.values.storefront_currency)
    formData.append('store_state', formik.values.store_state)
    formData.append('store_logo', uploadedImageUrl ? uploadedImageUrl : useIsFileObject(formik.values.store_logo) ? storeData.store_logo : formik.values.store_logo)

    try {

      axios.post(`${import.meta.env.VITE_BASEURL}/store/setup?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
      .then((res)=>{
        // console.log(res);
          if(res.data.status == false && res.data.data.message){
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
              closeModal()
              // console.log(res.data.data.message);
          }else if (res.data.status == true && res.data.data.message) {
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`success` })
              mutate()
              closeModal()
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

  // console.log(storeData);
  const {uploading, uploadedImageUrl, errorUpload, handleFileUpload, setErrorUpload, setUploadedImageUrl} = useFileUpload(formik.values.store_logo, 'image', 'store')

  const handleCancel = () => {
    formik.setFieldValue('store_logo', '')
    setUploadedImageUrl('')
  }

  return (
    <div className='bg-white relative m-auto rounded-ten py-8 px-5 md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent h-fit'>
      <div className='text-center'>
        <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Edit <span className="capitalize">{storeData.storefront_name}</span></h4>
      </div>
      <form action="" method='post' className="pt-10 flex flex-col gap-x-10 gap-y-5">
        
        {/* {storeData.store_state} */}
        <FormFileInput formik={formik} fileValue={formik.values.store_logo} errorUpload={errorUpload} setErrorUpload={setErrorUpload} setUploadedImageUrl={setUploadedImageUrl} handleCancel={handleCancel} handleFileUpload={handleFileUpload} uploading={uploading} uploadedImageUrl={uploadedImageUrl} actionText={'Choose Shop Icon'} fileInputId={'store_logo'} fileInputName={'store_logo'} handleBlur={formik.handleBlur} fieldError={formik.touched.store_logo && formik.errors.store_logo} />

        <FormSelect selectId={'storefront_currency'} selectName={'storefront_currency'} required handleChange={formik.handleChange} handleBlur={formik.handleBlur} selectValue={formik.values.storefront_currency} fieldError={formik.touched.storefront_currency && formik.errors.storefront_currency} selectLabel={"What currency would you accept?"}>
            <FormOption isDisabled isSelected optionName={'Choose currency'} value={''} />
            <FormOption optionName={'Naira (NGN)'} value="NGN" />
        </FormSelect>

        <div className='flex flex-col md:flex-row gap-x-10 gap-y-5 md:items-end'>
          <div className="md:w-fiftyPercent flex flex-col gap-2.5">
            <FormSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} selectValue={formik.values.store_country} fieldError={formik.touched.store_country && formik.errors.store_country} selectLabel={'Which Country do you sell in?'} selectId={'store_country'} selectName={'store_country'} >
                <FormOption isDisabled isSelected optionName={'Which Country do you sell in?'} value="" />
                <option value={'Nigeria'}>Nigeria</option>
                <option value={'Ghana'}>Ghana</option>
                <option value={'Kenya'}>Kenya</option>
                <option value={'United States'}>United States</option>
            </FormSelect>
          </div>
          <div className="md:w-fiftyPercent">
            <FormSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} selectValue={formik.values.store_state} fieldError={formik.touched.store_state && formik.errors.store_state} selectLabel={'Which State do you sell in?'} selectId={'store_state'} selectName={'store_state'} >
                <FormOption isDisabled isSelected optionName={'Choose State'} value="" />
                <GetState stateName={formik.values.store_country} />      
            </FormSelect>
          </div>
        </div>

        <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.store_address} fieldError={formik.touched.store_address && formik.errors.store_address} inputLabel={`Enter your Store Address`} inputPlaceholder={`What's your store address`} inputId={'store_address'} inputName={'store_address'} />



        <div>
          <FormTextArea maxLength={500} textAreaId={'store_interest'} textAreaName={'store_interest'} textAreaPlaceholder={"Describe what the product or service you render."} textAreaLabel={'About your shop'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.store_interest} fieldError={formik.touched.store_interest && formik.errors.store_interest} />
        </div>

        <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-end">
          <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Update your shop'} type={'button'} />
        </div>
      </form>
    </div>
  )
}

export default EditStore