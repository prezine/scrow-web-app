import React from 'react'
import ModalWrap from '../../Modal/ModalWrap'

const ConfirmDelete = ({message, title, setConfirmed, deleteConfirmedAction, confirmed, submitting, closeModal, modalState, modalId}) => {

    const handleConfirm = () => {
        setConfirmed(true)
        deleteConfirmedAction()
    }

    const handleCancel = () => {
        setConfirmed(false)
        closeModal()
    }

  return (
    <ModalWrap id={modalId} handleModal={closeModal} modalState={modalState} overlayColor={'bg-black/70'}>
         <div className={`text-center m-auto flex px-4 sm:px-8 md:px-10 py-10 top-0 left-0 z-50 w-fit `}>
            <div className='max-w-lg mx-auto my-auto flex flex-col items-center h-full w-full'>
                <svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M88 24.9163C74.125 23.5413 60.1667 22.833 46.25 22.833C38 22.833 29.75 23.2497 21.5 24.083L13 24.9163" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.34" d="M35.9165 20.708L36.8332 15.2497C37.4998 11.2913 37.9998 8.33301 45.0415 8.33301H55.9582C62.9998 8.33301 63.5415 11.458 64.1665 15.2913L65.0832 20.708" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M79.0418 38.083L76.3335 80.0413C75.8752 86.583 75.5002 91.6663 63.8752 91.6663H37.1252C25.5002 91.6663 25.1252 86.583 24.6668 80.0413L21.9585 38.083" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.34" d="M43.5415 68.75H57.4165" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path opacity="0.34" d="M40.0835 52.083H60.9168" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p className='text-white pt-8 pb-5 text-xl font-avenirBlack'>{title || 'Delete App'}</p>
                <div className={`text-white`}>{message || 
                <p>If you delete this App, your existing application integrated with Pandascrow using your keys from this application would be broken, you'll also loose your Developers Credit Attached to this Application.
                <span className='block py-4'>Do you want to proceed?</span></p>
                }</div>
                <div className='py-5 flex gap-4 items-center justify-center'>
                    <button type='button' onClick={handleConfirm} aria-label={`Confirm this action`} disabled={submitting} title={`Confirm this action`} className={`text-brandBlack1x bg-white disabled:bg-brandGray16x transition-all duration-300 ease-in-out border-2 border-white hover:border-brandGreen4x py-2 px-4 rounded-fifty`}>Yes, Delete App</button>
                    <button type='button' onClick={handleCancel} aria-label={`Cancel this action`} disabled={submitting} title={`Cancel this action`} className={`text-white disabled:bg-brandGray16x transition-all duration-300 ease-in-out border-2 border-white hover:border-brandRed3x py-2 px-4 rounded-fifty`}>No, Close Modal</button>
                </div>
            </div>
        </div>
        {/* <div className={`bg-white relative m-auto rounded-ten py-8 px-5 md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent max-w-md h-fit`}>
            <div>
                <h2 className={`text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy text-center`}>Confirm Delete</h2>
            </div>
            <div className='py-8'>
                <p>{message || 'Are you sure you want to delete?'}</p>
            </div>

            <div className='flex flex-row items-center justify-end gap-5 pt-5'>
                <button onClick={handleConfirm} aria-label={`Confirm this action`} disabled={submitting} title={`Confirm this action`} className='font-avenirMedium text-base px-4 py-2.5 rounded-lg text-white disabled:bg-brandGray16x bg-brandGreen4x'>Confirm</button>
                <button onClick={handleCancel} aria-label={`Cancel this action`} disabled={submitting} title={`Cancel this action`} className='font-avenirMedium text-base px-4 py-2.5 rounded-lg text-white disabled:bg-brandGray16x bg-brandRed3x'>Cancel</button>
            </div>
        </div> */}
    </ModalWrap>
  )
}

export default ConfirmDelete