import React, { useState } from 'react'
import TransactionVolumeCards from '../Elements/Cards/TransactionVolumeCards'

const HeroTransaction = ({transactionStats, transactionCurrency}) => {

    const [revenue, setRevenue] = useState('34,000,000')
    const [expenses, setExpenses] = useState('2,503,910')
    const [escrow, setEscrow] = useState('2,503,910')

    const transactionData = [
        {
            id:"transaction_total_revenue",
            title:"revenue",
            amount:"34,000,000",
            icon:<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="10" fill="#F3FCF7"/>
            <path d="M21 29.3333C25.6023 29.3333 29.3333 25.6023 29.3333 21C29.3333 16.3976 25.6023 12.6666 21 12.6666C16.3976 12.6666 12.6666 16.3976 12.6666 21C12.6666 25.6023 16.3976 29.3333 21 29.3333Z" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <g opacity="0.4">
            <path d="M21 18.0834V23.0834" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 21.4167L21 23.9167L23.5 21.4167" stroke="#3BB75E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            </svg>            
        },
        {
            id:"transaction_total_expenses",
            title:"expenses",
            amount:"2,503,910",
            icon:<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="10" fill="#FCF3F3"/>
            <path d="M21 29.3333C25.6023 29.3333 29.3333 25.6023 29.3333 21C29.3333 16.3976 25.6023 12.6666 21 12.6666C16.3976 12.6666 12.6666 16.3976 12.6666 21C12.6666 25.6023 16.3976 29.3333 21 29.3333Z" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <g opacity="0.4">
            <path d="M21 23.9167V18.9167" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.5 20.5834L21 18.0834L23.5 20.5834" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            </svg>                       
        },
        {
            id:"transaction_escrow_balance",
            title:"escrow",
            amount:"2,503,910",
            icon:<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="10" fill="#182CD1" fill-opacity="0.1"/>
            <g opacity="0.4">
            <path d="M18.2266 22.9416C18.2266 24.0166 19.0516 24.8832 20.0766 24.8832H22.1682C23.0599 24.8832 23.7849 24.1249 23.7849 23.1916C23.7849 22.1749 23.3432 21.8166 22.6849 21.5832L19.3266 20.4166C18.6682 20.1832 18.2266 19.8249 18.2266 18.8082C18.2266 17.8749 18.9516 17.1166 19.8432 17.1166H21.9349C22.9599 17.1166 23.7849 17.9832 23.7849 19.0582" stroke="#2A2AB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 16V26" stroke="#2A2AB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <path d="M21 29.3333C25.6023 29.3333 29.3333 25.6023 29.3333 21C29.3333 16.3976 25.6023 12.6666 21 12.6666C16.3976 12.6666 12.6666 16.3976 12.6666 21C12.6666 25.6023 16.3976 29.3333 21 29.3333Z" stroke="#2A2AB3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>                                  
        }
    ]

  return (
    <div className='flex flex-col lg:flex-row gap-10 lg:gap-6 items-stretch rounded-ten py-5'>
        <div className='flex flex-col sm:grid lg:flex sm:grid-cols-2 lg:flex-row lg:w-full sm:items-center gap-10 lg:gap-6 '>
            {transactionData.map((data, idx)=>{
                return <TransactionVolumeCards width={'sm:w-full lg:w-1/3'} key={idx} title={data.title} icon={data.icon} amount={`${transactionStats ? (transactionStats[data.id] >= 0) ? transactionStats[data.id] == null ? 0 : new Intl.NumberFormat('en', {maximumFractionDigits : 2}).format(transactionStats[data.id]) : 0 : 0}`} />
            })}
        </div>
        
        {/* <div className='grid grid-cols-3 border-2 lg:w-fortyPercent bg-white rounded-ten border-brandGray2x'>
            <div className='p-5 flex flex-col gap-1.5 justify-between border-r-0.5 border-r-brandGray2x border-b-0.5 border-b-brandGray2x'>
            <p className='font-avenirMedium text-lg break-all'>0</p>
            <p className="text-brandGray23x text-xs">Fraud Block</p>
            </div>
            <div className='p-5 flex flex-col gap-1.5 justify-between border-r-0.5 border-r-brandGray2x border-b-0.5 border-b-brandGray2x'>
            <p className='font-avenirMedium text-lg break-all'>0</p>
            <p className="text-brandGray23x text-xs">Bank Error</p>
            </div>
            <div className='p-5 flex flex-col gap-1.5 justify-between border-b-0.5 border-b-brandGray2x'>
            <p className='font-avenirMedium text-lg break-all'>0</p>
            <p className="text-brandGray23x text-xs">Customer Error</p>
            </div>
            <div className='p-5 flex flex-col gap-1.5 justify-between border-r-0.5 border-r-brandGray2x '>
            <p className='font-avenirMedium text-lg break-all'>0</p>
            <p className="text-brandGray23x text-xs">Processing Errors</p>
            </div>
            <div className='p-5 flex flex-col gap-1.5 justify-between border-r-0.5 border-r-brandGray2x'>
            <p className='font-avenirMedium text-lg break-all text-brandGreen1x'>99 %</p>
            <p className="text-brandGray23x text-xs">Success rate</p>
            </div>
            <div className='p-5 flex flex-col gap-1.5 justify-between'>
            <p className='font-avenirMedium text-lg break-all text-brandRed1x'>1 %</p>
            <p className="text-brandGray23x text-xs">Failed rate</p>
            </div>
        </div> */}
    </div>
  )
}

export default HeroTransaction