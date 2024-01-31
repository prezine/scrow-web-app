import React from 'react'
import LinkPrimaryIcon from '../../Links/LinkPrimaryIcon'
import NoImage from '../../../../assets/media/no-store-img.png'

const StoreCard = ({id, maxWidth, store, description, image, live, link}) => {
  
  const imgs = document.querySelectorAll('img')
    if(imgs){
        imgs.forEach((img)=>{
            if(img.complete){
                img.classList.remove('skeleton')
            }
        })
    }
  
  return (
    <div id={id} className={`${maxWidth} drop-shadow-md col-span-1 w-full rounded-twenty`}>
      <div className='rounded-t-twenty w-full'>
        <img src={image || NoImage} alt={store || ''} className='skeleton h-28 w-full rounded-t-twenty object-cover' />
      </div>
      <div className='bg-white rounded-b-twenty px-6 pt-3'>
        <div className="pb-4">
          <h1 className='text-2xl font-avenirBlack text-brandGray29x one-lined-text capitalize'>{store || 'Jeloblis'}</h1>
          <p className="text-brandGray30x one-lined-text">{description || 'Jeloblis Storefront is a store created fo...'}</p>
        </div>
        <div className='flex xs:flex-col xs:items-end bxs:flex-col bxs:items-end items-center gap-4 pb-6'>
          <LinkPrimaryIcon link={link || '#'} fontSize={'text-sm'} fontStyle={'whitespace-nowrap'} text={'Manage Store'} />
          <div className='flex items-center gap-1 justify-end w-full'>
            <div className={`${live ? 'bg-brandGreen1x' : 'bg-brandRed1x'} h-3 w-3 rounded-fifty`}></div>
            <p className={`${live ? 'text-brandGreen1x' : 'text-brandRed1x'}`}>{live ? 'Live' : 'Not Live'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreCard