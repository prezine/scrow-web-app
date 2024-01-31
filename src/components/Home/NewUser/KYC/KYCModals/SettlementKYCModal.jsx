import React, {useState} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import useSWR from 'swr';
import { useFormik } from 'formik';
import FormInput from '../../../../Elements/Form/FormInput';
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary';
import FormSelect from '../../../../Elements/Form/FormSelect';
import FormOption from '../../../../Elements/Form/FormOption';
import useRequestHeaders from '../../../../../utils/useRequestHeaders';
import useUser from '../../../../../hooks/stores/useUser';

const SettlementKYCModal = ({openAlert, alertValues, setOpenAlert, setAlertValues, closeModal}) => {

  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const [submitting, setSubmitting] = useState(false)
  const [accountName, setAccountName] = useState('')
  const [accountFound, setAccountFound] = useState('')

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
  });

  const formik = useFormik({
    initialValues:{
      bank:'',
      currency:'',
      account_number:'',
      bank_code:'',
      account_name:'',
      bvn:'',
    },
    validationSchema
  });

  const bankListUrl = `${import.meta.env.VITE_BASEURL}/bank/list?userID=${userDataValue && userDataValue.userID}&country=Nigeria`;
  const bankList = useSWR(bankListUrl, fetcher);


  // console.log(bankList.data && bankList.data?.data?.data);

  let accountFetchError = false;

  const bank = formik.values.bank.split('-')[1];
  const currency = userDataValue ? userDataValue.default_currency : 'NGN';
  const accountNumberUrl = `${import.meta.env.VITE_BASEURL}/bank/resolve?userID=${userDataValue && userDataValue.userID}&account_number=${formik.values.account_number}&bank_code=${bank}&currency=${currency}`;
  const accName = useSWR(accountNumberUrl, fetcher, {
    onSuccess: (data) => {
      // setAccountName('')
      if(data?.status == true){
        let temp = data?.data?.account_name;
        setAccountName(temp);
        setAccountFound(true)
      }else{
        setAccountFound(false)
      }
    }
  });

  // if(!bankList.data) return <div>Loading</div>;
  // if(bankList.error) return <div>Error</div>;

  if(!formik.errors.account_number && !formik.errors.bank){
    accountFetchError = accName.error ? true : false
    // console.log('AccName => ', accName);
  }




  const handleSubmit = (e) => {
    if(formik.errors.bvn ||formik.errors.account_number || formik.errors.currency || formik.errors.bank || !accountName){
      console.log('Error in settlement kyc fields');
      return
    }
    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('bankname', formik.values.bank.split('-')[0])
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('accountnumber', formik.values.account_number)
    formData.append('bvn', formik.values.bvn)
    formData.append('currency', currency)
    formData.append('accountname', accountName)
    formData.append('bank_code', formik.values.bank.split('-')[1])
    try {

        // console.log(formik.values);

        // const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);

        axios.post(`${import.meta.env.VITE_BASEURL}/compliance/settlement?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            if(res.data?.status == false && res.data?.data?.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                closeModal()
                console.log(res.data?.data?.message);
            }else if (res.data?.status == true && res.data?.data?.message) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data?.data?.message, type:`success` })
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
    <>
      <div className='text-center'>
        <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Settlement Account</h4>
        <p className='text-sm md:text-base text-brandGray4x font-spaceGroteskRegular'>Let us know where to send your payouts to</p>
      </div>
      <form action="" method='post' onSubmit={formik.handleSubmit} className="flex flex-col pt-10 gap-x-10 gap-y-5">


        <FormInput inputRequired handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.bvn && formik.errors.bvn} inputValue={formik.values.bvn} inputName={'bvn'} inputId={'bvn'} inputLabel={'Enter your BVN (Bank Verification Number)'} inputPlaceholder={'Enter your 11-digits BVN Code'} />

        <FormSelect disabled={bankList ? !bankList.data || bankList.error : true} handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.bank && formik.errors.bank} selectValue={formik.values.bank} selectLabel={'Choose what bank your business banks with'} selectId={'bank'} selectName={'bank'}>
          <FormOption isDisabled isSelected value={''} optionName={'Select Bank'} />
          {bankList && bankList.data && bankList.data?.data?.data && bankList.data?.data?.data?.length > 0 && bankList.data?.data?.data?.map((bank, idx)=>{
            return <FormOption key={idx} value={`${bank.name}-${bank.code}`} optionName={bank.name} />
          })}
        </FormSelect>

        <div className='flex flex-col md:flex-row gap-x-10 gap-y-5 md:items-end'>
          <div className="md:w-fiftyPercent flex flex-col gap-2.5">
            <FormSelect  handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.currency && formik.errors.currency} selectValue={formik.values.currency} selectLabel={'Select your account Currency'} selectId={'currency'} selectName={'currency'}>
              <FormOption isDisabled isSelected value={''} optionName={'Choose currency'} />
              <FormOption value={'NGN'} optionName={'NGN'} />
            </FormSelect>
          </div>
          <div className="md:w-fiftyPercent">
            <FormInput maxLength={11} handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.account_number && formik.errors.account_number} inputValue={formik.values.account_number} inputLabel="Enter your 10 Digits Bank Account Number" inputPlaceholder="Enter bank account number" inputType="number" inputName={'account_number'} inputId={'account_number'} />
          </div>
        </div>
        <div className='flex justify-end'>
          {/* {accName && accName.data?.account_name} */}
          {(formik.values.account_number.toString().length >= 3 && !accountName && !accountFetchError && !(accName.status == false) || formik.values.account_number.toString().length >= 3 &&  !accName.data || (formik.values.account_number.toString().length >= 3 && formik.values.account_number.toString().length < 10)) && <p className='text-brandGray12x animate-pulse text-xs'>Confirming account ...</p>}
          {(formik.values.account_number.toString().length == 10 && accName.status == false) && <p className='text-brandRed1x animate-pulse text-xs'>Error fetching account ...</p>}
          {(formik.values.account_number.toString().length == 10 && accName.data && !accName.data?.status && formik.values.bank !== '') && <p className='text-brandRed1x font-avenirBlack text-xs'>ACCOUNT NAME: <span className='font-avenirMedium'>Not found</span></p>}
          {(formik.values.account_number.toString().length == 10 && accountName && accName.data && accName.data?.status && formik.values.bank !== '') && <p className='text-brandGreen1x font-avenirBlack text-xs'>ACCOUNT NAME: <span className='font-avenirMedium'>{accountName}</span></p>}
        </div>

        <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
          <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Update settlement account'} type={'button'} bgColor={'bg-brandGreen1x'} />
        </div>
      </form>
    </>
  )
}

export default SettlementKYCModal