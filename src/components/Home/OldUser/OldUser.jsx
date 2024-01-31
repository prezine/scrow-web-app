import axios from 'axios'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import useUser from '../../../hooks/stores/useUser'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import TemplatePage from '../../Elements/Wraps/TemplatePage'
import TransactionHistory from './TransactionHistory'
import TransactionInsight from './TransactionInsight'
import useSWR from 'swr'
import FetchError from '../../Errors/FetchError'
import PageLoader from '../../Elements/Loaders/PageLoader'


const OldUser = () => {

    const [error, setError] = useState(false)

    const [transactionHistoryData, setTransactionHistoryData] = useState([])

    const [year, setYear] = useState('')


    const {userDataValue} = useUser()
    

  const {requestHeaders} = useRequestHeaders()

  let transactionCurrency = 'NGN'

  
  let transactionStats = {
    "transaction_total_revenue": 0,
    "transaction_total_expenses": 0,
    "transaction_escrow_balance": 0
  }


  const fetcher = async (url) => axios.get(url, requestHeaders)

  const transactionStatFetched = useSWR(`${import.meta.env.VITE_BASEURL}/insight/transaction/chart?userID=${userDataValue && userDataValue.userID}`, fetcher, )
  const transactionInsightFetched = useSWR(`${import.meta.env.VITE_BASEURL}/insight/transaction/count?userID=${userDataValue && userDataValue.userID}`, fetcher, )
  const transactionDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/transaction/fetch?userID=${userDataValue && userDataValue.userID}`, fetcher)

  if (!transactionStatFetched.data || !transactionDataFetched.data || !transactionInsightFetched.data) return <PageLoader />
  if (transactionStatFetched.error || transactionDataFetched.error || transactionInsightFetched.error) return <FetchError />


  const historyFetchStatus = transactionDataFetched.data && transactionDataFetched.data.data.status 
  const insightFetchStatus = transactionInsightFetched.data && transactionInsightFetched.data.data.status 

  transactionStats = {
    "transaction_total_revenue": insightFetchStatus && transactionInsightFetched.data.data.data.transaction_total_revenue ? transactionInsightFetched.data.data.data.transaction_total_revenue : 0,
    "transaction_total_expenses": insightFetchStatus && transactionInsightFetched.data.data.data.transaction_total_expenses ? transactionInsightFetched.data.data.data.transaction_total_expenses : 0,
    "transaction_escrow_balance": insightFetchStatus && transactionInsightFetched.data.data.data.transaction_escrow_balance ? transactionInsightFetched.data.data.data.transaction_escrow_balance : 0
  }

  transactionCurrency = insightFetchStatus && transactionInsightFetched.data.data.data.currency ? transactionInsightFetched.data.data.data.currency : 'NGN'

  if (transactionStatFetched.data && transactionDataFetched.data)

  return (
    <TemplatePage headerDescription={`Hi ${userDataValue ? userDataValue.name.split(' ')[0] : ''}, Welcome to Pandascrow 🚀`}>
        <div className='pb-20 max-w-full'>
            <div className="flex xl:flex-row lg:flex-nowrap flex-col flex-wrap h-max lg:h-fit  gap-5">
                
                {/* transaction insight */}
                <TransactionInsight year={year} transactionData={transactionStatFetched.data && transactionStatFetched.data.data.data.month && transactionStatFetched.data.data.data.month} />

                {/* balance */}
                <div className="flex flex-col xl:w-fortyPercent w-full px-6 py-6 gap-5 border border-brandGray2x bg-white rounded-thirty">
                    <div className="flex flex-row justify-between items-center pb-6">
                        <h2 className="text-lg font-avenirMedium text-black">Balance</h2>
                        <div className="relative">
                            <button id="" type="submit" className="toggle-filter flex gap-2 items-center text-brandDashBluex shadow-md bg-white py-1 px-3 rounded-five border border-brandLightGray">
                                <p id="transaction_date_text" className="md:inline-block hidden pr-1">Last 30 days</p>
                                <svg className="inline-block" width="16" height="16" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_7430_8043)">
                                        <path d="M15.0417 1.58333H14.25V0.791667C14.25 0.581704 14.1666 0.38034 14.0181 0.231874C13.8697 0.0834075 13.6683 0 13.4583 0C13.2484 0 13.047 0.0834075 12.8985 0.231874C12.7501 0.38034 12.6667 0.581704 12.6667 0.791667V1.58333H6.33333V0.791667C6.33333 0.581704 6.24993 0.38034 6.10146 0.231874C5.95299 0.0834075 5.75163 0 5.54167 0C5.3317 0 5.13034 0.0834075 4.98187 0.231874C4.83341 0.38034 4.75 0.581704 4.75 0.791667V1.58333H3.95833C2.9089 1.58459 1.90282 2.00203 1.16076 2.74409C0.418698 3.48615 0.00125705 4.49224 0 5.54167L0 15.0417C0.00125705 16.0911 0.418698 17.0972 1.16076 17.8392C1.90282 18.5813 2.9089 18.9987 3.95833 19H15.0417C16.0911 18.9987 17.0972 18.5813 17.8392 17.8392C18.5813 17.0972 18.9987 16.0911 19 15.0417V5.54167C18.9987 4.49224 18.5813 3.48615 17.8392 2.74409C17.0972 2.00203 16.0911 1.58459 15.0417 1.58333ZM1.58333 5.54167C1.58333 4.91178 1.83356 4.30769 2.27895 3.86229C2.72435 3.41689 3.32844 3.16667 3.95833 3.16667H15.0417C15.6716 3.16667 16.2756 3.41689 16.721 3.86229C17.1664 4.30769 17.4167 4.91178 17.4167 5.54167V6.33333H1.58333V5.54167ZM15.0417 17.4167H3.95833C3.32844 17.4167 2.72435 17.1664 2.27895 16.721C1.83356 16.2756 1.58333 15.6716 1.58333 15.0417V7.91667H17.4167V15.0417C17.4167 15.6716 17.1664 16.2756 16.721 16.721C16.2756 17.1664 15.6716 17.4167 15.0417 17.4167Z" fill="#182CD1" />
                                        <path d="M9.5 13.0625C10.1558 13.0625 10.6875 12.5308 10.6875 11.875C10.6875 11.2192 10.1558 10.6875 9.5 10.6875C8.84416 10.6875 8.3125 11.2192 8.3125 11.875C8.3125 12.5308 8.84416 13.0625 9.5 13.0625Z" fill="#182CD1" />
                                        <path d="M5.54102 13.0625C6.19685 13.0625 6.72852 12.5308 6.72852 11.875C6.72852 11.2192 6.19685 10.6875 5.54102 10.6875C4.88518 10.6875 4.35352 11.2192 4.35352 11.875C4.35352 12.5308 4.88518 13.0625 5.54102 13.0625Z" fill="#182CD1" />
                                        <path d="M13.459 13.0625C14.1148 13.0625 14.6465 12.5308 14.6465 11.875C14.6465 11.2192 14.1148 10.6875 13.459 10.6875C12.8031 10.6875 12.2715 11.2192 12.2715 11.875C12.2715 12.5308 12.8031 13.0625 13.459 13.0625Z" fill="#182CD1" /> </g>
                                    <defs>
                                        <clipPath id="clip0_7430_8043">
                                            <rect width="19" height="19" fill="white" /> </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <div id="" className="filter bg-white h-fit right-0 absolute top-11 w-44 rounded-fifteen shadow-md shadow-black/10 px-3 pb-4 hidden">
                                <button title="Last 7 days" type="button" className="pt-tenPixel  whitespace-nowrap w-full text-left border-b border-brandDashGray25x  text-brandDashGray26x">Last 7 days</button>
                                <button title="Last 30 days" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">Last 30 days</button>
                                <button title="Last 90 days" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">Last 90 days</button>
                                <button title="Last 180 days" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">Last 180 days</button>
                                <button title="Today" type="button" className="pt-tenPixel text-left w-full border-b border-brandDashGray25x  text-brandDashGray26x">Today</button>
                                <button title="Custom range" type="button" className="pt-tenPixel text-left w-full  text-brandDashGray26x">Custom range</button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col lg:h-fit px-4 lg:p-0 py-4 gap-2">
                        <div className="flex flex-row gap-4 items-center">
                            <h3 className="text-brandGray5x font-avenirMedium ">Total Revenue</h3>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_7038_5115)">
                                    <path d="M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.003033 5.6003 -0.13559 7.00777 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C13.998 5.1441 13.2599 3.36479 11.9475 2.05247C10.6352 0.74015 8.8559 0.0020073 7 0V0ZM7 12.8333C5.84628 12.8333 4.71846 12.4912 3.75918 11.8502C2.79989 11.2093 2.05222 10.2982 1.61071 9.23232C1.16919 8.16642 1.05368 6.99353 1.27876 5.86197C1.50384 4.73042 2.05941 3.69102 2.87521 2.87521C3.69102 2.0594 4.73042 1.50383 5.86198 1.27875C6.99353 1.05367 8.16642 1.16919 9.23232 1.6107C10.2982 2.05221 11.2093 2.79989 11.8502 3.75917C12.4912 4.71846 12.8333 5.84628 12.8333 7C12.8316 8.54658 12.2165 10.0293 11.1229 11.1229C10.0293 12.2165 8.54658 12.8316 7 12.8333Z" fill="#C0C0C0" />
                                    <path d="M7.00065 5.83398H6.41732C6.26261 5.83398 6.11423 5.89544 6.00484 6.00484C5.89544 6.11424 5.83398 6.26261 5.83398 6.41732C5.83398 6.57203 5.89544 6.7204 6.00484 6.8298C6.11423 6.93919 6.26261 7.00065 6.41732 7.00065H7.00065V10.5007C7.00065 10.6554 7.06211 10.8037 7.1715 10.9131C7.2809 11.0225 7.42927 11.084 7.58398 11.084C7.73869 11.084 7.88706 11.0225 7.99646 10.9131C8.10585 10.8037 8.16731 10.6554 8.16731 10.5007V7.00065C8.16731 6.69123 8.0444 6.39449 7.8256 6.17569C7.60681 5.9569 7.31007 5.83398 7.00065 5.83398Z" fill="#C0C0C0" />
                                    <path d="M7 4.66602C7.48325 4.66602 7.875 4.27427 7.875 3.79102C7.875 3.30777 7.48325 2.91602 7 2.91602C6.51675 2.91602 6.125 3.30777 6.125 3.79102C6.125 4.27427 6.51675 4.66602 7 4.66602Z" fill="#C0C0C0" /> </g>
                                <defs>
                                    <clipPath id="clip0_7038_5115">
                                        <rect width="14" height="14" fill="white" /> </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h4 className="font-avenirMedium text-lg sm:text-xl xl:text-2xl text-brandGray5x"><span className="print-walletcurrency">{transactionCurrency} </span> <span className="print-totalinflow">{new Intl.NumberFormat('en', {maximumFractionDigits:2, minimumFractionDigits:2}).format(transactionStats.transaction_total_revenue)}</span></h4> 
                    </div>
                    <div className="w-full flex flex-col lg:h-auto px-4 lg:p-0 py-4 gap-2">
                        <div className="flex flex-row gap-4 items-center">
                            <h3 className="text-brandGray5x font-avenirMedium">Total Expenses</h3>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_7038_5115)">
                                    <path d="M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.003033 5.6003 -0.13559 7.00777 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C13.998 5.1441 13.2599 3.36479 11.9475 2.05247C10.6352 0.74015 8.8559 0.0020073 7 0V0ZM7 12.8333C5.84628 12.8333 4.71846 12.4912 3.75918 11.8502C2.79989 11.2093 2.05222 10.2982 1.61071 9.23232C1.16919 8.16642 1.05368 6.99353 1.27876 5.86197C1.50384 4.73042 2.05941 3.69102 2.87521 2.87521C3.69102 2.0594 4.73042 1.50383 5.86198 1.27875C6.99353 1.05367 8.16642 1.16919 9.23232 1.6107C10.2982 2.05221 11.2093 2.79989 11.8502 3.75917C12.4912 4.71846 12.8333 5.84628 12.8333 7C12.8316 8.54658 12.2165 10.0293 11.1229 11.1229C10.0293 12.2165 8.54658 12.8316 7 12.8333Z" fill="#C0C0C0" />
                                    <path d="M7.00065 5.83398H6.41732C6.26261 5.83398 6.11423 5.89544 6.00484 6.00484C5.89544 6.11424 5.83398 6.26261 5.83398 6.41732C5.83398 6.57203 5.89544 6.7204 6.00484 6.8298C6.11423 6.93919 6.26261 7.00065 6.41732 7.00065H7.00065V10.5007C7.00065 10.6554 7.06211 10.8037 7.1715 10.9131C7.2809 11.0225 7.42927 11.084 7.58398 11.084C7.73869 11.084 7.88706 11.0225 7.99646 10.9131C8.10585 10.8037 8.16731 10.6554 8.16731 10.5007V7.00065C8.16731 6.69123 8.0444 6.39449 7.8256 6.17569C7.60681 5.9569 7.31007 5.83398 7.00065 5.83398Z" fill="#C0C0C0" />
                                    <path d="M7 4.66602C7.48325 4.66602 7.875 4.27427 7.875 3.79102C7.875 3.30777 7.48325 2.91602 7 2.91602C6.51675 2.91602 6.125 3.30777 6.125 3.79102C6.125 4.27427 6.51675 4.66602 7 4.66602Z" fill="#C0C0C0" /> </g>
                                <defs>
                                    <clipPath id="clip0_7038_5115">
                                        <rect width="14" height="14" fill="white" /> </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h3 className="font-avenirMedium text-lg sm:text-xl xl:text-2xl text-brandGray5x"><span className="print-walletcurrency">{transactionCurrency} </span> <span className="print-totaloutflow">{new Intl.NumberFormat('en', {maximumFractionDigits:2, minimumFractionDigits:2}).format(transactionStats.transaction_total_expenses)}</span></h3> 
                    </div>
                    <div className="w-full flex flex-col lg:h-auto px-4 lg:p-0 py-4 gap-2">
                        <div className="flex flex-row gap-4 items-center">
                            <h3 className="text-brandGray5x font-avenirMedium">Escrow Wallet</h3>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_7038_5115)">
                                    <path d="M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.003033 5.6003 -0.13559 7.00777 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C13.998 5.1441 13.2599 3.36479 11.9475 2.05247C10.6352 0.74015 8.8559 0.0020073 7 0V0ZM7 12.8333C5.84628 12.8333 4.71846 12.4912 3.75918 11.8502C2.79989 11.2093 2.05222 10.2982 1.61071 9.23232C1.16919 8.16642 1.05368 6.99353 1.27876 5.86197C1.50384 4.73042 2.05941 3.69102 2.87521 2.87521C3.69102 2.0594 4.73042 1.50383 5.86198 1.27875C6.99353 1.05367 8.16642 1.16919 9.23232 1.6107C10.2982 2.05221 11.2093 2.79989 11.8502 3.75917C12.4912 4.71846 12.8333 5.84628 12.8333 7C12.8316 8.54658 12.2165 10.0293 11.1229 11.1229C10.0293 12.2165 8.54658 12.8316 7 12.8333Z" fill="#C0C0C0" />
                                    <path d="M7.00065 5.83398H6.41732C6.26261 5.83398 6.11423 5.89544 6.00484 6.00484C5.89544 6.11424 5.83398 6.26261 5.83398 6.41732C5.83398 6.57203 5.89544 6.7204 6.00484 6.8298C6.11423 6.93919 6.26261 7.00065 6.41732 7.00065H7.00065V10.5007C7.00065 10.6554 7.06211 10.8037 7.1715 10.9131C7.2809 11.0225 7.42927 11.084 7.58398 11.084C7.73869 11.084 7.88706 11.0225 7.99646 10.9131C8.10585 10.8037 8.16731 10.6554 8.16731 10.5007V7.00065C8.16731 6.69123 8.0444 6.39449 7.8256 6.17569C7.60681 5.9569 7.31007 5.83398 7.00065 5.83398Z" fill="#C0C0C0" />
                                    <path d="M7 4.66602C7.48325 4.66602 7.875 4.27427 7.875 3.79102C7.875 3.30777 7.48325 2.91602 7 2.91602C6.51675 2.91602 6.125 3.30777 6.125 3.79102C6.125 4.27427 6.51675 4.66602 7 4.66602Z" fill="#C0C0C0" /> </g>
                                <defs>
                                    <clipPath id="clip0_7038_5115">
                                        <rect width="14" height="14" fill="white" /> </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <h3 className="font-avenirMedium text-lg sm:text-xl xl:text-2xl text-brandGray5x"><span className="print-walletcurrency">{transactionCurrency} </span> <span className="print-totaloutflow">{new Intl.NumberFormat('en', {maximumFractionDigits:2, minimumFractionDigits:2}).format(transactionStats.transaction_escrow_balance)}</span></h3> 
                    </div>
                    <div className='pt-2'>
                        <NavLink to="/wallet" className="flex items-center justify-end w-full gap-3 text-sm md:text-base font-avenirHeavy text-brandGray6x">
                            See all balance
                            <svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15.7423" cy="15" r="15" fill="#182CD1"/>
                                <g opacity="0.4">
                                <path d="M17.7673 9.94165L22.8257 15L17.7673 20.0583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path opacity="0.4" d="M8.659 15H22.684" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                            </svg>
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* transaction history */}
            <div className='py-10'>
                <TransactionHistory mutate={()=>transactionDataFetched.mutate()} transactionHistoryData={historyFetchStatus ? transactionDataFetched.data.data.data : []} />
            </div>
        </div>
    </TemplatePage>
  )
}

export default OldUser