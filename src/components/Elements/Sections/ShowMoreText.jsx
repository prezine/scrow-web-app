import React, { useEffect, useRef, useState } from 'react'

const ShowMoreText = ({title, description, handleModal, buttonText, modalState}) => {
  
    const modalRef = useRef(null)
    const [height, setHeight] = useState(null)


    useEffect(() => {
        const body = document.querySelector('body');
        const scrollPosition = window.pageYOffset;
        if (modalState) {
          body.style.overflow = 'hidden';
          body.style.height = '100vh';
          setHeight(modalRef.current.scrollHeight);
        } else {
          body.style.overflow = '';
          body.style.height = '';
        }
        window.scrollTo(0, scrollPosition);
      }, [modalState]);

  
    return (
    <div ref={modalRef} className={`bg-black/70 ${modalState ? 'flex' : 'hidden'} text-center backdrop-blur-sm w-full h-full max-h-screen lg:h-screen overflow-y-auto px-4 sm:px-8 md:px-10 py-10 fixed top-0 left-0 z-50 items-center`}>
        <div onClick={handleModal} style={{height:`${height}px`}} className='overlay cursor-pointer pop-up-closer w-full h-auto min-h-full z-20 fixed top-0 left-0 '></div>
        <div className='max-w-lg m-auto flex flex-col items-center w-full relative z-30'>
            <p className='text-white font-avenirHeavy text-2xl lg:text-3xl text-center pt-8 pb-5'>{title}</p>
            <p className={`text-white text-left`}>
                {
                    description.map((desc, idx)=>{
                        return <p key={idx} className={`first:pt-0 pt-5`}>{desc}</p>
                    })
                }
            </p>
            <div className='py-5'>
                <button type='button' onClick={handleModal} className='text-white border-2 border-white py-2 px-4 rounded-fifty'>{buttonText}</button>
            </div>
        </div>
    </div>
  )
}

export default ShowMoreText