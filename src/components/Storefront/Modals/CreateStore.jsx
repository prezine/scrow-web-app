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


const CreateStore = ({closeModal, setOpenAlert, setAlertValues, alertValues, mutate}) => {

  const [submitting, setSubmitting] = useState(false)
  const [slugAvailable, setSlugAvailable] = useState('')
  const [slugMessage, setSlugMessage] = useState('')


  const {requestHeaders} = useRequestHeaders()

  const {userDataValue} = useUser()


  const formik = useFormik({
    initialValues:{
      storefront_name:'',
      storefront_desc:'',
      store_country:'',
      store_state:'',
      storefront_currency:'',
      store_interest:'',
      storefront_slug:"",
      store_logo:""
    },

    validationSchema:Yup.object({
      storefront_name: Yup.string()
        .min(4, 'Name should be four or more characters')
        .required('Name required'),
      store_interest: Yup.string()
        .required('Interest required'),
      storefront_desc: Yup.string()
        .min(4, 'Description should be four or more characters')
        .required('Description required'),
      storefront_currency:Yup.string()
        .required('Currency required'),
      store_state:Yup.string()
        .required('State required'),
      store_country:Yup.string()
        .required('Country required'),
      storefront_slug:Yup.string()
        .required('Slug required'),
      store_logo : Yup.mixed()
      .nullable()
      .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
        return value && value.size <= import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE;
      })
    })  
  })

  let slugConfirmError = false

  const handleSlugChange = (e) => {
    setSlugAvailable(false)
    setSlugMessage('')
    formik.setFieldValue('storefront_slug', slugify(e.target.value))
    const slugConfirmUrl = `${import.meta.env.VITE_BASEURL}/store/lookup/nick?userID=${userDataValue && userDataValue.userID}&nick=${slugify(e.target.value)}`
    axios.get(slugConfirmUrl, requestHeaders)
    .then((res)=>{
      // console.log(res);
      if(res.data.status == true){
        setSlugAvailable(true)
        setSlugMessage(res.data.data.message)
      }else{
        setSlugAvailable(false)
        setSlugMessage(res.data.data.message)
      }
    })
    .catch((err)=>{
      console.error('Store create slug fetch => ', err);
      slugConfirmError = true
    })
   }

  const handleSubmit = (e) => {
    if(!slugAvailable || formik.errors.storefront_name || !formik.values.storefront_slug || formik.errors.storefront_slug || !formik.values.storefront_name || formik.errors.store_interest || !formik.values.store_interest || formik.errors.store_country || !formik.values.store_country || formik.errors.storefront_currency || !formik.values.storefront_currency || formik.errors.store_state || !formik.values.store_state || formik.errors.storefront_desc || !formik.values.storefront_desc){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    // change
    // formData.append('storeID', `${userDataValue && userDataValue.userID}${Math.random() * 100}`)
    formData.append('storefront_name', formik.values.storefront_name)
    formData.append('store_interest', formik.values.store_interest)
    formData.append('storefront_desc', formik.values.storefront_desc)
    formData.append('store_country', formik.values.store_country)
    formData.append('storefront_currency', formik.values.storefront_currency)
    formData.append('storefront_slug', formik.values.storefront_slug)
    formData.append('store_state', formik.values.store_state)
    formData.append('store_logo', uploadedImageUrl ? uploadedImageUrl : useIsFileObject(formik.values.store_logo) ? '' : formik.values.store_logo)

    try {

      axios.post(`${import.meta.env.VITE_BASEURL}/store/setup?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
      .then((res)=>{
        // console.log(res);
          if(res.data.status == false && res.data.data.message){
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
              closeModal()
              console.log(res.data.data.message);
          }else if (res.data.status == true && res.data.data.message) {
              formik.resetForm()
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

  const handleSlugging = (e) => {
    formik.setFieldValue('storefront_name', e.target.value)
    formik.setFieldValue('storefront_slug', slugify(e.target.value))
    handleSlugChange(e)
  }

  const {uploading, uploadedImageUrl, errorUpload, handleFileUpload, setErrorUpload, setUploadedImageUrl} = useFileUpload(formik.values.store_logo, 'image', 'store')

  const handleCancel = () => {
    formik.setFieldValue('store_logo', '')
    setUploadedImageUrl('')
  }


  return (
    <div className='bg-white relative m-auto rounded-ten py-8 px-5 md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent h-fit'>
      <div className='text-center'>
        <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Create a Shop</h4>
      </div>
      <form action="" method='post' className="pt-10 flex flex-col gap-x-10 gap-y-5">
        
        <FormFileInput formik={formik} fileValue={formik.values.store_logo} errorUpload={errorUpload} setErrorUpload={setErrorUpload} setUploadedImageUrl={setUploadedImageUrl} handleCancel={handleCancel} handleFileUpload={handleFileUpload} uploading={uploading} uploadedImageUrl={uploadedImageUrl} actionText={'Choose Shop Icon'} fileInputId={'store_logo'} fileInputName={'store_logo'} handleBlur={formik.handleBlur} fieldError={formik.touched.store_logo && formik.errors.store_logo} />

        
        <div className='flex flex-col md:flex-row gap-x-10 gap-y-5 md:items-end'>
          <div className="md:w-fiftyPercent flex flex-col gap-2.5">
            <FormInput handleChange={(e)=>handleSlugging(e)} handleBlur={formik.handleBlur} inputValue={formik.values.storefront_name} fieldError={formik.touched.storefront_name && formik.errors.storefront_name} inputLabel={'What is your Store Name?'} inputPlaceholder={'Enter Store Name'} inputId={'storefront_name'} inputName={'storefront_name'} />
          </div>
          <div className="md:w-fiftyPercent">
            <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.storefront_desc} fieldError={formik.touched.storefront_desc && formik.errors.storefront_desc} inputLabel="Enter Short tagline for your store" inputPlaceholder="Tagline e.g (Nike - “Just do it”)" inputName={'storefront_desc'} inputId={'storefront_desc'} />
          </div>
        </div>

        <fieldset className={`gap-2.5 w-full flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
              <p className='text-xs font-avenirMedium text-black text-left'>{`This is your Store URL`}</p>
              <label htmlFor='storefront_slug' className={`relative w-full flex flex-row items-center gap-0.5 text-sm text-brandBlack1x px-4 py-2.5 rounded-five appearance-none bg-transparent border-2 ${(formik.touched.storefront_slug && formik.errors.storefront_slug) ? 'border-brandRed1x focus-within:border-brandRed1x' : 'border-brandGray16x focus-within:border-black'} focus-within:border-2`}>
                <span className='font-avenirHeavy'>https://pandastore.io/</span>
                <input readonly type="text" name='storefront_slug' id='storefront_slug' onChange={(e)=>handleSlugChange(e)} onBlur={formik.handleBlur} required placeholder={`slug`} value={formik.values.storefront_slug} className='w-full focus:outline-none font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-r-five bg-transparent' />
              </label>
              <div className='flex justify-end'>
                <>
                  {(formik.values.storefront_slug.toString().length >= 3 && formik.values.storefront_slug && !slugConfirmError && !slugMessage) && <p className='text-brandGray12x animate-pulse text-xs'>Checking Availability ...</p>}
                  {(slugConfirmError) && <p className='text-brandRed1x animate-pulse text-xs'>Error confirming slug ...</p>}
                  {(formik.values.storefront_slug.toString().length >= 3 && slugMessage && !slugConfirmError) && <p className={`${slugAvailable ? 'text-brandGreen1x' : 'text-brandRed1x'} font-avenirBlack text-xs`}>{slugMessage}</p>}
                </>
                </div>
        </fieldset>
        
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


        <div>
          <FormTextArea maxLength={500} textAreaId={'store_interest'} textAreaName={'store_interest'} textAreaPlaceholder={"Describe what the product or service you render."} textAreaLabel={'About your shop'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.store_interest} fieldError={formik.touched.store_interest && formik.errors.store_interest} />
        </div>

        <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-end">
          <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Create New Shop'} type={'button'} />
        </div>
      </form>
    </div>
  )
}

export default CreateStore