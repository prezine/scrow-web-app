import React from 'react'

const InvalidURL = ({title}) => {

  const handleClose = () => {
    window.open("about:blank", "_self")
    window.close()
  }

  return (
    <div className={`bg-black/70 text-center backdrop-blur-sm min-h-screen flex px-4 sm:px-8 md:px-10 py-10 fixed top-0 left-0 z-50 w-full `}>
        <div className='max-w-lg mx-auto py-40 my-auto flex flex-col items-center h-full w-full'>
            <svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.34" d="M50.5 37.5V58.3333" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M50.5 89.209H25.25C10.7917 89.209 4.75 78.8756 11.75 66.2506L24.75 42.834L37 20.834C44.4167 7.45898 56.5833 7.45898 64 20.834L76.25 42.8757L89.25 66.2923C96.25 78.9173 90.1667 89.2506 75.75 89.2506H50.5V89.209Z" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.34" d="M50.4771 70.834H50.5145" stroke="#D95126" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='text-white pt-8 pb-5 text-xl font-avenirBlack'>Invalid {title || 'PayMe'} URL</p>
            <p className={`text-white`}>The URL "{window.location.href}" is invalid, be sure it's correct and try again</p>
            <div className='py-5'>
                <button type='button' onClick={handleClose} className='text-white border-2 border-white py-2 px-4 rounded-fifty'>Close tab</button>
            </div>
        </div>
    </div>
  )
}

export default InvalidURL