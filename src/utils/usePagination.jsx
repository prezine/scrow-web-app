import React, { useEffect, useState } from 'react'

const usePagination = (data, noOfRows, topOfDisplayedDataId) => {

    const [listingsLength, setListingsLength] = useState(data.length)
    const [currentPage, setCurrentPage] = useState(1)
    const [rows, setRows] = useState(noOfRows)
    const [dottedArray, setDottedArray] = useState([])
    const [loading, setLoading] = useState(false)
    let totalPages = Math.ceil(listingsLength/rows)

    const movePageBy = (n) =>{
      paginate(currentPage + n)
    }
    
    
      const jumpTo = (anchor_id) => {
        var url = window.location.href;               //Saving URL without hash.
        window.location.href = "#"+anchor_id;                 //Navigate to the target element.
        window.history.replaceState(null,null,url);   //method modifies the current history entry.
      }

      let templates = []
      for (let i = 0; i < rows; i++) {
        templates.push(i)
      }
    
      const paginate = (page) =>{
        setLoading(true)
        setTimeout(() => {
            setCurrentPage(page)
            setLoading(false)
        }, 1000);
        jumpTo(topOfDisplayedDataId)
    }
    
      const start = (currentPage - 1) * rows 
      const end = start + rows
      const displayedData = data.slice(start, end)
    
      let pages = []
    
      for (let i = 1; i < (Math.ceil(listingsLength/rows)+1); i++) {
        pages.push(i)
      }
    
      useEffect(() => {
        let tempArrayOfPages = [...pages]
        if (pages.length <= 5){
          tempArrayOfPages = [...pages]
        }else if (currentPage >= 1 && currentPage <= 2 && pages.length > 5){
          tempArrayOfPages = [1, 2, '...', pages.length - 1, pages.length]
        }
        else if(currentPage === 3){
          const sliced = pages.slice(0, 3)
          tempArrayOfPages = [...sliced, '...', pages.length - 1, pages.length]
        }
        else if(currentPage > 3 && currentPage < pages.length - 2){
          const sliced1 = pages.slice(currentPage - 2, currentPage) 
          const sliced2 = pages.slice(currentPage, currentPage + 1)
          tempArrayOfPages = [1, '...', ...sliced1, ...sliced2, '...', pages.length ] 
        }else if (currentPage > pages.length - 3){
          const sliced = pages.slice(pages.length - 3)
          tempArrayOfPages = [1, 2, '...', ...sliced]
        }
    
        setDottedArray(tempArrayOfPages)
    
      }, [currentPage])


    
  return {currentPage, templates, loading, rows, totalPages, dottedArray, movePageBy, paginate, displayedData}
}

export default usePagination