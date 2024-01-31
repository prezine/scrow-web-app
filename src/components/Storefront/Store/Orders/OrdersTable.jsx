import React, { useState } from 'react'
import formatDateMonthText from '../../../../utils/FormatDateMonthText'
import OrdersRow from './OrdersRow'

const OrdersTable = ({ordersData, handleViewOrdersModal}) => {

    const [sortBy, setSortBy] = useState('')


    const convertDate = (date) => {
        const timeAgo = date;
        const referenceDate = new Date();
        let elapsedMinutes;
        if (timeAgo.includes("mins")) {
            elapsedMinutes = parseInt(timeAgo);
        } else {
            elapsedMinutes = parseInt(timeAgo) * 60;
        }
      
        // Subtract elapsed time from reference date
        referenceDate.setMinutes(referenceDate.getMinutes() - elapsedMinutes);
      
        // Get Unix timestamp from reference date
        const timestamp = referenceDate.getTime();
      
        // console.log(timestamp);

        return timestamp;
      }
      

    const sortedOrders = [...ordersData].sort((a, b) => {
        if (sortBy === "date") {
            const dateA = convertDate(a.dateOrdered) 
            const dateB = convertDate(b.dateOrdered)
            return dateA - dateB;

        } else if (sortBy === "amount") {
          const amountA = parseFloat((a.total_amount).toString().replaceAll('.','').replaceAll(',',''));
          const amountB = parseFloat((b.total_amount).toString().replaceAll('.','').replaceAll(',',''));
          return amountA - amountB;
        } else {
          if (a[sortBy] < b[sortBy]) {
            return -1;
          } else if (a[sortBy] > b[sortBy]) {
            return 1;
          } else {
            return 0;
          }
        }
      });    
      
    
  

  return (
    <table id='transactionHistoryTable' className='table table-auto w-full text-left'>
        <thead className='text-sm font-spaceGroteskMedium'>
            <tr className='rounded-ten'>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x rounded-l-ten'>
                    <input type="checkbox" name="master-check-transaction-history" id="masterCheckTransactionHistory" className="accent-brandGreen4x focus:outline-none focus:ring-none"  />
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('customer')} title='Sort orders by customer' aria-label='Click to sort orders by customer'>
                        Customer
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('product_id')} title='Sort orders by product' aria-label='Click to sort orders by product'>
                        Order ID
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('date')} title='Sort orders by order date' aria-label='Click to sort orders by order date'>
                        Order Date
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('amount')} title='Sort orders by amount spent' aria-label='Click to sort orders by amount spent'>
                        Order Amount
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <div className='flex items-center gap-2'>
                        Manage Order
                    </div>
                </td>
            </tr>
        </thead>
        <tbody>
            {sortedOrders.map((data, idx)=>{
                return <OrdersRow id={data.orders_token} avatar={data.customer_data.customer_dp} key={idx} customer={data.customer_data.customer_name} product={data.orders_token} date={formatDateMonthText(data.dateOrdered)} amount={new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(data.total_amount)} status={data.status}  status_alt={data.status_alt} currency={data.currency} handleViewOrders={()=>handleViewOrdersModal(data.orders_token)} />
            })}
        </tbody>
    </table>
  )
}

export default OrdersTable