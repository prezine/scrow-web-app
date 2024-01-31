import React, { useState } from 'react'
import PhoneInput from '../../../../Elements/Form/PhoneInput'

const Internet = ({setBillFormData, logos, balance}) => {
  const [formData, setFormData] = useState({
    provider:"",
    phone:"",
    amount:"",
    plan:""
})

const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
    setBillFormData({...formData, [e.target.name]:e.target.value})
}



return (
  <>
    <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
      <label htmlFor="provider" className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`What is your network provider?`}</label>
      <div className="relative w-full">
          <select type="text" required name='provider' id='provider' onChange={handleChange} className='pl-12 pr-4 py-2.5 h-11 bg-transparent w-full font-spaceGroteskLight text-sm text-black placeholder:text-brandGray32x rounded-five border-2 border-brandGray17x' >
              <option value="null" selected disabled>Select Network Provider</option>
              <option value="mtn" >MTN</option>
              <option value="glo" >GLO</option>
          </select>
          <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'><img src={logos[formData.provider]} alt="" className={'w-6 object-cover'} /></span>
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
        <label htmlFor="phone" value={formData.phone} className='text-sm text-left font-spaceGroteskLight text-brandGray14x'>{`What Number do you wish to recharge?`}</label>
        <PhoneInput required onChange={handleChange} className="px-4 py-2.5 font-spaceGroteskLight text-xs text-black placeholder:text-brandGray32x rounded-five border-2 border-brandGray17x w-full" placeholder="Phone Number" name="phone" id="phone" />
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

export default Internet