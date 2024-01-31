import React, { useState } from 'react'
import ModalWrap from '../../Elements/Modal/ModalWrap'
import MilestoneModal from './MilestoneModal'
import OneTimeModal from './OneTimeModal'

const TransactionModal = ({handleModal, handleInnerModals, closeInnerModal, setCurrentModal, currentModal}) => {



    const transactions = [
        {
            type:'One Time',
            bgColor:'bg-brandBlue1x'
        },
        {
            type:'Milestone',
            bgColor:'bg-brandOrange1x'
        },
        {
            type:'Crowdpay',
            bgColor:'bg-brandBlue2x'
        },
        {
            type:'Payme',
            bgColor:'bg-brandBrown1x'
        },
        {
            type:'Banter',
            bgColor:'bg-brandGreen2x'
        },

    ]

  

  return (
    <div className='bg-white m-auto relative rounded-ten py-8 px-5 md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-sm h-fit'>
        <div className='text-left'>
            <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Transaction Type</h4>
            <p className='text-sm md:text-md text-black font-avenirMedium'>What Escrow Transaction do you want to Initiate?</p>
        </div>
        <div className='flex flex-col gap-5 pt-7'>
            {transactions.map((transaction,idx)=>{
                return <button aria-label={`Open ${transaction.type} Modal`} onClick={()=>handleInnerModals(idx)} className={`${transaction.bgColor} py-5 px-6 rounded-fifteen flex gap-6 justify-between`}>
                    <div className='text-white text-left flex flex-col gap-1'>
                        <p className='text-sm sm:text-md  font-avenirBook'>Create a Transaction for</p>
                        <h2 className='text-30 font-avenirBlack'>{transaction.type}</h2>
                    </div>
                    <svg className='w-14 h-14 md:w-16 md:h-16' width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42.0875 17.2959L59.7917 35.0001L42.0875 52.7042" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path opacity="0.4" d="M10.2084 35H59.2959" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            })}
        </div>

    </div>
  )
}

export default TransactionModal