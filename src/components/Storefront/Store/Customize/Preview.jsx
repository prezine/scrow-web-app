import React from 'react'

const Preview = ({store, color, width}) => {

    const arrayOfNums = Array.from({length: 4}, (_, i) => i)

  return (
    <div className={`text-center text-white ${width ? width : 'w-full'}`}>
        <div className={`px-10 pt-20 pb-16 rounded-t-twenty transition-colors h-full ease-in-out duration-300 w-full`} style={{backgroundColor:color}}>
            <div className=''>
                <h2 className={`font-avenirBlack text-3xl capitalize`}>{store}</h2>
                <p className='text-lg pt-2'>Welcome to <span className='capitalize'>{store}</span> Storefront</p>
            </div>
            <div className={`pt-9 grid grid-cols-2 gap-5`}>
                {arrayOfNums.map((num)=>{
                    return <div key={num} className='h-28 lg:h-40 w-full bg-white rounded-fifteen flex flex-col gap-2 justify-end p-5'>
                        <div className='h-2.5 w-ninetyFivePercent skeleton rounded-forty'></div>
                        <div className='h-2.5 w-sixtyPercent skeleton rounded-forty'></div>
                    </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default Preview