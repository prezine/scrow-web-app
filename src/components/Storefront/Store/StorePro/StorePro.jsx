import React, { useState } from 'react'
import Alert from '../../../Elements/Alerts/Alert'
import ButtonPrimaryIcon from '../../../Elements/Buttons/ButtonPrimaryIcon'
import ModalWrap from '../../../Elements/Modal/ModalWrap'
import AddDomain from './Modals/AddDomain'
import UpdateDomain from './Modals/UpdateDomain'

const StorePro = ({domain_url, mutate}) => {

    const [isUpdateDomainModalOpen, setIsUpdateDomainModalOpen] = useState(false)
    const [isAddDomainModalOpen, setIsAddDomainModalOpen] = useState(false)

    const [domainVisible, setDomainVisible] = useState(false)

    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })


  return (
    <div>
        <div className={`w-full pt-8 mx-auto ${domain_url ? 'border-t border-t-brandGray2x' : ''}`}>

            { !domain_url
                ?
                    <div className="flex flex-col pt-8 items-center w-full ">
                        <div className="flex flex-row w-20 h-20 items-center justify-center rounded-fiftyPercent bg-brandLightBlue1x">
                            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M22.9451 41.6169C33.227 41.6169 41.5622 33.2817 41.5622 22.9998C41.5622 12.7179 33.227 4.38281 22.9451 4.38281C12.6632 4.38281 4.32812 12.7179 4.32812 22.9998C4.32812 33.2817 12.6632 41.6169 22.9451 41.6169Z" fill="#FF9800" />
                                <path d="M29.0512 21.6969H25.8863V14.3246C25.8863 12.6118 24.9554 12.2581 23.8198 13.5427L23.0007 14.4735L16.0751 22.3485C15.1257 23.4283 15.5166 24.3033 16.9501 24.3033H20.115V31.6757C20.115 33.3884 21.0459 33.7422 22.1815 32.4576L23.0007 31.5267L29.9262 23.6517C30.8757 22.5719 30.4847 21.6969 29.0512 21.6969Z" fill="#FF9800" /> </svg>
                        </div>
                        <h3 className="text-black font-avenirBlack text-xl pt-18px text-center">No Domain Connected</h3>
                        <h2 className="text-brandGray20x py-4 text-center">Click to Connect your domain to this storefront</h2>
                        <ButtonPrimaryIcon handleClick={()=>setIsAddDomainModalOpen(true)} text={'Add custom domain'} />
                    </div>
                :
                    <div className='flex flex-col lg:flex-row w-full'>
                        <div className='w-full lg:w-sixtyPercent'>
                            <h1 className="font-avenirBlack text-black text-2xl pb-8 pt-2">Domain Manager</h1>
                            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 md:items-center py-18px border-y border-brandGray16x">
                                <h2 className="text-brandGray20x">Website URL</h2>
                                <div className="flex flex-row px-4 md:w-sixtyPercent justify-between border border-brandGray16x divide-x divide-brandGray16x rounded-ten ">
                                    <input type={`${domainVisible ? 'text' : 'password'}`} data-key-visible="hidden" value={`${domain_url ? domain_url : 'https://example.com/domain'}`} className="domain-url py-2 w-full pr-4 bg-transparent overflow-x-auto border-transparent focus:border-transparent focus:ring-0 bind-domain-url" readOnly />
                                    <button type='button' onClick={()=>setDomainVisible(prevDomainVisible => !prevDomainVisible)} aria-label='View domain url' data-key-type="domain-url" className="keyViewer cursor-pointer w-12 py-2 flex flex-row relative justify-center items-center">
                                        <p className={`eye-slash ${domainVisible ? 'block' : 'hidden'} text-3xl absolute left-fiftyPercent top-fiftyPercent -translate-x-fiftyPercent -translate-y-fiftyPercent`}>/</p>
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M11.6845 8.99945C11.6845 10.4845 10.4845 11.6845 8.99945 11.6845C7.51445 11.6845 6.31445 10.4845 6.31445 8.99945C6.31445 7.51445 7.51445 6.31445 8.99945 6.31445C10.4845 6.31445 11.6845 7.51445 11.6845 8.99945Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9.00086 15.2016C11.6484 15.2016 14.1159 13.6416 15.8334 10.9416C16.5084 9.88406 16.5084 8.10656 15.8334 7.04906C14.1159 4.34906 11.6484 2.78906 9.00086 2.78906C6.35336 2.78906 3.88586 4.34906 2.16836 7.04906C1.49336 8.10656 1.49336 9.88406 2.16836 10.9416C3.88586 13.6416 6.35336 15.2016 9.00086 15.2016Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                                    </button>
                                </div>
                            </div>
                            <button type='button' id={'Update domain'} onClick={()=>setIsUpdateDomainModalOpen(true)} className={`py-5 text-left text-brandDarkViolet1x font-avenirBlack text-sm md:text-base`} >+ Update Domain</button>
                        </div>
                    </div>
            }
        </div>

        <ModalWrap key={'updateDomainModal'} id={'updateDomainModal'} modalState={isUpdateDomainModalOpen} handleModal={()=>setIsUpdateDomainModalOpen(false)} >
            <UpdateDomain modalState={isUpdateDomainModalOpen} mutate={mutate} type={domain_url == '' ? 'Add' : 'Update'} domain={domain_url} closeModal={()=>setIsUpdateDomainModalOpen(false)} openAlert={openAlert} alertValues={alertValues} setAlertValues={setAlertValues} setOpenAlert={setOpenAlert} />
        </ModalWrap>
        <ModalWrap overlayColor={'bg-black/70'} key={'AddDomainModal'} id={'AddDomainModal'} modalState={isAddDomainModalOpen} handleModal={()=>setIsAddDomainModalOpen(false)} >
            <AddDomain modalState={isAddDomainModalOpen} mutate={mutate} domain={domain_url} closeModal={()=>setIsAddDomainModalOpen(false)} openAlert={openAlert} alertValues={alertValues} setAlertValues={setAlertValues} setOpenAlert={setOpenAlert} />
        </ModalWrap>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default StorePro