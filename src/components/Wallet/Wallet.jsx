import React, { useState } from 'react'
import ButtonPrimaryIcon from '../Elements/Buttons/ButtonPrimaryIcon'
import WalletTemplatePage from '../Elements/Wraps/WalletTemplatePage'
import HeroWallet from './HeroWallet'
import WalletAside from './WalletAside/WalletAside'
import WalletHistory from './WalletHistory/WalletHistory'
import useSWR from 'swr'
import axios from 'axios'
import useRequestHeaders from '../../utils/useRequestHeaders'
import useUser from '../../hooks/stores/useUser'
import WalletLoader from './WalletLoader'
import EmptyTable from '../Elements/Sections/EmptyTable'
import PageLoader from '../Elements/Loaders/PageLoader'
import FetchError from '../Errors/FetchError'
import ModalWrap from '../Elements/Modal/ModalWrap'
import WithdrawCashModal from './WithdrawCashModal'
import Alert from '../Elements/Alerts/Alert'

const Wallet = () => {

  const [walletCurrency, setWalletCurrency] = useState('NGN')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

  let walletStats = {
    "wallet_total_balance": 0,
    "wallet_total_inflow": 0,
    "wallet_total_outflow": 0
  }

  const fetcher = async (url) => axios.get(url, requestHeaders)

  const walletStatFetched = useSWR(`${import.meta.env.VITE_BASEURL}/insight/transaction/count?userID=${userDataValue && userDataValue.userID}`, fetcher, {
    onSuccess: (data) => {
      setWalletCurrency(data.data.data.currency)
    },
    onError: (err) => {
      console.error(err);
    }
  })

  const walletDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/wallet/history?userID=${userDataValue && userDataValue.userID}`, fetcher)
  const accountDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/user/virtual-account?userID=${userDataValue && userDataValue.userID}`, fetcher);

  if (!walletStatFetched.data || !walletDataFetched.data || !accountDataFetched.data) return <PageLoader />
  if (walletStatFetched.error || walletDataFetched.error || accountDataFetched.error) return <FetchError />
  // console.log(walletDataFetched.data)
  // console.log(walletStatFetched.data)

  // console.log(walletDataFetched.data && walletDataFetched.data.data.status);
  

  // console.log(walletStatFetched.data);

  walletStats = {
    "wallet_total_balance": walletStatFetched.data && walletStatFetched.data.data.data.wallet_total_balance,
    "wallet_total_inflow": walletStatFetched.data && walletStatFetched.data.data.data.wallet_total_inflow,
    "wallet_total_outflow": walletStatFetched.data && walletStatFetched.data.data.data.wallet_total_outflow
  }

  const accountDataIsFetched = accountDataFetched.data && accountDataFetched.data.data.status

  const virtualAccount = accountDataFetched.data && accountDataFetched.data.data.data

  // const handleFundClick = () => {

  // }
  const handleWithdrawClick = () => {
    setIsModalOpen(true)
  }

  const handleMutate = () => {
    walletDataFetched.mutate()
    walletStatFetched.mutate()
    accountDataFetched.mutate()
  }


  const buttons = <div className='self-end md:self-auto flex xs:flex-col gap-3 items-center'>
    <ButtonPrimaryIcon handleClick={handleWithdrawClick} text={<span>Withdraw <span className='hidden md:inline-block'>Cash</span></span>} />
  </div>


  return (
    <WalletTemplatePage pageLoading={!walletStatFetched.data} pageError={walletStatFetched.error} hasButton={true} buttons={buttons} setWalletCurrency={setWalletCurrency} walletCurrency={walletCurrency} headerTitle={'Wallet'} headerDescription={'Manage All your finances in one place'}>
    {/* <WalletTemplatePage pageLoading={!walletStatFetched.data} pageError={walletStatFetched.error || (walletStatFetched.data && walletStatFetched.data.data.status == false)} hasButton={true} buttons={buttons} setWalletCurrency={setWalletCurrency} walletCurrency={walletCurrency} headerTitle={'Wallet'} headerDescription={'Manage All your finances in one place'}> */}
      
      <HeroWallet openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} isAccount={(accountDataFetched.data && accountDataIsFetched && accountDataFetched.data.data.data.is_account)} walletCurrency={walletCurrency} accountDataFetched={accountDataFetched} walletStats={walletStats} accountDataIsFetched={accountDataIsFetched} virtualAccount={virtualAccount} mutate={handleMutate} />

      <div className='flex flex-col-reverse lg:grid gap-10 grid-cols-3'>
        <div className="col-span-2">
          {
            walletDataFetched.data && walletDataFetched.data.data.status && walletDataFetched.data.data.data.histories && walletDataFetched.data.data.data.histories.length > 0
            ?
            <WalletHistory walletHistoryData={walletDataFetched.data.data.data.histories} />
            :
            <EmptyTable />
          }
        </div>
        <div className="cols-span-1">
          <WalletAside accountDataIsFetched={accountDataIsFetched} virtualAccount={virtualAccount} mutate={handleMutate} walletDataFetched={walletDataFetched} balance={walletStats.wallet_total_balance} currency={walletCurrency} />
        </div>
      </div>

      <ModalWrap id={'withdrawModal'} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)} >
        <WithdrawCashModal currency={walletCurrency} balance={walletStats.wallet_total_balance} mutate={()=>walletStatFetched.mutate()} closeModal={()=>setIsModalOpen(false)} openAlert={openAlert} setOpenAlert={setOpenAlert} alertValues={alertValues} setAlertValues={setAlertValues} />
      </ModalWrap>

      <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />


    </WalletTemplatePage>
  )
}

export default Wallet