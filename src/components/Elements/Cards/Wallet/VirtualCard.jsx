import React from 'react'

const VirtualCard = ({id, handleClick, paddingX, width, maxWidth, paddingY, spaceY, name, cardType, bgColor, textColor, expDate, borderRadius, cvv, cardProvider, cardProviderIcon, cardNumber}) => {
  return (
    <div onClick={handleClick} id={id} className={`cursor-pointer relative ${paddingX || 'px-9'} ${paddingY || 'py-6'} ${width || 'w-full'} ${maxWidth || 'mx-auto max-w-xs'} ${bgColor || 'bg-brandBlack2x'} ${textColor || 'text-white'} ${borderRadius || 'rounded-twenty'}`}>
        <div className={`${spaceY || 'space-y-9'} `}>
            <div className='flex items-center gap-10 justify-between'>
                <p className='text-sm font-avenirHeavy whitespace-nowrap text-ellipsis overflow-hidden'>{name || 'Example User'}</p>
                <div>
                    {cardProviderIcon 
                    ||
                    <svg width="63" height="20" viewBox="0 0 63 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7507 19.8442H10.2984L6.20988 4.32878C6.01582 3.61507 5.60378 2.98411 4.99768 2.68673C3.48508 1.93941 1.8183 1.34465 0 1.04468V0.447339H8.78316C9.99536 0.447339 10.9045 1.34465 11.056 2.38677L13.1774 13.5786L18.627 0.447339H23.9277L15.7507 19.8442ZM26.9582 19.8442H21.809L26.0491 0.447339H31.1983L26.9582 19.8442ZM37.8601 5.82087C38.0116 4.77617 38.9208 4.17882 39.9814 4.17882C41.6482 4.02884 43.4639 4.32881 44.9791 5.07355L45.8883 0.897309C44.373 0.299965 42.7062 0 41.1936 0C36.196 0 32.5594 2.68676 32.5594 6.41563C32.5594 9.25237 35.1353 10.7419 36.9536 11.6392C38.9208 12.5339 39.6784 13.1312 39.5269 14.026C39.5269 15.368 38.0116 15.9654 36.499 15.9654C34.6807 15.9654 32.8624 15.518 31.1983 14.7707L30.2891 18.9495C32.1074 19.6943 34.0746 19.9942 35.8929 19.9942C41.4967 20.1416 44.9791 17.4574 44.9791 13.4286C44.9791 8.35506 37.8601 8.05768 37.8601 5.82087ZM63 19.8442L58.9115 0.447339H54.5199C53.6107 0.447339 52.7016 1.04468 52.3985 1.93941L44.8276 19.8442H50.1283L51.1863 17.0101H57.6993L58.3054 19.8442H63ZM55.2775 5.67085L56.7901 12.9812H52.55L55.2775 5.67085Z" fill="white"/>
                    </svg>
                    }
                </div>
            </div>

            <div>
                <p className='space-x-4'><span>{cardNumber ? cardNumber.slice(0, 4) : '****'}</span>    <span>****</span>    <span>****</span>    <span>****</span></p>
            </div>

            <div className='flex items-center gap-10 justify-between text-brandGray10x'>
                <p className='text-sm'>{cardType || 'Credit'} Card</p>
                <p>
                    {expDate 
                    ||
                    '09/25'
                    }
                </p>
            </div>
        </div>
        <svg className='absolute top-fiftyPercent right-2 -translate-y-fiftyPercent' width="151" height="146" viewBox="0 0 151 146" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 22.5175C0 31.3786 5.11832 39.0442 12.5598 42.7193C7.90356 52.2125 5.28917 62.8889 5.28917 74.176C5.28917 111.856 34.4246 142.73 71.3958 145.5C71.39 145.48 71.3883 145.459 71.391 145.438C71.4881 144.661 71.4428 129.353 71.4117 121.244C60.8499 118.794 52.9789 109.325 52.9789 98.0178C52.9789 84.8502 63.6534 74.1757 76.821 74.1757C89.9886 74.1757 100.663 84.8502 100.663 98.0178C100.663 109.404 92.6816 118.926 82.0084 121.294C82.0395 129.416 82.0844 144.662 81.9875 145.438C81.9839 145.466 81.9729 145.494 81.9548 145.521C119.059 142.886 148.342 111.951 148.342 74.176C148.342 62.4302 145.511 51.3457 140.493 41.5677C146.807 37.5787 151 30.5378 151 22.5175C151 10.0814 140.919 0 128.482 0C120.464 0 113.424 4.19168 109.434 10.5035C99.6537 5.4829 88.5655 2.64966 76.8155 2.64966C64.258 2.64966 52.4564 5.88569 42.199 11.5693C38.3517 4.66793 30.9798 0 22.5175 0C10.0814 0 0 10.0814 0 22.5175Z" fill="white" fill-opacity="0.1"/>
        </svg>
    </div>
  )
}

export default VirtualCard