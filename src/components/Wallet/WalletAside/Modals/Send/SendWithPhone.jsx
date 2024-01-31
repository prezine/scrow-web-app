import axios from 'axios'
import React, { useState } from 'react'
import useUser from '../../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../../utils/useRequestHeaders'
import useSWR from 'swr'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'
import PhoneInput from '../../../../Elements/Form/PhoneInput'
import useFormatPhoneNumber from '../../../../../utils/useFormatPhoneNumber'
import useFormatPhoneTest from '../../../../../utils/useFormatPhoneTest'
import useAmountFormat from '../../../../../utils/useAmountFormat'

const SendWithPhone = ({balance, mutate, currency, openAlert, alertValues, setOpenAlert, setAlertValues, closeModal}) => {
    const {userDataValue} = useUser()

    const {requestHeaders} = useRequestHeaders()
    const [submitting, setSubmitting] = useState()

  
    const formik = useFormik({
        initialValues:{
            phone:"",
            amount:"",
        },
        validationSchema:Yup.object({
            phone: Yup
            .string()
            .required('Phone number required')
            .min(11, 'Phone number must be at least 11 digits')
            .max(14, 'Phone number must not be more than 14 digits')
            .test('isValid', 'Invalid phone number', function(value) {
            const formattedPhoneNumber = useFormatPhoneTest(value);
            return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
            }),
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
        })
    })

    const handleSubmit = () => {

    if(formik.errors.amount || formik.values.amount == '' || formik.errors.phone || formik.values.phone == '' ){
        return
    }

    
    setOpenAlert(false)
    setSubmitting(true)

    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('phone', formik.values.phone)
    formData.append('amount', formik.values.amount.replaceAll(',', ''))
    
    
    try {

        // const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);

        axios.post(`${import.meta.env.VITE_BASEURL}/bank/transfer/wallet?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            console.log(res);
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
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
        handleChange({ target: { name: 'phone', value: formattedPhoneNumber } });
    } 

  return (
    <form action="" onSubmit={formik.handleSubmit} className="flex flex-col gap-5 text-left">
        <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
            <label htmlFor="phone" className='text-xs text-left font-spaceGroteskMedium text-brandGray14x'>{`What Number do you wish to recharge?`}</label>
            <PhoneInput maxLength={15} placeholder={'Phone number'} id={'phone'} name={'phone'} value={formik.values.phone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} className={`px-4 py-2.5 text-sm bg-transparent autofill:bg-transparent rounded-five border-2 ${(formik.touched.phone && formik.errors.phone)  || (submitting && formik.errors.phone) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} required />
            {(formik.touched.phone && formik.errors.phone) && <p className="text-xs text-brandRed1x">{formik.errors.phone}</p>}
        </fieldset>
         <div>
              <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                  <label htmlFor="amount" className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`Enter the Amount you want to Send`}</label>
                  <div className="relative w-full">
                      <input type="text" name='amount' id='amount' value={formik.values.amount} onChange={(e) => {useAmountFormat(e, formik, 'amount')}} onBlur={formik.handleBlur} placeholder='Amount' className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five border-2  ${(formik.touched.amount && formik.errors.amount)  || (submitting && formik.errors.amount) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} />
                      <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>{currency}</span>
                  </div>
              </fieldset>
              <div className='text-right pt-2'>
                <p className='font-avenirMedium text-sm '>Available balance: <span className={`font-spaceGroteskMedium text-brandGreen1x`}>{currency} {new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(balance)}</span></p>
              </div>
            </div>

            <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
              <ButtonPrimary fontSize={'10px'} handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Send Cash'} type={'button'} width={'w-full'} />
            </div>
    </form>
  )
}

export default SendWithPhone