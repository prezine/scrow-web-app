import React, { useState } from 'react'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'
import FormInput from '../../../../Elements/Form/FormInput'
import ModalWrap from '../../../../Elements/Modal/ModalWrap'

const VerifyEmailTwoFAModal = ({isModalOpen, handleModal}) => {

    const [formData, setFormData] = useState({
        code:"",
        password:""
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
    }
  
    return (
    <ModalWrap id="verifyEmail2FAModal" modalState={isModalOpen} handleModal={handleModal} >
        <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent max-w-lg h-fit'>
            <div className='text-center'>
                <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Verify email address</h4>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5 py-7'>
                   <FormInput handleChange={handleChange} labelFont={'font-avenirMedium text-left'} labelColor={'text-black'} inputName={'code'} inputId={'code'} inputPlaceholder={' '} inputLabel={'Enter verification Code'} />
                   <FormInput handleChange={handleChange} labelFont={'font-avenirMedium text-left'} labelColor={'text-black'} inputName={'password'} inputId={'password'} inputType={'password'} inputPlaceholder={' '} inputLabel={'Confirm password'} />
                    <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
                        <ButtonPrimary text={'Verify email address'} type={'submit'} />
                    </div>
                </form>
            </div>
        </div>
    </ModalWrap>
  )
}

export default VerifyEmailTwoFAModal