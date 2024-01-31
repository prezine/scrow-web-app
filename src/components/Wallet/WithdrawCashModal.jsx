import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../Elements/Buttons/ButtonPrimary'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useUser from '../../hooks/stores/useUser'
import useRequestHeaders from '../../utils/useRequestHeaders'
import axios from 'axios'
import useAmountFormat from '../../utils/useAmountFormat'

const WithdrawCashModal = ({ currency, balance, openAlert, closeModal, setOpenAlert, setAlertValues, alertValues, mutate}) => {

  const {userDataValue, BusinessDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const [submitting, setSubmitting] = useState(false)

  const formik = useFormik({
      initialValues:{
          amount:"",
      },
      validationSchema:Yup.object({
          amount: Yup
          .number()
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
          .min(1000, "Minimum withdrawal is NGN 1000")
          .required("Amount required"),
      }),
  })
  

    
  const handleSubmit = (e) => {
    if(formik.errors.amount || formik.values.amount == ''){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)

    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('amount', `${formik.values.amount.replaceAll(',', '')}`)
    
    try {

      axios.post(`${import.meta.env.VITE_BASEURL}/bank/withdraw?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
      .then((res)=>{
        console.log(res);
          if(res.data.status == false && res.data.data.message){
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
            //   setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
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


  return (
    <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-lg h-fit'>
        <div className='text-center'>
            <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Withdraw Cash 🎉</h4>

            <form action="" className='pt-10 flex flex-col gap-5'>
            <div>
                <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                    <label htmlFor="amount" className='text-base font-avenirMedium text-black text-left'>{`Withdrawal Amount`}</label>
                    <div className="relative w-full">
                        <input required name='amount' id='amount' value={formik.values.amount} onChange={(e) => {useAmountFormat(e, formik, 'amount')}} onBlur={formik.handleBlur} placeholder='1,000' className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskLight text-sm text-black placeholder:text-brandGray32x rounded-five border-2 ${(formik.touched.amount && formik.errors.amount) || (submitting && formik.errors.amount) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} />
                        <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>NGN</span>
                    </div>
                </fieldset>
                {(formik.touched.amount && formik.errors.amount) && <p className="text-xs text-brandRed1x text-left pt-2">{formik.errors.amount}</p>}
            </div>
            <div className='text-right pt-2'>
              <p className='font-avenirMedium text-sm'>Available Wallet Balance: <span className={`font-spaceGroteskLight text-brandGreen1x`}>{currency} {new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(balance)}</span></p>
            </div>
            <div className='border-y-0.5 border-y-brandGray2x py-7'>
            
                <div className='flex gap-10 justify-between pb-7'>
                    <p className='text-sm md:text-base lg:text-base'>Pandascrow Fee</p>
                    <p className={`font-spaceGroteskLight text-brandGreen1x text-right`}>{currency} 100.00</p>
                </div>
                <div className='flex gap-10 justify-between'>
                    <p className='text-sm md:text-base lg:text-base'>What You'll get</p>
                    <p className={`font-spaceGroteskLight text-brandGreen1x text-right`}>{currency}{" "}
                    {new Intl.NumberFormat("en", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                    }).format(
                        parseFloat(formik.values.amount && formik.values.amount.replaceAll(",", "")) >= 1000
                        ? parseFloat(formik.values.amount && formik.values.amount.replaceAll(",", "") - 100)
                        : 0.0
                    )}
                    </p>
                </div>

            </div>

            <div className='flex justify-center py-3'>
            <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} type={'button'} text={`Yes, Withdraw to Bank`} bgColor={'bg-brandGreen1x'} flexDirection={'flex-row-reverse'} />
            </div>
            </form>
        </div>
    </div>
  )
}

export default WithdrawCashModal