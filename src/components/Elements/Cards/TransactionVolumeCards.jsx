import React from 'react'

const TransactionVolumeCards = ({icon, amount, title, currency, width}) => {
  return (
    <div className={`flex flex-col px-4 py-10 lg:py-4 gap-4 justify-center ${width ? width : 'sm:w-fiftyPercent'} bg-white border border-brandGray2x rounded-ten`}>
        <div className="flex flex-row gap-4 items-center relative group">
            {icon 
            ||
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="42" height="42" rx="10" fill="#182CD1" fill-opacity="0.1"/>
                <path d="M21 29.3333C25.6023 29.3333 29.3333 25.6023 29.3333 21C29.3333 16.3976 25.6023 12.6666 21 12.6666C16.3976 12.6666 12.6666 16.3976 12.6666 21C12.6666 25.6023 16.3976 29.3333 21 29.3333Z" stroke="#182CD1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <g opacity="0.4">
                <path d="M21 18.0834V23.0834" stroke="#182CD1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.5 21.4167L21 23.9167L23.5 21.4167" stroke="#182CD1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
            }
            <div className='relative'>
                <h3 className="text-brandGray11x text-sm font-avenirRegular">Total <span className='capitalize'>{title || 'Deposit'}</span></h3>
                <h4 className="font-avenirMedium text-lg sm:text-2xl text-black pl-3.5 relative one-lined-text"><span className="print-walletcurrency text-sm absolute left-0 top-0">{currency || '₦'}</span> <span className="print-totalinflow break-all">{amount || '34,000,000'}</span></h4> 
            </div>
            <div className='bg-brandGray12x drop-shadow-sm transition-all ease-in-out duration-300 invisible group-hover:visible py-2 px-4 rounded-ten absolute left-0 bottom-[150%] w-fit max-w-eightyPercent'>
                <p className='text-brandGray8x text-sm pb-2 xs:whitespace-normal whitespace-nowrap'>Your total {title || 'deposit'}:</p>
                <p className='text-brandGray11x text-lg'>{amount || '34,000,000'}</p>
            </div>
        </div>
    </div>
  )
}

export default TransactionVolumeCards