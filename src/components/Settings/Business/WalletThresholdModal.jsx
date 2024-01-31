import React from 'react'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import ModalWrap from '../../Elements/Modal/ModalWrap'

const WalletThresholdModal = ({handleSubmit, submitting, handleChange, isModalOpen, handleModal, wallet_threshold, formData, setFormData}) => {
    const amountFormat = (e) => {
    
        if(e.target.value.length == 1){
            if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(e.target.value)) {
                setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            else{
                setFormData({ ...formData, [e.target.name]: '' })
                e.preventDefault();
            }
        } else if (e.target.value || ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) !== -1) {
            let cleaned = parseFloat(e.target.value.trim().replaceAll(',', ''));
            let formattedAmount = new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(cleaned);
            setFormData({ ...formData, [e.target.name]: formattedAmount })
        } else {
            setFormData({ ...formData, [e.target.name]: '' })
        }
          
    }
  
    return (
    <ModalWrap id="walletThresholdModal" modalState={isModalOpen} handleModal={handleModal} >
        <div className='bg-white m-auto rounded-ten py-8 px-5 relative md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent max-w-lg h-fit'>
            <div className='text-center'>
                <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Wallet threshold</h4>
                <form action="" className='flex flex-col gap-5'>
                    <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2 pt-7`}>
                        <label htmlFor="wallet_threshold" className='text-sm text-left font-avenirMedium text-black'>{`How much would you like to get notification At?`}</label>
                        <div className="relative w-full">
                            <input type="text" name='wallet_threshold' id='wallet_threshold' value={wallet_threshold} onChange={(e)=>amountFormat(e)} placeholder='Fixed Amount (e.g 2,000)' className='pl-12 pr-4 py-2.5 w-full font-spaceGroteskLight text-sm text-black placeholder:text-brandGray32x rounded-five border-2 border-brandGray17x' />
                            <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>NGN</span>
                        </div>
                    </fieldset>
                    <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
                        <ButtonPrimary disabled={submitting} disabledBgColor={'bg-brandGray16x'} handleClick={handleSubmit} text={'Set threshold'} type={'button'} bgColor={'bg-brandGreen1x'} />
                    </div>
                </form>
            </div>
        </div>
    </ModalWrap>
  )
}

export default WalletThresholdModal