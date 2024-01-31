import React from 'react'

const WalletLoader = () => {
  return (
    <div className='px-8 md:px-10'>
        <div className='h-60px border-b-0.5 border-b-brandGray2x'>
            <div className='flex gap-3 justify-end h-full items-center'>
                <div className='h-2 w-32 rounded-twenty skeleton'></div>
                <div className='h-10 w-20 rounded-fifty skeleton'></div>
            </div>
        </div>
        <div className='pb-10'>
            <div className='pt-5 pb-16 flex flex-col sm:flex-row gap-10 justify-between'>
            <div className='flex flex-col gap-3'>
                <div className='skeleton rounded-twenty h-8 w-28'></div>
                <div className='skeleton rounded-twenty h-4 w-fiftyPercent'></div>
            </div>
            <div className='self-end flex flex-row gap-3 items-center justify-end'>
                <div className='skeleton rounded-twenty h-8 w-28'></div>
                <div className='skeleton rounded-twenty h-8 w-28'></div>
            </div>
            </div>
            <div className='lg:h-40 w-full grid grid-cols-1 sm:grid-cols-2 lg:flex gap-5 lg:gap-0 border-b-0.5 border-b-brandGray2x'>
            <div className='col-span-1 pb-20 lg:pb-16 sm:col-span-2 lg:w-fortyPercent h-full lg:border-r-0.5 border-b-brandGray2x flex flex-row justify-between gap-10 items-start pr-2'>
                <div className='w-full'>
                <div className='flex items-center gap-2'>
                    <p className='h-2 w-12 rounded-ten skeleton'></p>
                    <p className='h-2 w-2 rounded-full skeleton'></p>
                </div>
                <div className='py-3 flex items-center gap-2 w-full'>
                    <div className='h-6 w-12 rounded-ten skeleton'></div>
                    <div className='h-6 w-sixtyPercent rounded-ten skeleton'></div>
                </div>
                </div>
                <div className='flex flex-row-reverse items-center gap-2'>
                <p className='h-2 w-12 rounded-ten skeleton'></p>
                <p className='h-2 w-2 rounded-full skeleton'></p>
                </div>
            </div>
            <div className='col-span-1 pb-20 lg:pb-16 lg:w-fortyPercent sm:px-5 h-full lg:border-r-0.5 border-b-brandGray2x flex flex-row justify-between gap-10 items-start pr-2'>
                <div className='w-full'>
                <div className='flex items-center gap-2'>
                    <p className='h-2 w-12 rounded-ten skeleton'></p>
                    <p className='h-2 w-2 rounded-full skeleton'></p>
                </div>
                <div className='py-3 flex items-center gap-2 w-full'>
                    <div className='h-6 w-12 rounded-ten skeleton'></div>
                    <div className='h-6 w-sixtyPercent rounded-ten skeleton'></div>
                </div>
                </div>
            </div>
            <div className='col-span-1 pb-20 lg:pb-16 lg:w-fortyPercent sm:px-5 h-full  flex flex-row justify-between gap-10 items-start pr-2'>
                <div className='w-full'>
                <div className='flex items-center gap-2'>
                    <p className='h-2 w-12 rounded-ten skeleton'></p>
                    <p className='h-2 w-2 rounded-full skeleton'></p>
                </div>
                <div className='py-3 flex items-center gap-2 w-full'>
                    <div className='h-6 w-12 rounded-ten skeleton'></div>
                    <div className='h-6 w-sixtyPercent rounded-ten skeleton'></div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default WalletLoader