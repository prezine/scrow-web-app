import React, { useState } from 'react'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'
import ModalWrap from '../../../../Elements/Modal/ModalWrap'
import QR from '../../../../../assets/media/images/qrCode.png'
import ConfirmAuthAppModal from './ConfirmAuthAppModal'

const AuthAppModal = ({isModalOpen, handleModal}) => {
    

    const [confirmAuthOpen, setConfirmAuthOpen] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault()
        setConfirmAuthOpen(true)
    }
  
    return (
    <ModalWrap id="authApp2FAModal" modalState={isModalOpen} handleModal={()=>{handleModal(); setConfirmAuthOpen(false)}} >
        {confirmAuthOpen
        ?
        <ConfirmAuthAppModal />
        :
        <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent max-w-lg h-fit'>
            <div className='text-center'>
                <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Set authenticator app</h4>
                <p className='py-5 font-avenirRegular text-sm'>
                    Download an authenticator app like <span className='font-avenirHeavy'>Authy</span> or <span className='font-avenirHeavy'>Google Authenticator</span>, add a new account, then scan this barcode to set your account.
                </p>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5 py-7'>
                    
                    <div>
                        <img src={QR} alt="QR" className='w-seventyPercent mx-auto' />
                    </div>

                    <div>
                        <p className='text-xs pb-2'>If you can't scan this barcode, enter the text code below</p>
                        <p className='text-black text-sm font-avenirHeavy'>5t49UmDXXmya3nc]^mw[o$*/1/COdfm2</p>
                        <p className='text-xs pt-2'>on the authenticator app instead.</p>
                    </div>

                    <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
                        <ButtonPrimary text={'Continue'} type={'submit'} />
                    </div>
                </form>
            </div>
        </div>
        }
    </ModalWrap>
  )
}

export default AuthAppModal