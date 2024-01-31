import React from 'react'
import MakeTransactionStatusTag from '../../../utils/Tags/MakeTransactionStatusTag'

const TransactionRow = ({id, when, status, statusAlt, type, reference, amount, handleClick, currency}) => {
    
    

  
    return (
    <tr id={id} className='font-avenirRegular text-sm transaction-history-row'>
        <td className="py-4 px-4 whitespace-nowrap">
            <input type="checkbox" name="check-transaction-history" id="checkTransactionHistory" className="accent-brandGreen4x focus:outline-none focus:ring-none"  />
        </td>
        <td className="py-4 px-4 whitespace-nowrap text-brandGray6x">
            <p className=''>{when || 'Sep 12, 2022, 8:24 PM'}</p>
        </td>
        <td className={`py-4 px-4 whitespace-nowrap text-xs`}>
            <p className={`px-2.5 py-1 rounded-five w-fit ${MakeTransactionStatusTag(status)}`}>{statusAlt || 'Payment Made'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap font-avenirHeavy">
            <p className='capitalize'>{type || 'One-time'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap text-brandGray6x">
            <p className=''>#{reference || '#aGPJ6RUZ9'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{currency || 'NGN'} {amount || '1,000.00'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap text-brandDarkViolet1x">
            <button onClick={handleClick} aria-label='See transaction details' title='See transaction details' className="text-xs flex gap-1.5 items-center group">
                View transaction
                <svg className='group-hover:translate-x-2 trans-all-500-ease-in-out' width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.025 5.44165L17.0834 10.5L12.025 15.5583" stroke="#2A2AB3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.4" d="M2.91669 10.5H16.9417" stroke="#2A2AB3" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </td>
    </tr>
  )
}

export default TransactionRow