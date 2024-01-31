import React, { useEffect, useState } from 'react'
import useUser from '../../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../../utils/useRequestHeaders'
import FormInput from '../../../../Elements/Form/FormInput'
import axios from 'axios'
import useSWR from 'swr'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAmountFormat from '../../../../../utils/useAmountFormat'


const Utility = ({currency, currentButtonText, openAlert, alertValues, setOpenAlert, setAlertValues, closeModal, mutate, balance}) => {

  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [customerFound, setCustomerFound] = useState('')


  const fetcher = async (url) => {
    try {
      const response = await axios.get(url, requestHeaders);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues:{
      serviceID:"",
      customerID:"",
      variation:"",
      amount:""
    },
    validationSchema:Yup.object({
        serviceID: Yup
        .string()
        .required('Service required'),
        customerID: Yup
        .string()
        .required('Customer ID required'),
        variation: Yup
        .string()
        .required('Variation / Service type required'),
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

  useEffect(() => {
    handleAccountNumber()
  }, [formik.values.customerID, formik.values.serviceID])



  const utilityListUrl = `${import.meta.env.VITE_BASEURL}/bill/lists?category=utility&country=NG&userID=${userDataValue && userDataValue.userID}`;
  const utilityList = useSWR(utilityListUrl, fetcher);

  // console.log('Utility => ', utilityList.data && utilityList.data.data);

  const variationsListUrl = `${import.meta.env.VITE_BASEURL}/bill/utility/variation?userID=${userDataValue && userDataValue.userID}&serviceID=${formik.values.serviceID !== "" && formik.values.serviceID}`;
  const variationsList = useSWR(variationsListUrl, fetcher);

  // console.log('Variations => ', variationsList.data && variationsList.data.data);


  const handleAccountNumber = () => {
      setLoading(true)
      setError(false)
      setCustomerFound('')
      setCustomerName('')
      if(formik.values.customerID >= 3){
        try {
          axios.get(`${import.meta.env.VITE_BASEURL}/bill/validate?userID=${userDataValue && userDataValue.userID}&&serviceID=${formik.values.serviceID !== "" && formik.values.serviceID}&customerID=${formik.values.customerID !== "" && formik.values.customerID}&type=${formik.values.variation !== '' && formik.values.variation.split('@')[1]}`, requestHeaders)
          .then((res)=>{
            setLoading(false)
            // console.log(res.data.status);
            if (res.data.status == true) {
              setCustomerFound(true)
              setCustomerName(res.data.data.customer_name)
            } else if(res.data.status = false) {
              setCustomerFound(false)
              setCustomerName('')
            }
          })
        } catch (error) {
          setError(true)
        }
      }
  }

  const handleSubmit = () => {

    if(formik.errors.amount || formik.values.amount == '' || formik.errors.serviceID || formik.values.serviceID == '' || formik.errors.customerID || formik.values.customerID == '' || formik.errors.variation || formik.values.variation == '' || !customerFound || !customerName ){
      return
    }

    
    setOpenAlert(false)
    setSubmitting(true)

    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('serviceID', formik.values.serviceID)
    formData.append('variation', formik.values.variation)
    formData.append('customerID', formik.values.customerID)
    formData.append('amount', formik.values.amount.replaceAll(',', ''))
    
    
    try {
      axios.post(`${import.meta.env.VITE_BASEURL}/bill/utility/purchase?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
      .then((res)=>{
        // console.log(res);
          if(res.data.status == false && res.data.data.message){
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
              closeModal()
          }else if (res.data.status == true && res.data.data.message) {
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`success` })
              // mutate()
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
    <form action="" method="post"  className={`flex flex-col gap-5 pt-5`}>
      <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
        <label htmlFor="serviceID" className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`Select your utility bill serviceID?`}</label>
        <div className="relative w-full">
            <select type="text" disabled={utilityList ? !utilityList.data || utilityList.error : true} required name='serviceID' id='serviceID' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.serviceID} className={`px-4 py-2.5 w-full h-11 bg-transparent font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five border-2 ${(formik.touched.serviceID && formik.errors.serviceID) || (submitting && formik.errors.serviceID) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} >
                <option value="" selected disabled>Select Utility Company</option>
                {utilityList && utilityList.data && utilityList.data.data && utilityList.data.data.length > 0 && utilityList.data.data.map((utility, idx)=>{
                  return <option key={idx} value={`${utility.id}`}>{utility.name}</option>
                })}
            </select>
        </div>
      </fieldset>
      <div>
        <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputId={'customerID'} inputName={'customerID'} fieldError={(formik.touched.customerID && formik.errors.customerID) || (submitting && formik.errors.customerID) || (formik.touched.customerID && !customerFound)} inputValue={formik.values.customerID} inputLabel={'What is your Device Number'} inputPlaceholder={'Enter Device Number'} />
        <div className='flex justify-end pt-2'>
          {(formik.values.customerID.toString().length >= 3 && loading) && <p className='text-brandGray12x animate-pulse text-xs'>Confirming customer ...</p>}
          {(error) && <p className='text-brandRed1x animate-pulse text-xs'>Error fetching customer ...</p>}
          {(formik.values.customerID.toString().length >= 3 && !loading && customerName == '' && customerFound == false) && <p className='text-brandRed1x font-avenirBlack text-xs'>Customer: <span className='font-avenirMedium'>Not found</span></p>}
          {(formik.values.customerID.toString().length >= 3 && !loading && customerName && customerFound) && <p className='font-avenirMedium text-sm'>Customer: <span className={`font-spaceGroteskLight text-brandGreen1x text-xs`}>{customerName}</span></p>}
        </div>
      </div>
      <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
        <label htmlFor="variation" className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`What is your Device Type`}</label>
        <div className="relative w-full">
            <select type="text" disabled={utilityList ? !utilityList.data && !variationsList.data || utilityList.error && variationsList.error : true} required name='variation' id='variation' value={formik.values.variation} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`px-4 py-2.5 w-full h-11 bg-transparent font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five border-2 ${(formik.touched.variation && formik.errors.variation) || (submitting && formik.errors.variation) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} >
                <option value="" selected disabled>Select Device Type</option>
                {variationsList && variationsList.data && variationsList.data.data && variationsList.data.status && variationsList.data.data.variations.length > 0 && variationsList.data.data.variations.map((variation, idx)=>{
                  return <option key={idx} value={`${variation.variation_code} @ ${variation.name.toLowerCase()}`}>{variation.name}</option>
                })}
            </select>
        </div>
      </fieldset>
      <div>
          <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
              <label htmlFor="amount" className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`How much  do you want Recharge?`}</label>
              <div className="relative w-full">
                  <input required name='amount' id='amount' value={formik.values.amount} onChange={(e) => {useAmountFormat(e, formik, 'amount')}} onBlur={formik.handleBlur} placeholder='Amount' className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five border-2 ${(formik.touched.amount && formik.errors.amount) || (submitting && formik.errors.amount) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} />
                  <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>NGN</span>
              </div>
          </fieldset>
      </div>
      <div>
            <div className='text-right pt-2'>
              <p className='font-avenirMedium text-sm '>Available balance: <span className={`font-spaceGroteskRegular text-brandGreen1x`}>{currency} {new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(balance)}</span></p>
            </div>
            <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
                <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={currentButtonText} type={'button'} width={'w-full'} />
            </div>
          </div>
    </form>
  )
}

export default Utility