import React, { useEffect, useState } from 'react'
import PhoneInput from '../../../../Elements/Form/PhoneInput'
import useUser from '../../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../../utils/useRequestHeaders'
import axios from 'axios'
import useSWR from 'swr'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useFormatPhoneTest from '../../../../../utils/useFormatPhoneTest'
import useFormatPhoneNumber from '../../../../../utils/useFormatPhoneNumber'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'

const InternetData = ({ currency, currentButtonText, openAlert, alertValues, setOpenAlert, setAlertValues, closeModal, mutate, balance}) => {

    const {userDataValue} = useUser()

    const {requestHeaders} = useRequestHeaders()
  
    const [providerImage, setProviderImage] = useState('')

    const [submitting, setSubmitting] = useState()

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
            phone:"",
            plan:"",
            network:""
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
            network: Yup
            .string()
            .required('Provider required'),
            plan: Yup
            .string()
            .required('Plan required'),
        })
    })


    const airtimeListUrl = `${import.meta.env.VITE_BASEURL}/bill/lists?category=airtime&country=NG&userID=${userDataValue && userDataValue.userID}`;
    const airtimeList = useSWR(airtimeListUrl, fetcher);

    const plansListUrl = `${import.meta.env.VITE_BASEURL}/bill/data/plans?networkID=${formik.values.network !== "" && formik.values.network}`;
    const plansList = useSWR(plansListUrl, fetcher);

    // console.log('Plans => ', plansList.data && plansList.data.status);


    const handleSubmit = () => {

      if(formik.errors.plan || formik.values.plan == '' || formik.errors.network || formik.values.network == '' || formik.errors.phone || formik.values.phone == '' ){
        return
      }

      
      setOpenAlert(false)
      setSubmitting(true)

      const formData = new FormData()
      formData.append('userID', `${userDataValue && userDataValue.userID}`)
      formData.append('network', formik.values.network)
      formData.append('phone', formik.values.phone.replace('+234', '0'))
      formData.append('plan', formik.values.plan && formik.values.plan.split('@')[0])
      formData.append('amount', formik.values.plan && formik.values.plan.split('@')[1])
      
      try {
        axios.post(`${import.meta.env.VITE_BASEURL}/bill/airtime/purchase?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
          console.log(res);
            if (res.data.status == false && res.data.data.message) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`danger` })
                closeModal()
            } else if (res.data.status == true && res.data.data) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`${res.data.data}`, type:`success` })
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


    const handlePhoneInputChange = (e, handleChange) => {
        const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
        handleChange({ target: { name: 'phone', value: formattedPhoneNumber } });
    }

    useEffect(() => {
      setProviderImage(airtimeList.data && formik.values.network !== "" && airtimeList.data.data.filter(provider => provider.id == formik.values.network)[0].image);
    }, [formik.values.network])


  return (
    <form action="" method="post"  className={`flex flex-col gap-5 pt-5`}>

         <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
            <label htmlFor="network" className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`What is your network provider?`}</label>
            <div className="relative w-full">
                <select disabled={airtimeList ? !airtimeList.data || airtimeList.error : true} required name='network' id='network' onChange={(e)=>{formik.setFieldValue('network', e.target.value);}} value={formik.values.network} className={`pl-12 pr-4 py-2.5 h-11 bg-transparent w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five border-2 ${(formik.touched.network && formik.errors.network) || (submitting && formik.errors.network) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} >
                    <option value="" selected disabled>Select Network Provider</option>
                    {airtimeList && airtimeList.data && airtimeList.data.data && airtimeList.data.status && airtimeList.data.data.length > 0 && airtimeList.data.data.map((airtime, idx)=>{
                    return <option key={idx} value={airtime.id}>{airtime.name}</option>
                    })}
                </select>
                <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'><img src={providerImage} alt="" className={'w-6 object-cover'} /></span>
            </div>
        </fieldset>
        <div>
            <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                <label htmlFor="plan" className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`What plan do you want to subscribe for?`}</label>
                <div className="relative w-full">
                    <select disabled={airtimeList ? !airtimeList.data && !plansList.data || airtimeList.error && plansList.error : true} required name='plan' id='plan' onChange={(e)=>{formik.setFieldValue('plan', e.target.value);}} value={formik.values.plan} className={`px-4 py-2.5 h-11 bg-transparent w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five border-2 ${(formik.touched.plan && formik.errors.plan) || (submitting && formik.errors.plan) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} >
                        <option value="" selected disabled>Select Plan</option>
                        {plansList && plansList.data && plansList.data.data && plansList.data.status && plansList.data.data.length > 0 && plansList.data.data.map((plan, idx)=>{
                        return <option key={idx} value={`${plan.uniq_id} @ ${plan.price}`}>{plan.name} @ {currency} {plan.price}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <div className='text-right pt-2'>
                <p className='font-avenirMedium text-sm '>Available balance: <span className={`font-spaceGroteskMedium text-brandGreen1x`}>{currency} {new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(balance)}</span></p>
            </div>
        </div>
        <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
            <label htmlFor="phone" className='text-xs text-left font-spaceGroteskMedium text-brandGray14x'>{`What Number do you wish to recharge?`}</label>
            <PhoneInput maxLength={15} placeholder={'Phone Number'} id={'phone'} name={'phone'} value={formik.values.phone} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} className={`px-4 py-2.5 text-sm bg-transparent autofill:bg-transparent rounded-five border-2 ${(formik.touched.phone && formik.errors.phone)  || (submitting && formik.errors.phone) ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} required />
            {(formik.touched.phone && formik.errors.phone) && <p className="text-xs text-brandRed1x">{formik.errors.phone}</p>}
        </fieldset>
        
        <div>
              <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
                  <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={currentButtonText} type={'button'} width={'w-full'} />
              </div>
            </div>
      </form>
  )
}

export default InternetData