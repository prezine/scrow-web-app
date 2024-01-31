import {useMemo, useState} from 'react'
import $ from 'jquery'

const useSearchTables = (query, search) => {
  const [searchQuery, setSearchQuery] = useState(query)

  const handleSearch = (e) =>{
    setSearchQuery(e.target.value)
  }

  const handleBlur = () => {
    if(query === ''){
      // setRows(8)
    }
  }

  useMemo(() => {
    return $('.'+search).filter(function(){
        $(this).toggle($(this).text().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
    })
}, [searchQuery])

return {handleSearch, handleBlur, searchQuery}

}

export default useSearchTables