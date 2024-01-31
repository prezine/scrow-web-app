import React, { useState } from 'react'
import ButtonPrimary from '../../../Elements/Buttons/ButtonPrimary'
import FormInput from '../../../Elements/Form/FormInput'
import FormSelect from '../../../Elements/Form/FormSelect'
import FormOption from '../../../Elements/Form/FormOption'
import PhoneInput from '../../../Elements/Form/PhoneInput'
import SendWithPhone from './Send/SendWithPhone'
import SendWithBank from './Send/SendWithBank'

const SendService = ({balance, mutate, currency, openAlert, alertValues, setOpenAlert, setAlertValues, closeModal}) => {

  const [formData, setFormData] = useState({
      transactionType:"byPhone",
      phone:"",
      amount:"",
      bank:"",
      accountNo:""
  })

  const handleChange = (e) => {
      setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    }

  return (
    <div>
      <div className='text-center'>
          <h1 className='text-2xl md:text-3xl pb-3 text-brandGray14x font-avenirHeavy'>Transfer Money 🚀</h1>
          <div className='py-4 pb-10'>
              <div className="bg-brandGray24x py-1 px-2 rounded-ten w-full flex flex-row gap-2 justify-between">
                  <label htmlFor="byPhone" className={`${formData.transactionType == 'byPhone' ? 'bg-white' : 'bg-transparent'} rounded-ten py-2 text-sm cursor-pointer w-fiftyPercent px-6 trans-all-500-ease-in-out`}>
                    Phone Number
                  <input type="checkbox" className='hidden transactionType-check' id='byPhone' name='transactionType' onClick={handleChange} value={'byPhone'} />
                  </label>
                  <label htmlFor="byBank" className={`${formData.transactionType == 'byBank' ? 'bg-white' : 'bg-transparent'} rounded-ten py-2 text-sm cursor-pointer w-fiftyPercent px-6 trans-all-500-ease-in-out`}>
                    Bank Transfer
                  <input type="checkbox" className='hidden transactionType-check' id='byBank' name='transactionType' onClick={handleChange} value={'byBank'} />
                  </label>
              </div>
          </div>

          
      </div>
      <div>
        <div>
          {
            formData.transactionType == 'byPhone'
            &&
            <SendWithPhone balance={balance} currency={currency} openAlert={openAlert} mutate={mutate} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />
          }

          {formData.transactionType == 'byBank' 
            &&
            <SendWithBank balance={balance} currency={currency} openAlert={openAlert} mutate={mutate} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />
          }
        </div>
      </div>
    </div>
  )
}

export default SendService