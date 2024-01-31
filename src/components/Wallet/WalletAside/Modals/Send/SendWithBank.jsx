import axios from 'axios'
import React, { useState } from 'react'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'
import FormInput from '../../../../Elements/Form/FormInput'
import FormOption from '../../../../Elements/Form/FormOption'
import FormSelect from '../../../../Elements/Form/FormSelect'
import useSWR from 'swr'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useUser from '../../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../../utils/useRequestHeaders'
import useAmountFormat from '../../../../../utils/useAmountFormat'

const SendWithBank = ({balance, mutate, currency, openAlert, alertValues, setOpenAlert, setAlertValues, closeModal}) => {
    const [submitting, setSubmitting] = useState(false)
    const [accountName, setAccountName] = useState('')
    const [accountFound, setAccountFound] = useState('')

    const {userDataValue} = useUser()

    const {requestHeaders} = useRequestHeaders()

    const fetcher = async (url) => {
        try {
          const response = await axios.get(url, requestHeaders);
          return response.data;
        } catch (error) {
          console.error(error);
        }
      };

      
  const validationSchema = Yup.object({
    account_number: Yup.string()
      .min(10, 'Bank account number should be 10 numbers')
      .max(10, 'Bank account number should be 10 numbers')
      .required('Bank account number required'),
    bvn: Yup.string()
      .min(11, 'BVN should be 11 numbers')
      .max(11, 'BVN should be 11 numbers')
      .required('BVN required'),
    currency: Yup.string()
      .required("Please select an option"),                
    bank: Yup.string()
      .required("Please select an option"),  
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
      .required("Amount required")              
  });

  const formik = useFormik({
    initialValues:{
      bank:'',
      currency:'',
      account_number:'',
      bank_code:'',
      accountname:'',
      bvn:'',
      amount:""
    },
    validationSchema
  });
  
  const bankListUrl = `${import.meta.env.VITE_BASEURL}/bank/list?userID=${userDataValue && userDataValue.userID}&country=Nigeria`;
  const bankList = useSWR(bankListUrl, fetcher);
  let accountFetchError = false;

  const bank = formik.values.bank.split('-')[1];
  const accountNumberUrl = `${import.meta.env.VITE_BASEURL}/bank/resolve?userID=${userDataValue && userDataValue.userID}&account_number=${formik.values.account_number}&bank_code=${bank}&currency=${currency}`;
  const accName = useSWR(accountNumberUrl, fetcher, {
    onSuccess: (data) => {
      setAccountFound(false)
      setAccountName('')
      if(data.status == true){
        let temp = data.data.account_name;
        setAccountName(temp);
        setAccountFound(true)
      }else{
        setAccountFound(false)
      }
    }
  });

  const handleSubmit = () => {

    if(formik.errors.amount || formik.values.amount == '' || formik.errors.account_number || formik.values.account_number == '' ){
        return
    }

    
    setOpenAlert(false)
    setSubmitting(true)

    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('account_number', formik.values.account_number)
    formData.append('account_name', accountName)
    formData.append('type', 'nuban')
    formData.append('amount', formik.values.amount.replaceAll(',', ''))
    formData.append('bank_code', formik.values.bank.split('-')[1])
    
    
    try {

        const formValues = Object.fromEntries(formData.entries());
        console.log(formValues);

        axios.post(`${import.meta.env.VITE_BASEURL}/bank/transfer?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
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



  return (
    <form className='flex flex-col gap-5 text-left'>
        <FormSelect disabled={bankList ? !bankList.data || bankList.error : true} handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.bank && formik.errors.bank} selectValue={formik.values.bank} selectLabel={'Choose what bank your business banks with'} selectId={'bank'} selectName={'bank'}>
          <FormOption isDisabled isSelected value={''} optionName={'Select Bank'} />
          {bankList && bankList.data && bankList.data.data.data && bankList.data.data.data.length > 0 && bankList.data.data.data.map((bank, idx)=>{
            return <FormOption key={idx} value={`${bank.name}-${bank.code}`} optionName={bank.name} />
          })}
        </FormSelect>
        <FormInput maxLength={11} handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.account_number && formik.errors.account_number} inputValue={formik.values.account_number} inputLabel="Enter your 10 Digits Bank Account Number" inputPlaceholder="Enter bank account number" inputType="tel" pattern="[0-9]*" inputName={'account_number'} inputId={'account_number'} />
        <div>
            <div className='flex justify-end'>
            {/* {accName && accName.data.account_name} */}
            {(formik.values.account_number.toString().length >= 3  && !accountName && !accountFetchError && !(accName.data?.status == false) || formik.values.account_number.toString().length >= 3 &&  !accName.data || (formik.values.account_number.toString().length >= 3 && formik.values.account_number.toString().length < 10)) && <p className='text-brandGray12x animate-pulse text-xs'>Confirming account ...</p>}
            {(formik.values.account_number.toString().length == 10 && accName.data?.status == false) && <p className='text-brandRed1x animate-pulse text-xs'>Error fetching account ...</p>}
            {(formik.values.account_number.toString().length == 10 && accName.data && !accName.data?.status && formik.values.bank !== '') && <p className='text-brandRed1x font-avenirBlack text-xs'>ACCOUNT NAME: <span className='font-avenirMedium'>Not found</span></p>}
            {(formik.values.account_number.toString().length >= 9 && formik.values.account_number.toString().length <= 10 && accountName && accName.data && accName.data.status && formik.values.bank !== '') && <p className='text-brandGreen1x font-avenirBlack text-xs'>ACCOUNT NAME: <span className='font-avenirMedium'>{accountName}</span></p>}
            </div>
        </div>
        <div>
              <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                  <label htmlFor="amount" className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`Enter the Amount you want to Send`}</label>
                  <div className="relative w-full">
                      <input type="text" name='amount' id='amount' value={formik.values.amount} onChange={(e) => {useAmountFormat(e, formik, 'amount')}} onBlur={formik.handleBlur} placeholder='Amount' className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five border-2  ${(formik.touched.amount && formik.errors.amount)  || (submitting && formik.errors.amount) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} />
                      <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>{currency}</span>
                  </div>
              </fieldset>
              <div className='text-right pt-2'>
                <p className='font-avenirMedium text-sm '>Available balance: <span className={`font-spaceGroteskLight text-brandGreen1x`}>{currency} {new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(balance)}</span></p>
              </div>
            </div>

            <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
              <ButtonPrimary fontSize={'10px'} handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Send Cash'} type={'button'} width={'w-full'} />
            </div>
    </form>
  )
}

export default SendWithBank