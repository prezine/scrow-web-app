import React from 'react'

const AltHeader = ({pageTitle, pageDescription}) => {
  return (
    <div className='pb-5'>
        <div className='text-center'>
            <h1 className='font-avenirHeavy text-30 pb-1 text-black'>{pageTitle || 'Overview'}</h1>
            <h2 className="text-brandGray4x text-sm md:lext-base font-spaceGroteskRegular">{pageDescription || 'Hi Tom, Welcome to Pandascrow 🚀'}</h2>
        </div>
    </div>
  )
}

export default AltHeader