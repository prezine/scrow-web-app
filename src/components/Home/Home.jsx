import React, { useState } from 'react'
import useUser from '../../hooks/stores/useUser'
import PageLoader from '../Elements/Loaders/PageLoader'
import SetupLoader from '../Elements/Loaders/SetupLoader'
import Alert from '../Elements/Alerts/Alert'
import NewUser from './NewUser/NewUser'
import OldUser from './OldUser/OldUser'
import axios from 'axios'
import useRequestHeaders from '../../utils/useRequestHeaders'

const Home = () => {

  const {userDataValue} = useUser()

  const [isNewUser, setIsNewUser] = useState(true)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

  const [error, setError] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const {requestHeaders} = useRequestHeaders()



  if(!userDataValue) return <PageLoader />

  const ver_request = userDataValue && userDataValue.kyc_status.send_verrequest
  const is_approved = userDataValue && userDataValue.kyc_status.is_approved


  const handleSubmitClick = () => {

    setError(false)
    
    setOpenAlert(false)
    setSubmitting(true)

    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('send_verrequest', true)

    try {
          // const formValues = Object.fromEntries(formData.entries());
          //   console.log(formValues);

      axios.post(`${import.meta.env.VITE_BASEURL}/compliance/submit?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
      .then((res)=>{
        // console.log(res);
          if(res.data.status == false && res.data.data.message){
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
              console.log(res.data.data.message);
          }else if (res.data.status == true && res.data.data.message) {
              setError(true)
              setOpenAlert(true)
              setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`success` })
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

  // console.log("Is Approved: " + !is_approved);
  // console.log('Home', userDataValue.kyc_status.progress);


  return (
    <div className='relative'>
        <div className=''>

          {/* setup checking for verification request */}
          <div>
            {(submitting && (userDataValue && (userDataValue.kyc_status.progress == 100))) ? <SetupLoader /> : ''}
            {(ver_request && (userDataValue && (userDataValue.kyc_status.progress == 100))) ? <OldUser /> : ''}
            {(!is_approved || !ver_request) ? <NewUser handleSubmitClick={handleSubmitClick} submitting={submitting} /> : ''}
          </div>

             {/* setup to toggle based on kyc progress */}
            {/* {(userDataValue && (userDataValue.kyc_status.progress == 100)) ? <OldUser /> : <NewUser handleSubmitClick={handleSubmitClick} />} */}


            {/* setup to toggle based on kyc progress and approval*/}
            {/* {(userDataValue && (userDataValue.kyc_status.is_approved == 1 && userDataValue.kyc_status.progress == 100)) ? <OldUser /> : <NewUser handleSubmitClick={handleSubmitClick} />} */}
            
            {/* setup to control page view without database information */}
            {/* {isNewUser ? <NewUser handleSubmitClick={handleSubmitClick} /> : <OldUser />} */}
        </div>

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default Home