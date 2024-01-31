import React from 'react'

const ReferralsRow = ({verified, name, email, currency, is_earned, earned, joinedDate}) => {
  return (
    <tr className='font-avenirRegular text-sm referrals-row border-b-0.5 border-b-brandGray2x last:border-b-0'>
        <td className="py-4 px-4 whitespace-nowrap">
            <div className='flex items-center gap-2'>
                <p className=''>{name || '-'}</p>
                {verified && <p className='px-2.5 py-1 bg-brandLightGreen1x text-brandGreen1x text-xs rounded-five'>{'Verified'}</p>}
            </div>
        </td>
        <td className={`py-4 px-4 whitespace-nowrap text-xs `}>
            <p className=''>{email || '-'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{is_earned ? `${currency} ${earned}` : `--`}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{joinedDate || '--'}</p>
        </td>
    </tr>
  )
}

export default ReferralsRow