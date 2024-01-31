import React, { useState } from 'react'
import useSearchTables from '../../../../hooks/SearchTables'
import useLoadMore from '../../../../utils/useLoadMore'
import Alert from '../../../Elements/Alerts/Alert'
import ButtonPrimaryIcon from '../../../Elements/Buttons/ButtonPrimaryIcon'
import ModalWrap from '../../../Elements/Modal/ModalWrap'
import LoadMore from '../../../Elements/Pagination/LoadMore'
import EmptyTable from '../../../Elements/Sections/EmptyTable'
import ViewOrder from './Modals/ViewOrder'
import OrdersTable from './OrdersTable'


const Orders = ({ordersData, storeID, mutate}) => {
  
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentOrder, setCurrentOrder] = useState({})

    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    const { handleSearch, handleBlur, searchQuery } = useSearchTables('', 'orders-history-row')
    const btnIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.99998 14.6666H9.99998C13.3333 14.6666 14.6666 13.3333 14.6666 9.99992V5.99992C14.6666 2.66659 13.3333 1.33325 9.99998 1.33325H5.99998C2.66665 1.33325 1.33331 2.66659 1.33331 5.99992V9.99992C1.33331 13.3333 2.66665 14.6666 5.99998 14.6666Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <g opacity="0.4">
    <path d="M6 6.34009L8 4.34009L10 6.34009" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 4.34009V9.67342" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <path opacity="0.4" d="M4 11.0066C6.59333 11.8733 9.40667 11.8733 12 11.0066" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>


    const handleViewOrdersModal = (token) => {
        if(ordersData && ordersData.length > 0){
        const tempData = ordersData.filter(trans => trans.orders_token == token)
        setIsModalOpen(true)
        setCurrentOrder(tempData)
        // console.log(tempData[0]);
        }
    }




    // const ordersData = [
    //     {
    //         customer:"Precious Tom",
    //         avatar:'/src/assets/media/avatars/avatar-5.png',
    //         product:"M2 Apple Laptop",
    //         status:"paid",
    //         date:"2 hours ago",
    //         amount:"1,200,000.00",
    //     },
    //     {
    //         customer:"Isaac David",
    //         avatar:'/src/assets/media/avatars/avatar-6.png',
    //         product:"Pandascrow Hoodie",
    //         status:"completed",
    //         date:"12 mins ago",
    //         amount:"20,000.00",
    //     },
    //     {
    //         customer:"Imoh Anselem",
    //         avatar:'/src/assets/media/avatars/avatar-7.png',
    //         product:"iPhone 14 Pro Max",
    //         status:"failed",
    //         date:"4 hours ago",
    //         amount:"790,000.00",
    //     },
    //     {
    //         customer:"Isaac David",
    //         avatar:'/src/assets/media/avatars/avatar-6.png',
    //         product:"Pandascrow Hoodie",
    //         status:"completed",
    //         date:"12 mins ago",
    //         amount:"20,000.00",
    //     },
    //     {
    //         customer:"Imoh Anselem",
    //         avatar:'/src/assets/media/avatars/avatar-7.png',
    //         product:"iPhone 14 Pro Max",
    //         status:"failed",
    //         date:"4 hours ago",
    //         amount:"790,000.00",
    //     },
    // ]

    const {slicedDataRows, moreRows, rows, rowsPerView} = useLoadMore(ordersData)

    

  return (
    <div className={`pb-10`}>
        {
            ordersData && ordersData.length > 0
            ?
            <div className='rounded-ten bg-white col-span-4 py-9 px-6 border-2 border-brandGray2x'>
                <div className='pb-3 flex flex-col sm:flex-row md:items-center gap-5 sm:gap-10'>
                <h1 className='font-avenirBlack whitespace-nowrap'>All Orders</h1>
                <div className='flex flex-col md:flex-row w-full gap-3 items-end md:items-center justify-end'>
                    {/* <ButtonIcon text={'New Campaign'} bgColor={'bg-brandGreen4x'} textColor={'text-white'} borderColor={'rounded-ten'} paddingX={'px-2 sm:px-5'} fontSize={'text-sm'} /> */}
                    <label htmlFor="orderHistorySearch" className='rounded-ten py-2.5 border flex flex-row items-center gap-2 pl-2 border-brandGray7x w-full sm:w-fiftyPercent max-w-md'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.33334 13.3333C10.6471 13.3333 13.3333 10.647 13.3333 7.33325C13.3333 4.01954 10.6471 1.33325 7.33334 1.33325C4.01963 1.33325 1.33334 4.01954 1.33334 7.33325C1.33334 10.647 4.01963 13.3333 7.33334 13.3333Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path opacity="0.4" d="M12.62 13.7931C12.9733 14.8598 13.78 14.9665 14.4 14.0331C14.9666 13.1798 14.5933 12.4798 13.5666 12.4798C12.8066 12.4731 12.38 13.0665 12.62 13.7931Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input onChange={handleSearch} onBlur={handleBlur} type="search" name="order-history-search" id="orderHistorySearch" placeholder='Search orders...' className='placeholder:text-xs w-full focus:outline-none focus:ring-none text-sm'/>
                    </label>
                    <div className='flex items-center gap-3'>
                        <button type='button' aria-label='Sort orders' title='Sort orders' className='bg-white self-stretch rounded-five py-2 px-2.5 border border-brandGray8x'>
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
                    
                        <div>
                            <div className='pt-6 overflow-x-auto w-full grid grid-cols-1'>
                                <OrdersTable handleViewOrdersModal={handleViewOrdersModal} ordersData={searchQuery ? ordersData : slicedDataRows} />
                            </div>
                            {ordersData.length > rowsPerView && <LoadMore rows_per_view={rowsPerView} moreRows={moreRows} rows={rows} listLength={ordersData.length} />}
                        </div>
                        
                    
                </div>
            </div>
        :
        <EmptyTable message={'No recent orders'} />
        }
        
        <ViewOrder modalState={isModalOpen} closeModal={()=>setIsModalOpen(false)} data={currentOrder} openAlert={openAlert} setAlertValues={setAlertValues} alertValues={alertValues} setOpenAlert={setOpenAlert} storeID={storeID} mutate={mutate} />

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default Orders