import React, { useState } from 'react'
import Airtime from './Bills/Airtime'
import Internet from './Bills/Internet'
import CableTV from './Bills/CableTV'
import Utility from './Bills/Utility'
import ButtonPrimary from '../../../Elements/Buttons/ButtonPrimary'
import Data from './Bills/Data'
import Alert from '../../../Elements/Alerts/Alert'
import InternetData from './Bills/InternetData'
import Electricity from './Bills/Electricity'

const PayService = ({balance, currency, openAlert, alertValues, setOpenAlert, setAlertValues, closeModal}) => {
  const [currentBill, setCurrentBill] = useState('airtime')
  const [currentBillName, setCurrentBillName] = useState('Airtime')
  const [currentBillTitle, setCurrentBillTitle] = useState('Airtime 🤙🏽')
  const [currentButtonText, setCurrentButtonText] = useState('Recharge Airtime')

  const billsData = [
    {
      id:"airtime",
      name:"Airtime",
      title:"Airtime 🤙🏽",
      element:<Airtime currency={currency} balance={balance} currentButtonText={currentButtonText} currentBillTitle={currentBillTitle} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />,
      btnText:"Recharge Airtime"
    },
    {
      id:"internetData",
      name:"Data",
      title:"Internet Data 🌐",
      element:<InternetData currency={currency} balance={balance} currentButtonText={currentButtonText} currentBillTitle={currentBillTitle} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />,
      btnText:"Purchase Data"
    },
    {
      id:"power",
      name:"Electricity",
      title:"Electricity ⚡️",
      element:<Electricity currency={currency} balance={balance} currentButtonText={currentButtonText} currentBillTitle={currentBillTitle} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />,
      btnText:"Purchase"
    },
    {
      id:"cable",
      name:"Cable TV",
      title:"Cable TV 💡",
      element:<CableTV currency={currency} balance={balance} currentButtonText={currentButtonText} currentBillTitle={currentBillTitle} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />,
      btnText:"Renew Subscription"
    },
  ]

  return (
    <div>
      <h1 className='text-2xl md:text-3xl text-center pb-1 text-brandGray14x font-avenirHeavy capitalize'>{currentBillTitle}</h1>
      <div className='py-5 flex items-center gap-3 overflow-x-auto'>
          {billsData.map((bill, idx)=>{
            return <button key={idx} type="button" onClick={()=>{setCurrentBill(bill.id); setCurrentBillName(bill.name); setCurrentBillTitle(bill.title); setCurrentButtonText(bill.btnText)}} className={`px-4 py-1.5 whitespace-nowrap ${bill.id == currentBill ? 'bg-brandDarkViolet1x text-white' : 'hover:bg-brandDarkViolet1x/20 text-brandGray6x'} rounded-fifty transition-all duration-300 ease-in-out text-sm`}>{bill.name}</button>
          })}
      </div>
      
      
      <>
        {billsData.filter(data => data.id == currentBill).map((data, idx)=>{
          return <>
            <div key={idx}>
              {data.element}
            </div>
          </>
        })}
      </>

    </div>
  )
}

export default PayService
