import React, { useState } from 'react'
import BillingHistory from './BillingHistory'
import BillingOverview from './BillingOverview'
import BillPlan from './BillPlan'
import useUser from '../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../utils/useRequestHeaders'
import axios from 'axios'
import useSWR from 'swr'
import PageLoaderNoNav from '../../../Elements/Loaders/PageLoaderNoNav'
import FetchErrorNoNav from '../../../Errors/FetchErrorNoNav'

const BillingPlan = () => {
  const [tab, setTab] = useState('overview')

  const { requestHeaders } = useRequestHeaders();
  const { userDataValue } = useUser();

  const fetcher = async (url) => axios.get(url, requestHeaders);
  const billingsDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/setting/billing?userID=${userDataValue && userDataValue.userID}`, fetcher);


  if (!billingsDataFetched.data) return <PageLoaderNoNav />
  if (billingsDataFetched.error) return <FetchErrorNoNav />

//   console.log(billingsDataFetched.data && billingsDataFetched.data.data.data);
  const dataIsFetched = billingsDataFetched.data && billingsDataFetched.data.data.status

  const tabs = [
      {
          tab:'overview',
          name:'Overview',
          element:<BillingOverview mutate={()=>billingsDataFetched.mutate()} paymentData={(dataIsFetched && billingsDataFetched.data.data.data) ? billingsDataFetched.data.data.data : []} />
      },
      {
          tab:'plans',
          name:'Plans',
          element:<BillPlan mutate={()=>billingsDataFetched.mutate()} paymentData={(dataIsFetched && billingsDataFetched.data.data.data) ? billingsDataFetched.data.data.data : []} />
      },
      {
          tab:'history',
          name:'History',
          element:<BillingHistory mutate={()=>billingsDataFetched.mutate()} paymentData={(dataIsFetched && billingsDataFetched.data.data.data) ? billingsDataFetched.data.data.data : []} />
      },
  ]

  

  return (
    <div className='pt-8'>
       <div className='pb-4 xl:pb-6 border-b-0.5 border-b-brandGray2x flex flex-col sm:flex-row justify-between gap-3 sm:gap-10 sticky top-0 pt-3 xl:pt-6 xl:top-0 left-0 bg-brandGray3x z-20'>
            <div className='flex flex-row gap-3 items-center overflow-x-auto'>
                {tabs.map((item, idx)=>{
                    return <button key={idx} onClick={()=>setTab(item.tab)} aria-label={`See ${item.name}`}  className={`py-2 px-7 whitespace-nowrap rounded-fifty trans-all-500-ease-in-out ${item.tab == tab ? 'bg-black text-white' : 'bg-transparent text-brandGray33x hover:bg-brandGray2x'}`}>{item.name}</button>
                })}
            </div>
        </div>

        <div className='py-5'>
            {tabs.filter(item => item.tab == tab).map((singleItem, idx)=>{
                return <div key={idx}>{singleItem.element}</div>
            })}
        </div>
    </div>
  )
}

export default BillingPlan