import React from 'react'

const PrevNextPagination = ({id, currentPage, totalPages, movePageBy, arrowSize, arrowBtnSize}) => {
  return (
    <div id={id} className={`flex flex-row flex-wrap gap-5 items-center justify-center lg:justify-end`}>
        <button title={`${currentPage == 1 ? 'You\'re on the First Page' : `Go To Page ${currentPage - 1} of ${totalPages}`}`} onClick={()=>currentPage == 1 ? null : movePageBy(-1)} className={`${currentPage == 1 ? 'bg-brandDarkViolet1x/50 cursor-not-allowed' : 'bg-brandDarkViolet1x cursor-pointer hover:gap-4 hover:pl-3 hover:md:pl-4'} transition-all duration-300 ease-in-out ${arrowBtnSize || 'py-2.5 px-4 md:px-5'} text-white flex items-center gap-3 rounded-fifty`} type='button'>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.1775 4.44727L2.625 8.99977L7.1775 13.5523" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.4" d="M15.3749 9H2.75244" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span><span className='xs:hidden'>Previous </span><span className='hidden sm:inline-block'>Products</span></span>
        </button>

        <button title={`${currentPage == totalPages ? 'You\'re on the last page' : `Go To Page ${currentPage + 1} of ${totalPages}`}`} onClick={()=>currentPage == totalPages ? null : movePageBy(+1)} className={`${currentPage == totalPages ? 'bg-brandDarkViolet1x/50 cursor-not-allowed' : 'bg-brandDarkViolet1x cursor-pointer hover:gap-4 hover:pr-3 hover:md:pr-4'} transition-all duration-300 ease-in-out ${arrowBtnSize || 'py-2.5 px-4 md:px-5'} text-white flex items-center gap-3 rounded-fifty`} type='button'>
            <span><span className='xs:hidden'>Next </span><span className='hidden sm:inline-block'>Products</span></span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8223 4.44727L15.3748 8.99977L10.8223 13.5523" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.4" d="M2.625 9H15.2475" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    </div>
  )
}

export default PrevNextPagination