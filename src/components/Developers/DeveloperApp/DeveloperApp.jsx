import axios from 'axios'
import React, { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import useUser from '../../../hooks/stores/useUser'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import PageLoader from '../../Elements/Loaders/PageLoader'
import AppTemplatePage from '../../Elements/Wraps/AppTemplatePage'
import FetchError from '../../Errors/FetchError'
import AppInfo from './AppInfo'
import useSWR from 'swr'
import EmptyTable from '../../Elements/Sections/EmptyTable'

const DeveloperApp = ({appsData}) => {
    const location = useLocation()
    const currentAppId = location.pathname.split('/')[3]
    // const [appData, setAppData] = useState([])

    // useMemo(() =>{
    //     let tempData = []
        
    //     setAppData(tempData)
    // },[location, currentAppId])

    let walletStats = {
      "wallet_total_balance": 0,
      "currency": "NGN",
      "developer_credit_balance":0
    }

        
  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const fetcher = async (url) => axios.get(url, requestHeaders)

  const appsDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/app/fetch?userID=${userDataValue && userDataValue.userID}`, fetcher)
  const walletStatFetched = useSWR(`${import.meta.env.VITE_BASEURL}/insight/transaction/count?userID=${userDataValue && userDataValue.userID}`, fetcher)
  const developerStatFetched = useSWR(`${import.meta.env.VITE_BASEURL}/insight/developer/count??userID=${userDataValue && userDataValue.userID}&appid=${currentAppId}`, fetcher)

  
    if (!appsDataFetched.data || !walletStatFetched.data || !developerStatFetched.data) return <PageLoader />
    if (appsDataFetched.error || walletStatFetched.error || developerStatFetched.error) return <FetchError />

    walletStats = {
      "wallet_total_balance": walletStatFetched.data && walletStatFetched.data.data.data.wallet_total_balance,
      "currency": walletStatFetched.data && walletStatFetched.data.data.data.currency,
      "developer_credit_balance": developerStatFetched.data && developerStatFetched.data.data.data.credit_balance,
    }

    // console.log(appsDataFetched.data && appsDataFetched.data.data.data.apps);
    // console.log(developerStatFetched.data && developerStatFetched.data.data.data);

    const allApps = appsDataFetched.data && appsDataFetched.data.data.data.apps ? appsDataFetched.data.data.data.apps : []

    const appData = allApps.filter(app => app.appid === currentAppId)

    // appData && console.log(appData)

    const mutateData = () => {
      appsDataFetched.mutate(); 
      walletStatFetched.mutate(); 
      developerStatFetched.mutate()
    }


  return (
    <AppTemplatePage appName={`${(appData && appData.length > 0 && appData[0].appname) ? appData[0].appname : ' '}`}>
        <div>
          {
            (appData && appData.length > 0 && appData[0].appname)
            ?
            <>
              {appData.map((data, idx)=>{
              return <div><AppInfo key={idx} mutate={()=>{mutateData()}} appData={appData} status={data.status}  walletBalance={walletStats.wallet_total_balance} walletCurrency={walletStats.currency} developerCredits={walletStats.developer_credit_balance} appIcon={data.appicon} isLive={data.is_live} appDescription={data.appdescription} webhook={data.webhook_url} appId={data.appid} appName={data.appname} displayName={data.display_name} product={data.products} scope={data.scope} apiCalls={data.appdata.api_call_count} created={data.dateCreated} publicKey={data.public_key} secretKey={data.secret_key} encryptionKey={data.encryption_key} webhook_url={data.webhook_url} /></div>
              })}
            </>
            :
            <div className='flex flex-col items-center '>
              <EmptyTable paddingY={'pt-40 pb-10'} message={'This app does not exist or may have been deleted.'} />
              <NavLink to={'/developers'} className={`py-2.5 px-4 rounded-lg text-white bg-brandDarkViolet1x font-avenirMedium`}>See all apps</NavLink>
            </div>
          }
          
        </div>
    </AppTemplatePage>
  )
}

export default DeveloperApp