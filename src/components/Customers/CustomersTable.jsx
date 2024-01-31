import React, { useState } from 'react'
import CustomersRow from './CustomersRow'
import formatDateMonthText from '../../utils/FormatDateMonthText'

const CustomersTable = ({customersData}) => {

    const [sortBy, setSortBy] = useState('')

    const sortedCustomers = [...customersData].sort((a, b) => {
        if (sortBy === "date") {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA - dateB;
        } else if (sortBy === "amount") {
          const amountA = parseFloat(a.amount);
          const amountB = parseFloat(b.amount);
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
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('name')} title='Sort customers by name' aria-label='Click to sort customers by name'>
                        Full Name
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('email')} title='Sort customers by email' aria-label='Click to sort customers by email'>
                        Email Address
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('date')} title='Sort customers by date joined' aria-label='Click to sort customers by date joined'>
                        Date Joined
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    <button className='flex items-center gap-2' onClick={()=>setSortBy('amount')} title='Sort customers by amount spent' aria-label='Click to sort customers by amount spent'>
                        Amount Spent
                        <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.53637 5.68824L4.39699 3.54887C4.14434 3.29621 3.7309 3.29621 3.47824 3.54887L1.33887 5.68824" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.53637 9.31177L4.39699 11.4511C4.14434 11.7038 3.7309 11.7038 3.47824 11.4511L1.33887 9.31177" stroke="#292D32" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </td>
            </tr>
        </thead>
        <tbody>
            {sortedCustomers.map((data, idx)=>{
                return <CustomersRow avatar={data.customerdata.user_dp} key={idx} name={data.customerdata.name} email={data.customerdata.email} date={formatDateMonthText(data.dateAdded)} amount={new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(data.total_spent)} verification={data.customerdata.is_verified} />
            })}
        </tbody>
    </table>
  )
}

export default CustomersTable