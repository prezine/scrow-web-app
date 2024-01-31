import React, {useState} from 'react'
import useSearchTables from '../../../../hooks/SearchTables'
import formatDateTimeMonthText from '../../../../utils/FormatDateTimeMonthText'
import useLoadMore from '../../../../utils/useLoadMore'
import LoadMore from '../../../Elements/Pagination/LoadMore'
import EmptyTable from '../../../Elements/Sections/EmptyTable'

const WebhookLogs = ({auditLogDataFetched, appId}) => {


const [sortBy, setSortBy] = useState('')

const { handleSearch, handleBlur, searchQuery } = useSearchTables('', 'webhook-log-row')





const sortedWebHookData = [...auditLogDataFetched].sort((a, b) => {
    if (sortBy === "dateSent") {
        const dateA = new Date(a.dateSent);
        const dateB = new Date(b.dateSent);
        return dateA - dateB;
    }else if (sortBy === "send_status") {
        const statusA = parseFloat(a.send_status);
        const statusB = parseFloat(b.send_status);
        return statusA - statusB;
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

const handleResend = (id) => {
    console.log(id);
}

const {slicedDataRows, moreRows, rows, rowsPerView} = useLoadMore(sortedWebHookData)




  return (
    <div>
        {auditLogDataFetched && auditLogDataFetched.length > 0
        ?
        <div className='rounded-ten bg-white col-span-4 py-9 px-6 border-2 border-brandGray2x'>
            <div className='pb-3 flex flex-col sm:flex-row md:items-center gap-5 sm:gap-10'>
                <h1 className='font-avenirBlack whitespace-nowrap'>WebHook Log</h1>
            </div>

            <div>
                <div className='pt-6 overflow-x-auto w-full grid grid-cols-1'>
                    <table id='transactionLogTable' className='table table-auto w-full text-left'>
                        <thead className='text-sm font-spaceGroteskMedium'>
                            <tr className='rounded-ten'>
                                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                    <button className='flex items-center gap-2' onClick={()=>setSortBy('dateSent')} title='Sort webHook by date' aria-label='Click to sort webHook by date'>
                                        Date
                                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </td>
                                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                    <button className='flex items-center gap-2' onClick={()=>setSortBy('event')} title='Sort webHook by name' aria-label='Click to sort webHook by name'>
                                        Events
                                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </td>
                                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                    <button className='flex items-center gap-2' onClick={()=>setSortBy('appid')} title='Sort webHook by name' aria-label='Click to sort webHook by name'>
                                        Event ID
                                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </td>
                                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                    <button className='flex items-center gap-2' onClick={()=>setSortBy('status')} title='Sort webHook by event' aria-label='Click to sort webHook by event'>
                                        Status
                                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </td>
                                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                    <p>Action(s)</p>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {(searchQuery ? auditLogDataFetched : slicedDataRows).map((data, idx)=>{
                                return     <tr key={idx} className='font-avenirRegular text-sm webhook-log-row'>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <p className=''>{formatDateTimeMonthText(data.dateSent) || ''}</p>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <p className='font-avenirHeavy'>{data.event}</p>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <p className='font-avenirHeavy'>{data.appid}</p>
                                        </td>
                                        <td className={`py-4 px-4 whitespace-nowrap text-xs flex items-center gap-3`}>
                                            <p>{data.send_status || '000'}</p>
                                            <p className={`${data.send_status == 200 ? 'px-2.5 py-1 text-brandGreen1x bg-brandLightGreen1x rounded-five capitalize w-fit' : 'px-2.5 py-1 text-brandRed5x bg-brandLightRed3x rounded-five capitalize w-fit'}`}>{data.send_status == 200 ? 'Successful' : 'Failed'}</p>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <button onClick={()=>handleResend(data.id)} disabled={data.send_status == 200 ? true : false} className={`text-xxs font-spaceGroteskMedium px-2 py-1 border-2 border-black text-black bg-white rounded-fifty disabled:text-brandGray11x disabled:bg-brandGray13x disabled:border-brandGray10x`}>Resend webhook</button>
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
        <EmptyTable message={auditLogDataFetched.length == 0 ? appId ? 'No webhook logs found for this App' : 'No webhook logs found. Select App to request.' : 'Select App to request.'} /> 
        }
    </div>
  )
}

export default WebhookLogs