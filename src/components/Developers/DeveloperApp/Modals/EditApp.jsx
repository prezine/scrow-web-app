import React, {useEffect, useRef, useState} from 'react'
import FormInput from '../../../Elements/Form/FormInput'
import ButtonPrimary from '../../../Elements/Buttons/ButtonPrimary'
import FormTextArea from '../../../Elements/Form/FormTextArea'
import FormFileInput from '../../../Elements/Form/FormFileInput'
import FormSelect from '../../../Elements/Form/FormSelect'
import FormOption from '../../../Elements/Form/FormOption'
import useRequestHeaders from '../../../../utils/useRequestHeaders'
import useIsFileObject from '../../../../utils/useIsFileObject'
import useUser from '../../../../hooks/stores/useUser'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useFileUpload from '../../../../utils/CloudinaryUpload/useFileUpload'


const EditApp = ({closeModal, setOpenAlert, setAlertValues, alertValues, name, appData, mutate}) => {

  const [submitting, setSubmitting] = useState(false)


  const {requestHeaders} = useRequestHeaders()

  const {userDataValue} = useUser()

  

  const formik = useFormik({
    initialValues:{
      appname:'',
      display_name:'',
      products:'',
      appicon:'',
      industry:'',
      device:'',
      appdescription:''
    },

    validationSchema:Yup.object({
        appname: Yup.string()
          .min(4, 'Name should be four or more characters')
          .required('Name required'),
        appdescription: Yup.string()
          .min(4, 'Description should be four or more characters')
          .required('Description required'),
        display_name: Yup.string()
        .min(4, 'Display name should be four or more characters')
        .required('Display name required'),
        industry:Yup.string()
          .required('Industry required'),
        scope:Yup.string()
          .required('Scope required'),
        products:Yup.string()
          .required('Products required'),
        appicon : Yup.mixed()
          .nullable()
          .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
            return value && value.size <= import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE
          })
    })  
  })

  const handleSubmit = (e) => {
    if(formik.errors.appname || !formik.values.appname || formik.errors.appdescription || !formik.values.appdescription || formik.errors.products || !formik.values.products || formik.errors.industry || !formik.values.industry || formik.errors.scope || !formik.values.scope || formik.errors.display_name || !formik.values.display_name){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('appid', `${appData && appData.appid}`)
    formData.append('appicon', uploadedImageUrl ? uploadedImageUrl : useIsFileObject(formik.values.appicon) ? appData.appicon : formik.values.appicon)
    formData.append('appname', formik.values.appname || appData.appname)
    formData.append('appdescription', formik.values.appdescription || appData.appdescription)
    formData.append('display_name', formik.values.display_name || appData.display_name)
    formData.append('industry', formik.values.industry || appData.industry)
    formData.append('products', formik.values.products || appData.products)
    formData.append('scope', formik.values.scope || appData.scope)

    // console.log(formik.values.scope);

    try {

      axios.post(`${import.meta.env.VITE_BASEURL}/app/update?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
      .then((res)=>{
        // console.log(res);
          if(res.data.status == false && res.data.data.message){
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
              closeModal()
              console.log(res.data.data.message);
          }else if (res.data.status == true && res.data.data.message) {
              setOpenAlert(true)
              setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
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

  useEffect(() => {
    if(appData){
      formik.setFieldValue('appname', appData.appname)
      formik.setFieldValue('appdescription', appData.appdescription)
      formik.setFieldValue('display_name', appData.display_name)
      formik.setFieldValue('industry', appData.industry)
      formik.setFieldValue('products', appData.products)
      formik.setFieldValue('scope', appData.scope)
      formik.setFieldValue('appicon', appData.appicon)
    }
  }, [])

  const {uploading, uploadedImageUrl, errorUpload, handleFileUpload, setErrorUpload, setUploadedImageUrl} = useFileUpload(formik.values.appicon, 'image', 'apps')

  const handleCancel = () => {
    formik.setFieldValue('appicon', '')
    setUploadedImageUrl('')
  }
  



  return (
    <div className='bg-white relative m-auto rounded-ten py-8 px-5 md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent h-fit'>
      <div className='text-center'>
        <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Edit {name || '----'} App</h4>
      </div>
      <form action="" method='post' className="pt-10 flex flex-col gap-x-10 gap-y-5">
        <FormFileInput formik={formik} fileValue={formik.values.appicon} errorUpload={errorUpload} setErrorUpload={setErrorUpload} setUploadedImageUrl={setUploadedImageUrl} handleCancel={handleCancel} handleFileUpload={handleFileUpload} uploading={uploading} uploadedImageUrl={uploadedImageUrl} actionText={'Choose App Icon'} fileInputId={'appicon'} fileInputName={'appicon'} handleBlur={formik.handleBlur} fieldError={formik.touched.appicon && formik.errors.appicon} />
        
        <div className='flex flex-col md:flex-row gap-x-10 gap-y-5 md:items-end'>
          <div className="md:w-fiftyPercent flex flex-col gap-2.5">
            <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.appname} fieldError={formik.touched.appname && formik.errors.appname} inputLabel={'What should we call this App?'} inputPlaceholder={'Enter App Name'} inputId={'appname'} inputName={'appname'} />
          </div>
          <div className="md:w-fiftyPercent">
            <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.display_name} fieldError={formik.touched.display_name && formik.errors.display_name} inputLabel="What would you like people to see?" inputPlaceholder="Enter Display Name" inputName={'display_name'} inputId={'display_name'} />
          </div>
        </div>
        
        <FormSelect selectId={'products'} selectName={'products'} required handleChange={formik.handleChange} handleBlur={formik.handleBlur} selectValue={formik.values.products} fieldError={formik.touched.products && formik.errors.products} selectLabel={"Which of Pandascrow's Infrastructure are you building on?"}>
            <FormOption isDisabled isSelected optionName={'Choose Product'} value={''} />
            <FormOption optionName={'Escrow'} value="Escrow" />
            <FormOption optionName={'KYC'} value="KYC" />
            <FormOption optionName={'Checkout'} value="Checkout" />
            <FormOption optionName={'Virtual Card'} value="Virtual Card" />
            <FormOption optionName={'Banking'} value="Banking" />
            <FormOption optionName={'Bills'} value="Bills" />
            <FormOption optionName={'Storefront'} value="Storefront" />
        </FormSelect>

        <div className='flex flex-col md:flex-row gap-x-10 gap-y-5 md:items-end'>
          <div className="md:w-fiftyPercent flex flex-col gap-2.5">
            <FormSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} selectValue={formik.values.industry} fieldError={formik.touched.industry && formik.errors.industry} selectLabel={'What Industry are you building for?'} selectId={'industry'} selectName={'industry'} >
                <FormOption isDisabled isSelected optionName={'Choose Industry'} value="" />
                <FormOption optionName={'Agriculture'} value="Agriculture" />
                <FormOption optionName={'Blockchain'} value="Blockchain" />
                <FormOption optionName={'eCommerce'} value="eCommerce" />
                <FormOption optionName={'Entertainment'} value="Entertainment" />
                <FormOption optionName={'Financial Services'} value="Financial Services" />
                <FormOption optionName={'Healthcare'} value="Healthcare" />
                <FormOption optionName={'Logistics'} value="Logistics" />
                <FormOption optionName={'Marketplace'} value="Marketplace" />
                <FormOption optionName={'Real Estate'} value="Real Estate" />
                <FormOption optionName={'Social Commerce'} value="Social Commerce" />
                <FormOption optionName={'Utility'} value="Utility" />
            </FormSelect>
          </div>
          <div className="md:w-fiftyPercent">
            <FormSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} selectValue={formik.values.scope} fieldError={formik.touched.scope && formik.errors.scope} selectLabel={'What Device are you building on?'} selectId={'scope'} selectName={'scope'} >
                <FormOption isDisabled isSelected optionName={'Select Scope'} value="" />
                <FormOption optionName={'Web'} value="Web" />                
                <FormOption optionName={'Mobile'} value="Mobile" />
                <FormOption optionName={'Desktop'} value="Desktop" />
                <FormOption optionName={'Others'} value="Others" />
            </FormSelect>
          </div>
        </div>


        <div>
          <FormTextArea maxLength={500} textAreaId={'appdescription'} textAreaName={'appdescription'} textAreaPlaceholder={"Describe what the product you're building look like"} textAreaLabel={'Explain what this App would do'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.appdescription || appData.appdescription} fieldError={formik.touched.appdescription && formik.errors.appdescription} />
        </div>

        <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-end">
          <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Save Changes'} type={'button'} />
        </div>


      </form>
    </div>
  )
}

export default EditApp