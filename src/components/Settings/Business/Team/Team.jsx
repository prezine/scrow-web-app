import React, { useState } from 'react'
import TeamMember from './Member/TeamMember'
import TeamRole from './Roles/TeamRole'

const Team = () => {

  const [tab, setTab] = useState('member')
  
  return (
    <div className='pt-8'>
      <div className='pb-4 xl:pb-6 border-b-0.5 border-b-brandGray2x sticky top-0 pt-3 xl:pt-6 xl:top-0 left-0 bg-brandGray3x'>
          <div className='flex flex-row gap-3 items-center overflow-x-auto'>
            <button onClick={()=>setTab('member')} aria-label="Set teams tab to member"  className={`py-2 px-7 whitespace-nowrap rounded-fifty trans-all-500-ease-in-out ${tab == 'member' ? 'bg-black text-white' : 'bg-transparent text-brandGray33x hover:bg-brandGray2x'}`}>Member</button>
            <button onClick={()=>setTab('roles')} aria-label="Set teams tab to roles"  className={`py-2 px-7 whitespace-nowrap rounded-fifty trans-all-500-ease-in-out ${tab == 'roles' ? 'bg-black text-white' : 'bg-transparent text-brandGray33x hover:bg-brandGray2x'}`}>Roles</button>
          </div>
      </div>

      <div>
        {tab == 'member' && <TeamMember />}
        {tab == 'roles' && <TeamRole />}
      </div>
    </div>
  )
}

export default Team