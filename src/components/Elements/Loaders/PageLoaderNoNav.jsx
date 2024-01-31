import React from 'react'
import { BarLoader, BeatLoader, ClipLoader, FadeLoader, GridLoader, HashLoader, MoonLoader } from 'react-spinners'

const PageLoaderNoNav = ({loader}) => {
  return (
    <div className='flex flex-col min-h-screen py-40 items-center justify-center'>{loader || <HashLoader color='#182CD1' />}</div>
  )
}

export default PageLoaderNoNav