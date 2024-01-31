import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from 'axios'
import useSWR from 'swr'
import useRequestHeaders from '../../../../../utils/useRequestHeaders';
import useUser from '../../../../../hooks/stores/useUser';

const ModalPicSwiper = ({setCurrentPic, currentPic, gender, picsFetched, setPicsFetched, openPicSwiper, setOpenPicSwiper, defaultPic}) => {

    const {requestHeaders}  = useRequestHeaders()


    // console.log('hello');

    const swiperRef = useRef()


    const fetcher = async (url) => axios.get(url, requestHeaders)


    const picData = useSWR(`${import.meta.env.VITE_BASEURL}/user/dp?gender=${gender}`, fetcher, {
        onSuccess: (data) => {
            console.log('pics', data.data.status)
            if(data.status == 200 && data.data.status == true && data.data.data){
                setPicsFetched(true)
            }else if(data.data.status == true && data.data.data && data.data.data.length == 0){
                setPicsFetched(false)
            }
        },
        onError: (err) => {
            console.log(err);
            setPicsFetched(false)
        }
    })

    const handlePicChange = (e) => {
        setCurrentPic(e.target.value)
    }

  return (
    <div className={`z-30`}>
       {picsFetched 
       ?
       <div className={`px-10 relative`}>
           <Swiper
            slidesPerView={"auto"}
            spaceBetween={16}
            breakpoints={{
                // when window width is >= 320px
                320: {
                  spaceBetween: 10
                },
                // when window width is >= 480px
                480: {
                  spaceBetween: 12
                },
                // when window width is >= 640px
                640: {
                  spaceBetween: 16
                },
                720: {
                  spaceBetween: 20
                },
            }}
            className="h-full w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7"
            id={'always-be-swipin'}
            onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
            }}
        >
        
        {picData.data && picData.data.data.data.map((pic, idx)=>{
            return <SwiperSlide key={idx} className={`w-fit`}>
                <div className='flex first:px-0 md:px-8 last:pl-0'>
                    <label htmlFor={`user_dp${idx+1}`} className={`cursor-pointer rounded-[25px] aspect-square h-20 w-20 p-0.5 flex items-center justify-center ${currentPic ? pic.img_src == currentPic ? 'bg-brandGreen1x' : 'bg-transparent' : pic.img_src == defaultPic ? 'bg-brandGreen1x' : 'bg-transparent' }`}>
                        <div className='rounded-twenty object-cover z-30 h-full w-full flex'>
                            <img src={pic.img_src} alt="Avatar" className='h-full w-full rounded-twenty aspect-square min-w-full object-cover' />
                        </div>
                        <input type="checkbox" className='hidden' name='user_dp' id={`user_dp${idx+1}`} value={pic.img_src} onChange={handlePicChange} />
                    </label>
                </div>
            </SwiperSlide>
        })}

            </Swiper>

            <button onClick={() => swiperRef.current?.slidePrev()} type={'button'} title='Scroll left' className='absolute left-0 top-fiftyPercent -translate-y-fiftyPercent'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button onClick={() => swiperRef.current?.slideNext()} type={'button'} title='Scroll right' className='absolute right-0 top-fiftyPercent -translate-y-fiftyPercent'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
       </div>
        :
        <div className='rounded-twenty object-cover z-30 h-20 w-20'>
            <img src={currentPic ? currentPic : defaultPic} alt="Avatar" className='h-full w-full min-w-20 aspect-square object-cover rounded-twenty' />
        </div> 
       }
    </div>
  )
}

export default ModalPicSwiper