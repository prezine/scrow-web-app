import React, {useEffect, useState} from 'react'
import FormSwitch from '../../../Elements/Form/FormSwitch'
import VerifyEmailTwoFAModal from './Modals/VerifyEmailTwoFAModal'
import AuthAppModal from './Modals/AuthAppModal'


const TwoFA = () => {

  const twoFAData = [
    {
      iconCircleColor:"fill-brandDarkOrange4x",
      icon:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#2698D9"/>
      <path opacity="0.4" d="M20 30C25.5228 30 30 25.5228 30 20C30 14.4772 25.5228 10 20 10C14.4772 10 10 14.4772 10 20C10 25.5228 14.4772 30 20 30Z" fill="white"/>
      <path d="M23.7501 18.73V18C23.7501 17.07 23.7501 14.25 20.0001 14.25C16.2501 14.25 16.2501 17.07 16.2501 18V18.73C15.0301 19 14.6201 19.79 14.6201 21.5V22.5C14.6201 24.7 15.3001 25.38 17.5001 25.38H22.5001C24.7001 25.38 25.3801 24.7 25.3801 22.5V21.5C25.3801 19.79 24.9701 19 23.7501 18.73ZM20.0001 23.1C19.3901 23.1 18.9001 22.61 18.9001 22C18.9001 21.39 19.3901 20.9 20.0001 20.9C20.6101 20.9 21.1001 21.39 21.1001 22C21.1001 22.61 20.6101 23.1 20.0001 23.1ZM22.2501 18.62H17.7501V18C17.7501 16.54 18.1101 15.75 20.0001 15.75C21.8901 15.75 22.2501 16.54 22.2501 18V18.62Z" fill="white"/>
      </svg>,
      name:"Email Address",
      description:"Use your account email address to receive security codes",
      actionType:"toggle",
      switchId:"email",
      switchName:"email"
    },
    {
      iconCircleColor:"fill-brandDarkOrange1x",
      icon:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#D2830D"/>
      <path d="M23 30C22.59 30 22.25 29.66 22.25 29.25V10.75C22.25 10.34 22.59 10 23 10C23.41 10 23.75 10.34 23.75 10.75V29.25C23.75 29.66 23.41 30 23 30Z" fill="white"/>
      <path opacity="0.4" d="M14.5 28H20.5V12H14.5C12.29 12 10.5 13.79 10.5 16V24C10.5 26.21 12.29 28 14.5 28Z" fill="white"/>
      <path opacity="0.4" d="M26 28H23V12H26C28.21 12 30 13.79 30 16V24C30 26.21 28.21 28 26 28Z" fill="white"/>
      <path d="M13.75 20.9999C13.62 20.9999 13.49 20.9699 13.37 20.9199C13.25 20.8699 13.14 20.7999 13.04 20.7099C12.95 20.6099 12.88 20.4999 12.82 20.3799C12.77 20.2599 12.75 20.1299 12.75 19.9999C12.75 19.7399 12.86 19.4799 13.04 19.2899C13.09 19.2499 13.14 19.2099 13.19 19.1699C13.25 19.1299 13.31 19.0999 13.37 19.0799C13.43 19.0499 13.49 19.0299 13.55 19.0199C13.89 18.9499 14.23 19.0599 14.46 19.2899C14.64 19.4799 14.75 19.7399 14.75 19.9999C14.75 20.1299 14.72 20.2599 14.67 20.3799C14.62 20.4999 14.55 20.6099 14.46 20.7099C14.36 20.7999 14.25 20.8699 14.13 20.9199C14.01 20.9699 13.88 20.9999 13.75 20.9999Z" fill="white"/>
      <path d="M17.25 21.0002C17.12 21.0002 16.99 20.9702 16.87 20.9202C16.75 20.8702 16.64 20.8002 16.54 20.7102C16.35 20.5202 16.25 20.2702 16.25 20.0002C16.25 19.8702 16.28 19.7402 16.33 19.6202C16.38 19.4902 16.45 19.3902 16.54 19.2902C16.91 18.9202 17.58 18.9202 17.96 19.2902C18.14 19.4802 18.25 19.7402 18.25 20.0002C18.25 20.1302 18.22 20.2602 18.17 20.3802C18.12 20.5002 18.05 20.6102 17.96 20.7102C17.86 20.8002 17.75 20.8702 17.63 20.9202C17.51 20.9702 17.38 21.0002 17.25 21.0002Z" fill="white"/>
      </svg>,
      name:"Authentication App",
      description:"Use an authenticator app to generate one-time codes",
      actionType:"toggle",
      switchId:"authApp",
      switchName:"authApp"
    }
  ]

  const [verifyModalOpen, setVerifyModalOpen] = useState(false)
  const [authAppOpen, setAuthAppOpen] = useState(false)

  const [formData, setFormData] = useState({
    email:false,
    authApp:false
  })

  const handleChange = (e) => {
    if(e.target.type == 'checkbox'){
      // e.preventDefault()
      setFormData({...formData, [e.target.name]:e.target.checked})
    }else{
      setFormData({...formData, [e.target.name]:e.target.value})
    }
  }

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  // useEffect(() => {
  //   console.log(verifyModalOpen + ' v');
  //   console.log(authAppOpen + ' a');
  // }, [verifyModalOpen, authAppOpen]);

  const handleEmailModal = (e) => {
    if(e.target.id == 'email'){
      if(!formData.email){
        setVerifyModalOpen(true)
        setAuthAppOpen(false)
      }
    }
    if(e.target.id == 'authApp'){
      if(!formData.authApp){
        setAuthAppOpen(true)
        setVerifyModalOpen(false)
      }
    }
    
    console.log(e);
  }

  return (
    <div className='sm:w-ninetyPercent md:w-eightyPercent mds:w-ninetyFivePercent lg:w-sixtyFivePercent max-w-lg mx-auto pb-10 pt-16 lg:pb-20 lg:pt-28'>
        <div className='py-5'>
          <h1 className='text-xl font-avenirHeavy pb-2'>Enable two-factor authentication</h1>
          <p className="text-sm">
            Each time you sign in to your Pandascrow account, you'll need your password and a verification code generated with one of these options
          </p>
        </div>

        <div>
          {twoFAData.map((data, idx)=>{
            return <div key={idx} className={'py-5 first:border-y-0.5 border-b-0.5 border-brandGray2x last:border-0 flex flex-col md:flex-row md:items-center gap-10 justify-between'}>
                <div className='flex items-center gap-3'>
                  {data.icon}
                  <div>
                      <h3 className='font-avenirHeavy text-brandGray12x pb-1'>{data.name}</h3>
                      <p className='text-xs font-avenirMedium text-brandGray8x'>{data.description}</p>
                  </div>
                </div>
        
                <div onClick={handleEmailModal} className='self-end md:self-auto'>
                    {data.actionType == 'toggle'
                    &&
                    <FormSwitch fieldsetId={data.switchId + 'Wrap'} switchChecked={formData[data.switchId]} switchId={data.switchId} switchName={data.switchName} onChange={handleChange} />
                    }
                </div>
            </div>
          })}
        </div> 

        <VerifyEmailTwoFAModal key={'verify'} isModalOpen={verifyModalOpen} handleModal={()=>setVerifyModalOpen(false)} />
        <AuthAppModal key={'auth'} isModalOpen={authAppOpen} handleModal={()=>setAuthAppOpen(false)} />
    </div>
  )
}

export default TwoFA