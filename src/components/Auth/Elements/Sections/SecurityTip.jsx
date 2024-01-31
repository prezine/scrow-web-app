import React from 'react'

const SecurityTip = ({tip}) => {
  return (
    <div className='text-brandGray6x'>
        <div className='flex items-center gap-3 py-1 px-3 rounded-thirty bg-brandGray15x w-fit'>
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M3.5 6.33332V5.16666C3.5 3.23582 4.08333 1.66666 7 1.66666C9.91667 1.66666 10.5 3.23582 10.5 5.16666V6.33332" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path opacity="0.4" d="M7.00008 11.2917C7.8055 11.2917 8.45841 10.6387 8.45841 9.83333C8.45841 9.02792 7.8055 8.375 7.00008 8.375C6.19467 8.375 5.54175 9.02792 5.54175 9.83333C5.54175 10.6387 6.19467 11.2917 7.00008 11.2917Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.91675 13.3333H4.08341C1.75008 13.3333 1.16675 12.75 1.16675 10.4167V9.25001C1.16675 6.91668 1.75008 6.33334 4.08341 6.33334H9.91675C12.2501 6.33334 12.8334 6.91668 12.8334 9.25001V10.4167C12.8334 12.75 12.2501 13.3333 9.91675 13.3333Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p className='font-spaceGroteskMedium text-xs'>Security tip</p>
        </div>
        <div className='pt-4 text-xs font-avenirMedium'>
            <p>
                {tip
                ||
                "Check the URL to make sure you're signing into app.pandascrow.io. Phishing attacks often use a fake website to access your login information. For example, attackers might use a misspelled version of the URL."    
                }
            </p>
        </div>
    </div>
  )
}

export default SecurityTip