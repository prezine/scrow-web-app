import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import NoImage from '../../../../assets/media/no-product-image.png'


const ProductCardRow = ({id, name, amount, images, currency, handleClick}) => {

    const swiperRef = useRef(null)

  return (
    <div id={id} className='rounded-ten drop-shadow-sm flex w-full bg-white py-2 px-3'>
        <div className={`flex items-center`}>
            {
                images && images.length > 0
                ?
                    <div className='w-24 aspect-square mx-auto rounded-ten relative'>
                        {
                            images.length == 1
                            ?
                            <img src={images[0].imageURL !== 'false'  ? images[0].imageURL : NoImage} alt={name} className={`skeleton rounded-ten aspect-square object-cover w-full`} />
                            :
                            <>
                                <Swiper
                                slidesPerView={1}
                                loop={true}
                                id={`${id}Swiper`}
                                onBeforeInit={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                >
                                {
                                    images && images.map((image, idx)=>{
                                        return <SwiperSlide key={idx}><img src={image.imageURL  !== 'false'  ? image.imageURL : NoImage} alt={name} className={`skeleton rounded-ten aspect-square object-cover w-full`} /></SwiperSlide>
                                    })
                                }
                                </Swiper>
                                
                                {/* <button type='button' onClick={()=>swiperRef.current?.slidePrev()} className={`absolute top-fiftyPercent -translate-y-fiftyPercent -left-11`}>
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.62765 12.2161L5.66675 8.25516C5.19897 7.78739 5.19897 7.02194 5.66675 6.55416L9.62765 2.59326" stroke="#292D32" stroke-width="0.91125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button type='button' onClick={()=>swiperRef.current?.slideNext()} className={`absolute top-fiftyPercent -translate-y-fiftyPercent -right-11`}>
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.95557 12.2161L9.91647 8.25516C10.3842 7.78739 10.3842 7.02194 9.91647 6.55416L5.95557 2.59326" stroke="#292D32" stroke-width="0.91125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button> */}

                            </>
                        }
                    </div>
                :
                    <div className='w-24 mx-auto aspect-square rounded-ten skeleton'>
                        
                    </div>
            }
        </div>
        <div className='py-1 pl-3 w-full flex flex-col justify-between'>
            <div>
                <h2 className='text-sm font-avenirHeavy pb-1'>{name}</h2>
                <p className='text-xxs text-brandGray36x'>{currency || 'NGN'} {amount ? new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(amount) :"30,000"}</p>
            </div>
            <div className={`${(images && images.length > 0 && images.length > 1) ? 'flex bxs:flex-col justify-between gap-10 bxs:pt-5 bxs:gap-5 xs:pt-5 xs:gap-5' : 'flex justify-end'}`}>
                {
                    images && images.length > 0 && images.length > 1
                    &&
                    <button type='button' onClick={()=>swiperRef.current?.slideNext()} className={`flex gap-0.5 items-center text-xs hover:gap-1 text-brandDarkViolet1x hover:underline-offset-2 w-fit hover:text-brandBlue2x transition-all duration-300 ease-in-out`}>
                        Next image
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.7124 8.3002L6.42907 5.58353C6.7499 5.2627 6.7499 4.7377 6.42907 4.41686L3.7124 1.7002" stroke="#2A2AB3" stroke-width="0.91125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                }
                <button type='button' onClick={handleClick} className='text-sm font-avenirHeavy px-2 self-end underline text-brandDarkViolet1x underline-offset-2 w-fit hover:text-brandBlue2x transition-all duration-300 ease-in-out'>
                    Edit Product
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductCardRow