import React from 'react'
import { BarLoader, HashLoader, BeatLoader, ClipLoader, FadeLoader, GridLoader, MoonLoader } from 'react-spinners'
import TemplatePage from '../Wraps/TemplatePage'
import PandaLogo from '../../../assets/media/logos/logo-blue.png'

const SetupLoader = ({loader}) => {
  return (
    <div className='flex flex-col min-h-screen py-40 items-center justify-center px-4'>
        <div className='relative w-fit'>
            {loader || <ClipLoader color='#182CD1' size={'100px'} />}
            <img src={PandaLogo} alt=" Pandascrow Logo" className={`absolute w-10 top-fiftyPercent left-fiftyPercent -translate-y-fiftyPercent -translate-x-fiftyPercent`} />
        </div>
        <div className="pt-7">
            <p className='text-2xl font-avenirMedium text-center'>We're currently setting up your account...</p>
        </div>
    </div>
  )
}

export default SetupLoader