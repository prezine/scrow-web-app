import React from 'react'
import RolesData from '../../../../../data/RolesData'
import ButtonPrimaryIcon from '../../../../Elements/Buttons/ButtonPrimaryIcon'

const TeamRole = () => {



  const handleClick = (e) => {

  }

  return (
    <div>
        <div className='py-5 border-b-0.5 border-b-brandGray2x flex flex-col lg:flex-row gap-10 justify-between lg:items-center'>
            <h2 className='font-avenirHeavy text-lg text-brandGray12x'>Manage Roles</h2>
            <div className='flex items-center gap-3 self-end'>
                <ButtonPrimaryIcon text={'Add a custom Role'} textWrap={'whitespace-nowrap'} />
            </div>
        </div>

        <div className="sm:w-ninetyPercent md:w-eightyPercent mds:w-ninetyFivePercent lg:w-sixtyFivePercent max-w-lg mx-auto py-10 lg:py-20">
          <h3 className='font-avenirHeavy text-xl text-brandGray12x pb-10'>Default Roles</h3>

          <div>
            {RolesData.map((role, idx)=>{
              return <div key={idx} className='py-5 border-b-0.5 border-brandGray2x last:border-0 flex flex-col md:flex-row md:items-center gap-10 justify-between'>
                      <div>
                          <h3 className='font-avenirHeavy text-brandGray12x pb-1'>{role.role}</h3>
                          <p className='text-xs font-avenirMedium text-brandGray8x'>{role.description}</p>
                      </div>
              
                      <div className='self-end md:self-auto'>
                      <button onClick={handleClick} aria-label={`View ${role.role} preferences`} title={`View ${role.role} preferences`} className="text-black whitespace-nowrap text-xs bg-white border-2 border-brandGray2x rounded-fifty py-1 px-4 flex gap-1.5 items-center group">
                        View Permissions
                      </button>
                      </div>
                    </div>
            })}
          </div>
        </div>
    </div>
  )
}

export default TeamRole