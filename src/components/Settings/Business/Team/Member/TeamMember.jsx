import React, { useState } from 'react'
import RolesData from '../../../../../data/RolesData'
import useSearchTables from '../../../../../hooks/SearchTables'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'
import ButtonPrimaryIcon from '../../../../Elements/Buttons/ButtonPrimaryIcon'
import FormInput from '../../../../Elements/Form/FormInput'
import ModalWrap from '../../../../Elements/Modal/ModalWrap'
import EmptyTable from '../../../../Elements/Sections/EmptyTable'
import MemberTable from './MemberTable'

const TeamMember = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const { handleSearch, handleBlur, searchQuery } = useSearchTables('', 'members-row')

    const [formData, setFormData] = useState({
        email:'',
        role:'admin'
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
    }

    const teamsData = []

    const addMemberButton = <ButtonPrimaryIcon handleClick={()=>setIsModalOpen(true)} otherTextStyles={'hidden sm:inline-block'} text={'Invite a Member'} textWrap={'whitespace-nowrap'} />


  return (
    <div>
        <div>
            {
                teamsData && teamsData.length > 0
                ?
                <div>
                    <div className='py-5 border-b-0.5 border-b-brandGray2x flex flex-col lg:flex-row gap-10 justify-between lg:items-center'>
                        <h2 className='font-avenirHeavy text-lg text-brandGray12x'>Members</h2>
                        <div className='flex items-center gap-3 self-end'>
                            <label htmlFor="membersSearch" className='rounded-ten py-2.5 border flex flex-row items-center gap-2 pl-2 border-brandGray7x w-full sm:w-sixtyPercent max-w-lg bg-white'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.33334 13.3333C10.6471 13.3333 13.3333 10.647 13.3333 7.33325C13.3333 4.01954 10.6471 1.33325 7.33334 1.33325C4.01963 1.33325 1.33334 4.01954 1.33334 7.33325C1.33334 10.647 4.01963 13.3333 7.33334 13.3333Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path opacity="0.4" d="M12.62 13.7931C12.9733 14.8598 13.78 14.9665 14.4 14.0331C14.9666 13.1798 14.5933 12.4798 13.5666 12.4798C12.8066 12.4731 12.38 13.0665 12.62 13.7931Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <input onChange={handleSearch} onBlur={handleBlur} type="search" name="members-search" id="membersSearch" placeholder='Search by Name' className='placeholder:text-xs w-full focus:outline-none focus:ring-none text-sm'/>
                            </label>
                            {addMemberButton}
                        </div>
                    </div>
                    <div>
                        <div className='pt-6 overflow-x-auto w-full grid grid-cols-1'>
                            <MemberTable />
                        </div>
                    </div>
                </div>
        :
                <div>
                    <div className='py-5 flex justify-end w-full'>
                        {addMemberButton}
                    </div>
                    <EmptyTable message={'No team members yet'} />
                </div>
        }
        </div>

        <ModalWrap modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)} >
            <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent max-w-lg h-fit'>
                <div className='text-center'>
                    <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Invite a member</h4>
                    <form action="" className='flex flex-col gap-5 py-5' onSubmit={handleSubmit}>
                        <FormInput handleChange={handleChange} inputPlaceholder={'Member email address'} inputLabel={' '} inputId={'email'} inputName={'email'} inputType={'email'} />

                        {RolesData.map((role, idx)=>{
                            return <label htmlFor={role.id} key={idx} className='py-3 border-b-0.5 border-brandGray2x last:border-0 flex flex-row md:items-start gap-4'>
                                        <div className={`${formData.role == role.id ? 'border-brandDarkViolet1x border-4' : 'border-brandGray17x border-2'} h-4 w-4 aspect-square rounded-fifty trans-all-500-ease-in-out`}></div>
                                        <div className='text-left'>
                                            <h3 className='font-avenirHeavy text-brandGray12x pb-1'>{role.role}</h3>
                                            <p className='text-xs font-avenirMedium text-brandGray8x'>{role.description}</p>
                                        </div>
                                        <input onChange={handleChange} type="checkbox" name="role" id={role.id} value={role.id} className={'hidden'} />
                                    </label>
                            })}

                        <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
                            <ButtonPrimary text={'Invite member'} type={'submit'} />
                        </div>
                    </form>
                </div>
            </div>
        </ModalWrap>
    </div>
  )
}

export default TeamMember