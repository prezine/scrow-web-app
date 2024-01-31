import React, { useState } from 'react'

const PlanCard = ({data, handleSubscription}) => {
    const [isDropOpen, setIsDropOpen] = useState([]);
    

    const toggleDrop = (idx) => {
        setIsDropOpen((prevIsDropOpen) => {
        const newIsDropOpen = [...prevIsDropOpen];
        newIsDropOpen[idx] = !newIsDropOpen[idx];
        return newIsDropOpen;
        });
    };

    return <div>
        {data.map((plan, idx)=>{
            return <div key={idx} className={`${idx == 0 ? 'pt-0' : 'pt-10'}`}>
                <div className={`rounded-twenty border-2 border-brandGray16x p-8`}>
                    <div className={`flex flex-col lg:flex-row lg:items-center gap-10 justify-between ${(isDropOpen[idx] !== undefined ? isDropOpen[idx] : plan.isDropped) ? 'pb-8' : 'pb-0'}`}>
                        <div className={`pb-1`}>
                            <div className={`font-avenirHeavy sm:text-lg flex flex-col pb-2 md:flex-row md:items-center gap-1.5`}>
                                <div className={`flex items-center gap-1.5`}>
                                    <p>{plan.name}</p> 
                                    <div className='h-2 w-2 rounded-full bg-black'></div>
                                    <p>{plan.price.toString().toLowerCase() == 'free' ? plan.price : `NGN ${new Intl.NumberFormat('en', { notation: 'standard' }).format(plan.price)}`}</p>
                                </div>
                                {plan.isPerMonth && <p className='self-end md:self-auto bg-brandGray2x text-xs w-fit text-brandGray11x px-3 py-1 rounded-forty font-avenirRegular'>Monthly</p>}    
                            </div>
                            <p className='text-sm text-brandGray11x'>{plan.description}</p>
                        </div>
        
                        <div className='self-end flex items-center gap-3'>
                            {plan.isSubscribed ?
                            <p className='px-3.5 text-sm py-1 text-brandGreen4x bg-brandLightGreen4x rounded-fifty capitalize w-fit'>CURRENT PLAN</p>
                            :
                            <button type='button' onClick={()=>handleSubscription(plan.id)} className={`bg-brandDarkViolet1x rounded-fifty px-5 py-2.5 text-white text-sm`}>Upgrade</button>}
                            <button type='button' id={`dropFeaturesBtn${idx}`} onClick={()=>{(plan.features && plan.features.length > 0) && toggleDrop(idx)}} className={`features--drop--btn`} aria-label={'Drop down'}>
                                <svg className={`${(isDropOpen[idx] !== undefined ? isDropOpen[idx] : plan.isDropped) ? 'rotate-180' : 'rotate-0'} transition-all duration-500 ease-linear`} width="31" height="32" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="15.5" cy="16" r="15.5" fill="#D9D9D9"/>
                                    <path d="M20.0465 14.249L16.3035 17.992C15.8615 18.434 15.1381 18.434 14.6961 17.992L10.9531 14.249" stroke="#292D32" stroke-width="1.29167" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div id={`dropFeature${idx}`} className={`features--drop ${(isDropOpen[idx] !== undefined ? isDropOpen[idx] : plan.isDropped) ?  'grid visible unclip--path border-t-0.5 border-t-brandGray2x  py-8' : 'clip--path invisible'} transition-all ease-in-out duration-500 sm:grid-cols-2 lg:grid-cols-3 gap-7`}>
                        {plan.features && plan.features.length > 0 && plan.features.map((feature, i)=>{
                            return <div key={i} className={`flex items-start gap-4`}>
                                <div>
                                    <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="1" width="29" height="29" rx="14.5" fill="#3DDC84"/>
                                        <g clip-path="url(#clip0_16055_32030)">
                                        <path d="M19.2998 12.3463L13.5418 18.1038C13.5031 18.1426 13.4571 18.1735 13.4065 18.1945C13.3558 18.2155 13.3015 18.2264 13.2466 18.2264C13.1918 18.2264 13.1375 18.2155 13.0868 18.1945C13.0361 18.1735 12.9901 18.1426 12.9514 18.1038L10.7248 15.875C10.686 15.8361 10.64 15.8053 10.5894 15.7843C10.5387 15.7632 10.4844 15.7524 10.4295 15.7524C10.3747 15.7524 10.3204 15.7632 10.2697 15.7843C10.2191 15.8053 10.1731 15.8361 10.1343 15.875C10.0955 15.9137 10.0646 15.9597 10.0436 16.0104C10.0226 16.061 10.0117 16.1154 10.0117 16.1702C10.0117 16.2251 10.0226 16.2794 10.0436 16.33C10.0646 16.3807 10.0955 16.4267 10.1343 16.4654L12.3618 18.6925C12.5968 18.927 12.9153 19.0588 13.2473 19.0588C13.5793 19.0588 13.8977 18.927 14.1327 18.6925L19.8902 12.9363C19.929 12.8975 19.9598 12.8516 19.9808 12.8009C20.0018 12.7503 20.0126 12.6961 20.0126 12.6413C20.0126 12.5864 20.0018 12.5322 19.9808 12.4816C19.9598 12.4309 19.929 12.385 19.8902 12.3463C19.8515 12.3074 19.8055 12.2765 19.7548 12.2555C19.7041 12.2345 19.6498 12.2236 19.595 12.2236C19.5401 12.2236 19.4858 12.2345 19.4351 12.2555C19.3845 12.2765 19.3385 12.3074 19.2998 12.3463Z" fill="white"/>
                                        </g>
                                        <rect x="0.5" y="1" width="29" height="29" rx="14.5" stroke="#22B94D"/>
                                        <defs>
                                        <clipPath id="clip0_16055_32030">
                                        <rect width="10" height="10" fill="white" transform="translate(10 10.5)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div>
                                    <p className='pb-1 text-sm'>{feature.name}</p>
                                    <p className='text-brandGray12x text-xs'>{feature.description}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        })}
    </div>
}

export default PlanCard