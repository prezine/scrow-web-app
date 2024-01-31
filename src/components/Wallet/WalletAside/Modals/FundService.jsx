import axios from 'axios';
import React, {useState} from 'react'
import Wema from '../../../../assets/media/logos/wema.png'
import useUser from '../../../../hooks/stores/useUser';
import useRequestHeaders from '../../../../utils/useRequestHeaders';
import ButtonPrimary from '../../../Elements/Buttons/ButtonPrimary'
import useSWR from 'swr'
import { BarLoader, HashLoader, BeatLoader, ClipLoader, FadeLoader, GridLoader, MoonLoader } from 'react-spinners'


const FundService = ({dataIsFetched, openAlert, setOpenAlert, alertValues, setAlertValues, isAccount, mutate, virtualAccount, accountDataFetched}) => {

    const {userDataValue}= useUser()
    const {requestHeaders} = useRequestHeaders()

    const [submitting, setSubmitting] = useState(false)

    // console.log('virtualAccount => ', virtualAccount)

    const handleRequest = () => {
        
        setOpenAlert(false)
        setSubmitting(true)
    
        const formData = new FormData()
        formData.append('userID', `${userDataValue && userDataValue.userID}`)
    
        try {
              // const formValues = Object.fromEntries(formData.entries());
              //   console.log(formValues);
    
          axios.post(`${import.meta.env.VITE_BASEURL}/bank/virtual-account?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
          .then((res)=>{
            // console.log(res);
              if(res.data.status == false && res.data.data.message){
                  setOpenAlert(true)
                  setAlertValues({...alertValues, message:res.data.data.message, type:`danger` })
                  console.log(res.data.data.message);
              }else if (res.data.status == true && res.data.data.message) {
                  mutate()
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


  return (
    <div>
        <div className='text-center'>
            <h1 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Fund with Transfer 💚</h1>
        </div>

        {
            !accountDataFetched.data && <ClipLoader color='#182CD1' size={'20px'} />
        }

        {
            isAccount
            ?<div className='pt-10 pb-5 text-center'>
            <div>
                <img src={virtualAccount.bankIconURL && virtualAccount.bankIconURL} alt="" className='mx-auto pb-4 w-16' />
                </div>
                <h2 className='text-brandGray29x text-2xl md:text-3xl pb-1 font-avenirHeavy'>{virtualAccount.accountInformation?.bankName}</h2>
                <p className='text-brandGray29x text-sm md:text-base pb-1'><span className='uppercase'>{virtualAccount.accountInformation?.accountName}</span> — {virtualAccount.accountInformation?.accountNumber}</p>
            </div>
            :
            <div className='pt-10 pb-5 text-center'>
                <div>
                    <img src={virtualAccount.bankIconURL && virtualAccount.bankIconURL} alt="" className='mx-auto pb-4 w-16' />
                </div>
                <h2 className='text-brandGray29x text-2xl md:text-3xl pb-1 font-avenirHeavy'>{virtualAccount.accountInformation?.bankName}</h2>
                <p className='text-brandGray29x text-sm md:text-base pb-1'><span className='uppercase'>{virtualAccount.accountInformation?.accountName}</span> — {virtualAccount.accountInformation?.accountNumber}</p>
            </div>
        }

        <div className='pb-9'>
            <p className='text-xs text-brandGray35x text-center'>The account numbers above work like regular bank account numbers. Credit your Pandascrow wallet immediately by transferring to any of them. Your friends or customers can send money through them too.</p>
        </div>

        {
            isAccount
            ?
            <div className="flex justify-center">
                <ButtonPrimary disabled={submitting} fontSize={"10px"} text={"Yes, I've sent the money"} width={'w-full'} bgColor={'disabled:bg-brandGray16x bg-brandDarkViolet1x'} />
            </div>
            :
            <div className="flex justify-center">
                <ButtonPrimary disabled={submitting} handleClick={handleRequest} fontSize={"10px"} text={"Request Virtual Account"} fontStyle={'font-spaceGroteskRegular'} width={'w-full'} bgColor={'disabled:bg-brandGray16x bg-brandBlack1x'} />
            </div>
        }
    </div>
  )
}

export default FundService