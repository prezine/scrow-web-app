import React, { useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import TemplatePage from '../../Elements/Wraps/TemplatePage'
import Orders from './Orders/Orders'
import Products from './Products/Products'
import Customize from './Customize/Customize'
import StoreSettings from './StoreSettings/StoreSettings'
import useUser from '../../../hooks/stores/useUser'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import axios from 'axios'
import PageLoader from '../../Elements/Loaders/PageLoader'
import EmptyTable from '../../Elements/Sections/EmptyTable'
import ButtonPrimaryIcon from '../../Elements/Buttons/ButtonPrimaryIcon'
import ModalWrap from '../../Elements/Modal/ModalWrap'
import FetchError from '../../Errors/FetchError'
import useSWR from 'swr'
import NewProduct from '../Modals/NewProduct'
import Alert from '../../Elements/Alerts/Alert'
import EditStore from '../Modals/EditStore'
import StorePro from './StorePro/StorePro'
import ErrorPageNotFound from '../../ErrorPageNotFound'

const Store = () => {

    const location = useLocation()
    const [currentSlug, setCurrentSlug] = useState(location.pathname.split('/')[2])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })
    
    const {userDataValue} = useUser()
    const {requestHeaders} = useRequestHeaders()


    const [tab, setTab] = useState('orders')

    const fetcher = async (url) => axios.get(url, requestHeaders)

    const storesDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/store/fetch?userID=${userDataValue && userDataValue.userID}&slug=${currentSlug}`, fetcher)
    const productsDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/store/product/fetch?userID=${userDataValue && userDataValue.userID}&storeID=${storesDataFetched.data && storesDataFetched.data.data.data.storeID}`, fetcher)
    const ordersDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/store/order?userID=${userDataValue && userDataValue.userID}&storeID=${storesDataFetched.data && storesDataFetched.data.data.data.storeID}`, fetcher)


    
    if (!storesDataFetched.data || !productsDataFetched.data || !ordersDataFetched.data) return <PageLoader />
    if (storesDataFetched.error || productsDataFetched.error || ordersDataFetched.error) return <FetchError />

    const isPro = (userDataValue && userDataValue.account_plan) ? userDataValue.account_plan.toLowerCase() == 'pandascrow-pro' : false


    // console.log(storesDataFetched.data && storesDataFetched.data.data);
    // console.log(productsDataFetched.data && productsDataFetched.data.data.data);
    // console.log(ordersDataFetched.data && ordersDataFetched.data.data.data);

    const currentStore = storesDataFetched.data && storesDataFetched.data.data.data ? storesDataFetched.data.data.data : {}
    const hasStore = ordersDataFetched.data && ordersDataFetched.data.data.data && ordersDataFetched.data.data.status

    // if(storesDataFetched.data && !storesDataFetched.data.data.status) return <ErrorPageNotFound message={'Store does not exist or may have been deleted.'} />

    const options = [
        {
            name:"Orders",
            altName:"Orders",
            tab:"orders",
            section:<Orders mutate={()=>ordersDataFetched.mutate()} storeID={currentStore && currentStore.storeID} ordersData={(hasStore) ? ordersDataFetched.data.data.data : []} />
        },
        {
            name:"Products",
            altName:"Products",
            tab:"products",
            section:<Products storeID={currentStore && currentStore.storeID} mutate={()=>productsDataFetched.mutate()} productsDataFetched={productsDataFetched.data && productsDataFetched.data.data.status && productsDataFetched.data.data.data && productsDataFetched.data.data.data.length > 0 ? productsDataFetched.data.data.data : [] } />
        },
        {
            name:"Customize Storefront",
            altName:"Customize",
            tab:"customize",
            section:<Customize store={currentStore ? currentStore.storefront_name : ''} storefront_color={currentStore ? currentStore.storefront_color : ''} />
        },
        {
            name:<div className={`flex gap-2 items-center`}>
                Storefront Pro
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M3.5 5.83366V4.66699C3.5 2.73616 4.08333 1.16699 7 1.16699C9.91667 1.16699 10.5 2.73616 10.5 4.66699V5.83366" stroke="#2A2AB3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.9165 12.833H4.08317C1.74984 12.833 1.1665 12.2497 1.1665 9.91634V8.74967C1.1665 6.41634 1.74984 5.83301 4.08317 5.83301H9.9165C12.2498 5.83301 12.8332 6.41634 12.8332 8.74967V9.91634C12.8332 12.2497 12.2498 12.833 9.9165 12.833Z" stroke="#2A2AB3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.4" d="M9.33143 9.33366H9.33667" stroke="#2A2AB3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.4" d="M6.99745 9.33366H7.00269" stroke="#2A2AB3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.4" d="M4.66346 9.33366H4.6687" stroke="#2A2AB3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>,
            altName:"Storefront Pro",
            tab:"pro",
            section:<StorePro mutate={()=>storesDataFetched.mutate()} />
        },
    ]



    const tabTogglers = document.querySelectorAll('.toggle-btn');

    tabTogglers && tabTogglers.forEach(toggler => {
    toggler.addEventListener('click', () => {
        const currentTab = toggler.getAttribute('data-tab');

        // scroll to the active tab toggler's element horizontally
        const activeToggler = document.querySelector(`[data-tab="${currentTab}"]`);
        activeToggler.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    });


    const storeButtons = <div className='self-end flex xs:flex-col xs:items-end bxs:flex-col bxs:items-end flex-row gap-5 items-center'>
        <button onClick={()=>{setIsEditModalOpen(true)}} type='button' className='flex flex-row items-center w-fit py-2 text-sm px-4 rounded-forty gap-3 font-spaceGroteskBold text-brandDarkViolet1x border-2 border-brandDarkViolet1x'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M17.5 18.3335H2.5C2.15833 18.3335 1.875 18.0502 1.875 17.7085C1.875 17.3668 2.15833 17.0835 2.5 17.0835H17.5C17.8417 17.0835 18.125 17.3668 18.125 17.7085C18.125 18.0502 17.8417 18.3335 17.5 18.3335Z" fill="#2A2AB3"/>
                <path opacity="0.4" d="M15.85 2.90005C14.2333 1.28338 12.65 1.24172 10.9916 2.90005L9.98331 3.90838C9.89998 3.99172 9.86665 4.12505 9.89998 4.24172C10.5333 6.45005 12.3 8.21672 14.5083 8.85005C14.5416 8.85838 14.575 8.86672 14.6083 8.86672C14.7 8.86672 14.7833 8.83338 14.85 8.76672L15.85 7.75838C16.675 6.94172 17.075 6.15005 17.075 5.35005C17.0833 4.52505 16.6833 3.72505 15.85 2.90005Z" fill="#2A2AB3"/>
                <path d="M13.0084 9.60817C12.7668 9.4915 12.5334 9.37484 12.3084 9.2415C12.1251 9.13317 11.9501 9.0165 11.7751 8.8915C11.6334 8.79984 11.4668 8.6665 11.3084 8.53317C11.2918 8.52484 11.2334 8.47484 11.1668 8.40817C10.8918 8.17484 10.5834 7.87484 10.3084 7.5415C10.2834 7.52484 10.2418 7.4665 10.1834 7.3915C10.1001 7.2915 9.95844 7.12484 9.83344 6.93317C9.73344 6.80817 9.61677 6.62484 9.50844 6.4415C9.3751 6.2165 9.25844 5.9915 9.14177 5.75817C9.0251 5.50817 8.93344 5.2665 8.8501 5.0415L3.61677 10.2748C3.50844 10.3832 3.40844 10.5915 3.38344 10.7332L2.93344 13.9248C2.8501 14.4915 3.00844 15.0248 3.35844 15.3832C3.65844 15.6748 4.0751 15.8332 4.5251 15.8332C4.6251 15.8332 4.7251 15.8248 4.8251 15.8082L8.0251 15.3582C8.1751 15.3332 8.38344 15.2332 8.48344 15.1248L13.7168 9.8915C13.4834 9.80817 13.2584 9.7165 13.0084 9.60817Z" fill="#2A2AB3"/>
            </svg>
            Edit Store
        </button>
        {tab == 'products' && <ButtonPrimaryIcon flexDirection={'self-end'} handleClick={()=>{setIsModalOpen(true)}} text={'Upload Product'} />}
    </div>

  return (
    <>
    {
        storesDataFetched.data && storesDataFetched.data.data.status
        ?
        <TemplatePage wrapDisplay={'md:flex flex-col md:h-full'} hasButton={true} buttons={storeButtons} headerTitle={<span className='flex flex-row items-center gap-2 text-black'><span className='capitalize'>{currentStore ? currentStore.storefront_name : ''}</span> - Storefront</span>} headerDescription={currentStore ? currentStore.storefront_desc : ''}>
            <div className='pt-11 border-b-0.5 border-b-brandGray2x'>
                <div id={'container'} className='flex flex-container items-center gap-2 overflow-x-auto'>
                    {options.map((option, idx)=>{
                        return <button disabled={option.tab == 'pro' && !isPro} key={idx} data-tab={option.tab} id={option.tab} onClick={()=>setTab(option.tab)} className={`toggle-btn ${tab == option.tab ? 'text-brandDarkViolet1x border-b border-b-brandDarkViolet1x' : 'text-brandGray34x hover:text-brandDarkViolet1x/50 hover:border-b hover:border-b-brandDarkViolet1x/50 disabled:hover:border-0 disabled:hover:text-brandGray34x'} trans-all-500-ease-in-out whitespace-nowrap pb-1.5 text-sm font-spaceGroteskRegular px-2`} type='button' aria-label={`View ${option.altName} section. ${(option.tab == 'pro' && !isPro) ? 'Unlock with Pro' : ''}`} title={`View ${option.altName} section. ${(option.tab == 'pro' && !isPro) ? 'Unlock with Pro' : ''}`}>
                                    {option.name}
                                </button>
                    })}
                </div>
            </div>
            <div className={`${tab == 'customize' ? 'pt-8 h-full' : 'py-8'}`}>
                {options.filter(option => option.tab == tab).map((opt, idx)=>{
                    return <div className={`${tab == 'customize' ? 'md:h-full' : ''}`} key={idx}>{opt.section}</div>
                })}
            </div>

        </TemplatePage>
        :
        <TemplatePage headerTitle={' '} headerDescription={' '}>
            <div className='flex flex-col items-center '>
                <EmptyTable paddingY={'pt-40 pb-10'} message={'This store does not exist or may have been deleted.'} />
                <NavLink to={'/store'} className={`py-2.5 px-4 rounded-lg text-white bg-brandDarkViolet1x font-avenirMedium`}>See all stores</NavLink>
            </div>
        </TemplatePage>
    }
   {
       storesDataFetched.data && storesDataFetched.data.data.status
       &&
       <>
         <ModalWrap key={'uploadProductModal'} id={'uploadProductModalWrap'} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)}>
            <NewProduct closeModal={()=>setIsModalOpen(false)} openAlert={openAlert} setAlertValues={setAlertValues} alertValues={alertValues} setOpenAlert={setOpenAlert} storeID={currentStore && currentStore.storeID} mutate={()=>productsDataFetched.mutate()} />
        </ModalWrap>
        <ModalWrap key={'editStoreModal'} id={'editStoreModalWrap'} modalState={isEditModalOpen} handleModal={()=>setIsEditModalOpen(false)}>
            <EditStore closeModal={()=>setIsEditModalOpen(false)} storeData={currentStore} openAlert={openAlert} setAlertValues={setAlertValues} alertValues={alertValues} setOpenAlert={setOpenAlert} storeID={currentStore && currentStore.storeID} mutate={()=>productsDataFetched.mutate()} />
        </ModalWrap>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
       </>
   }
    </>
  )
}

export default Store