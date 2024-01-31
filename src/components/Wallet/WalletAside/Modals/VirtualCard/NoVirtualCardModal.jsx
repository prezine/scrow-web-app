import React from 'react'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'

const NoVirtualCardModal = () => {
  return (
    <div className='flex flex-col gap-18px'>
            <h1 className='text-2xl md:text-3xl text-center pb-1 text-brandGray14x font-avenirHeavy capitalize'>🚨 Virtual Account</h1>
            <div className='text-center'>
                <p className='pb-8 font-avenirLight'>
                Pandascrow Virtual Account is Coming Soon. We'd keep you in the loop how that is coming along.
                </p>
                <p className='font-avenirLight'>With it you can shop on all your favorite Apps and Stores with zero restrictions.</p>
            </div>
            <ButtonPrimary width={'w-full'} text={`Great, let me know`} />
    </div>
  )
}

export default NoVirtualCardModal