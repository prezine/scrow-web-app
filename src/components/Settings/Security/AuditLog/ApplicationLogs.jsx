import React, {useState} from 'react'
import useSearchTables from '../../../../hooks/SearchTables'
import formatDateTimeMonthText from '../../../../utils/FormatDateTimeMonthText'
import useLoadMore from '../../../../utils/useLoadMore'
import LoadMore from '../../../Elements/Pagination/LoadMore'
import EmptyTable from '../../../Elements/Sections/EmptyTable'

const ApplicationLogs = ({auditLogDataFetched, appId}) => {
    const [currency, setCurrency] = useState('NGN')

    const { handleSearch, handleBlur, searchQuery } = useSearchTables('', 'api-log-row')

    const [sortBy, setSortBy] = useState('')

    const apiTableHeaders = [
        {
            name:"Date",
            sorter:"dateQueried"
        },
        {
            name:"Endpoint",
            sorter:"endpoint"
        },
        {
            name:"Status",
            sorter:"status"
        },
        {
            name:"Method",
            sorter:"request_methods"
        },
        {
            name:"API Cost",
            sorter:"cost"
        },
    ]

    const sortedAPILogData = [...auditLogDataFetched].sort((a, b) => {
        if (sortBy === "dateQueried") {
            const dateA = new Date(a.dateQueried);
            const dateB = new Date(b.dateQueried);
            return dateA - dateB;
        }else if (sortBy === "status") {
            const statusA = parseFloat(a.status);
            const statusB = parseFloat(b.status);
            return statusA - statusB;
        }else if (sortBy === 'cost') {
            const costA = parseFloat(a.cost);
            const costB = parseFloat(b.cost);
            return costA - costB;
        }else {
            if (a[sortBy] < b[sortBy]) {
                return -1;
            } else if (a[sortBy] > b[sortBy]) {
                return 1;
            } else {
                return 0;
            }
        }
    });  

        const {slicedDataRows, moreRows, rows, rowsPerView} = useLoadMore(sortedAPILogData)
    



  return (
    <div>
        {auditLogDataFetched && auditLogDataFetched.length > 0
        ?
        <div className='rounded-ten bg-white col-span-4 py-9 px-6 border-2 border-brandGray2x'>
            <div className='pb-3 flex flex-col sm:flex-row md:items-center gap-5 sm:gap-10'>
            <h1 className='font-avenirBlack whitespace-nowrap'>API Log</h1>
            <div className='flex flex-col md:flex-row w-full gap-3 items-end md:items-center justify-end'>
                {/* <ButtonIcon text={'New Campaign'} bgColor={'bg-brandGreen4x'} textColor={'text-white'} borderColor={'rounded-ten'} paddingX={'px-2 sm:px-5'} fontSize={'text-sm'} /> */}
                <label htmlFor="apiLogSearch" className='rounded-ten py-2.5 border flex flex-row items-center gap-2 pl-2 border-brandGray7x w-full sm:w-fiftyPercent max-w-md'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33334 13.3333C10.6471 13.3333 13.3333 10.647 13.3333 7.33325C13.3333 4.01954 10.6471 1.33325 7.33334 1.33325C4.01963 1.33325 1.33334 4.01954 1.33334 7.33325C1.33334 10.647 4.01963 13.3333 7.33334 13.3333Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path opacity="0.4" d="M12.62 13.7931C12.9733 14.8598 13.78 14.9665 14.4 14.0331C14.9666 13.1798 14.5933 12.4798 13.5666 12.4798C12.8066 12.4731 12.38 13.0665 12.62 13.7931Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input onChange={handleSearch} onBlur={handleBlur} type="search" name="api-log-search" id="apiLogSearch" placeholder='Search Application Log History...' className='placeholder:text-xs w-full focus:outline-none focus:ring-none text-sm'/>
                </label>
            </div>
            </div>

            <div>
                <div className='pt-6 overflow-x-auto w-full grid grid-cols-1'>
                    <table id='transactionLogTable' className='table table-auto w-full text-left'>
                        <thead className='text-sm font-spaceGroteskMedium'>
                            <tr className='rounded-ten'>
                                {apiTableHeaders.map((header, idx)=>{
                                    return <td key={idx} className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                    <button className='flex items-center gap-2' onClick={()=>setSortBy(header.sorter)} title={`Sort api by ${header.sorter}`} aria-label={`Click to sort api by ${header.sorter}`}>
                                        {header.name}
                                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </td>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {(searchQuery ? auditLogDataFetched : slicedDataRows).map((data, idx)=>{
                                return     <tr key={idx} className='font-avenirRegular text-sm api-log-row'>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <p className=''>{formatDateTimeMonthText(data.dateQueried) || ''}</p>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <div className='flex items-center gap-3 pr-4'>
                                                <p className=''>{data.endpoint || '----'}</p>
                                            </div>
                                        </td>
                                        <td className={`py-4 px-4 whitespace-nowrap text-xs flex items-center gap-3`}>
                                            <p>{data.status || ''}</p>
                                            <p className={`${data.status == 200 ? 'px-2.5 py-1 text-brandGreen1x bg-brandLightGreen1x rounded-five capitalize w-fit' : 'px-2.5 py-1 text-brandRed5x bg-brandLightRed3x rounded-five capitalize w-fit'}`}>{data.status == 200 ? 'Success' : 'Failed'}</p>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <p className='uppercase font-avenirBlack'>{data.request_methods || '----'}</p>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <p className='uppercase'>{new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(data.cost)} {currency}</p>
                                        </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                {auditLogDataFetched.length > rowsPerView && <LoadMore rows_per_view={rowsPerView} moreRows={moreRows} rows={rows} listLength={auditLogDataFetched.length} />}
            </div>
        </div>
        :
        <EmptyTable message={auditLogDataFetched.length == 0 ? appId ? 'No application logs found for this App' : 'No application logs found. Select App to request.' : 'Select App to request.'} /> 
        
        }

    </div>
  )
}

export default ApplicationLogs