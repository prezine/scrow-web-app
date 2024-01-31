import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import NoImage from '../../../../assets/media/no-product-image.png'



const ProductCard = ({id, name, amount, images, currency, handleClick}) => {

    const swiperRef = useRef(null)

  return (
    <div id={id} className='rounded-five'>
        <div className={`rounded-t-five py-5 px-5 bg-brandGray37x`}>
            {
                images && images.length > 0
                ?
                    <div className='w-seventyPercent aspect-square mx-auto rounded-five relative'>
                        {
                            images.length == 1
                            ?
                            <img src={images[0].imageURL !== 'false' ? images[0].imageURL : NoImage} alt={name} className={`skeleton rounded-five aspect-square object-cover w-full`} />
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
                                        return <SwiperSlide key={idx}><img src={image.imageURL !== 'false' ? image.imageURL : NoImage} alt={name} className={`skeleton rounded-five aspect-square object-cover w-full`} /></SwiperSlide>
                                    })
                                }
                                </Swiper>
                                
                                <button type='button' onClick={()=>swiperRef.current?.slidePrev()} className={`absolute top-fiftyPercent -translate-y-fiftyPercent -left-11`}>
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.62765 12.2161L5.66675 8.25516C5.19897 7.78739 5.19897 7.02194 5.66675 6.55416L9.62765 2.59326" stroke="#292D32" stroke-width="0.91125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button type='button' onClick={()=>swiperRef.current?.slideNext()} className={`absolute top-fiftyPercent -translate-y-fiftyPercent -right-11`}>
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.95557 12.2161L9.91647 8.25516C10.3842 7.78739 10.3842 7.02194 9.91647 6.55416L5.95557 2.59326" stroke="#292D32" stroke-width="0.91125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>

                            </>
                        }
                    </div>
                :
                    <div className='w-seventyPercent mx-auto aspect-square rounded-five skeleton'>
                        
                    </div>
            }
        </div>
        <div className='bg-white py-3.5 px-5 rounded-b-five'>
            <h2 className='text-sm font-avenirHeavy pb-1'>{name}</h2>
            <p className='text-xxs text-brandGray36x'>{currency || 'NGN'} {amount ? new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(amount) :"30,000"}</p>
            <div className="flex justify-end py-1">
                <button type='button' onClick={handleClick} className='font-avenirMedium border-2 border-brandGray2x text-sm px-2 py-1 rounded-fifty active:translate-y-1 w-fit hover:shadow-md transition-all duration-300 ease-in-out'>
                    Edit Product
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard