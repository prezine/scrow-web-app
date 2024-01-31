import axios from 'axios'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import he from 'he'
import useUser from '../../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../../utils/useRequestHeaders'
import MakeTransactionStatusTag from '../../../../../utils/Tags/MakeTransactionStatusTag'
import ModalWrap from '../../../../Elements/Modal/ModalWrap'


const ViewOrder = ({modalState, closeModal, data, mutate, fetched, setAlertValues, setOpenAlert, alertValues}) => {
    const [currencySymbol, setCurrencySymbol] = useState('₦')
    const [submitting, setSubmitting] = useState(false)

    const {userDataValue} = useUser()

    const {requestHeaders} = useRequestHeaders()


    const formatAmount = (val) => {
        let formatted = new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(val)
        return formatted
    }

    const handleDelivery = (user_id, store_id, order_token) => {
        setOpenAlert(false)
        setSubmitting(true)
        const formData = new FormData()
        formData.append('userID', user_id)
        formData.append('storeID', store_id)
        formData.append('orders_token', order_token)

        try {
              const formValues = Object.fromEntries(formData.entries());
                console.log(formValues);

            axios.post(`${import.meta.env.VITE_BASEURL}/store/order/delivered?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
            .then((res)=>{
              console.log(res);
                if(res.data.status == false && res.data.data.message){
                    console.log(res.data.data.message);
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:res.data.data.message, type:`danger` })
                    // closeModal()
                }else if (res.data.status == true) {
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
                   mutate()
                    // closeModal()
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

    // console.log(data);

    if(data)
  
    return (
    <ModalWrap id={'viewOrdersModal'} modalState={modalState} hideOverflow handleModal={closeModal} itemPosition={'items-end overflow-x-hidden max-h-screen'} paddingY={'py-0'} >
        <div className={`view--orders--body bg-white  pb-12 px-6 w-full max-w-md h-screen overflow-y-auto relative z-50`}>
            {data && data.length > 0 && data.map((order, idx)=>{
                return <div key={idx}>
                    <div className='sticky top-0 z-20 py-4 left-0 bg-white'>
                        <div className='flex justify-between'>
                            <p className='text-sm font-avenirLight'>{order.date && order.date.split(',')[0]} {order.date && order.date.split(',')[1]}</p>
                            <button type='button' onClick={closeModal} title={'Close'} aria-label='Close view order modal' className='transition-all duration-300 ease-in-out hover:scale-90 group w-fit h-fit rounded-lg'>
                                <svg className='transition-all duration-300 ease-in-out group-hover:scale-90' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M21.5865 2.66675H10.4132C5.55984 2.66675 2.6665 5.56008 2.6665 10.4134V21.5734C2.6665 26.4401 5.55984 29.3334 10.4132 29.3334H21.5732C26.4265 29.3334 29.3198 26.4401 29.3198 21.5868V10.4134C29.3332 5.56008 26.4398 2.66675 21.5865 2.66675Z" fill="#D2D2D2"/>
                                    <path d="M17.4133 16L20.48 12.9333C20.8666 12.5466 20.8666 11.9066 20.48 11.52C20.0933 11.1333 19.4533 11.1333 19.0666 11.52L16 14.5866L12.9333 11.52C12.5466 11.1333 11.9066 11.1333 11.52 11.52C11.1333 11.9066 11.1333 12.5466 11.52 12.9333L14.5866 16L11.52 19.0666C11.1333 19.4533 11.1333 20.0933 11.52 20.48C11.72 20.68 11.9733 20.7733 12.2266 20.7733C12.48 20.7733 12.7333 20.68 12.9333 20.48L16 17.4133L19.0666 20.48C19.2666 20.68 19.52 20.7733 19.7733 20.7733C20.0266 20.7733 20.28 20.68 20.48 20.48C20.8666 20.0933 20.8666 19.4533 20.48 19.0666L17.4133 16Z" fill="#393D42"/>
                                </svg>
                            </button>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <p className='font-avenirMedium text-2xl'>{currencySymbol} {formatAmount(order.total_amount)}</p>
                            <p className={`px-2.5 py-1 rounded-five h-fit w-fit text-xs ${MakeTransactionStatusTag(order.status)}`}>{order.status_alt}</p>
                        </div>   
                    </div>

                    <div className='pt-6'>
                        <div className='rounded-thirty pb-5 px-7 bg-brandGray10x w-full'>
                            <div className='py-3.5 border-b-0.5 border-b-brandGray2x'>
                                <p className={'font-avenirLight'}>Customer Information</p>
                            </div>
                            <div className='pt-5 pb-7'>
                                <h1 className='uppercase font-avenirHeavy pb-1'>{order.customer_data.customer_name}</h1>
                                <p className='py-2 text-xs font-avenirMedium'>Phone Number: <span className={`text-brandDarkViolet1x font-avenirRegular`}>{order.customer_data.customer_phone}</span></p>
                                <p className='py-2 text-xs font-avenirMedium'>Delivery Address: <span className={`text-brandDarkViolet1x font-avenirRegular`}>{order.customer_data.customer_address}</span></p>
                            </div>
                            <div className='flex gap-10 justify-between'>
                                <div className='space-y-1'>
                                    <h2 className='text-xs font-avenirLight'>TRANSACTION TYPE</h2>
                                    <p className={`px-2.5 py-1 rounded-five h-fit w-fit text-xs bg-brandLightGreen4x text-brandGreen4x`}>Escrow Enabled</p>
                                </div>
                                <p className='text-xs text-right font-avenirHeavy'>Storefront Orders</p>
                            </div>
                        </div>
                    </div>

                    {/* fees */}
                    <div className='pt-8'>
                        <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                            <div className='flex gap-10 justify-between py-3.5 border-b-0.5 border-b-brandGray2x'>
                                <p className='font-avenirLight'>Processing Fee</p>
                                <p className='text-sm'>{currencySymbol} {formatAmount(0)}</p>
                            </div>

                            <div className='flex gap-10 justify-between py-3.5 border-b-0.5 border-b-brandGray2x'>
                                <p className='font-avenirLight'>Escrow Fee</p>
                                <p className='text-sm'>{currencySymbol} {formatAmount(0)}</p>
                            </div>

                            <div className='flex gap-10 justify-between py-3.5 border-b-0.5 border-b-brandGray2x'>
                                <p className='font-avenirLight'>Payment Amount</p>
                                <p className='text-sm'>{currencySymbol} {formatAmount(0)}</p>
                            </div>

                            <div className='py-4'>
                                <p className='text-right font-avenirHeavy text-lg'>{currencySymbol} {formatAmount(order.total_amount)}</p>
                            </div>
                        </div>
                    </div>

                    {/* payme only */}
                    {
                        <div className='pt-8'>
                            <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                                <div className='pb-3.5 border-b-0.5 border-b-brandGray2x font-avenirLight items-center gap-10 justify-between'>
                                    <h2 className="">Item Order</h2>
                                </div>
                                <div className='pt-5'>
                                    {order && order.order_data && order.order_data.length > 0 && order.order_data.map((data, idx)=>{
                                        return <div key={idx} className="flex w-full text-sm font-avenirMedium gap-8 items-center justify-between">
                                            <p className={` text-brandGray6x`}>{data.product_data.product_name} (x{data.how_many})</p>
                                            <p className='text-black'>{currencySymbol} {formatAmount(data.product_data.product_amount)} ({currencySymbol} {formatAmount(data.product_data.product_amount * data.how_many)})</p>
                                        </div>
                                    })}
                                </div>
                                {
                                    order.data?.is_screenshot && order.data?.screenshotdata && order.data?.screenshotdata.length > 0
                                    ?
                                        <div className='py-3.5'>
                                            <h3 className='font-avenirMedium text-brandGray6x text-sm pb-2'>Product Image(s)</h3>
                                            <div className={`grid grid-cols-4 gap-5 py-3.5`}>
                                                {
                                                    order.data.screenshotdata.map((image, idx)=>{
                                                        return <img key={idx} src={image.screenshotURL} alt="" className='aspect-square skeleton rounded-ten' />
                                                    })
                                                }
                                            </div>
                                        </div>
                                    :
                                        ''
                                }
                            </div>
                        </div>
                    }


                    {/* buttons */}
                    <div className='pt-8'>
                        <button disabled={submitting} type='button' onClick={()=>handleDelivery(order.userID, order.storeID, order.orders_token)} className='w-full px-6 hover:pr-4 disabled:bg-brandGray16x transition-all duration-500 ease-in-out py-3 bg-brandGreen1x font-avenirBlack group rounded-fifty flex justify-between text-white gap-6 items-center'>
                            Yes, I have sent order
                            <svg className='' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0249 4.94165L17.0832 9.99998L12.0249 15.0583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path opacity="0.4" d="M2.9165 10H16.9415" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            })}
        </div>
    </ModalWrap>
  )
}

export default ViewOrder