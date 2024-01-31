import React, { useEffect, useState } from 'react'
import AuthInput from '../../Auth/Elements/Form/AuthInput'
import AuthSelect from '../../Auth/Elements/Form/AuthSelect'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import FormOption from '../../Elements/Form/FormOption'
import useSWR from 'swr'
import useUser from '../../../hooks/stores/useUser'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios'
import PageLoaderNoNav from '../../Elements/Loaders/PageLoaderNoNav'
import FetchErrorNoNav from '../../Errors/FetchErrorNoNav'
import Alert from '../../Elements/Alerts/Alert'


const Settlement = () => {

  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const [submitting, setSubmitting] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [accountFound, setAccountFound] = useState('')
  const [fetchedData, setFetchedData] = useState(null);


  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })


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
    bank: Yup.string()
      .required("Please select an option"),                
  });

  const formik = useFormik({
    initialValues:{
      bank:'',
      account_number:'',
      account_type:'',
      bank_code:'',
      account_name:'',
    },
    validationSchema
  });

  const settlementDataUrl = `${import.meta.env.VITE_BASEURL}/user/settlement/fetch?userID=${userDataValue && userDataValue.userID}`;
  const settlementData = useSWR(settlementDataUrl, fetcher, {
    onSuccess: (data) => {

      let settlement = data.data.settlement[0]

      // console.log(settlement);

      formik.setFieldValue('account_name', settlement.accountname || '');
      formik.setFieldValue('account_number', settlement.accountnumber || '');
      formik.setFieldValue(
        'bank',
        (settlement.bankname && settlement.bank_code)
          ? `${settlement.bankname}-${settlement.bank_code}`
          : ''
      );
    }
  });

  const bankListUrl = `${import.meta.env.VITE_BASEURL}/bank/list?userID=${userDataValue && userDataValue.userID}&country=Nigeria`;
  const bankList = useSWR(bankListUrl, fetcher);



  // console.log(settlementData.data && settlementData.data.data.settlement);

  let accountFetchError = false;

  const bank = formik.values.bank.split('-')[1];
  const currency = userDataValue ? userDataValue.default_currency : 'NGN';
  const accountNumberUrl = `${import.meta.env.VITE_BASEURL}/bank/resolve?userID=${userDataValue && userDataValue.userID}&account_number=${formik.values.account_number}&bank_code=${bank}&currency=${currency}`;
  const accName = useSWR(accountNumberUrl, fetcher, {
    onSuccess: (data) => {
      // setAccountName('')
      if(data.status == true){
        let temp = data.data.account_name;
        setAccountName(temp);
        setAccountFound(true)
      }else{
        setAccountFound(false)
      }
    }
  });


  if(!formik.errors.account_number && !formik.errors.bank){
    accountFetchError = accName.error ? true : false
    // console.log('AccName => ', accName);
  }



  const handleSubmit = (e) => {
    if(formik.errors.account_number || formik.errors.bank || !accountName){
      console.log('Error in settlement kyc fields');
      return
    }
    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('bankname', formik.values.bank.split('-')[0])
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('accountnumber', formik.values.account_number)
    formData.append('accountname', accountName)
    formData.append('bank_code', formik.values.bank.split('-')[1])
    try {

        // console.log(formik.values);

        // const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);

        axios.post(`${import.meta.env.VITE_BASEURL}/setting/settlement?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                console.log(res.data.data.message);
            }else if (res.data.status == true && res.data.data.message) {
              settlementData.mutate()
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
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

  if(!settlementData.data) return <PageLoaderNoNav />
  if(settlementData.error) return <FetchErrorNoNav />

  return (
    <div className='w-full pb-16 pt-24'>
        <form  method="post" action="" className='sm:w-ninetyPercent md:w-eightyPercent mds:w-ninetyFivePercent lg:w-sixtyFivePercent max-w-lg mx-auto flex flex-col gap-5'>
          

          <div className="">
            <AuthSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.account_type && formik.errors.account_type} selectValue={formik.values.account_type} fontSize={'text-sm font-avenirMedium'} paddingY={'py-3'} selectLabel={'Select Account Type'} selectId={'account_type'} selectName={'account_type'}>
              <FormOption isSelected isDisabled value={'Select Account Type'} optionName={'Select Account Type'} />
            </AuthSelect>
          </div>

          <div className="">
            <AuthSelect disabled={bankList ? !bankList.data || bankList.error : true} handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.bank && formik.errors.bank} selectValue={formik.values.bank} fontSize={'text-sm font-avenirMedium'} paddingY={'py-3'} selectLabel={'What bank do you bank with?'} selectId={'bank'} selectName={'bank'} >
              <FormOption isSelected isDisabled value={'Select Bank'} optionName={'Select Bank'} />
              {bankList && bankList.data && bankList.data.data.data && bankList.data.data.data.length > 0 && bankList.data.data.data.map((bank, idx)=>{
              return <FormOption key={idx} value={`${bank.name}-${bank.code}`} optionName={bank.name} />
            })}
            </AuthSelect>
          </div>

          <div className="">
            <AuthInput maxLength={11} handleChange={(e)=>{formik.setFieldTouched('account_number', true); formik.setFieldValue('account_number', e.target.value)}} handleBlur={formik.handleBlur} fieldError={formik.touched.account_number && formik.errors.account_number} inputValue={formik.values.account_number} fontSize={'text-sm font-avenirMedium'} paddingY={'py-3'} inputLabel={'Enter Bank Number'} inputName={'account_number'} inputId={'account_number'} inputType={'number'} />
          </div>
          
        {
          formik.touched.account_number
          &&
          <div className='flex justify-end'>
            {/* {accName && accName.data.account_name} */}
            {(formik.values.account_number.toString().length >= 3 && !accountName && !accountFetchError && !(accName.status == false) || formik.values.account_number.toString().length >= 3 &&  !accName.data || (formik.values.account_number.toString().length >= 3 && formik.values.account_number.toString().length < 10)) && <p className='text-brandGray12x animate-pulse text-xs'>Confirming account ...</p>}
            {(formik.values.account_number.toString().length == 10 && accName.status == false) && <p className='text-brandRed1x animate-pulse text-xs'>Error fetching account ...</p>}
            {(formik.values.account_number.toString().length == 10 && accName.data && !accName.data.status && formik.values.bank !== '') && <p className='text-brandRed1x font-avenirBlack text-xs'>ACCOUNT NAME: <span className='font-avenirMedium'>Not found</span></p>}
            {(formik.values.account_number.toString().length == 10 && accountName && accName.data && accName.data.status && formik.values.bank !== '') && <p className='text-brandGreen1x font-avenirBlack text-xs'>ACCOUNT NAME: <span className='font-avenirMedium'>{accountName}</span></p>}
          </div>
        }

          <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
            <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} paddingY={'py-3'} text={'Save my changes'} type={'button'} width={'w-full'} />
          </div>

        </form>

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />


    </div>
  )
}

export default Settlement