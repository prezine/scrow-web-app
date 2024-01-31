import React, { useMemo, useState } from 'react'
import ApplicationLogs from './ApplicationLogs'
import EventsLog from './EventsLog'
import WebhookLogs from './WebhookLogs'
import useUser from '../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../utils/useRequestHeaders'
import axios from 'axios'
import useSWR from 'swr'
import PageLoaderNoNav from '../../../Elements/Loaders/PageLoaderNoNav'
import FetchErrorNoNav from '../../../Errors/FetchErrorNoNav'

const AuditLog = ({appId, setAuditTab}) => {
  const [tab, setTab] = useState('activities');
  const [query, setQuery] = useState('');
  const { requestHeaders } = useRequestHeaders();
  const { userDataValue } = useUser();

  const fetcher = async (url) => axios.get(url, requestHeaders);
  const auditLogDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/setting/log?userID=${userDataValue && userDataValue.userID}&log_type=${tab}&appid=${appId}`, fetcher);

  // console.log(auditLogDataFetched.data && auditLogDataFetched.data.data.data);
  const dataIsFetched = auditLogDataFetched.data && auditLogDataFetched.data.data.status

  const tabs = [
    {
      tab: 'activities',
      name: 'Events',
      element: <EventsLog auditLogDataFetched={(dataIsFetched && auditLogDataFetched.data) ? (auditLogDataFetched.data.data.data !== null && auditLogDataFetched.data.data.data !== undefined) ? auditLogDataFetched.data.data.data : [] : []} />
    },
    {
      tab: 'api',
      name: 'Application Log',
      element: <ApplicationLogs auditLogDataFetched={(dataIsFetched && auditLogDataFetched.data) ? (auditLogDataFetched.data.data.data !== null && auditLogDataFetched.data.data.data !== undefined) ? auditLogDataFetched.data.data.data : [] : []} />
    },
    {
      tab: 'webhook',
      name: 'Webhook Log',
      element: <WebhookLogs appId={appId} auditLogDataFetched={(dataIsFetched && auditLogDataFetched.data) ? (auditLogDataFetched.data.data.data !== null && auditLogDataFetched.data.data.data !== undefined) ? auditLogDataFetched.data.data.data : [] : []} />
    },
  ];
    
    // const filteredApp = useMemo(() => dummyApps.filter(app => tab === 'connected' ? app.connected : true), [dummyApps, tab]);

    // const searchedApps = useMemo(() => filteredApp.filter(app => app.name.toLowerCase().includes(query.toLowerCase())), [filteredApp, query]);

    const handleSearch = (e) => {
      setQuery(e.target.value);
    };

    if (!auditLogDataFetched.data) return <PageLoaderNoNav />;
    if (auditLogDataFetched.error) return <FetchErrorNoNav />;
    

  return (
    <div className='pt-8'>
        <div className='pb-4 xl:pb-6 border-b-0.5 border-b-brandGray2x flex flex-col sm:flex-row justify-between gap-3 sm:gap-10 sticky top-0 pt-3 xl:pt-6 xl:top-0 left-0 bg-brandGray3x'>
            <div className='flex flex-row gap-3 items-center overflow-x-auto'>
                {tabs.map((item, idx)=>{
                    return <button key={idx} onClick={()=>{setTab(item.tab); setAuditTab(item.tab)}} aria-label={`See ${item.name}`}  className={`py-2 px-7 whitespace-nowrap rounded-fifty trans-all-500-ease-in-out ${item.tab == tab ? 'bg-black text-white' : 'bg-transparent text-brandGray33x hover:bg-brandGray2x'}`}>{item.name}</button>
                })}
            </div>

            <div className='self-end'>
                <label htmlFor="appsSearch" className='rounded-ten py-2.5 border flex flex-row items-center gap-2 pl-2 border-brandGray7x bg-white w-full max-w-xs'>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.33334 13.3333C10.6471 13.3333 13.3333 10.647 13.3333 7.33325C13.3333 4.01954 10.6471 1.33325 7.33334 1.33325C4.01963 1.33325 1.33334 4.01954 1.33334 7.33325C1.33334 10.647 4.01963 13.3333 7.33334 13.3333Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path opacity="0.4" d="M12.62 13.7931C12.9733 14.8598 13.78 14.9665 14.4 14.0331C14.9666 13.1798 14.5933 12.4798 13.5666 12.4798C12.8066 12.4731 12.38 13.0665 12.62 13.7931Z" stroke="#D6D6D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input onChange={handleSearch} type="search" name="appsSearch" id="appsSearch" placeholder='Filter by name' className='placeholder:text-xs w-full bg-transparent focus:outline-none focus:ring-none text-sm bg-white'/>
                </label>
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

export default AuditLog