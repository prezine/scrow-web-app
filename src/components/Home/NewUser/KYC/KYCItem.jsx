import React from 'react'
import ButtonPrimaryIcon from '../../../Elements/Buttons/ButtonPrimaryIcon'

const KYCItem = ({number, kyc, description, handleClick, active, completed, idx}) => {

    const btnIcon = <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.62 4.32837L13.6667 8.37504L9.62 12.4217" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    <path opacity="0.4" d="M2.33334 8.375H13.5533" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    

  return (
    <div id={`kycItem${idx+1}`} className='py-4 flex flex-col md:flex-row md:items-center gap-10 justify-between'>
        <div className='flex items-center gap-3'>
            <p className={`text-xxs font-avenirMedium ${active || completed ? 'bg-white' : 'bg-brandGray13x' }  px-2.5 py-0.5 rounded-fifty border-2 ${completed ? 'border-brandGreen1x text-brandGreen1x' : 'border-black text-black'}`}>{number || '01'}</p>
            <div>
                <h3 className='font-avenirHeavy text-brandGray12x pb-1'>{kyc || 'Personal KYC'}</h3>
                <p className='text-xs font-spaceGroteskRegular text-brandGray4x'>{description || 'Please tell us a little about yourself'}</p>
            </div>
        </div>

        <div className='self-end md:self-auto'>
            {
            completed
            ?
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M11.25 2.82495C11.94 2.23495 13.07 2.23495 13.77 2.82495L15.35 4.18495C15.65 4.44495 16.21 4.65495 16.61 4.65495H18.31C19.37 4.65495 20.24 5.52495 20.24 6.58495V8.28495C20.24 8.67495 20.45 9.24495 20.71 9.54495L22.07 11.1249C22.66 11.8149 22.66 12.9449 22.07 13.6449L20.71 15.2249C20.45 15.5249 20.24 16.0849 20.24 16.4849V18.1849C20.24 19.2449 19.37 20.1149 18.31 20.1149H16.61C16.22 20.1149 15.65 20.3249 15.35 20.5849L13.77 21.9449C13.08 22.5349 11.95 22.5349 11.25 21.9449L9.67 20.5849C9.37 20.3249 8.81 20.1149 8.41 20.1149H6.68C5.62 20.1149 4.75 19.2449 4.75 18.1849V16.4749C4.75 16.0849 4.54 15.5249 4.29 15.2249L2.94 13.6349C2.36 12.9449 2.36 11.8249 2.94 11.1349L4.29 9.54495C4.54 9.24495 4.75 8.68495 4.75 8.29495V6.57495C4.75 5.51495 5.62 4.64495 6.68 4.64495H8.41C8.8 4.64495 9.37 4.43495 9.67 4.17495L11.25 2.82495Z" fill="#3BB75E"/>
                <path d="M11.29 15.545C11.09 15.545 10.9 15.465 10.76 15.325L8.34 12.905C8.05 12.615 8.05 12.135 8.34 11.845C8.63 11.555 9.11 11.555 9.4 11.845L11.29 13.735L15.59 9.43503C15.88 9.14503 16.36 9.14503 16.65 9.43503C16.94 9.72503 16.94 10.205 16.65 10.495L11.82 15.325C11.68 15.465 11.49 15.545 11.29 15.545Z" fill="#3BB75E"/>
            </svg>
            :
            <ButtonPrimaryIcon disabled={active == true ? false : true} disabledBgColor={'disabled:bg-brandGray8x'} flexDirection={'flex-row-reverse'} handleClick={handleClick} icon={btnIcon} text={'Continue'} fontSize={'text-sm'} />
            }
        </div>
    </div>
  )
}

export default KYCItem