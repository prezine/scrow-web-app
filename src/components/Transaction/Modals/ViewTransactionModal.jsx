import axios from 'axios'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useUser from '../../../hooks/stores/useUser'
import MakeTransactionStatusTag from '../../../utils/Tags/MakeTransactionStatusTag'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import ModalWrap from '../../Elements/Modal/ModalWrap'
import BuyerSellerButtons from './Elements/BuyerSellerButtons'
import he from 'he'
import Avatar from '../../../assets/media/avatars/avatar-4.png'


const ViewTransactionModal = ({modalState, setPayRef, openPaymentModal, closeModal, data, mutate, fetched, setAlertValues, setOpenAlert, alertValues}) => {
    const [currencySymbol, setCurrencySymbol] = useState('₦')
    const [showMore, setShowMore] = useState(false)
    const [payMeShowMore, setPayMeShowMore] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const {userDataValue} = useUser()

    const {requestHeaders} = useRequestHeaders()


    const formatAmount = (val) => {
        let formatted = new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(val)
        return formatted
    }

    const getNumberOfLines = () => {
        // Get the paragraph element
        const paragraph = document.getElementById('terms');

        if(paragraph){
            // Get the computed style for the paragraph
            const style = window.getComputedStyle(paragraph);

            // Calculate the line height in pixels
            const lineHeight = parseFloat(style.lineHeight);

            // Get the height of the paragraph element in pixels
            const height = paragraph.offsetHeight;

            // Calculate the number of lines
            const numberOfLines = Math.round(height / lineHeight);

            // console.log('Number of lines:', numberOfLines);
            return numberOfLines
        }

    }

    const markAsDelivered = (sellerStatus) => {
        setOpenAlert(false)
        setSubmitting(true)
        const formData = new FormData()
        formData.append('userID', `${userDataValue && userDataValue.userID}`)
        formData.append('payref', data[0].payment_ref)
        let url = ''
        if(sellerStatus == 'buyer'){
            url = `${import.meta.env.VITE_BASEURL}/escrow/mark/received?userID=${userDataValue && userDataValue.userID}`
        }else if(sellerStatus == 'seller'){
            url = `${import.meta.env.VITE_BASEURL}/escrow/mark/delivered?userID=${userDataValue && userDataValue.userID}`
        }
        try {
            //   const formValues = Object.fromEntries(formData.entries());
            //     console.log(formValues);

            axios.post(url, formData, requestHeaders)
            .then((res)=>{
              console.log(res);
                if(res.data.status == false && res.data.data.message){
                    console.log(res.data.data.message);
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:res.data.data.message, type:`danger` })
                    closeModal()
                }else if (res.data.status == true) {
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
                    mutate()
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

    const handleMilestoneTasks = (sellerStatus, user_id, list_id, list_token, trans_pay_ref, alertMessageSuccess) => {
        setOpenAlert(false)
        setSubmitting(true)
        const formData = new FormData()
        formData.append('userID', user_id)
        formData.append('token', list_token)
        formData.append('milestoneID', list_id)
        formData.append('payref', trans_pay_ref)
        let url = ''
        if(sellerStatus == 'buyer'){
            url = `${import.meta.env.VITE_BASEURL}/escrow/milestone/task/approved?userID=${userDataValue && userDataValue.userID}`
        }else if(sellerStatus == 'seller'){
            url = `${import.meta.env.VITE_BASEURL}/escrow/milestone/task/delivered?userID=${userDataValue && userDataValue.userID}`
        }

        try {
            //   const formValues = Object.fromEntries(formData.entries());
            //     console.log(formValues);

            axios.post(url, formData, requestHeaders)
            .then((res)=>{
              console.log(res);
                if(res.data.status == false && res.data.data.message){
                    console.log(res.data.data.message);
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:res.data.data.message, type:`danger` })
                    // closeModal()
                }else if (res.data.status == true) {
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:alertMessageSuccess || res.data.data.message, type:`success` })
                    fetched.mutate()
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

    const markAllAsDone = (sellerStatus, trans_pay_ref) => {
        console.log(data[0].data.list);

        let message = `Marked all milestone tasks as ${sellerStatus == 'seller' ? 'delivered' : 'approved'}`

        data[0].data.list.forEach((list)=>{
            handleMilestoneTasks(sellerStatus, list.userID, list.listID, list.token, trans_pay_ref, message)
        })
    }
    
    if(data)
  
    return (
    <ModalWrap id={'viewTransactionModal'} modalState={modalState} hideOverflow handleModal={closeModal} itemPosition={'items-end overflow-x-hidden max-h-screen'} paddingY={'py-0'} >
        <div className={`view--trans--body bg-white  pb-12 px-6 w-full max-w-md h-screen overflow-y-auto relative z-50`}>
            {data && data.length > 0 && data.map((trans, idx)=>{
                return <div key={idx}>
                    <div className='sticky top-0 z-20 py-4 left-0 bg-white'>
                        <div className='flex justify-between'>
                            <p className='text-sm font-avenirLight'>{trans.date && trans.date.split(',')[0]} {trans.date && trans.date.split(',')[1]}</p>
                            <button type='button' onClick={closeModal} title={'Close'} aria-label='Close view transaction modal' className='transition-all duration-300 ease-in-out hover:scale-90 group w-fit h-fit rounded-lg'>
                                <svg className='transition-all duration-300 ease-in-out group-hover:scale-90' width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M21.5865 2.66675H10.4132C5.55984 2.66675 2.6665 5.56008 2.6665 10.4134V21.5734C2.6665 26.4401 5.55984 29.3334 10.4132 29.3334H21.5732C26.4265 29.3334 29.3198 26.4401 29.3198 21.5868V10.4134C29.3332 5.56008 26.4398 2.66675 21.5865 2.66675Z" fill="#D2D2D2"/>
                                    <path d="M17.4133 16L20.48 12.9333C20.8666 12.5466 20.8666 11.9066 20.48 11.52C20.0933 11.1333 19.4533 11.1333 19.0666 11.52L16 14.5866L12.9333 11.52C12.5466 11.1333 11.9066 11.1333 11.52 11.52C11.1333 11.9066 11.1333 12.5466 11.52 12.9333L14.5866 16L11.52 19.0666C11.1333 19.4533 11.1333 20.0933 11.52 20.48C11.72 20.68 11.9733 20.7733 12.2266 20.7733C12.48 20.7733 12.7333 20.68 12.9333 20.48L16 17.4133L19.0666 20.48C19.2666 20.68 19.52 20.7733 19.7733 20.7733C20.0266 20.7733 20.28 20.68 20.48 20.48C20.8666 20.0933 20.8666 19.4533 20.48 19.0666L17.4133 16Z" fill="#393D42"/>
                                </svg>
                            </button>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <p className='font-avenirMedium text-2xl'>{currencySymbol} {formatAmount(trans.fee.payableamount)}</p>
                            <p className={`px-2.5 py-1 rounded-five h-fit w-fit text-xs ${MakeTransactionStatusTag(trans.status)}`}>{trans.transaction.status_alt}</p>
                        </div>   
                    </div>

                    <div className='pt-6'>
                        <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                            <div className='pb-7'>
                                <h1 className='uppercase font-avenirHeavy pb-1'>{trans.name}</h1>
                                {trans.transaction_type && trans.transaction_type.toLowerCase() == 'crowd-pay'
                                ?
                                <NavLink target={'_blank'} to={`/donate/${trans.payment_ref}`} className={`text-brandBlue1x flex gap-1 items-center group text-sm`}>
                                {trans.payment_ref}
                                <svg className='transition-all duration-300 ease-in-out group-hover:-translate-y-2' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.2357 14.6583L17.2357 8.22008L10.7975 8.22008" stroke="#182CD1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path opacity="0.4" d="M8.22005 17.2358L17.1455 8.3103" stroke="#182CD1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </NavLink>
                            :
                            <p className={`text-brandBlue1x cursor-pointer flex gap-1 items-center group text-sm`}>
                                <NavLink target={'_blank'} to={`${trans.transaction.paymentURL}`} className={`text-brandBlue1x flex gap-1 items-center group text-sm`}>
                                    {trans.payment_ref}
                                    <svg className='transition-all duration-300 ease-in-out group-hover:-translate-y-2' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.2357 14.6583L17.2357 8.22008L10.7975 8.22008" stroke="#182CD1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path opacity="0.4" d="M8.22005 17.2358L17.1455 8.3103" stroke="#182CD1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </NavLink>
                            </p>}
                            </div>
                            <div className='flex gap-10 justify-between'>
                                <div className='space-y-1'>
                                    <h2 className='text-xs font-avenirLight'>TRANSACTION DURATION</h2>
                                    <p className={`px-2.5 py-1 rounded-five h-fit w-fit text-xs ${MakeTransactionStatusTag(trans.status)}`}>{trans.transaction.status_alt}</p>
                                </div>
                                <p className='text-xs text-right'>{trans.transaction_type && trans.transaction_type.toLowerCase() !== 'payme' && `${trans.data.duration_in_days} days`}</p>
                            </div>
                            <div className='flex gap-10 justify-between pt-6'>
                                <div className='space-y-1'>
                                    <h2 className='text-xs font-avenirLight'>TRANSACTION TYPE</h2>
                                    <p className={`px-2.5 py-1 rounded-five h-fit w-fit text-xs bg-brandLightGreen4x text-brandGreen4x whitespace-nowrap overflow-hidden text-ellipsis`}>Escrow Enabled</p>
                                </div>
                                <p className='text-xs text-right font-avenirHeavy'>{trans.transaction.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* fees */}
                    <div className='pt-8'>
                        <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                            <div className='flex gap-10 justify-between py-3.5 border-b-0.5 border-b-brandGray2x'>
                                <p className='font-avenirLight'>Processing Fee</p>
                                <p className='text-sm'>{currencySymbol} {formatAmount(trans.fee.taxfee)}</p>
                            </div>

                            <div className='flex gap-10 justify-between py-3.5 border-b-0.5 border-b-brandGray2x'>
                                <p className='font-avenirLight'>Escrow Fee</p>
                                <p className='text-sm'>{currencySymbol} {formatAmount(trans.fee.scrowfee)}</p>
                            </div>

                            <div className='flex gap-10 justify-between py-3.5 border-b-0.5 border-b-brandGray2x'>
                                <p className='font-avenirLight'>Payment Amount</p>
                                <p className='text-sm'>{currencySymbol} {formatAmount(trans.fee.chargedamount)}</p>
                            </div>

                            <div className='py-4'>
                                <p className='text-right font-avenirHeavy text-lg'>{currencySymbol} {formatAmount(trans.fee.payableamount)}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* milestone only */}
                    {
                        trans.transaction_type && trans.transaction_type.toLowerCase() == 'milestone' &&
                        <div className='pt-8'>
                            <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                                <div className='flex pb-3.5 border-b-0.5 border-b-brandGray2x font-avenirLight items-center gap-10 justify-between'>
                                    <h2 className="">Milestone List</h2>
                                    <button type='button' 
                                     disabled={
                                        (trans &&
                                        trans.data.list &&
                                        trans.data.list.length > 0 &&
                                        trans.data.list.filter(
                                          list =>
                                            list[trans.transaction.trader_status === 'seller' ? 'is_delivered' : 'is_approved'] === '1'
                                        ).length === trans.data.list.length)
                                        ||
                                        trans &&
                                        trans.data.list &&
                                        trans.data.list.length > 0 &&
                                        trans.transaction.trader_status == 'buyer' &&
                                        trans.data.list.filter(
                                            list =>
                                              list['is_delivered'] === '1'
                                          ).length !== trans.data.list.length
                                    }
                                     onClick={()=>markAllAsDone(trans.transaction.trader_status, trans.payment_ref)} className='bg-black text-white text-xs rounded-fifty py-0.75 px-3 disabled:bg-brandGray16x disabled:cursor-not-allowed'>
                                        {trans.transaction.trader_status == 'seller' ? 
                                        <span>{
                                            trans &&
                                            trans.data.list &&
                                            trans.data.list.length > 0 &&
                                            trans.data.list.filter(
                                                list =>
                                                list[trans.transaction.trader_status === 'seller' ? 'is_delivered' : 'is_approved'] === '1'
                                            ).length === trans.data.list.length
                                            ? 'Marked' : 'Mark'} All as Done</span>
                                         : 
                                         <span>{
                                            trans &&
                                            trans.data.list &&
                                            trans.data.list.length > 0 &&
                                            trans.data.list.filter(
                                                list =>
                                                list[trans.transaction.trader_status === 'seller' ? 'is_delivered' : 'is_approved'] === '1'
                                            ).length === trans.data.list.length
                                            ? 'Marked' : 'Mark'} All as Approved</span>
                                        }
                                    </button>
                                </div>
                                {/* {trans.transaction.trader_status} */}

                                <div>
                                    {trans && trans.data.list && trans.data.list.length > 0 && trans.data.list.map((milestone, idx)=>{
                                        return <fieldset key={idx} className='flex items-center w-full gap-3 py-2.5 text-sm font-avenirMedium'>
                                        <button type='button' onClick={()=>handleMilestoneTasks(trans.transaction.trader_status, milestone.userID, milestone.listID, milestone.token, trans.payment_ref)} className='disabled:cursor-not-allowed flex items-center w-full gap-3 ' disabled={trans.transaction.trader_status == 'seller' ? milestone.is_delivered == '1' : milestone.is_approved == '1' || trans.transaction.trader_status == 'buyer' && milestone.is_delivered == 0} checked={trans.transaction.trader_status == 'seller' ? milestone.is_delivered == '1' : milestone.is_approved == '1'} name={`task${milestone.listID}`} id={`task${milestone.listID}`} >
                                            <div htmlFor={`task${milestone.listID}`} className={`flex ${((trans.transaction.trader_status == 'seller' && milestone.is_delivered == '1') || (trans.transaction.trader_status == 'buyer' && milestone.is_approved == '1')) ? "text-brandGreen1x" : "text-brandGray6x"} items-center gap-3 justify-between w-full`}>
                                                <div className={`h-3.5 w-3.5 aspect-square rounded-sm transition-all duration-300 ease-in-out cursor-pointer ${((trans.transaction.trader_status == 'seller' && milestone.is_delivered == '1') || (trans.transaction.trader_status == 'buyer' && milestone.is_approved == '1')) ? 'bg-brandGreen1x hover:bg-brandGreen1x/80 border-none' : 'bg-transparent border-2 border-brandGray16x'}`}></div>
                                                <div className="flex w-full gap-8 items-center justify-between">
                                                    <p className={``}>{milestone.taskname}</p>
                                                    <p className='text-black'>{currencySymbol} {formatAmount(milestone.taskamount)}</p>
                                                </div>
                                            </div>
                                        </button>
                                    </fieldset>
                                    })}
                                </div>
                            </div>
                        </div>
                    }

                    {/* payme only */}
                    {
                        trans.transaction_type && trans.transaction_type.toLowerCase() == 'payme' &&
                        <div className='pt-8'>
                            <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                                <div className='pb-3.5 border-b-0.5 border-b-brandGray2x font-avenirLight items-center gap-10 justify-between'>
                                    <h2 className="">Product Information</h2>
                                </div>
                                <div className='py-3.5 border-b-0.5 border-b-brandGray2x'>
                                    <h3 className='font-avenirMedium text-brandGray6x text-sm pb-2'>Product Description</h3>
                                    <p className={`text-sm py-3.5`}>
                                        <span id='terms' className={`font-avenirLight ${payMeShowMore ? '' : 'five-lined-text'}`}>
                                            {he.decode(trans.data.description).replaceAll('\\r\\n', ' ')}
                                        </span>
                                        {getNumberOfLines() > 4 && <button type='button' onClick={()=>setPayMeShowMore(prevPayMeShowMore => !prevPayMeShowMore)} className='text-brandBlue1x font-avenirHeavy underline underline-offset-2 inline-block text-right py-3 w-full h-fit cursor-pointer '>{payMeShowMore ? 'Show less' : 'Show more'}</button>}
                                    </p>
                                </div>
                                {
                                    trans.data.is_screenshot && trans.data.screenshotdata && trans.data.screenshotdata.length > 0
                                    ?
                                        <div className='py-3.5'>
                                            <h3 className='font-avenirMedium text-brandGray6x text-sm pb-2'>Product Image</h3>
                                            <div className={`grid grid-cols-4 gap-5 py-3.5`}>
                                                {
                                                    trans.data.screenshotdata.map((image, idx)=>{
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


                    {/* crowdpay only */}
                    {
                        trans.transaction_type && trans.transaction_type.toLowerCase() == 'crowd-pay' &&
                        <div className='pt-8'>
                            <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                                <div className='pb-3.5 border-b-0.5 border-b-brandGray2x font-avenirLight items-center gap-10 justify-between'>
                                    <h2 className="">Crowdpay Progress</h2>
                                </div>
                                <div className='pt-3.5'>
                                    <h3 className='font-avenirBlack text-black text-sm pb-2'>Goals: <span>{currencySymbol} {formatAmount(trans.data.project_goal)}</span></h3>
                                    <div className='py-3.5'>
                                        <div className='bg-brandGray28x h-2 rounded-twenty w-full'>
                                            <div className='h-2 rounded-twenty bg-brandGreen1x' style={{width: `${(trans.data.current_raised/trans.data.project_goal * 100) < 100 ? trans.data.current_raised/trans.data.project_goal * 100 : 100}%` }}></div>
                                        </div>
                                        <div>
                                            <p className={`text-3xl text-brandGreen1x pb-1 pt-3.5 font-avenirBlack`}>{currencySymbol} <span>{formatAmount(trans.data.current_raised)}</span></p>
                                            <p className={'text-brandGray40x'}>Raised</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }


                    {/* banter only */}
                    {
                        trans.transaction_type && trans.transaction_type.toLowerCase() == 'banter' &&
                        <div className='pt-8'>
                            <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                                <div className='pb-3.5 border-b-0.5 border-b-brandGray2x font-avenirLight items-center gap-10 justify-between'>
                                    <h2 className="">Banter Payment Status</h2>
                                </div>
                                <div className=''>
                                    <div  className='flex flex-row item-center gap-3 py-3.5'>
                                        <img src={ trans.data.my_data.user_dp ? trans.data.my_data.user_dp : Avatar} alt={trans.data.my_data.name} className={`rounded-full h-8 w-8 aspect-square`} />
                                        <div className='w-full flex items-center gap-5 justify-between'>
                                            <p className='text-sm'>{trans.data.my_data.name}</p>
                                            <div>
                                                {trans.data.my_data.payment_status == '1' 
                                                ? <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_15908_31774)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.4561C0 8.67128 1.10625 6.00057 3.07538 4.03143C5.04451 2.0623 7.71523 0.956055 10.5 0.956055C13.2848 0.956055 15.9555 2.0623 17.9246 4.03143C19.8938 6.00057 21 8.67128 21 11.4561C21 14.2408 19.8938 16.9115 17.9246 18.8807C15.9555 20.8498 13.2848 21.9561 10.5 21.9561C7.71523 21.9561 5.04451 20.8498 3.07538 18.8807C1.10625 16.9115 0 14.2408 0 11.4561H0ZM9.9008 15.9501L15.946 8.39285L14.854 7.51925L9.6992 13.9607L6.048 10.9185L5.152 11.9937L9.9008 15.9515V15.9501Z" fill="#30C56B"/>
                                                    </g>
                                                    <defs>
                                                    <clipPath id="clip0_15908_31774">
                                                    <rect width="21" height="21" fill="white" transform="translate(0 0.956055)"/>
                                                    </clipPath>
                                                    </defs>
                                                </svg>
                                                :
                                                <div>
                                                    {userDataValue && userDataValue.userID == trans.data.my_data.userID ? 
                                                    <NavLink to={trans.transaction.paymentURL} className='text-xs text-brandOrange2x underline underline-offset-2'>Make Payment</NavLink> 
                                                    :                                                    
                                                    <div className='text-xs text-brandOrange2x underline underline-offset-2'>Pending Payment</div>
                                                    }
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div  className='flex flex-row item-center gap-3 py-3.5'>
                                        <img src={trans.data.opposition_data.user_dp ? trans.data.opposition_data.user_dp : Avatar} alt={trans.data.opposition_data.name} className={`rounded-full h-8 w-8 aspect-square`} />
                                        <div className='w-full flex items-center gap-5 justify-between'>
                                            <p className='text-sm'>{trans.data.opposition_data.name}</p>
                                            <div>
                                                {trans.data.opposition_data.payment_status == '1' 
                                                ? <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_15908_31774)">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.4561C0 8.67128 1.10625 6.00057 3.07538 4.03143C5.04451 2.0623 7.71523 0.956055 10.5 0.956055C13.2848 0.956055 15.9555 2.0623 17.9246 4.03143C19.8938 6.00057 21 8.67128 21 11.4561C21 14.2408 19.8938 16.9115 17.9246 18.8807C15.9555 20.8498 13.2848 21.9561 10.5 21.9561C7.71523 21.9561 5.04451 20.8498 3.07538 18.8807C1.10625 16.9115 0 14.2408 0 11.4561H0ZM9.9008 15.9501L15.946 8.39285L14.854 7.51925L9.6992 13.9607L6.048 10.9185L5.152 11.9937L9.9008 15.9515V15.9501Z" fill="#30C56B"/>
                                                    </g>
                                                    <defs>
                                                    <clipPath id="clip0_15908_31774">
                                                    <rect width="21" height="21" fill="white" transform="translate(0 0.956055)"/>
                                                    </clipPath>
                                                    </defs>
                                                </svg>
                                                :
                                                <div>
                                                    {userDataValue && userDataValue.userID == trans.data.opposition_data.userID ? 
                                                    <NavLink to={trans.transaction.paymentURL} className='text-xs text-brandOrange2x underline underline-offset-2'>Make Payment</NavLink> 
                                                    :                                                    
                                                    <div className='text-xs text-brandOrange2x underline underline-offset-2'>Pending Payment</div>
                                                    }
                                                </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }


                    {/* Terms of Transaction */}

                    {(trans.transaction_type.toLowerCase() == 'one-time' || trans.transaction_type.toLowerCase() == 'milestone') &&
                        <div className='pt-8'>
                            <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                                <div>
                                    <p className='font-avenirLight py-3.5 border-b-0.5 border-b-brandGray2x'>Terms of Transaction</p>

                                    <div>
                                        <p className={`text-sm py-3.5`}>
                                            <span id={'terms'} className={`font-avenirLight ${showMore ? '' : 'five-lined-text'}`}>{he.decode(trans.data.terms).replaceAll('\\r\\n', ' ')}</span>
                                            {getNumberOfLines() > 4 && <button type='button' onClick={()=>setShowMore(prevShowMore => !prevShowMore)} className='text-brandBlue1x font-avenirHeavy underline underline-offset-2 inline-block text-right py-3 w-full h-fit cursor-pointer '>{showMore ? 'Show less' : 'Show more'}</button>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {/* Fund Description */}

                    {trans.transaction_type.toLowerCase() == 'crowd-pay' &&
                        <div className='pt-8'>
                            <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                                <div>
                                    <p className='font-avenirLight py-3.5 border-b-0.5 border-b-brandGray2x'>Fund Description</p>

                                    <div>
                                        <p className={`text-sm py-3.5`}>
                                            <span id={'terms'} className={`font-avenirLight ${showMore ? '' : 'five-lined-text'}`}>{he.decode(trans.data.project_description).replaceAll('\\r\\n', ' ')}</span>
                                            {getNumberOfLines() > 4 && <button type='button' onClick={()=>setShowMore(prevShowMore => !prevShowMore)} className='text-brandBlue1x font-avenirHeavy underline underline-offset-2 inline-block text-right py-3 w-full h-fit cursor-pointer '>{showMore ? 'Show less' : 'Show more'}</button>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {/* Banter Agreement */}

                    {trans.transaction_type.toLowerCase() == 'banter' &&
                        <div className='pt-8'>
                            <div className='rounded-thirty py-5 px-7 bg-brandGray10x w-full'>
                                <div>
                                    <p className='font-avenirLight py-3.5 border-b-0.5 border-b-brandGray2x'>Banter Agreement</p>

                                    <div>
                                        <p className={`text-sm py-3.5`}>
                                            <span id={'terms'} className={`font-avenirLight ${showMore ? '' : 'five-lined-text'}`}>{he.decode(trans.data.terms).replaceAll('\\r\\n', ' ')}</span>
                                            {getNumberOfLines() > 4 && <button type='button' onClick={()=>setShowMore(prevShowMore => !prevShowMore)} className='text-brandBlue1x font-avenirHeavy underline underline-offset-2 inline-block text-right py-3 w-full h-fit cursor-pointer '>{showMore ? 'Show less' : 'Show more'}</button>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }



                    
                    {/* TRANSACTION TIMELINE */}
                    {
                        trans.transaction_timeline && trans.transaction_timeline.length > 0 &&
                        <div className='pt-8'>
                            <h2 className='font-avenirHeavy text-sm'>TRANSACTION TIMELINE</h2>
                            <div className='py-5'>
                                {trans.transaction_timeline && trans.transaction_timeline.map((timeline, idx)=>{
                                    return <div key={idx} className={'text-brandBlack2x flex gap-4'}>
                                        <div className=''>
                                            <div className='h-2.5 w-2.5 aspect-square rounded-full bg-brandGray15x'></div>
                                            <div className='h-full bg-brandGray2x w-0.5 mx-auto'>

                                            </div>
                                        </div>
                                        <div className={`${idx !== (trans.transaction_timeline.length - 1) ? 'pb-3' : 'pb-0'}`}>
                                            <p className='text-xxs pb-0.5'>{timeline.date_alt}</p>
                                            {/* <p className='text-xxs pb-0.5'>{useGetDuration(new Date(), FormatUTC(timeline.date))}</p> */}
                                            <p className='text-sm font-spaceGroteskRegular'>{timeline.note}</p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    }

                    {/* buttons */}
                    <div className='pt-8'>
                        <BuyerSellerButtons setPayRef={()=>setPayRef(trans.payment_ref)} openPaymentModal={openPaymentModal} closeTransModal={()=>closeModal()} markAsDelivered={markAsDelivered} trans={trans} submitting={submitting} />
                        {
                            trans.transaction_type && trans.transaction_type.toLowerCase() == 'crowd-pay'
                            &&
                            <button type='button' className='w-full px-6 hover:pr-4 transition-all duration-500 ease-in-out py-3 bg-brandGreen1x font-avenirBlack group rounded-fifty flex justify-between text-white gap-6 items-center'>
                                Proceed to donate
                                <svg className='' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0249 4.94165L17.0832 9.99998L12.0249 15.0583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path opacity="0.4" d="M2.9165 10H16.9415" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        }
                        {
                            trans.transaction_type && trans.transaction_type.toLowerCase() == 'banter'
                            &&
                            <div className='flex xs:flex-col flex-row gap-4'>
                                <button type='button' className='xs:w-full w-fiftyPercent px-6 whitespace-nowrap hover:pr-4 transition-all duration-500 ease-in-out py-3 bg-brandGreen1x font-avenirBlack group rounded-fifty flex justify-between text-white gap-6 items-center'>
                                    Yay! I won
                                    <svg className='' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0249 4.94165L17.0832 9.99998L12.0249 15.0583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path opacity="0.4" d="M2.9165 10H16.9415" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button type='button' className='xs:w-full w-fiftyPercent px-6 whitespace-nowrap hover:pr-4 transition-all duration-500 ease-in-out py-3 bg-brandRed1x font-avenirBlack group rounded-fifty flex justify-between text-white gap-6 items-center'>
                                    Oops! I lost
                                    <svg className='' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0249 4.94165L17.0832 9.99998L12.0249 15.0583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path opacity="0.4" d="M2.9165 10H16.9415" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        }
                        {/* <button type='button' className='w-full px-6 group py-3 bg-black font-avenirBlack group rounded-fifty flex justify-between text-white gap-6 items-center'>
                            Flag this Transaction
                            <svg className='group-hover:translate-x-2 group-hover:-translate-y-1 transition-all duration-500 ease-in-out' width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.355 9.99133L19.5085 9.99133L19.5085 17.1449" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path opacity="0.4" d="M9.49121 20.0087L19.4084 10.0915" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button> */}
                    </div>
                </div>
            })}
        </div>
    </ModalWrap>
  )
}

export default ViewTransactionModal