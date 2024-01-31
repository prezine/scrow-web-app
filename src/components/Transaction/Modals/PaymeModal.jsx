import React, { useEffect, useState } from 'react'
import ButtonPrimaryIcon from '../../Elements/Buttons/ButtonPrimaryIcon'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import axios from 'axios'
import useUser from '../../../hooks/stores/useUser'
import useSWR from 'swr'

const PaymeModal = ({openAlert, alertValues, setOpenAlert, setAlertValues, closeModal, mutate}) => {

  const [submitting, setSubmitting] = useState(false)
  const [nickAvailable, setNickAvailable] = useState('')
  const [nickMessage, setNickMessage] = useState('')

  const {requestHeaders} = useRequestHeaders()

  const {userDataValue} = useUser()

  const fetcher = async (url) => axios.get(url, requestHeaders)

  const formik = useFormik({
    initialValues:{
        nick:'',
    },

    validationSchema:Yup.object({
        nick: Yup.string()
          .min(3, 'Nick should be three or more characters')
          .required('Nick required'),
    })  
  })

  let nickConfirmError = false

 const handleNickChange = (e) => {
  setNickAvailable(false)
  setNickMessage('')
  const formData = new FormData()
  formData.append('userID', `${userDataValue && userDataValue.userID}`)
  formData.append('nick', e.target.value)
  formik.setFieldValue('nick', e.target.value)
  const nickConfirmUrl = `${import.meta.env.VITE_BASEURL}/payme/check-nick?userID=${userDataValue && userDataValue.userID}`
  axios.post(nickConfirmUrl, formData, requestHeaders)
  .then((res)=>{
    console.log(res);
    if(res.data.status == true){
      setNickAvailable(true)
      setNickMessage(res.data.data.message)
    }else{
      setNickAvailable(false)
      setNickMessage(res.data.data.message)
    }
  })
  .catch((err)=>{
    console.error('Payme nick fetch => ', err);
    nickConfirmError = true
  })
 }

 
 const paymeFetched = useSWR(`${import.meta.env.VITE_BASEURL}/payme/fetch-nick?userID=${userDataValue && userDataValue.userID}`, fetcher)


 useEffect(() => {
   if(paymeFetched.data && paymeFetched.data.data.status && paymeFetched.data.data.data.nick){
     formik.setFieldValue('nick', paymeFetched.data.data.data.nick)
   }
 }, [])
 
    
  const handleSubmit = (e) => {
    if(!nickAvailable || formik.errors.nick || formik.values.nick == ''){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('nick', formik.values.nick)


    try {
        axios.post(`${import.meta.env.VITE_BASEURL}/payme/create-nick?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                closeModal()
            }else if (res.data.status == true && res.data.data.message) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
                mutate()
                closeModal()
            }

            setSubmitting(false)
            
        })
        .catch((err)=>{
            console.error(err);
        })
        
    } catch (error) {
        console.error(error)
    }
  }

  
  const icon = <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.16665 5.7668L13.2417 3.40846C16.4167 2.35013 18.1417 4.08346 17.0917 7.25846L14.7333 14.3335C13.15 19.0918 10.55 19.0918 8.96665 14.3335L8.26665 12.2335L6.16665 11.5335C1.40832 9.95013 1.40832 7.35846 6.16665 5.7668Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  <path opacity="0.34" d="M8.42505 11.875L11.4084 8.8833" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

  return (
    <>
        <div className='text-center'>
            <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Payme Transaction</h4>

            <form action="" className='pt-10 flex flex-col gap-5'>
              <fieldset className={`gap-2.5 w-full flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                      <p className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`Enter your Unique Payment Nick`}</p>
                      <label htmlFor='nick' className={`relative w-full flex flex-row items-center gap-0.5 text-sm text-brandBlack1x px-4 py-2.5 rounded-five appearance-none bg-transparent border-2 ${formik.touched.nick && formik.errors.nick ? 'border-brandRed1x focus-within:border-brandRed1x' : 'border-brandGray17x focus-within:border-black'} focus-within:border-2`}>
                        <span className='font-avenirHeavy'>app.pandascrow.io/payme/</span>
                        <input type="text" name='nick' id='nick' onChange={(e)=>handleNickChange(e)} onBlur={formik.handleBlur} value={formik.values.nick} required placeholder={`nick`} className='w-full focus:outline-none font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-r-five bg-transparent' />
                      </label>
                </fieldset>
                <div className='flex justify-end'>
                  {/* {nickCheck && nickCheck.data.account_name} */}
                  {
                    // check if the existing nick name is the same as the one they are trying to pick
                    (paymeFetched.data && paymeFetched.data.data.status && paymeFetched.data.data.data.nick) && paymeFetched.data.data.data.nick == formik.values.nick
                    ?
                    ''
                    :
                    <>
                      {(formik.values.nick.toString().length >= 3 && formik.values.nick && !nickConfirmError &&!nickMessage) && <p className='text-brandGray12x animate-pulse text-xs'>Checking Availability ...</p>}
                      {(nickConfirmError) && <p className='text-brandRed1x animate-pulse text-xs'>Error confirming nick ...</p>}
                      {(formik.values.nick.toString().length >= 3 && nickMessage && !nickConfirmError) && <p className={`${nickAvailable ? 'text-brandGreen1x' : ''} font-avenirBlack text-xs`}>{nickMessage}</p>}
                    </>
                  }
                </div>
              <div className='flex justify-end'>
                <ButtonPrimaryIcon disabled={submitting} disabledBgColor={'bg-brandGray16x'} handleClick={handleSubmit} type={'button'} icon={" "} text={'Update Payme Nick'} bgColor={'bg-brandGreen1x'} flexDirection={'flex-row-reverse'} />
              </div>
            </form>
        </div>
    </>
  )
}

export default PaymeModal