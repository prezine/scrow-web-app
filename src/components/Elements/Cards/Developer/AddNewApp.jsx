import React from 'react'

const AddNewApp = ({maxWidth, handleClick}) => {
  return (
    <button aria-label='Create a new store' onClick={handleClick} className={`rounded-twenty py-6 px-5 col-span-1 border-2 border-brandGray31x bg-brandGray28x ${maxWidth}`}>
        <div className='h-18'>
            <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25.5" r="25" fill="#182CD1"/>
                <path opacity="0.4" d="M19 25.5H31" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M25 31.5V19.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div className='flex flex-col justify-between'>
            <div className="pb-6">
                <h1 className='text-2xl font-avenirMedium text-brandGray29x text-left'>Create an app</h1>
            </div>
            <div className='flex items-center gap-4 w-full'>
                <div className='w-thirtyPercent bg-brandPeach1x h-7 rounded-five'></div>
                <div className='w-fiftyPercent bg-brandLightBlue3x h-7 rounded-five'></div>
            </div>
        </div>
    </button>
  )
}

export default AddNewApp