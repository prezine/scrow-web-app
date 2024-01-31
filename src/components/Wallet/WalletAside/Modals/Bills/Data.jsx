import React, { useState } from 'react'
import PhoneInput from '../../../../Elements/Form/PhoneInput'
import useUser from '../../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../../utils/useRequestHeaders'
import axios from 'axios'
import useSWR from 'swr'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useFormatPhoneTest from '../../../../../utils/useFormatPhoneTest'
import useFormatPhoneNumber from '../../../../../utils/useFormatPhoneNumber'

const Data = ({setBillFormData, logos, balance}) => {

    const {userDataValue} = useUser()

    const {requestHeaders} = useRequestHeaders()
  
    const [submitting, setSubmitting] = useState(false)
    


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
            customer:"",
            type:"",
            amount:""
        },
        validationSchema:Yup.object({
            customer: Yup
            .string()
            .required('Phone number required')
            .min(11, 'Phone number must be at least 11 digits')
            .max(14, 'Phone number must not be more than 14 digits')
            .test('isValid', 'Invalid phone number', function(value) {
              const formattedPhoneNumber = useFormatPhoneTest(value);
              return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
            }),
        })
    })


    const airtimeListUrl = `${import.meta.env.VITE_BASEURL}/bill/lists?category=airtime&country=NG&userID=${userDataValue && userDataValue.userID}`;
    const airtimeList = useSWR(airtimeListUrl, fetcher);

    // console.log('Airtime => ', airtimeList.data && airtimeList.data.data);

  const [formData, setFormData] = useState({
        provider:"",
        phone:"",
        amount:"",
        plan:""
    })

    const getLogoPath = () => {
        for (const key in logos) {
          if (formData.provider.toLowerCase().includes(key)) {
            return logos[key];
          }
        }
        return null; // Return null or handle cases where no match is found
    }

const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
    setBillFormData({...formData, [e.target.name]:e.target.value})
}

const handlePhoneInputChange = (e, handleChange) => {
    const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
    handleChange({ target: { name: 'customer', value: formattedPhoneNumber } });
}



return (
  <>
    <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
      <label htmlFor="provider" className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`What is your network provider?`}</label>
      <div className="relative w-full">
          <select disabled={airtimeList ? !airtimeList.data || airtimeList.error : true}  type="text" required name='provider' id='provider' onChange={handleChange} className='pl-12 pr-4 py-2.5 h-11 bg-transparent w-full font-spaceGroteskLight text-sm text-black placeholder:text-brandGray32x rounded-five border-2 border-brandGray17x' >
              <option value="null" selected disabled>Select Network Provider</option>
              {airtimeList && airtimeList.data && airtimeList.data.data && airtimeList.data.data.length > 0 && airtimeList.data.data.map((airtime, idx)=>{
                return <option key={idx} value={`${airtime.biller_name} - ${airtime.biller_code}`}>{airtime.biller_name}</option>
              })}
          </select>
          <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'><img src={getLogoPath()} alt="" className={'w-6 object-cover'} /></span>
      </div>
    </fieldset>
    <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
      <label htmlFor="plan" className='text-xs font-spaceGroteskLight text-brandGray14x text-left'>{`What plan do you want to subscribe for?`}</label>
      <div className="relative w-full">
          <select type="text" required name='plan' id='plan' onChange={handleChange} className='px-4 py-2.5 h-11 bg-transparent w-full font-spaceGroteskLight text-sm text-black placeholder:text-brandGray32x rounded-five border-2 border-brandGray17x' >
              <option value="null" selected disabled>Select  Plan</option>
              <optgroup label={`Daily`}>
                <option value="N100/100mb 1 day" >N100/100mb 1 day </option>
                <option value="N500/2.5gb 2 days" >N500/2.5gb 2 days </option>
              </optgroup>
              <optgroup label={`Weekly`}>
                <option value="N500/1.5gb 7 days" >N500/1.5gb 7 days </option>
                <option value="N1500/6gb 7 days" >N1500/6gb 7 days </option>
              </optgroup>
          </select>
      </div>
    </fieldset>
    <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
        <label htmlFor="customer" value={formData.phone} className='text-sm text-left font-spaceGroteskLight text-brandGray14x'>{`What Number do you wish to recharge?`}</label>
        <PhoneInput maxLength={15} placeholder={'Phone Number'} id={'customer'} name={'customer'} value={formik.values.customer} onChange={(e) => handlePhoneInputChange(e, formik.handleChange)} onBlur={formik.handleBlur} className={`px-4 py-2.5 text-sm bg-transparent autofill:bg-transparent rounded-five border-2 ${formik.touched.customer && formik.errors.customer ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray16x focus:border-black'} focus:border-2 focus:outline-none w-full`} required />
        {(formik.touched.customer && formik.errors.customer) && <p className="text-xs text-brandRed1x">{formik.errors.customer}</p>}
    </fieldset>
    <div>
        <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
            <label htmlFor="amount" className='text-xs font-spaceGroteskLight text-brandGray14x text-left'>{`How much Airtime do you want?`}</label>
            <div className="relative w-full">
                <input required type="number" name='amount' id='amount' defaultValue={formData.amount} onChange={handleChange} placeholder='Amount' className='pl-12 pr-4 py-2.5 w-full font-spaceGroteskLight text-sm text-black placeholder:text-brandGray32x rounded-five border-2 border-brandGray17x' />
                <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>NGN</span>
            </div>
        </fieldset>
    </div>
  </>
)
}

export default Data