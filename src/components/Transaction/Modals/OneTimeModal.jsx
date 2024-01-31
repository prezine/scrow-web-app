import React, { useState } from 'react'
import ButtonPrimaryIcon from '../../Elements/Buttons/ButtonPrimaryIcon'
import FormInput from '../../Elements/Form/FormInput'
import FormTextArea from '../../Elements/Form/FormTextArea'
import PhoneInput from '../../Elements/Form/PhoneInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import axios from 'axios'
import useUser from '../../../hooks/stores/useUser'
import useFormatPhoneNumber from '../../../utils/useFormatPhoneNumber'
import useFormatPhoneTest from '../../../utils/useFormatPhoneTest'
import useFileUpload from '../../../utils/CloudinaryUpload/useFileUpload'
import {IoIosClose} from 'react-icons/io'
import {GiCheckMark} from 'react-icons/gi'
import { BeatLoader } from 'react-spinners'
import useAmountFormat from '../../../utils/useAmountFormat'



const OneTimeModal = ({openAlert, alertValues, setOpenAlert, setAlertValues, closeModal, mutate}) => {

    const [submitting, setSubmitting] = useState(false)

    const {requestHeaders} = useRequestHeaders()

    const {userDataValue} = useUser()

    const formik = useFormik({
        initialValues:{
            is_buyer: 1,
            customer_name:'',
            customer_email:'',
            customer_phone:'',
            item_name:'',
            item_quantity:'',
            item_amount:'',
            terms:'',
            delivery_date:'',
            escrow_in_days:'',
            attached_document:""
        },
    
        validationSchema:Yup.object({
            customer_name: Yup.string()
              .min(4, 'name should be four or more characters')
              .required('name required'),
            customer_email: Yup.string()
              .email('Invalid email address')
              .required('Email Required'),
            customer_phone: Yup
              .string()
              .required('Phone number required')
              .min(11, 'Phone number must be at least 11 digits')
              .max(14, 'Phone number must not be more than 14 digits')
              .test('isValid', 'Invalid phone number', function(value) {
                const formattedPhoneNumber = useFormatPhoneTest(value);
                return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
              }),  
            item_name:Yup.string()
              .required('Item name required'),
            item_quantity: Yup.number()
                .min(1, 'Minimum quantity is 1')
                .required('Quantity required'),
            terms: Yup.string()
                .min(4, 'Terms should be four or more characters')
                .required('Terms required'),
            item_amount: Yup.number()
              .transform((value, originalValue) => {
                // Remove commas from the value
                if (typeof originalValue === "string") {
                  return originalValue.replace(/,/g, "");
                }
                return originalValue;
              })
              .test("is-number", "Invalid number", (value) => {
                if (value) {
                  // Check if the transformed value is a valid number
                  return !isNaN(Number(value));
                }
                return true;
              })
              .transform((value, originalValue) => {
                // Convert the transformed value to a number
                return parseFloat(value);
              })
              .required('Amount required'),
            escrow_in_days:Yup.number()
              .required('Duration required'),
            delivery_date: Yup.date()
            .required('Date required')
            .min(new Date(), 'Transaction date cannot be in the past'),
            attached_document: Yup.mixed()
            .nullable()
            .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
              return value && value.size <= import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE;
            }),
        })  
      })

    

    

      
      const handleSubmit = (e) => {
        if(formik.errors.customer_email || formik.errors.customer_name || formik.errors.delivery_date || formik.errors.escrow_in_days || formik.errors.terms || formik.errors.item_name || formik.errors.item_quantity || formik.errors.customer_phone || formik.errors.item_amount ){
          return
        }
    
        setOpenAlert(false)
        setSubmitting(true)
        const formData = new FormData()
        formData.append('userID', `${userDataValue && userDataValue.userID}`)
        formData.append('is_buyer', formik.values.is_buyer)
        formData.append('customer_name', formik.values.customer_name)
        formData.append('customer_email', formik.values.customer_email)
        formData.append('customer_phone', formik.values.customer_phone)
        formData.append('item_name', formik.values.item_name)
        formData.append('item_quantity', formik.values.item_quantity)
        formData.append('item_amount', formik.values.item_amount.replaceAll(',', ''))
        formData.append('terms', formik.values.terms)
        formData.append('delivery_date', formik.values.delivery_date)
        formData.append('escrow_in_days', formik.values.escrow_in_days)
        formData.append('currency', 'NGN')
        formData.append('attached_document', uploadedImageUrl ? uploadedImageUrl : '')



    try {

        // console.log(formik.values);

        axios.post(`${import.meta.env.VITE_BASEURL}/escrow/onetime-transaction?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                closeModal()
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

      const handlePhoneInputChange = (e, handleChange) => {
        const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
        handleChange({ target: { name: 'customer_phone', value: formattedPhoneNumber } });
      }

          
    const handleCancel = () => {
        formik.setFieldValue('attached_document', '')
        setUploadedImageUrl('')
    }


    const {uploading, uploadedImageUrl, errorUpload, handleFileUpload, setErrorUpload, setUploadedImageUrl} = useFileUpload(formik.values.attached_document, 'auto', 'transactions')
        
    const handleFileInput = (e) => {
        setErrorUpload('')
        setUploadedImageUrl('')
        formik.setFieldValue('attached_document', e.target.files[0])
    }


  return (
    <>
        <div className='text-center'>
            <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Onetime Transaction</h4>
        </div>
        <form onSubmit={formik.handleSubmit} action="" className='flex flex-col gap-5'>
            <div className='pt-5 text-xs font-spaceGroteskMedium text-brandGray14x'>
                <h2 className='font-avenirBlack text-black text-base'>{formik.values.is_buyer == 1 ? 'Business' : 'Customer'} Data</h2>
                <p className='py-2.5'>I am a</p>
                <div className="bg-brandGray24x py-1 px-2 rounded-ten w-fit flex flex-row font-spaceGroteskMedium">
                  <label htmlFor="buyer" className={`${formik.values.is_buyer == 1 ? 'bg-white' : 'bg-transparent'} rounded-ten py-2 cursor-pointer px-6 trans-all-500-ease-in-out`}>
                    Buyer
                    <input type="checkbox" className='hidden is_buyer-check' id='buyer' name='is_buyer' onChange={(e)=>{formik.setFieldValue('is_buyer', e.target.value)}} value={1} />
                  </label>
                  <label htmlFor="seller" className={`${formik.values.is_buyer == 0 ? 'bg-white' : 'bg-transparent'} rounded-ten py-2 cursor-pointer px-6 trans-all-500-ease-in-out`}>
                    Seller
                    <input type="checkbox" className='hidden is_buyer-check' id='seller' name='is_buyer' onChange={(e)=>{formik.setFieldValue('is_buyer', e.target.value)}} value={0} />
                  </label>
                </div>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-5 md:gap-10 md:items-end'>
                <div className='md:w-fiftyPercent'>
                    <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.customer_name} fieldError={formik.touched.customer_name && formik.errors.customer_name} inputLabel={`Enter ${formik.values.is_buyer == 1 ? "Seller's" : "Buyer's"} Name`} inputName={'customer_name'} inputId={'customer_name'} />
                </div>
                <div className='md:w-fiftyPercent'>
                    <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.customer_email} fieldError={formik.touched.customer_email && formik.errors.customer_email} inputPlaceholder={`Enter Email Address`} inputLabel={`Enter ${formik.values.is_buyer == 1 ? "Seller's" : "Buyer's"} Email Address`} inputName={'customer_email'} inputId={'customer_email'} inputType={'email'} />
                </div>
            </div>
            <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                <label htmlFor="customer_phone" className='text-xs font-spaceGroteskMedium text-brandGray14x'>{`Enter ${formik.values.is_buyer == 1 ? "Seller's" : "Buyer's"}  Phone Number`}</label>
                <PhoneInput onChange={(e)=>{handlePhoneInputChange(e, formik.handleChange)}} onBlur={formik.handleBlur} value={formik.values.customer_phone} className={`px-4 py-2.5 font-spaceGroteskRegular text-xs text-black placeholder:text-brandGray32x rounded-five border-2 ${formik.touched.customer_phone && formik.errors.customer_phone ? 'border-brandRed1x' : 'border-brandGray17x' } w-full`} placeholder="Enter Phone Number" name="customer_phone" id="customer_phone" />
            </fieldset>

            <div>
                <h2 className='font-avenirBlack text-black'>Transaction Data</h2>
                <div className='w-full py-2.5 flex flex-col md:flex-row gap-5 md:gap-10 md:items-end'>
                    <div className='md:w-fiftyPercent'>
                        <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.item_name} fieldError={formik.touched.item_name && formik.errors.item_name} inputLabel={`What are you ${formik.values.is_buyer == 1 ? "buying" : "selling"}?`} inputName={'item_name'} inputId={'item_name'} inputPlaceholder={`Enter the Item Name`} />
                    </div>
                    <div className='md:w-fiftyPercent'>
                        <FormInput min="1" handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.item_quantity} fieldError={formik.touched.item_quantity && formik.errors.item_quantity} inputPlaceholder={`Item Quantity (e.g 3)`} inputLabel={`How many items piece?`} inputName={'item_quantity'} inputId={'item_quantity'} inputType={'number'} />
                    </div>
                </div>
            </div>
            <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                <label htmlFor="item_amount" className='text-xs font-spaceGroteskMedium text-brandGray14x'>{`How much does one item cost?`}</label>
                <div className="relative w-full">
                    <input type="text" name='item_amount' id='item_amount' onChange={(e) => {useAmountFormat(e, formik, 'item_amount')}} onBlur={formik.handleBlur} inputValue={formik.values.item_amount} placeholder='Amount per item (e.g 2,000)' className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five border-2 ${formik.touched.item_amount && formik.errors.item_amount ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2`} />
                    <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>NGN</span>
                </div>
            </fieldset>
            <FormTextArea textAreaName={'terms'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.terms} fieldError={formik.touched.terms && formik.errors.terms} textAreaId={'terms'} textAreaLabel={'Explain the Exact Color, Shape, Size, etc of the Expected Item'} textAreaPlaceholder={`Enter terms of Service (e. g “We agreed that I'll ${formik.values.is_buyer == 1 ? "receive" : "send"} x item in gold color and x Ton on the y day”)`} textAreaRows={'8'} resize={false} />
            <div className='w-full flex flex-col md:flex-row gap-5 md:gap-10 md:items-end'>
                <fieldset className={`gap-2.5 md:w-fiftyPercent flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                    <label htmlFor="delivery_date" className='text-xs font-spaceGroteskMedium text-brandGray14x'>{`When would you ${formik.values.is_buyer == 1 ? "receive" : "send"} this item?`}</label>
                    <div className="relative w-full">
                        <input type="date" name='delivery_date' id='delivery_date' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.delivery_date} placeholder={`Expected delivery date`} className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five appearance-none bg-transparent h-38px border-2 ${formik.touched.delivery_date && formik.errors.delivery_date ? 'border-brandRed1x focus:border-brandRed2x' : 'border-brandGray17x focus:border-black' } focus:outline-none focus:border-2`} />
                        <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>
                        <svg className='h-4 w-4 pointer-events-none' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66663 1.6665V4.1665" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.3334 1.6665V4.1665" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path opacity="0.4" d="M2.91663 7.5752H17.0833" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16.0083 13.1416L13.0583 16.0916C12.9416 16.2082 12.8333 16.4249 12.8083 16.5832L12.6499 17.7082C12.5916 18.1166 12.875 18.3999 13.2833 18.3416L14.4083 18.1833C14.5666 18.1583 14.7916 18.0499 14.9 17.9332L17.85 14.9833C18.3583 14.4749 18.6 13.8833 17.85 13.1333C17.1083 12.3916 16.5166 12.6332 16.0083 13.1416Z" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.5833 13.5664C15.8333 14.4664 16.5333 15.1664 17.4333 15.4164" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V7.08317C2.5 4.58317 3.75 2.9165 6.66667 2.9165H13.3333C16.25 2.9165 17.5 4.58317 17.5 7.08317V9.99984" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path opacity="0.4" d="M9.9962 11.4167H10.0037" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                            <path opacity="0.4" d="M6.91197 11.4167H6.91945" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                            <path opacity="0.4" d="M6.91199 13.9165H6.91947" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </span>
                    </div>
                </fieldset>
                <div className='md:w-fiftyPercent'>
                    <FormInput min="1" handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.escrow_in_days} fieldError={formik.touched.escrow_in_days && formik.errors.escrow_in_days} inputPlaceholder={`Duration of Escrow`} inputLabel={`How long (in days) would it take?`} inputName={'escrow_in_days'} inputId={'escrow_in_days'} inputType={'number'} />
                </div>
            </div>

            <fieldset>
              <label htmlFor='attached_document' className={`text-sm font-spaceGroteskRegular ${uploading ? 'text-brandGray16x cursor-not-allowed pointer-events-none animate-pulse' : 'text-brandGreen1x cursor-pointer pointer-events-auto'}`} >
                <div>
                  {
                    !errorUpload
                    ?
                    <div>
                      {!uploadedImageUrl || !formik.values.attached_document ? 
                      uploading ? 
                      <span className={`flex gap-2 items-center`}>Uploading <BeatLoader size={'10px'} color={`#2A2AB2`} /></span> : 
                      '+ Attach a contract or document (Optional)' : 
                      <span className='flex gap-2 items-center'>
                        {formik.values.attached_document.type.startsWith('image/') ? 'Image' : 'File'} Uploaded
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.3" y="0.3" width="17.4" height="17.4" rx="8.7" fill="#3DDC84"/>
                          <g clip-path="url(#clip0_16055_34025)">
                          <path d="M11.5797 7.10775L8.12497 10.5623C8.10174 10.5856 8.07414 10.6041 8.04374 10.6167C8.01334 10.6293 7.98075 10.6358 7.94784 10.6358C7.91493 10.6358 7.88234 10.6293 7.85194 10.6167C7.82155 10.6041 7.79394 10.5856 7.77072 10.5623L6.43472 9.225C6.41149 9.20168 6.38388 9.18318 6.35349 9.17055C6.32309 9.15793 6.2905 9.15143 6.25759 9.15143C6.22468 9.15143 6.19209 9.15793 6.16169 9.17055C6.1313 9.18318 6.10369 9.20168 6.08047 9.225C6.05715 9.24823 6.03864 9.27583 6.02602 9.30623C6.01339 9.33662 6.00689 9.36921 6.00689 9.40213C6.00689 9.43504 6.01339 9.46763 6.02602 9.49803C6.03864 9.52842 6.05715 9.55602 6.08047 9.57925L7.41697 10.9155C7.55795 11.0562 7.74901 11.1353 7.94822 11.1353C8.14742 11.1353 8.33848 11.0562 8.47947 10.9155L11.934 7.46175C11.9572 7.43853 11.9757 7.41094 11.9883 7.38057C12.0009 7.3502 12.0074 7.31764 12.0074 7.28475C12.0074 7.25187 12.0009 7.21931 11.9883 7.18894C11.9757 7.15856 11.9572 7.13097 11.934 7.10775C11.9107 7.08443 11.8831 7.06593 11.8527 7.0533C11.8223 7.04068 11.7898 7.03418 11.7568 7.03418C11.7239 7.03418 11.6913 7.04068 11.6609 7.0533C11.6305 7.06593 11.6029 7.08443 11.5797 7.10775Z" fill="white"/>
                          </g>
                          <rect x="0.3" y="0.3" width="17.4" height="17.4" rx="8.7" stroke="#22B94D" stroke-width="0.6"/>
                          <defs>
                          <clipPath id="clip0_16055_34025">
                          <rect width="6" height="6" fill="white" transform="translate(6 6)"/>
                          </clipPath>
                          </defs>
                        </svg>
                        Click to change
                      </span>
                      }
                    </div>
                    :
                    <p className={`text-brandRed1x text-xs`}>Error uploading file. Click to change</p>
                  }
                </div>
              </label>
              <input readonly={uploading} type="file" name='attached_document' id='attached_document' onChange={(e)=>handleFileInput(e)} onBlur={formik.handleBlur} className='hidden' />
            </fieldset>
            {
              formik.values.attached_document && !errorUpload
              && 
              <div>
                {
                  formik.values.attached_document.type.startsWith('image/')
                  ?
                  <div className='h-20'>
                    <img src={URL.createObjectURL(formik.values.attached_document)} alt="Your Crowdfunding cover" className='w-full h-full object-cover' />
                  </div>
                  :
                  formik.values.attached_document.name
                }
               <div>
                {formik.errors.attached_document && formik.values.attached_document
                  ?
                  <p className={`text-xs text-right text-brandRed1x py-2`}>*** {formik.errors.attached_document}</p>
                  :
                  <>
                    {
                      (!uploadedImageUrl && !errorUpload)
                      &&
                      <div className={`flex items-center gap-3 justify-end py-2 flex-wrap`}>
                        <p className='text-brandGray14x text-xs'>Use this {formik.values.attached_document.type.startsWith('image/') ? 'image' : 'file'} ?</p>
                        <div className={`flex items-center gap-3 justify-end`}>
                          <button type='button' disabled={uploading} onClick={handleCancel} className='text-brandRed1x disabled:text-brandGray16x text-3xl'> <IoIosClose /></button>
                          <button type='button' disabled={uploading} onClick={handleFileUpload} className={`text-brandGreen1x disabled:text-brandGray16x`}> <GiCheckMark /></button>
                        </div>
                      </div>
                      }
                  </>
                }
               </div>
              </div>
            }

            <div className='flex justify-end'>
                <ButtonPrimaryIcon handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} type={'button'} icon={' '} text={'Create new transaction'} flexDirection={'flex-row-reverse'} />
            </div>
        </form>
    </>
  )
}

export default OneTimeModal