import React, {useState} from 'react'
import TransactionRow from './TransactionRow'
import formatDateTimeMonthText from '../../../utils/FormatDateTimeMonthText'

const TransactionTable = ({data, handleTransModal}) => {
    

  return (
    <table id='transactionHistoryTable' className='table table-auto w-full text-left'>
        <thead className='text-sm font-spaceGroteskMedium'>
            <tr className='rounded-ten'>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x rounded-l-ten'>
                    <input type="checkbox" name="master-check-transaction-history" id="masterCheckTransactionHistory" className="accent-brandGreen4x focus:outline-none focus:ring-none"  />
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    WHEN
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    STATUS
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    TYPE
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    REFERENCE
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    AMOUNT
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x rounded-r-ten'>
                    
                </td>
            </tr>
        </thead>
        <tbody className=''>
            {data.map((trans, idx)=>{
                const fee = trans.fee
                return <TransactionRow id={trans.payment_ref} key={idx} when={formatDateTimeMonthText(trans.dateCreated)} status={trans.status} statusAlt={trans.transaction.status_alt} type={trans.transaction_type} reference={trans.payment_ref} amount={new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(fee.payableamount)} handleClick={()=>handleTransModal(trans.payment_ref)}  />
            })}
        </tbody>
    </table>
  )
}

export default TransactionTable