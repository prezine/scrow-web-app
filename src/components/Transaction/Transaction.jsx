import axios from 'axios'
import React, { useState } from 'react'
import useUser from '../../hooks/stores/useUser'
import useRequestHeaders from '../../utils/useRequestHeaders'
import Alert from '../Elements/Alerts/Alert'
import ModalWrap from '../Elements/Modal/ModalWrap'
import TemplatePage from '../Elements/Wraps/TemplatePage'
import TransactionHistory from '../Home/OldUser/TransactionHistory'
import HeroTransaction from './HeroTransaction'
import BanterModal from './Modals/BanterModal'
import CrowdpayModal from './Modals/CrowdpayModal'
import MilestoneModal from './Modals/MilestoneModal'
import OneTimeModal from './Modals/OneTimeModal'
import PaymeModal from './Modals/PaymeModal'
import TransactionModal from './Modals/TransactionModal'
import useSWR from 'swr'
import PageLoader from '../Elements/Loaders/PageLoader'
import FetchError from '../Errors/FetchError'
import ButtonPrimaryIcon from '../Elements/Buttons/ButtonPrimaryIcon'
import CopyPayMeLink from './Payme/CopyPayMeLink'


const Transaction = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInnerModalOpen, setIsInnerModalOpen] = useState(false)
  const [currentModal, setCurrentModal] = useState(0)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

  
  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  let transactionStats = {
    "transaction_total_revenue": 0,
    "transaction_total_expenses": 0,
    "transaction_escrow_balance": 0
  }

  let transactionCurrency = 'NGN'

  const fetcher = async (url) => axios.get(url, requestHeaders)

  const transactionDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/transaction/fetch?userID=${userDataValue && userDataValue.userID}`, fetcher)

  const transactionStatFetched = useSWR(`${import.meta.env.VITE_BASEURL}/insight/transaction/count?userID=${userDataValue && userDataValue.userID}`, fetcher)
  const paymeFetched = useSWR(`${import.meta.env.VITE_BASEURL}/payme/fetch-nick?userID=${userDataValue && userDataValue.userID}`, fetcher)
  
  if (!transactionDataFetched.data || !transactionStatFetched.data || !paymeFetched.data) return <PageLoader />
  if (transactionDataFetched.error || transactionStatFetched.error || paymeFetched.error) return <FetchError />
  
  const historyFetchStatus = transactionDataFetched.data && transactionDataFetched.data.data.status 
  // console.log(transactionDataFetched.data);

  transactionStats = {
    "transaction_total_revenue": historyFetchStatus && transactionStatFetched.data.data.data.transaction_total_revenue ? transactionStatFetched.data.data.data.transaction_total_revenue : 0,
    "transaction_total_expenses": historyFetchStatus && transactionStatFetched.data.data.data.transaction_total_expenses ? transactionStatFetched.data.data.data.transaction_total_expenses : 0,
    "transaction_escrow_balance": historyFetchStatus && transactionStatFetched.data.data.data.transaction_escrow_balance ? transactionStatFetched.data.data.data.transaction_escrow_balance : 0
  }

  transactionCurrency = transactionStatFetched.data.data.data.currency


  const handleInnerModals = (index) => {
    setCurrentModal(index)
    setIsInnerModalOpen(true)
    setIsModalOpen(false)
}

const closeInnerModal = () => {
    setIsInnerModalOpen(false)
    setIsModalOpen(true)
}

const closeBothModals = () => {
  setIsInnerModalOpen(false)
  setIsModalOpen(false)
}
const buttons = <div className='self-end md:self-auto xs:flex-col xs:items-end bxs:flex-col bxs:items-end flex flex-row items-center gap-3'>
  {paymeFetched.data && paymeFetched.data.data.status && <CopyPayMeLink title={`Copy link for ${paymeFetched.data.data.status && paymeFetched.data.data.data.nick}`} ariaLabel={`Copy link for ${paymeFetched.data.data.status && paymeFetched.data.data.data.nick}`} text={paymeFetched.data.data.status && paymeFetched.data.data.data.url} />}
  <ButtonPrimaryIcon handleClick={()=>{setIsModalOpen(true)}}  />
</div>


  if (transactionDataFetched.data)


  return (
    <TemplatePage hasButton={true} buttons={buttons} handleClick={()=>{setIsModalOpen(true)}} headerTitle={'Transaction'} headerDescription={'Insight of all Escrow transactions on Pandascrow'}>
      <div className='py-5'>
        <HeroTransaction transactionStats={transactionStats} transactionCurrency={transactionCurrency} />
      </div>

      <div>
        <TransactionHistory mutate={()=>transactionDataFetched.mutate()} fetched={transactionDataFetched} transactionHistoryData={historyFetchStatus ? transactionDataFetched.data.data.data : []} />
      </div>

      <ModalWrap key={'transactionModal'} id={'transactionModal'} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)}>
        <TransactionModal handleModal={setIsModalOpen} handleInnerModals={handleInnerModals} setCurrentModal={setCurrentModal} />
      </ModalWrap>

      <ModalWrap key={'transactionInnerModals'} id={'transactionInnerModals'} modalState={isInnerModalOpen} handleModal={closeInnerModal}>
          <div className={`${currentModal !== 3 ? 'bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent h-fit' : 'bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-sm h-fit'}`}>
          {currentModal == 0 && <OneTimeModal key={0} openAlert={openAlert} mutate={()=>transactionDataFetched.mutate()} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeBothModals} />}
            {currentModal == 1 && <MilestoneModal key={1} openAlert={openAlert} mutate={()=>transactionDataFetched.mutate()} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeBothModals} />}
            {currentModal == 2 && <CrowdpayModal key={2} openAlert={openAlert} mutate={()=>transactionDataFetched.mutate()} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeBothModals} />}
            {currentModal == 3 && <PaymeModal key={3} openAlert={openAlert} mutate={()=>{transactionDataFetched.mutate(); paymeFetched.mutate()}} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeBothModals} />}
            {currentModal == 4 && <BanterModal key={4} openAlert={openAlert} mutate={()=>transactionDataFetched.mutate()} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeBothModals} />}
          </div>
      </ModalWrap>

      <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </TemplatePage>
  )
}

export default Transaction