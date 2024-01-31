import React from 'react'

const CustomersRow = ({avatar, name, email, verification, date, amount, currency}) => {
  return (
    <tr className='font-avenirRegular text-sm customer-history-row'>
        <td className="py-4 px-4 whitespace-nowrap">
            <input type="checkbox" name="check-customer-history" id="checkCustomerHistory" className="accent-brandGreen4x focus:outline-none focus:ring-none"  />
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <div className='flex items-center gap-3 pr-4'>
                <img src={avatar} alt={name} className={'w-8 h-8 min-w-8 aspect-square rounded-full skeleton'} />
                <p className=''>{name || 'Precious Tom'}</p>
            </div>
        </td>
        <td className={`py-4 px-4 whitespace-nowrap text-xs flex items-center gap-3`}>
            <p>{email || 'tom@pandascrow.io'}</p>
            { verification 
                ?
                <>
                    {verification == 1 && <p className='px-2.5 py-1 text-brandGreen1x bg-brandLightGreen1x rounded-five capitalize w-fit'>{'Verified Customer'}</p>}
                    {verification == 0 && <p className='px-2.5 py-1 text-brandYellow1x bg-brandLightYellow1x rounded-five capitalize w-fit'>{'Under Review'}</p>}
                    {/* {verification == 0 && <p className='px-2.5 py-1 text-brandRed2x bg-brandLightRed1x rounded-five capitalize w-fit'>{'Unverified Customer'}</p>} */}
                </>
                : <p className='px-2.5 py-1 text-brandRed2x bg-brandLightRed1x rounded-five capitalize w-fit'>{'Unverified Customer'}</p>
            }
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{date || 'May 20, 1998'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{currency || 'NGN'} {amount || '1,000.00'}</p>
        </td>
    </tr>
  )
}

export default CustomersRow