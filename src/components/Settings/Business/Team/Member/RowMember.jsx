import React from 'react'

const RowMember = ({signedIn, name, email, role, lastLogIn, twoFA, handleClick}) => {
  return (
    <tr className='font-avenirRegular text-sm members-row border-b-0.5 border-b-brandGray2x last:border-b-0'>
        <td className="py-4 px-4 whitespace-nowrap">
            <div className='flex items-center gap-2'>
                <p className=''>{name || 'Precious Tom'}</p>
                {signedIn == name && <p className='px-2.5 py-1 bg-brandLightGreen1x text-brandGreen1x text-xs rounded-five'>{'You'}</p>}
            </div>
        </td>
        <td className={`py-4 px-4 whitespace-nowrap text-xs `}>
            <p className=''>{email || 'tom@pandascrow.io'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{role || 'Owner'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{lastLogIn || 'April 5, 2023, 9:57 PM'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap">
            <p className=''>{twoFA ? 'Enabled' : 'Not Enabled'}</p>
        </td>
        <td className="py-4 px-4 whitespace-nowrap ">
            <button onClick={handleClick} aria-label={`Update ${name && name} role`} title={`Update ${name && name} role`} className="text-black bg-white text-xs border-2 border-brandGray2x rounded-fifty py-1 px-4 flex gap-1.5 items-center group">
                Update Role
            </button>
        </td>
    </tr>
  )
}

export default RowMember