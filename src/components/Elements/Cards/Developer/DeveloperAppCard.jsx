import React from 'react'
import { NavLink } from 'react-router-dom'
import NoLogoSquare from '../../Sections/NoLogoSquare'

const DeveloperAppCard = ({id, maxWidth, app, image, children, link}) => {
  
  const imgs = document.querySelectorAll('img')
    if(imgs){
        imgs.forEach((img)=>{
            if(img.complete){
                img.classList.remove('skeleton')
            }
        })
    }
  
  return (
    <NavLink to={link || ''} id={id} className={`${maxWidth} min-h-200px drop-shadow-md col-span-1 w-full rounded-twenty bg-white flex flex-col justify-between`}>
      <div className='rounded-t-twenty w-full flex items-end h-full px-6 pt-10 pb-2'>
        <div className='w-24'>
          {image
            ?
            <img src={image} alt={app || ''} className='h-8 object-contain' />
            :
            <NoLogoSquare />
          }
        </div>
      </div>
      <div className='bg-white rounded-b-twenty px-6 pt-5'>
        <div className="pb-6">
          <h1 className='text-2xl text-brandGray29x one-lined-text'>{app || 'Dojah Inc.'}</h1>
        </div>
        <div className='flex items-center pb-6 flex-wrap gap-1 w-full'>
            {children}
        </div>
      </div>
    </NavLink>
  )
}

export default DeveloperAppCard