import React from 'react'

const WalletRow = ({id, when, category, description, amount, currency, action}) => {
    // if(category){
    //     category = category.toLowerCase()
    // }

  return (
    <tr id={id} className='font-avenirRegular text-sm wallet-history-row'>
        <td className="py-4 px-4 whitespace-nowrap">
            <input type="checkbox" name="check-wallet-history" id="checkWalletHistory" className="accent-brandGreen4x focus:outline-none focus:ring-none"  />
        </td>
        <td className="py-4 px-4 whitespace-nowrap text-brandGray6x">
            <p className=''>{when || ''}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{description || ''}</p>
        </td>
        <td className={`py-4 px-4 whitespace-nowrap text-xs`}>
            {category
            ? <p className='px-2.5 py-1 bg-brandLightGreen1x rounded-five text-brandGreen1x capitalize w-fit'>{action || ''}</p>
            : <p className='px-2.5 py-1 bg-brandLightYellow2x rounded-five text-brandYellow1x capitalize w-fit'>{action || ''}</p>
            }
            </td>
        <td className="py-4 px-4 whitespace-nowrap font-avenirHeavy">
            <p className=''>{currency || 'NGN'} {new Intl.NumberFormat('en', {maximumFractionDigits:2, minimumFractionDigits:2}).format(amount) || ''}</p>
        </td>
    </tr>
  )
}

export default WalletRow