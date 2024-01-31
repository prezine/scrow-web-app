import React, { useEffect, useState } from 'react'
import ButtonPrimary from '../../../Elements/Buttons/ButtonPrimary'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useUser from '../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../utils/useRequestHeaders'
import axios from 'axios'

const WebHookModal = ({type, appid, webhook, modalState, closeModal, setOpenAlert, setAlertValues, alertValues, mutate}) => {

  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const [submitting, setSubmitting] = useState(false)

  const formik = useFormik({
      initialValues:{
          webhook_url:"",
      },
      validationSchema:Yup.object({
          webhook_url: Yup
          .string()
          // .url('Invalid URL format')
          .required('Webhook URL required'),
      })
  })

  useEffect(() => {
    if(webhook){
      formik.setFieldValue('webhook_url', webhook.split('https://')[1])
    }
  }, [])

  useEffect(() => {
    if(webhook){
      formik.setFieldValue('webhook_url', webhook.split('https://')[1])
    }
  }, [modalState])
  
  

    
  const handleSubmit = (e) => {
    if(formik.errors.webhook_url || formik.values.webhook_url == ''){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)

    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('appid', appid)
    formData.append('webhook_url', `https://${formik.values.webhook_url}`)
    
    try {

      axios.post(`${import.meta.env.VITE_BASEURL}/app/update?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
      .then((res)=>{
        console.log(res);
          if(res.data.status == false && res.data.data.message){
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
              closeModal()
              console.log(res.data.data.message);
          }else if (res.data.status == true && res.data.data.message) {
              formik.resetForm()
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`success` })
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

  

  return (
    <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-10 z-50 w-ninetyFivePercent max-w-lg h-fit'>
        <div className='text-center'>
            <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>{type || 'Update'} Webhook</h4>

            <form action="" className='pt-10 flex flex-col gap-5'>
              <fieldset className={`gap-2.5 w-full flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                      <p className='text-sm font-avenirMedium text-black text-left'>{`Webhook URL`}</p>
                      <label htmlFor='webhook_url' className={`relative w-full flex flex-row items-center gap-0.5 text-sm text-brandBlack1x px-4 py-2.5 rounded-five appearance-none bg-transparent border-2 ${(formik.touched.webhook_url && !webhook || formik.touched.webhook_url && formik.errors.webhook_url) ? 'border-brandRed1x focus-within:border-brandRed1x' : 'border-brandGray16x focus-within:border-black'} focus-within:border-2`}>
                        <span className='font-avenirHeavy'>https://</span>
                        <input type="text" name='webhook_url' id='webhook_url' onChange={formik.handleChange} onBlur={formik.handleBlur} required placeholder={`example.com/webhook`} value={formik.values.webhook_url} className='w-full focus:outline-none font-spaceGroteskLight text-sm text-black placeholder:text-brandGray32x rounded-r-five bg-transparent' />
                      </label>
                </fieldset>
                {/* {formik.errors.webhook_url} */}
              <div className='flex justify-center py-4'>
                <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} type={'button'} text={`${type || type} Webhook`} bgColor={'bg-brandGreen1x'} flexDirection={'flex-row-reverse'} />
              </div>
            </form>
        </div>
    </div>
  )
}

export default WebHookModal