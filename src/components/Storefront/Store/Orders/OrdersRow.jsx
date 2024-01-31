import React from 'react'
import MakeTransactionStatusTag from '../../../../utils/Tags/MakeTransactionStatusTag'


const OrdersRow = ({avatar, customer, product, status, status_alt, handleViewOrders, date, amount, currency}) => {
    // if(status){
    //     status ? status.toLowerCase() : ''
    // }
  
    return (
    <tr className='font-avenirRegular text-sm orders-history-row'>
        <td className="py-4 px-4 whitespace-nowrap">
            <input type="checkbox" name="check-customer-history" id="checkCustomerHistory" className="accent-brandGreen4x focus:outline-none focus:ring-none"  />
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <div className='flex items-center gap-3 pr-4'>
                <img src={avatar} alt={customer} className={'w-8 h-8 aspect-square rounded-full'} />
                <p className=''>{customer || ''}</p>
            </div>
        </td>
        <td className={`py-4 px-4 whitespace-nowrap text-xs flex items-center gap-3`}>
            <p>{product || ''}</p>
            <p className={`px-2.5 py-1 ${MakeTransactionStatusTag(status)} rounded-five capitalize w-fit`}>{status_alt}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{date || ''}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{currency || 'NGN'} {amount || '1,000.00'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <button type='button' onClick={handleViewOrders} className='text-xxs hover:bg-brandBlack1x/80 transition-all ease-in-out duration-300 text-white px-3 py-1 rounded-fifty bg-brandBlack1x'>View Orders</button>
        </td>
    </tr>
  )
}

export default OrdersRow