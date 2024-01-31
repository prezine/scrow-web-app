import axios from 'axios'
import React, { useState } from 'react'
import DummyApps from '../../data/DummyApps'
import useUser from '../../hooks/stores/useUser'
import useRequestHeaders from '../../utils/useRequestHeaders'
import Alert from '../Elements/Alerts/Alert'
import AddNewApp from '../Elements/Cards/Developer/AddNewApp'
import DeveloperAppCard from '../Elements/Cards/Developer/DeveloperAppCard'
import PageLoader from '../Elements/Loaders/PageLoader'
import ModalWrap from '../Elements/Modal/ModalWrap'
import TemplatePage from '../Elements/Wraps/TemplatePage'
import FetchError from '../Errors/FetchError'
import CreateApp from './CreateApp'
import useSWR from 'swr'

const Developers = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

    
  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const fetcher = async (url) => axios.get(url, requestHeaders)

  const appsDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/app/fetch?userID=${userDataValue && userDataValue.userID}`, fetcher)

  
  if (!appsDataFetched.data) return <PageLoader />
  if (appsDataFetched.error) return <FetchError />

  // console.log(appsDataFetched.data && appsDataFetched.data.data.data.apps);

  const allApps = appsDataFetched.data && appsDataFetched.data.data.data.apps ? appsDataFetched.data.data.data.apps : []


  const openModal = () => {
    setIsModalOpen(true)
  }



  return (
    <TemplatePage hasButton={true} handleClick={openModal} btnText={'Create new app'} headerTitle={'Developer'} headerDescription={'Create, Manage, and Build with Pandascrow'}>
      <div className='py-10 grid justify-items-center auto-cols-fr md:grid-cols-2 lg:grid-cols-3 gap-7'>
        
        {allApps.map((app, idx)=>{
          return <DeveloperAppCard maxWidth={'max-w-sm'} image={app.appicon} id={'app'+(idx+1)} app={app.appname} link={`./app/${app.appid}`}>
             {app.products.toLowerCase() == 'kyc' && <div className={`px-2.5 py-0.5 rounded-five text-sm ${app.products.toLowerCase() == 'kyc' && 'text-brandOrange2x bg-brandPeach1x'}`} key={'tag'+(idx+1)}>{app.products}</div>}
             {app.products.toLowerCase() == 'escrow' && <div className={`px-2.5 py-0.5 rounded-five text-sm ${app.products.toLowerCase() == 'escrow' && 'text-brandBlue1x bg-brandLightBlue3x'}`} key={'tag'+(idx+1)}>{app.products}</div>}
             {app.products.toLowerCase() == 'checkout' && <div className={`px-2.5 py-0.5 rounded-five text-sm ${app.products.toLowerCase() == 'checkout' && 'text-brandGreen1x bg-brandLightGreen3x'}`} key={'tag'+(idx+1)}>{app.products}</div>}
             {app.products.toLowerCase() == 'virtual card' && <div className={`px-2.5 py-0.5 rounded-five text-sm ${app.products.toLowerCase() == 'virtual card' && 'text-brandBlue3x bg-brandLightBlue1x'}`} key={'tag'+(idx+1)}>{app.products}</div>}
             {app.products.toLowerCase() == 'banking' && <div className={`px-2.5 py-0.5 rounded-five text-sm ${app.products.toLowerCase() == 'banking' && 'text-brandYellow3x bg-brandLightYellow2x'}`} key={'tag'+(idx+1)}>{app.products}</div>}
             {app.products.toLowerCase() == 'bills' && <div className={`px-2.5 py-0.5 rounded-five text-sm ${app.products.toLowerCase() == 'bills' && 'text-brandRed1x bg-brandLightRed1x'}`} key={'tag'+(idx+1)}>{app.products}</div>}
             {app.products.toLowerCase() == 'storefront' && <div className={`px-2.5 py-0.5 rounded-five text-sm ${app.products.toLowerCase() == 'storefront' && 'text-brandOrange1x bg-brandLightOrange1x'}`} key={'tag'+(idx+1)}>{app.products}</div>}
          </DeveloperAppCard>
        })}

        <AddNewApp handleClick={openModal} maxWidth={' max-w-sm w-full h-full'} />

        <ModalWrap key={'createAppModal'} id={'createAppModal'} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)}>
          <CreateApp closeModal={()=>setIsModalOpen(false)} alertValues={alertValues} setAlertValues={setAlertValues} setOpenAlert={setOpenAlert} mutate={()=>appsDataFetched.mutate()} />
        </ModalWrap>
      </div>
      <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
    </TemplatePage>
  )
}

export default Developers