import React from 'react'
import useUser from '../../hooks/stores/useUser'
import ButtonPrimaryIcon from '../Elements/Buttons/ButtonPrimaryIcon'
import AltHeader from '../Elements/Sections/AltHeader'

const NoStore = ({handleClick}) => {

    const {userDataValue} = useUser()

  return (
    <div>
        <div className='pt-16 pb-5'>
            <AltHeader pageTitle={`Welcome to Storefront, ${userDataValue ? userDataValue.name.split(' ')[0] : ''}!`} pageDescription={'Sell multiple products on a single page'} />
        </div>
        {/* <video className='w-full max-w-lg rounded-thirty aspect-video mx-auto flex items-center justify-center px-5 py-5 bg-brandLightOrange2x h-350'>
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_16678_32097)">
                <path d="M27.7083 35H7.29167C5.35851 34.9977 3.50519 34.2287 2.13824 32.8618C0.771286 31.4948 0.00231563 29.6415 0 27.7083L0 7.29167C0.00231563 5.35851 0.771286 3.50519 2.13824 2.13824C3.50519 0.771286 5.35851 0.00231563 7.29167 0L27.7083 0C29.6415 0.00231563 31.4948 0.771286 32.8618 2.13824C34.2287 3.50519 34.9977 5.35851 35 7.29167V27.7083C34.9977 29.6415 34.2287 31.4948 32.8618 32.8618C31.4948 34.2287 29.6415 34.9977 27.7083 35ZM7.29167 2.91667C6.13134 2.91667 5.01855 3.3776 4.19807 4.19807C3.3776 5.01855 2.91667 6.13134 2.91667 7.29167V27.7083C2.91667 28.8687 3.3776 29.9815 4.19807 30.8019C5.01855 31.6224 6.13134 32.0833 7.29167 32.0833H27.7083C28.8687 32.0833 29.9815 31.6224 30.8019 30.8019C31.6224 29.9815 32.0833 28.8687 32.0833 27.7083V7.29167C32.0833 6.13134 31.6224 5.01855 30.8019 4.19807C29.9815 3.3776 28.8687 2.91667 27.7083 2.91667H7.29167ZM13.6238 24.799C13.0158 24.7969 12.4192 24.6344 11.8942 24.3279C11.3755 24.0311 10.945 23.6017 10.6468 23.0839C10.3485 22.566 10.1932 21.9782 10.1967 21.3806V13.6194C10.1962 13.0217 10.3529 12.4343 10.6511 11.9163C10.9492 11.3983 11.3784 10.9678 11.8955 10.6681C12.4126 10.3683 12.9994 10.2098 13.5971 10.2084C14.1948 10.2071 14.7824 10.363 15.3008 10.6604L22.9979 14.5031C23.5326 14.7917 23.9803 15.2181 24.2947 15.738C24.6091 16.2579 24.7788 16.8525 24.7861 17.46C24.7934 18.0676 24.638 18.666 24.3362 19.1933C24.0343 19.7206 23.597 20.1576 23.0694 20.459L15.2294 24.3775C14.7404 24.6564 14.1867 24.8018 13.6238 24.799ZM13.5873 13.1323C13.5069 13.1323 13.428 13.1534 13.3583 13.1935C13.2827 13.2356 13.2199 13.2975 13.1768 13.3725C13.1336 13.4475 13.1117 13.5328 13.1133 13.6194V21.3806C13.1138 21.4659 13.1365 21.5495 13.1791 21.6234C13.2217 21.6972 13.2828 21.7587 13.3563 21.8018C13.4299 21.8449 13.5134 21.8681 13.5986 21.8692C13.6838 21.8703 13.7679 21.8492 13.8425 21.8079L21.6825 17.8879C21.7409 17.8423 21.7873 17.7831 21.8178 17.7155C21.8483 17.648 21.8619 17.574 21.8575 17.5C21.8593 17.4133 21.8373 17.3277 21.7939 17.2526C21.7504 17.1775 21.6872 17.1158 21.611 17.0742L13.9198 13.2315C13.8195 13.1699 13.7049 13.1358 13.5873 13.1323Z" fill="#182CD1"/>
                </g>
                <defs>
                <clipPath id="clip0_16678_32097">
                <rect width="35" height="35" fill="white"/>
                </clipPath>
                </defs>
            </svg>
        </video> */}
        <iframe className='w-full max-w-lg rounded-thirty aspect-video mx-auto flex items-center justify-center px-5 py-5 bg-brandLightOrange2x h-350' width="560" height="315" src="https://www.youtube.com/embed/T6EABXalP7Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <div className='flex items-center justify-center pt-5 pb-16'>
            <ButtonPrimaryIcon handleClick={handleClick} paddingY={'py-2'} fontSize={'text-base'} text={'New Storefront'} />
        </div>
    </div>
  )
}

export default NoStore