import React from 'react'
import { BarLoader, BeatLoader, ClipLoader, FadeLoader, GridLoader, HashLoader, MoonLoader } from 'react-spinners'
import TemplatePage from '../Wraps/TemplatePage'

const PageLoader = ({loader}) => {
  return (
    <TemplatePage isLoaderOrError headerDescription={' '} headerTitle={' '} bgColor={'bg-white'}>
      <div className='flex flex-col h-full items-center w-full justify-center'>
        {loader || <HashLoader color='#182CD1' />}
      </div>
    </TemplatePage>
  )
}

export default PageLoader