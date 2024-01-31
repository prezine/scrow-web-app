import React from 'react'

const LoadMore = ({moreRows, rows_per_view, rows, listLength}) => {

  return (
    <div className='w-full pt-5 flex justify-center'>
        <button onClick={()=>moreRows(rows_per_view)} disabled={rows >= listLength} type='button' className={`mx-auto w-fit font-avenirMedium text-sm text-brandDarkViolet1x disabled:text-brandGray11x ${rows < listLength ? 'cursor-pointer' : 'cursor-not-allowed'}`} title={`${rows < listLength ? 'show more rows' : 'no more rows'}`}>
            Load more
        </button>
    </div>
  )
}

export default LoadMore