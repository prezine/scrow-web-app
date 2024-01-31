import React, { useState } from 'react'
// import TransactionVolumeCards from '../Elements/Cards/TransactionVolumeCards'
import ModalWrap from '../Elements/Modal/ModalWrap'
import FundService from './WalletAside/Modals/FundService'

const HeroWallet = ({walletCurrency, isAccount, walletStats, mutate, accountDataIsFetched, accountDataFetched, virtualAccount, openAlert, setOpenAlert, alertValues, setAlertValues}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const walletTransactionData = [
        {
            id:"wallet_total_balance",
            title:"balance",
            amount:"34,000,000",
            icon:<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="10" fill="#F3FCF7"/>
            <path d="M21.0001 29.3333C25.6025 29.3333 29.3334 25.6023 29.3334 21C29.3334 16.3976 25.6025 12.6666 21.0001 12.6666C16.3977 12.6666 12.6667 16.3976 12.6667 21C12.6667 25.6023 16.3977 29.3333 21.0001 29.3333Z" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <g opacity="0.4">
            <path d="M21 18.0834V23.0834" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 21.4167L21 23.9167L23.5 21.4167" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            </svg>,
        },
        {
            id:"wallet_total_inflow",
            title:"inflow",
            amount:"2,503,910",
            icon:<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="10" fill="#FCF3F3"/>
            <path d="M21.0001 29.3333C25.6025 29.3333 29.3334 25.6023 29.3334 21C29.3334 16.3976 25.6025 12.6666 21.0001 12.6666C16.3977 12.6666 12.6667 16.3976 12.6667 21C12.6667 25.6023 16.3977 29.3333 21.0001 29.3333Z" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <g opacity="0.4">
            <path d="M21 23.9167V18.9167" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 20.5834L21 18.0834L23.5 20.5834" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            </svg>,
        },
        {
            id:"wallet_total_outflow",
            title:"outflow",
            amount:"2,503,910",
            icon:<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="10" fill="#182CD1" fill-opacity="0.1"/>
            <g opacity="0.4">
            <path d="M18.2266 22.9416C18.2266 24.0166 19.0516 24.8832 20.0766 24.8832H22.1682C23.0599 24.8832 23.7849 24.1249 23.7849 23.1916C23.7849 22.1749 23.3432 21.8166 22.6849 21.5832L19.3266 20.4166C18.6682 20.1832 18.2266 19.8249 18.2266 18.8082C18.2266 17.8749 18.9516 17.1166 19.8432 17.1166H21.9349C22.9599 17.1166 23.7849 17.9832 23.7849 19.0582" stroke="#2A2AB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 16V26" stroke="#2A2AB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <path d="M21.0001 29.3333C25.6025 29.3333 29.3334 25.6023 29.3334 21C29.3334 16.3976 25.6025 12.6666 21.0001 12.6666C16.3977 12.6666 12.6667 16.3976 12.6667 21C12.6667 25.6023 16.3977 29.3333 21.0001 29.3333Z" stroke="#2A2AB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>,
        },
    ]

  return (
    <div className='py-10'>
        <div className='grid lg:flex flex-row items-center grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-0 border-b-0.5 border-b-brandGray2x'>
            {walletTransactionData.map((data, idx)=>{
                return <div key={idx} className={`${idx == 0 ? 'col-span-1 sm:col-span-2 lg:w-fortyPercent' : 'col-span-1 lg:w-thirtyPercent lg:px-5'} ${idx == 1 && 'sm:border-r-0.5 border-r-brandGray2x lg:border-x-0.5 lg:border-x-brandGray2x col-span-1 lg:w-thirtyPercent'} py-5`}>
                    <div className={`${idx == 0 && 'flex gap-10 items-start justify-between pr-4'}`}>
                        <div>
                            <div className='flex gap-2 items-center'>
                                <p className='capitalize text-sm text-brandGray11x'>{data.title}</p>
                                {idx == 0 ?
                                <button type='button' className={`active:animate-spin`} onClick={mutate}>
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M8.68572 3.46336C8.17822 3.31169 7.61822 3.21252 6.99988 3.21252C4.20572 3.21252 1.94238 5.47586 1.94238 8.27002C1.94238 11.07 4.20572 13.3334 6.99988 13.3334C9.79405 13.3334 12.0574 11.07 12.0574 8.27586C12.0574 7.23752 11.7424 6.26919 11.2057 5.46419" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9.40922 3.60329L7.72339 1.66663" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M9.40919 3.60339L7.44336 5.03839" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                :
                                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_15920_31849)">
                                    <path d="M6.40222 0.5C5.13598 0.5 3.89818 0.910543 2.84534 1.67971C1.7925 2.44888 0.971912 3.54213 0.487343 4.82122C0.00277399 6.1003 -0.124011 7.50777 0.12302 8.86563C0.370051 10.2235 0.979803 11.4708 1.87517 12.4497C2.77054 13.4287 3.9113 14.0954 5.15321 14.3655C6.39512 14.6356 7.68239 14.497 8.85225 13.9672C10.0221 13.4373 11.022 12.5401 11.7255 11.389C12.429 10.2378 12.8044 8.88447 12.8044 7.5C12.8026 5.6441 12.1275 3.86479 10.9272 2.55247C9.727 1.24015 8.09963 0.502007 6.40222 0.5V0.5ZM6.40222 13.3333C5.34702 13.3333 4.31552 12.9912 3.43815 12.3502C2.56079 11.7093 1.87696 10.7982 1.47316 9.73232C1.06935 8.66642 0.963695 7.49353 1.16955 6.36197C1.37541 5.23042 1.88354 4.19102 2.62968 3.37521C3.37582 2.5594 4.32646 2.00383 5.36138 1.77875C6.39631 1.55367 7.46903 1.66919 8.44391 2.1107C9.41879 2.55221 10.252 3.29989 10.8383 4.25917C11.4245 5.21846 11.7374 6.34628 11.7374 7.5C11.7359 9.04658 11.1733 10.5293 10.1731 11.6229C9.17285 12.7165 7.81673 13.3316 6.40222 13.3333Z" fill="#C0C0C0"/>
                                    <path d="M6.40224 6.3335H5.86872C5.72722 6.3335 5.59152 6.39495 5.49147 6.50435C5.39141 6.61375 5.33521 6.76212 5.33521 6.91683C5.33521 7.07154 5.39141 7.21991 5.49147 7.32931C5.59152 7.4387 5.72722 7.50016 5.86872 7.50016H6.40224V11.0002C6.40224 11.1549 6.45845 11.3032 6.5585 11.4126C6.65856 11.522 6.79426 11.5835 6.93576 11.5835C7.07725 11.5835 7.21296 11.522 7.31301 11.4126C7.41306 11.3032 7.46927 11.1549 7.46927 11.0002V7.50016C7.46927 7.19074 7.35685 6.894 7.15675 6.67521C6.95664 6.45641 6.68523 6.3335 6.40224 6.3335Z" fill="#C0C0C0"/>
                                    <path d="M6.40233 5.1665C6.84431 5.1665 7.20261 4.77475 7.20261 4.2915C7.20261 3.80825 6.84431 3.4165 6.40233 3.4165C5.96035 3.4165 5.60205 3.80825 5.60205 4.2915C5.60205 4.77475 5.96035 5.1665 6.40233 5.1665Z" fill="#C0C0C0"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_15920_31849">
                                    <rect width="12.8044" height="14" fill="white" transform="translate(0 0.5)"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                }
                            </div>
                            <div className='py-2'>
                                <p className='text-2xl font-avenirHeavy text-left'>{walletCurrency} {walletStats ? (walletStats[data.id] >= 0) ? new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(walletStats[data.id]) : 0 : 0}</p>
                            </div>
                        </div>
                        {idx == 0 &&
                            <div>
                                <button type='button' onClick={()=>setIsModalOpen(true)} className='font-avenirMedium text-brandDarkViolet1x text-xs'>+ ADD FUNDS</button>
                            </div>
                        }
                    </div>
                </div>
            })}
        </div>
        <ModalWrap key={'fundWalletModal'} id={'fundWalletModal'} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)} >
            <div className={`bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-sm h-fit`}>
                <FundService key={'fund'} isAccount={isAccount} accountDataFetched={accountDataFetched} dataIsFetched={accountDataIsFetched} virtualAccount={virtualAccount} mutate={mutate} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} openAlert={openAlert} />
            </div>
        </ModalWrap>
    </div>
  )
}

export default HeroWallet