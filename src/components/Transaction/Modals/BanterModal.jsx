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
import useAmountFormat from '../../../utils/useAmountFormat'

const BanterModal = ({openAlert, alertValues, setOpenAlert, setAlertValues, closeModal, mutate}) => {

  const [submitting, setSubmitting] = useState(false)

  const {requestHeaders} = useRequestHeaders()

  const {userDataValue} = useUser()

    const formik = useFormik({
        initialValues:{
            fullname:'',
            email:'',
            phone:'',
            banter_title:'',
            amount:'',
            description:'',
            date:'',
            escrow_in_days:''
        },
    
        validationSchema:Yup.object({
            fullname: Yup.string()
              .min(4, 'Name should be four or more characters')
              .required('Name required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Email Required'),
            phone: Yup
            .string()
            .required('Phone number required')
            .min(11, 'Phone number must be at least 11 digits')
            .max(14, 'Phone number must not be more than 14 digits')
            .test('isValid', 'Invalid phone number', function(value) {
              const formattedPhoneNumber = useFormatPhoneTest(value);
              return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
            }),   
            banter_title:Yup.string()
              .required('Bet name required'),
            description: Yup.string()
                .min(4, 'Terms should be four or more characters')
                .required('Terms required'),
            amount: Yup.number()
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
            .required("Amount required"),
            escrow_in_days:Yup.number()
              .required('Duration required'),
            banter_date_end: Yup.date()
            .required('Date required')
            .min(new Date(), 'Banter date cannot be in the past')
    
                
        })  
      })

      
      const handleSubmit = (e) => {
        if(formik.errors.email || formik.values.email == '' || formik.errors.fullname || formik.errors.banter_date_end || formik.errors.escrow_in_days || formik.errors.description || formik.errors.banter_title || formik.errors.phone || formik.errors.amount || !formik.values.fullname || !formik.values.banter_date_end || !formik.values.escrow_in_days || !formik.values.description || !formik.values.banter_title || !formik.values.phone || !formik.values.amount ){
          return
        }
    
        setOpenAlert(false)
        setSubmitting(true)
        const formData = new FormData()
        formData.append('userID', `${userDataValue && userDataValue.userID}`)
        formData.append('fullname', formik.values.fullname)
        formData.append('email', formik.values.email)
        formData.append('phone', formik.values.phone)
        formData.append('banter_title', formik.values.banter_title)
        formData.append('amount', formik.values.amount.replaceAll(',', ''))
        formData.append('description', formik.values.description)
        formData.append('banter_date_end', formik.values.banter_date_end)
        formData.append('escrow_in_days', formik.values.escrow_in_days)
        formData.append('currency', 'NGN')
  
        try {
  
          axios.post(`${import.meta.env.VITE_BASEURL}/escrow/banter-transaction?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
          .then((res)=>{
            console.log(res);
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

      const handlePhoneInputChange = (e, handleChange) => {
        const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
        handleChange({ target: { name: 'phone', value: formattedPhoneNumber } });
    }

  return (
    <>
        <div className='text-center'>
            <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Banter Transaction</h4>
        </div>
        <form onSubmit={formik.handleSubmit} action="" className='flex flex-col gap-5'>
            <h2 className='font-avenirBlack text-black pt-8'>Opponent Data</h2>
            <div className='w-full flex flex-col md:flex-row gap-5 md:gap-10 md:items-end'>
                <div className='md:w-fiftyPercent'>
                    <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.fullname} fieldError={formik.touched.fullname && formik.errors.fullname} inputLabel={`Enter Opponent's Name`} inputPlaceholder={'Enter fullname'} inputName={'fullname'} inputId={'fullname'} />
                </div>
                <div className='md:w-fiftyPercent'>
                    <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} inputPlaceholder={`Enter Email Address`} inputLabel={`Enter Opponent's Email Address`} inputName={'email'} inputId={'email'} inputType={'email'} />
                </div>
            </div>
            <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                <label htmlFor="phone" className='text-xs font-spaceGroteskMedium text-brandGray14x'>{`Enter Opponent's Phone Number`}</label>
                <PhoneInput onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} value={formik.values.phone} className={`px-4 py-2.5 font-spaceGroteskRegular text-xs text-black placeholder:text-brandGray32x rounded-five border-2 ${formik.touched.phone && formik.errors.phone ? 'border-brandRed1x' : 'border-brandGray17x' } w-full`} placeholder="Enter Phone Number" name="phone" id="phone" />
            </fieldset>

            <div>
                <h2 className='font-avenirBlack text-black pb-4'>Transaction Data</h2>
                <div className='w-full flex flex-col md:flex-row pb-2.5 gap-5 md:gap-10 md:items-end'>
                      <div className='md:w-fiftyPercent'>
                          <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.banter_title} fieldError={formik.touched.banter_title && formik.errors.banter_title} inputLabel={`What are you betting on`} inputName={'banter_title'} inputId={'banter_title'} inputPlaceholder={`Enter the Name of your bet`} />
                      </div>
                      <div className='md:w-fiftyPercent'>
                          <FormInput handleChange={(e) => {useAmountFormat(e, formik, 'amount')}} handleBlur={formik.handleBlur} inputValue={formik.values.amount} fieldError={formik.touched.amount && formik.errors.amount} inputPlaceholder={`Amount Staked (e.g 200,000)`} inputLabel={`How much each are both of you bringing?`} inputName={'amount'} inputId={'amount'} />
                      </div>
                  </div>
            </div>

            <FormTextArea textAreaName={'description'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.description} fieldError={formik.touched.description && formik.errors.description} textAreaId={'description'} textAreaLabel={'Enter the terms of banter'} textAreaPlaceholder={`Enter terms of banter (e. g “We agreed that Man.U would Win Chelsea 3 : 0”)`} textAreaRows={'8'} resize={false} />
            
            <div className='w-full flex flex-col md:flex-row gap-5 md:gap-10 md:items-end'>
                <fieldset className={`gap-2.5 md:w-fiftyPercent flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                    <label htmlFor="banter_date_end" className='text-xs font-spaceGroteskMedium text-brandGray14x'>{`When would this bet end?`}</label>
                    <div className="relative w-full">
                        <input type="date" name='banter_date_end' id='banter_date_end' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.banter_date_end} placeholder={`Expected end date`} className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five appearance-none bg-transparent h-38px border-2 ${formik.touched.banter_date_end && formik.errors.banter_date_end ? 'border-brandRed1x' : 'border-brandGray17x'}`} />
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
                    <FormInput min="1" handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.escrow_in_days} fieldError={formik.touched.escrow_in_days && formik.errors.escrow_in_days} inputPlaceholder={`When would this banter end?`} inputLabel={`How long (in days) would it take?`} inputName={'escrow_in_days'} inputId={'escrow_in_days'} inputType={'number'} />
                </div>

            </div>

            <div className='flex justify-end'>
                <ButtonPrimaryIcon handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} type={'button'} icon={' '} text={'Create new transaction'} flexDirection={'flex-row-reverse'} />
            </div>
        </form>
    </>
  )
}

export default BanterModal