import React, {useState} from 'react'
import useSearchTables from '../../../../hooks/SearchTables'
import ButtonPrimaryIcon from '../../../Elements/Buttons/ButtonPrimaryIcon'
import useLoadMore from '../../../../utils/useLoadMore'
import formatDateTimeMonthText from '../../../../utils/FormatDateTimeMonthText'
import EmptyTable from '../../../Elements/Sections/EmptyTable'
import LoadMore from '../../../Elements/Pagination/LoadMore'


const EventsLog = ({auditLogDataFetched}) => {

    const { handleSearch, handleBlur, searchQuery } = useSearchTables('', 'activities-log-row')
    const btnIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.99998 14.6666H9.99998C13.3333 14.6666 14.6666 13.3333 14.6666 9.99992V5.99992C14.6666 2.66659 13.3333 1.33325 9.99998 1.33325H5.99998C2.66665 1.33325 1.33331 2.66659 1.33331 5.99992V9.99992C1.33331 13.3333 2.66665 14.6666 5.99998 14.6666Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <g opacity="0.4">
    <path d="M6 6.34009L8 4.34009L10 6.34009" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 4.34009V9.67342" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <path opacity="0.4" d="M4 11.0066C6.59333 11.8733 9.40667 11.8733 12 11.0066" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    const [sortBy, setSortBy] = useState('')

    const sortedActivities = [...auditLogDataFetched].sort((a, b) => {
        if (sortBy === "dateLogged") {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
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
    
    const {slicedDataRows, moreRows, rows, rowsPerView} = useLoadMore(sortedActivities)




  return (
    <div>
        {auditLogDataFetched && auditLogDataFetched.length > 0
        ?
        <div className='rounded-ten bg-white col-span-4 py-9 px-6 border-2 border-brandGray2x'>
            <div className='pb-3 flex flex-col sm:flex-row md:items-center gap-5 sm:gap-10'>
            <h1 className='font-avenirBlack whitespace-nowrap'>Activities Log</h1>
            <div className='flex flex-col md:flex-row w-full gap-3 items-end md:items-center justify-end'>
                {/* <ButtonIcon text={'New Campaign'} bgColor={'bg-brandGreen4x'} textColor={'text-white'} borderColor={'rounded-ten'} paddingX={'px-2 sm:px-5'} fontSize={'text-sm'} /> */}
                <label htmlFor="activitiesLogSearch" className='rounded-ten py-2.5 border flex flex-row items-center gap-2 pl-2 border-brandGray7x w-full sm:w-fiftyPercent max-w-md'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33334 13.3333C10.6471 13.3333 13.3333 10.647 13.3333 7.33325C13.3333 4.01954 10.6471 1.33325 7.33334 1.33325C4.01963 1.33325 1.33334 4.01954 1.33334 7.33325C1.33334 10.647 4.01963 13.3333 7.33334 13.3333Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path opacity="0.4" d="M12.62 13.7931C12.9733 14.8598 13.78 14.9665 14.4 14.0331C14.9666 13.1798 14.5933 12.4798 13.5666 12.4798C12.8066 12.4731 12.38 13.0665 12.62 13.7931Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input onChange={handleSearch} onBlur={handleBlur} type="search" name="activities-log-search" id="activitiesLogSearch" placeholder='Search Activities...' className='placeholder:text-xs w-full focus:outline-none focus:ring-none text-sm'/>
                </label>
                <div className='flex items-center gap-3'>
                    <button type='button' aria-label='Sort activities' title='Sort activities' className='bg-white self-stretch rounded-five py-2 px-2.5 border border-brandGray8x'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 4.66675H14" stroke="#2A2AB3" stroke-width="1.5" stroke-linecap="round"/>
                            <path opacity="0.34" d="M4 8H12" stroke="#2A2AB3" stroke-width="1.5" stroke-linecap="round"/>
                            <path d="M6.66669 11.3333H9.33335" stroke="#2A2AB3" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <ButtonPrimaryIcon text={'Export'} icon={btnIcon} bgColor={'bg-black'} />
                </div>
            </div>
            </div>

            <div>
                <div className='pt-6 overflow-x-auto w-full grid grid-cols-1'>
                <table id='transactionLogTable' className='table table-auto w-full text-left'>
                    <thead className='text-sm font-spaceGroteskMedium'>
                        <tr className='rounded-ten'>
                            <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                <button className='flex items-center gap-2' onClick={()=>setSortBy('dateLogged')} title='Sort activities by date' aria-label='Click to sort activities by date'>
                                    Date
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </td>
                            <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                <button className='flex items-center gap-2' onClick={()=>setSortBy('name')} title='Sort activities by name' aria-label='Click to sort activities by name'>
                                    Name
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </td>
                            <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                <button className='flex items-center gap-2' onClick={()=>setSortBy('description')} title='Sort activities by description' aria-label='Click to sort activities by description'>
                                    Events
                                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {(searchQuery ? auditLogDataFetched : slicedDataRows).map((data, idx)=>{
                            return     <tr key={idx} className='font-avenirRegular text-sm activities-log-row'>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <p className=''>{formatDateTimeMonthText(data.dateLogged) || ''}</p>
                                    </td>
                                    <td className="py-4 px-4 whitespace-nowrap">
                                        <div className='flex items-center gap-3 pr-4'>
                                            <img src={data.user_dp} alt={data.name} className={'w-8 h-8 aspect-square rounded-full'} />
                                            <p className=''>{data.name || ''}</p>
                                        </div>
                                    </td>
                                    <td className={`py-4 px-4 whitespace-nowrap text-xs flex items-center gap-3`}>
                                        <p>{data.description || 'tom@pandascrow.io'}</p>
                                        <p className='px-2.5 py-1 text-brandGreen1x bg-brandLightGreen1x rounded-five capitalize w-fit'>{data.name}</p>
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
        <EmptyTable message={'No event logs found'}></EmptyTable>
        }
    </div>
  )
}

export default EventsLog