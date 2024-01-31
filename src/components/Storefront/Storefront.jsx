import axios from 'axios'
import React, { useState } from 'react'
import dummyStores from '../../data/DummyStores'
import useUser from '../../hooks/stores/useUser'
import useRequestHeaders from '../../utils/useRequestHeaders'
import Alert from '../Elements/Alerts/Alert'
import AddStoreCard from '../Elements/Cards/Store/AddStoreCard'
import StoreCard from '../Elements/Cards/Store/StoreCard'
import PageLoader from '../Elements/Loaders/PageLoader'
import ModalWrap from '../Elements/Modal/ModalWrap'
import TemplatePage from '../Elements/Wraps/TemplatePage'
import FetchError from '../Errors/FetchError'
import CreateStore from './Modals/CreateStore'
import NoStore from './NoStore'
import useSWR from 'swr'

const Storefront = () => {

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

  const storesDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/store/fetch/all?userID=${userDataValue && userDataValue.userID}`, fetcher)

  
  if (!storesDataFetched.data) return <PageLoader />
  if (storesDataFetched.error) return <FetchError />

  // console.log(storesDataFetched.data && storesDataFetched.data.data.data.stores);

  const allStores = storesDataFetched.data && storesDataFetched.data.data.data.stores ? storesDataFetched.data.data.data.stores : []

  const openModal = () => {
    setIsModalOpen(true)
  }


  return (
    <div>
        {
          storesDataFetched.data && allStores && allStores.length > 0
          ?
          <TemplatePage hasButton={true} btnText={`New Store`} handleClick={openModal} headerTitle={'Storefront'} headerDescription={'Sell multiple products on a single page'}>

            <div className='py-10 grid justify-items-center auto-cols-fr md:grid-cols-2 lg:grid-cols-3 gap-7'>
              
              {allStores.map((store, idx)=>{
                return <StoreCard maxWidth={'max-w-sm'} image={store.store_logo} description={store.storefront_desc} id={'store'+(idx+1)} store={store.storefront_name} live={store.live} link={`/store/${store.storefront_slug}`} />
              })}

              <AddStoreCard handleClick={openModal} maxWidth={'max-w-sm w-full h-full'} />
            </div>
          </TemplatePage>
        :
        <TemplatePage centerHeader headerTitle={' '} headerDescription={' '} >
          <NoStore handleClick={openModal} />
        </TemplatePage>
        }

        <ModalWrap key={'createStoreModal'} id={'createStoreModal'} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)}>
          <CreateStore closeModal={()=>setIsModalOpen(false)} alertValues={alertValues} setAlertValues={setAlertValues} setOpenAlert={setOpenAlert} mutate={()=>storesDataFetched.mutate()} />
        </ModalWrap>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default Storefront