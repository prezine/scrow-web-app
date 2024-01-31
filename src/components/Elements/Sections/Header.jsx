import React from 'react'
import ButtonPrimaryIcon from '../Buttons/ButtonPrimaryIcon'

const Header = ({pageTitle, pageDescription, hasButton, buttons, handleClick, btnText}) => {
  return (
    <div className='flex flex-col md:flex-row justify-between md:items-center gap-10 pb-5'>
        <div>
            <h1 className='font-avenirHeavy text-30 pb-1 text-black'>{pageTitle || 'Overview'}</h1>
            <h2 className="text-brandGray4x text-sm md:lext-base font-spaceGroteskRegular">{pageDescription || 'Hi Tom, Welcome to Pandascrow 🚀'}</h2>
        </div>
        {hasButton 
        ?
        buttons
        ?
        buttons
        :
        <div className='self-end md:self-auto'><ButtonPrimaryIcon handleClick={handleClick} text={btnText} /></div>
        :
        ''
        }
    </div>
  )
}

export default Header