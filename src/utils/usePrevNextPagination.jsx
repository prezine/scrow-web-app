import React, { useEffect, useState } from 'react'

const usePrevNextPagination = (data, noOfRows, topOfDisplayedDataId) => {

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

      const handleScroll = (anchor_id) => {
            const element = document.getElementById(anchor_id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
      };

      let templates = []
      for (let i = 0; i < rows; i++) {
        templates.push(i)
      }
    
      const paginate = (page) =>{
        setLoading(true)
        setCurrentPage(page)
        handleScroll(topOfDisplayedDataId)
        // jumpTo(topOfDisplayedDataId)
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }
    
      const start = (currentPage - 1) * rows 
      const end = start + rows
      const displayedData = data.slice(start, end)
    
    

    



    
  return {currentPage, templates, loading, rows, totalPages, dottedArray, movePageBy, paginate, displayedData}
}

export default usePrevNextPagination