import React, {useState} from 'react'
import useSearchTables from '../../../../hooks/SearchTables'
import formatDateTimeMonthText from '../../../../utils/FormatDateTimeMonthText'
import useLoadMore from '../../../../utils/useLoadMore'
import ButtonPrimaryIcon from '../../../Elements/Buttons/ButtonPrimaryIcon'
import LoadMore from '../../../Elements/Pagination/LoadMore'
import EmptyTable from '../../../Elements/Sections/EmptyTable'

const BillingOverview = ({paymentData}) => {
    const [currency, setCurrency] = useState('NGN')


    const [sortBy, setSortBy] = useState('')

    const pHTableHeaders = [
        {
            name:"Purchase Date",
            sorter:"datePaid"
        },
        {
            name:"Member",
            sorter:"name"
        },
        {
            name:"Plan Pricing",
            sorter:"plan_amount"
        },
        {
            name:"Plan Type",
            sorter:"type"
        },
    ]

    // const paymentData = [
    //     {
    //         member:"Precious Tom",
    //         avatar:'/src/assets/media/avatars/avatar-5.png',
    //         pricing:"Free",
    //         date:"May 20, 1998, 5:50 pm",
    //         status:"free",
    //         type:"Pandascrow Basic"
    //     },
    //     {
    //         member:"Isaac David",
    //         avatar:'/src/assets/media/avatars/avatar-6.png',
    //         pricing:100000,
    //         date:"21 Apr 2023, 7:50 pm",
    //         status:"paid",
    //         type:"Pandascrow Pro"
    //     },
    //     {
    //         member:"Imoh Anselem",
    //         avatar:'/src/assets/media/avatars/avatar-7.png',
    //         pricing:100000,
    //         date:"21 Apr 2023, 5:50 pm",
    //         status:"failed",
    //         type:"Pandascrow Basic"
    //     },
    // ]

    const sortedPaymentData = [...paymentData].sort((a, b) => {
        if (sortBy === "datePaid") {
            const dateA = new Date(a.datePaid);
            const dateB = new Date(b.datePaid);
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
    
    const {slicedDataRows, moreRows, rows, rowsPerView} = useLoadMore(sortedPaymentData)



    const handleDownLoad = () => {
        
    }


  return (
    <div>
        {paymentData ?
            <div className='rounded-ten bg-white col-span-4 py-9 px-6 border-2 border-brandGray2x'>
                <div className='pb-3 flex flex-col sm:flex-row md:items-center gap-5 sm:gap-10'>
                <h1 className='font-avenirBlack whitespace-nowrap'>Payment History</h1>
                
                </div>
                <div>
                    <div className='pt-6 overflow-x-auto w-full grid grid-cols-1'>
                        <table id='paymentHistoryTable' className='table table-auto w-full text-left'>
                            <thead className='text-sm font-spaceGroteskMedium'>
                                <tr className='rounded-ten'>
                                    {pHTableHeaders.map((header, idx)=>{
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
                                    <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                                        <p>Receipts</p>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {slicedDataRows.map((data, idx)=>{
                                    return     <tr key={idx} className='font-avenirRegular text-sm payment-history-row'>
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <p className=''>{formatDateTimeMonthText(data.datePaid) || ''}</p>
                                            </td>
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <div className='flex items-center gap-3 pr-4'>
                                                    <img src={data.userdata.user_dp} alt={data.member} className={'w-8 h-8 aspect-square rounded-full'} />
                                                    <p className=''>{data.userdata.name || ''}</p>
                                                </div>
                                            </td>
                                            <td className={`py-4 px-4 whitespace-nowrap text-xs flex items-center gap-3`}>
                                                <p>{data.plan_type.toString().toLowerCase() == 'pandascrow-basic' ? <span>Free</span> : <span>{data.currency} {new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(data.plan_amount)}</span> }</p>
                                                {/* <p className={`px-2.5 py-1 ${data.status == 'failed' ? 'text-brandRed5x bg-brandLightRed3x ' : 'text-brandGreen1x bg-brandLightGreen1x '} rounded-five capitalize w-fit`}>{data.status}</p> */}
                                            </td>
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <p className='font-avenirHeavy capitalize'>{data.plan_type || ''}</p>
                                            </td>
                                            <td className="py-4 px-4 whitespace-nowrap">
                                                <button type='button' className='text-xxs hover:bg-brandGray12x/80 transition-all ease-in-out duration-300 text-white px-3 py-1 rounded-fifty bg-brandGray12x'>Download Receipts</button>
                                            </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {paymentData.length > rowsPerView && <LoadMore rows_per_view={rowsPerView} moreRows={moreRows} rows={rows} listLength={paymentData.length} />}

            </div>
            :
            <EmptyTable message={'No billing history found'} /> 
        }
    </div>
  )
}

export default BillingOverview