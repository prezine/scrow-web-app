import React, {useRef, useState} from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import ModalWrap from '../../Elements/Modal/ModalWrap'
import useUser from '../../../hooks/stores/useUser';
import useRequestHeaders from '../../../utils/useRequestHeaders';
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary';


const PaymentOption = ({payRef, checkoutLink, isModalOpen, setIsModalOpen, openAlert, alertValues, setOpenAlert, setAlertValues, mutate, closeModal}) => {

  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const [submitting, setSubmitting] = useState(false)

  const [data, setData] = useState({
    paymentOption:"wallet"
  })


  const payOptions = [
    {
      name:'Pay with Wallet',
      id:'wallet',
      value:"wallet",
      detail:"Select your payment choice for this transaction",
      isAvailable:true
    },
    {
      name:'Pay with Checkout',
      id:'checkout',
      value:"checkout",
      detail:"Proceed with Checkout to pay via Card or USSD",
      isAvailable:true
    },
  ]


  const formik = useFormik({
    initialValues:{
      paymentOption:"wallet",
    }
  })


  const handleChange = (e) => {
      setData({...data, [e.target.name]:e.target.value})
  }

  
  const handleSubmit = (e) => {
    if(data.paymentOption == "checkout"){
      window.location.href = checkoutLink
    }

    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append("payref", payRef)


    try {

        // console.log(formik.values);
        axios.post(`${import.meta.env.VITE_BASEURL}/escrow/pay?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`danger` })
                closeModal()
                mutate()
                console.log(res.data.data.message);
            }else if (res.data.status == true && res.data.data.message) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
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
    <ModalWrap id={'paymentOptionModal'} modalState={isModalOpen} handleModal={()=>setIsModalOpen(false)}>
        <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 z-50 w-ninetyFivePercent max-w-sm h-fit'>
            <div className='text-center'>
                <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Payment Option</h4>
                <p className='text-sm md:text-base text-brandGray4x font-spaceGroteskRegular'>Select your payment choice for this transaction</p>
            </div>
            <form action="" method='post' onSubmit={formik.handleSubmit} className="pt-5 flex flex-col gap-y-5 w-full">
                
                <fieldset className='text-xs font-spaceGroteskMedium text-brandGray14x w-full'>
                    <div className=" py-1 px-2 rounded-ten w-full flex flex-col gap-y-5">
                        {payOptions.map((type, idx)=>{
                        return <label key={idx} htmlFor={type.id} className={`${data.paymentOption == type.value ? 'border-brandDarkViolet1x text-brandDarkViolet1x bg-brandLightViolet1x' : 'border-brandGray48x text-brandGray6x bg-brandGray47x'} border-0.5 rounded-ten flex flex-col gap-2 relative w-full py-2 cursor-pointer px-6 trans-all-500-ease-in-out`}>
                            <input type="checkbox" className='hidden paymentOption-check w-full' id={type.id} name='paymentOption' onChange={type.isAvailable && handleChange} value={type.value} />
                            <div className={`flex 2xl:flex-row gap-2 w-full`}>
                                <p className={`${data.paymentOption == type.value ? 'text-brandDarkViolet1x' : 'text-brandGray14x'} text-base`}>{type.name}</p>
                                {!type.isAvailable && <div className='text-xxs w-fit self-end text-brandRed1x whitespace-nowrap font-avenirMedium rounded-twenty py-0.5 px-2 bg-brandLightRed4x'>Coming soon</div>}
                            </div>
                            <div className='font-avenirLight'>
                                <p className='text-brandGray12x'>{type.detail}</p>
                            </div>

                        </label>
                        })}
                    </div>
                </fieldset>

                <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
                <ButtonPrimary handleClick={handleSubmit} width={"w-full"} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Proceed to pay'} type={'submit'} bgColor={'bg-brandDarkViolet1x'} />
                </div>
            </form>
        </div>
    </ModalWrap>
  )
}

export default PaymentOption