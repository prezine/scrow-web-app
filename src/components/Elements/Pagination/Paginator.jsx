import React from 'react'

const Paginator = ({id, currentPage, totalPages, dottedArray, movePageBy, paginate, btnSize, arrowSize, arrowBtnSize}) => {
  return (
    <div id={id} className={`flex flex-row flex-wrap gap-2 items-center justify-center lg:justify-end`}>
        <button title={`${currentPage == 1 ? 'You\'re on the First Page' : `Go To Page ${currentPage - 1} of ${totalPages}`}`} onClick={()=>currentPage == 1 ? null : movePageBy(-1)} className={`${currentPage == 1 ? 'bg-brandGray20x/50 cursor-not-allowed' : 'bg-white border-2 border-brandGray26x cursor-pointer'} ${arrowBtnSize || 'py-2.5 px-2 sm:py-4 sm:px-4 md:px-5'} rounded-six`} type='button'>
            <svg className={`${arrowSize}`} width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.24 2.115L4.36999 9L11.24 15.885L9.12499 18L0.12499 9L9.12499 0L11.24 2.115Z" fill="#E9E9E9"/>
            </svg>
        </button>
            
            {dottedArray.map((page, index)=>{
            return <button  key={index} type='button' title={`${page !== '...' && page == currentPage ? 'You\'re on page '+ page : 'Go To Page ' + page}`} onClick={()=>{page !== '...' && paginate(page)}} className={`${btnSize || 'px-2 sm:px-4 md:px-5'} bg-white rounded-six self-stretch text-sm sm:text-base md:text-xl ${currentPage == page ? 'border-brandDarkViolet1x' : 'border-brandGray26x'} border-1.5`} ><span>{page}</span></button>
            })}

        <button title={`${currentPage == totalPages ? 'You\'re on the last page' : `Go To Page ${currentPage + 1} of ${totalPages}`}`} onClick={()=>currentPage == totalPages ? null : movePageBy(+1)} className={`${currentPage == totalPages ? 'bg-brandGray20x/50 cursor-not-allowed' : 'bg-white border-2 border-brandGray26x cursor-pointer'} ${arrowBtnSize || 'py-2.5 px-2 sm:py-4 sm:px-4 md:px-5'} rounded-six`} type='button'>
            <svg className={`${arrowSize}`} width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.76001 2.115L7.63001 9L0.76001 15.885L2.87501 18L11.875 9L2.87501 0L0.76001 2.115Z" fill="#E9E9E9"/>
            </svg>
        </button>
    </div>
  )
}

export default Paginator