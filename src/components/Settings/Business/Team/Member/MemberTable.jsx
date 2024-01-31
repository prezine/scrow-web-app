import React, { useState } from 'react'
import RowMember from './RowMember'

const MemberTable = () => {

  const [signedIn, setSignedIn] = useState('Precious Tom')

  const members = [
    {
      name:'Precious Tom',
      email:'tom@pandascrow.io',
      role:'Owner',
      twoFA:true,
      lastLogIn: 'April 5, 2023, 9:57 PM'
    },
    {
      name:'Isioma Ekwemuka',
      email:'isioma@pandascrow.io',
      role:'Engineer',
      twoFA:false,
      lastLogIn: 'April 1, 2023, 12:23 PM'
    },
    {
      name:'Isaac David',
      email:'isaac@pandascrow.io',
      role:'Product',
      twoFA:false,
      lastLogIn: 'March 3, 2023, 17:18 PM'
    },
  ]

  return (
    <table id='membersTable' className='table table-auto w-full text-left'>
      <thead className='text-sm font-spaceGroteskMedium'>
          <tr className='border-b-0.5 border-b-brandGray2x'>
              <td className='py-2.5 px-4'>
                NAME ON ACCOUNT
              </td>
              <td className='py-2.5 px-4'>
                EMAIL
              </td>
              <td className='py-2.5 px-4'>
                ROLE
              </td>
              <td className='py-2.5 px-4'>
                LAST LOG IN
              </td>
              <td className='py-2.5 px-4'>
                2FA
              </td>
              <td className='py-2.5 px-4'>
                  
              </td>
          </tr>
      </thead>
      <tbody>
        {members.map((member, idx)=>{
          return <RowMember key={idx} name={member.name} email={member.email} role={member.role} lastLogIn={member.lastLogIn} twoFA={member.twoFA} signedIn={signedIn} />
        })}
      </tbody>
    </table>
  )
}

export default MemberTable