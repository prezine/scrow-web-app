import React, { useEffect, useState, useRef } from 'react'

const ModalWrap = ({id, children, modalState, handleModal, itemPosition, paddingY, overlayColor, hideOverflow}) => {
  const modalRef = useRef(null)
  const closerRef = useRef(null)
  const [height, setHeight] = useState(null)
  const prevScrollHeightRef = useRef(null);


  const updateHeight = () => {
    if (modalRef.current) {
      setHeight(modalRef.current.scrollHeight);
    }
  };

  useEffect(() => {
  
    updateHeight(); // Initial height update

    window.addEventListener('resize', updateHeight); // Update height on window resize
    if(modalRef.current){
      modalRef.current.addEventListener('resize', updateHeight)
    }
    

    return () => {
      window.removeEventListener('resize', updateHeight); // Cleanup event listener
      if(modalRef.current){
        modalRef.current.removeEventListener('resize', updateHeight)
      }
    };
  }, []);



  useEffect(() => {
    if (modalRef.current) {
      const currentScrollHeight = modalRef.current.scrollHeight;
  
      if (prevScrollHeightRef.current !== currentScrollHeight) {
        setHeight(currentScrollHeight);
      }
  
      // Update the prevScrollHeightRef value for the next render
      prevScrollHeightRef.current = currentScrollHeight;
    }
  }, [modalRef.current?.scrollHeight]);
  

  useEffect(() => {
    const body = document.querySelector('body');
    const scrollPosition = window.pageYOffset;
    if (modalState) {
      body.style.overflow = 'hidden';
      body.style.height = '100vh';
      setHeight(modalRef.current.scrollHeight);
    } else {
      body.style.overflow = 'hidden';
      body.style.height = '100vh';
    }
    window.scrollTo(0, scrollPosition);
  }, [modalState]);

  

    
  return (
    <div ref={modalRef} id={id} className={`z-50 ${modalState ? 'flex' : 'hidden'} modal flex-col fixed top-0 col-span-12 left-0 w-full h-full max-h-screen xl:h-screen ${hideOverflow ? 'overflow-hidden' : 'overflow-y-auto'} ${paddingY ? paddingY : 'py-20'} backdrop-blur-sm ${overlayColor ? overlayColor : 'bg-black/30'} ${itemPosition ? itemPosition : 'items-center'} z-50`}>
        <div onClick={handleModal} ref={closerRef} style={{height:`${height}px`}} className='overlay cursor-pointer pop-up-closer w-full h-auto min-h-full z-20 fixed top-0 left-0 '></div>
        {/* {height} */}
        <div className='relative z-30'>
        {/* {(modalRef && modalRef.current) && modalRef.current.scrollHeight} */}
        </div>
        {children}
    </div>
  )
}

export default ModalWrap