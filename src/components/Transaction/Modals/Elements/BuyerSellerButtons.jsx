import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'

const BuyerSellerButtons = ({markAsDelivered, trans, submitting, closeTransModal, openPaymentModal, setPayRef}) => {

    const openPaymentOptionModal = () => {
        setPayRef()
        openPaymentModal()
        closeTransModal()
    }

  return (
    <div>
        {
            ((trans.transaction_type.toLowerCase() == 'one-time' || trans.transaction_type.toLowerCase() == 'milestone' || trans.transaction_type.toLowerCase() == 'payme') && trans.status == 1)
            &&
            <button onClick={()=>{trans.transaction.trader_status == 'buyer' && openPaymentOptionModal()}} disabled={trans.transaction.trader_status == 'seller'} title={(trans.transaction.trader_status == 'buyer') ? 'Pay Now' : 'Pending Buyer Payment'} className={`w-full ${trans.transaction.trader_status == 'seller' ? 'bg-brandGreen1x/50 pointer-events-none' : 'bg-brandGreen1x'} px-6 hover:pr-4 transition-all duration-500 ease-in-out py-3 font-avenirBlack group rounded-fifty flex justify-between text-white gap-6 items-center`}>
                {trans.transaction.trader_status == 'seller' ? 'Awaiting Payment' : 'Make Payment' }
                <svg className='' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0249 4.94165L17.0832 9.99998L12.0249 15.0583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.4" d="M2.9165 10H16.9415" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        }
        {
            ((trans.transaction_type.toLowerCase() == 'one-time' || trans.transaction_type.toLowerCase() == 'milestone' || trans.transaction_type.toLowerCase() == 'payme') && trans.status == 2)
            &&
            <button type='button' onClick={()=>{trans.transaction.trader_status == 'seller' && markAsDelivered('seller')}} title={(trans.transaction.trader_status == 'buyer') ? 'Pending Seller Confirmation' : 'Confirm Order'} disabled={(trans.transaction.trader_status == 'buyer') || submitting} className='w-full disabled:bg-brandGreen1x/50 px-6 hover:pr-4 transition-all duration-500 ease-in-out py-3 bg-brandGreen1x font-avenirBlack group rounded-fifty flex justify-between text-white gap-6 items-center'>
                <p className='whitespace-nowrap text-ellipsis overflow-hidden'>{trans.transaction.trader_status == 'seller' ? 'Yes, I have sent order' : 'Awaiting Order Delivery' }</p>
                <svg className='' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0249 4.94165L17.0832 9.99998L12.0249 15.0583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.4" d="M2.9165 10H16.9415" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        }
        {
            ((trans.transaction_type.toLowerCase() == 'one-time' || trans.transaction_type.toLowerCase() == 'milestone' || trans.transaction_type.toLowerCase() == 'payme') && trans.status == 3)
            &&
            <button type='button' onClick={()=>{trans.transaction.trader_status == 'buyer' && markAsDelivered('buyer')}} title={(trans.transaction.trader_status == 'buyer') ? 'Confirm Order' : 'Pending Buyer Confirmation'} disabled={(trans.transaction.trader_status == 'seller') || submitting} className='w-full disabled:bg-brandGreen1x/50 px-6 hover:pr-4 transition-all duration-500 ease-in-out py-3 bg-brandGreen1x font-avenirBlack group rounded-fifty flex justify-between text-white gap-6 items-center'>
                {trans.transaction.trader_status == 'seller' ? 'Awaiting Delivery Confirmation' : 'Yes, I have received order' }
                <svg className='' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0249 4.94165L17.0832 9.99998L12.0249 15.0583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.4" d="M2.9165 10H16.9415" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        }
    </div>
  )
}

export default BuyerSellerButtons