import React from 'react'
import formatDateTimeMonthText from '../../../../utils/FormatDateTimeMonthText'
import ReferralsRow from './ReferralsRow'

const ReferralsTable = ({referralsData}) => {
  return (
    <table id='referralsTable' className='table table-auto w-full text-left'>
    <thead className='text-sm'>
        <tr className='border-b-0.5 border-b-brandGray2x'>
            <td className='py-2.5 px-4'>
              NAME ON ACCOUNT
            </td>
            <td className='py-2.5 px-4'>
              EMAIL
            </td>
            <td className='py-2.5 px-4'>
                EARNED
            </td>
            <td className='py-2.5 px-4'>
                JOINED DATE
            </td>
        </tr>
    </thead>
    <tbody>
      {
        referralsData.map((referral, idx)=>{
          return <ReferralsRow key={idx} name={referral.name} email={referral.email} verified={referral.is_verified} earned={new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(referral.earned)}  is_earned={referral.is_earned} currency={referral.currency} joinedDate={formatDateTimeMonthText(referral.dateJoined)} />
        })
      }
    </tbody>
  </table>
  )
}

export default ReferralsTable