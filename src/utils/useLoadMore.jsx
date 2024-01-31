import React, { useState } from 'react'

const useLoadMore = (data, noOfRows) => {
    const [rowsPerView, setRowsPerView]= useState(noOfRows || 5)
    const [rows, setRows] = useState(rowsPerView)
    
    const moreRows = (add) =>{
        setRows((prevRows) => prevRows + add)
    }
    let slicedDataRows = data ? data.slice(0, rows) : []

    return {slicedDataRows, rows, moreRows, rowsPerView, setRowsPerView}
}

export default useLoadMore