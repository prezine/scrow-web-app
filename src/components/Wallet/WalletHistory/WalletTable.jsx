import React from 'react'
import WalletRow from './WalletRow'


const WalletTable = ({walletHistoryData}) => {


  return (
    <table id='walletHistoryTable' className='table table-auto w-full text-left'>
        <thead className='text-sm font-spaceGroteskMedium'>
            <tr className='rounded-ten'>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x rounded-l-ten'>
                    <input type="checkbox" name="master-check-wallet-history" id="masterCheckWalletHistory" className="accent-brandGreen4x focus:outline-none focus:ring-none"  />
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    WHEN
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    DESCRIPTION
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    CATEGORY
                </td>
                <td className='py-2.5 px-4 whitespace-nowrap bg-brandGray9x'>
                    AMOUNT
                </td>
            </tr>
        </thead>
        <tbody>
            {
                walletHistoryData.map((history, idx)=>{
                    return <WalletRow key={idx} id={history.sessionID} action={history.action} category={history.credit_balance} when={history.dateCreated_alt} description={history.description} amount={history.credit_balance ? history.credit_balance : history.debit_balance} />
                })
            }
        </tbody>
    </table>
  )
}

export default WalletTable