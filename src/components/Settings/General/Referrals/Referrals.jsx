import axios from 'axios'
import React, { useState } from 'react'
import useSearchTables from '../../../../hooks/SearchTables'
import useUser from '../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../utils/useRequestHeaders'
import ButtonPrimaryIcon from '../../../Elements/Buttons/ButtonPrimaryIcon'
import ReferralsTable from './ReferralsTable'
import useSWR from 'swr'
import EmptyTable from '../../../Elements/Sections/EmptyTable'

const Referrals = () => {

  const [tab, setTab] = useState('referral')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { requestHeaders } = useRequestHeaders();
  const { userDataValue } = useUser();

  const fetcher = async (url) => axios.get(url, requestHeaders);
  const referralsDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/user/referral?userID=${userDataValue && userDataValue.userID}`, fetcher);

//   console.log(referralsDataFetched.data && referralsDataFetched.data.data.data);
  const dataIsFetched = referralsDataFetched.data && referralsDataFetched.data.data.status

  const { handleSearch, handleBlur, searchQuery } = useSearchTables('', 'referrals-row')
  


  return (
    <div>
        {dataIsFetched && referralsDataFetched.data.data.data && referralsDataFetched.data.data.data.length > 0
        ?
            <div className='pt-8'>
                <div className='py-5 border-b-0.5 border-b-brandGray2x flex flex-col lg:flex-row gap-10 justify-between lg:items-center'>
                        <h2 className='font-avenirHeavy text-lg text-brandGray12x'>Referrals - {dataIsFetched && referralsDataFetched.data.data.data && referralsDataFetched.data.data.data.length}</h2>
                        <div className='flex items-center gap-3 self-end'>
                        <label htmlFor="referralsSearch" className='rounded-ten py-2.5 border flex flex-row items-center gap-2 pl-2 border-brandGray7x w-full sm:w-sixtyPercent max-w-lg bg-white'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.33334 13.3333C10.6471 13.3333 13.3333 10.647 13.3333 7.33325C13.3333 4.01954 10.6471 1.33325 7.33334 1.33325C4.01963 1.33325 1.33334 4.01954 1.33334 7.33325C1.33334 10.647 4.01963 13.3333 7.33334 13.3333Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path opacity="0.4" d="M12.62 13.7931C12.9733 14.8598 13.78 14.9665 14.4 14.0331C14.9666 13.1798 14.5933 12.4798 13.5666 12.4798C12.8066 12.4731 12.38 13.0665 12.62 13.7931Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <input onChange={handleSearch} onBlur={handleBlur} type="search" name="referrals-search" id="referralsSearch" placeholder='Search by Name' className='placeholder:text-xs w-full focus:outline-none focus:ring-none text-sm'/>
                        </label>
                        <ButtonPrimaryIcon handleClick={()=>setIsModalOpen(true)} otherTextStyles={'hidden sm:inline-block'} text={'Get Referral Link'} textWrap={'whitespace-nowrap'} />
                    </div>
                </div>

                <div>
                    <div className='pt-6 overflow-x-auto w-full grid grid-cols-1'>
                        <ReferralsTable referralsData={(dataIsFetched && referralsDataFetched.data.data.data) ? referralsDataFetched.data.data.data : []}  />
                    </div>
                </div>
            </div>
        :
        <div className='pt-8'>
            <div className='py-5 border-b-0.5 border-b-brandGray2x flex flex-col lg:flex-row gap-10 justify-between lg:items-center'>
                    <h2 className='font-avenirHeavy text-lg text-brandGray12x'>Referrals - 0</h2>
            </div>
            <EmptyTable message={`You have zero referrals on Pandascrow`} />
        </div>
        }
    </div>
  )
}

export default Referrals