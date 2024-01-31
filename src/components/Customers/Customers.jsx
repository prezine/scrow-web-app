import React from 'react'
import TemplatePage from '../Elements/Wraps/TemplatePage'
import CustomersHistory from './CustomersHistory'
import axios from 'axios'
import useSWR from 'swr'
import useUser from '../../hooks/stores/useUser'
import useRequestHeaders from '../../utils/useRequestHeaders'
import PageLoader from '../Elements/Loaders/PageLoader'
import FetchError from '../Errors/FetchError'


const Customers = () => {

  const {requestHeaders} = useRequestHeaders()

  const {userDataValue} = useUser()

  const fetcher = async (url) => axios.get(url, requestHeaders)

  const customerDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/customers/fetch?userID=${userDataValue && userDataValue.userID}`, fetcher)

  if (!customerDataFetched.data) return <PageLoader />
  if (customerDataFetched.error) return <FetchError />

  // console.log('customers => ', customerDataFetched.data.data.data.customers);


  return (
    <TemplatePage hasButton={true} btnText={'Import Customers'} headerTitle={'Customers'} headerDescription={'Manage your customers all in one place'} >
      <CustomersHistory customersData={(customerDataFetched.data && customerDataFetched.data.data.data.customers) ? customerDataFetched.data.data.data.customers : []} />
    </TemplatePage>
  )
}

export default Customers