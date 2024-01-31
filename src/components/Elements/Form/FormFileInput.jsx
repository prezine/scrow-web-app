import React, { useState } from 'react'
import Avatar from '../../../assets/media/logos/logo-blue.png'
import { BeatLoader } from 'react-spinners'
import {IoIosClose} from 'react-icons/io'
import {GiCheckMark} from 'react-icons/gi'

const FormFileInput = ({fieldsetId, handleChange, formik, handleCancel, setErrorUpload,  setUploadedImageUrl, handleFileUpload, uploadedImageUrl, actionText, fileValue, uploading, errorUpload, fileInputId, fileInputName}) => {
  
  const [touched, setTouched] = useState(false)

  const handleFileInput = (e) => {
    setTouched(true)
    setErrorUpload('')
    setUploadedImageUrl('')
    console.log(import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE);
    formik.setFieldValue(`${fileInputId}`, e.target.files[0])
  }

  const isFileObject = (object) => {
    return object instanceof File;
  }

  // console.log(uploadedImageUrl);
  
  return (
    <fieldset id={fieldsetId} className=''>
        <div className="mx-auto w-fit pb-4">
          {
            fileValue
            ?
            <img src={fileValue ? isFileObject(fileValue) ? URL.createObjectURL(fileValue) : fileValue : Avatar} alt="Avatar" className='h-16 w-16 rounded-full aspect-square' />
            :
            <svg className='h-14 w-14' width="40" height="38" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.2385 11.3964C38.5936 13.9623 39.3033 16.8215 39.3058 19.7252C39.2664 24.3892 37.4678 28.8653 34.2717 32.2532C31.0756 35.641 26.7191 37.6894 22.0784 37.9862V31.6826C23.5651 31.3427 24.8748 30.4655 25.7574 29.2184C26.64 27.9713 27.0337 26.4417 26.8632 24.922C26.6927 23.4022 25.97 21.9986 24.8332 20.9794C23.6963 19.9603 22.225 19.3969 20.7002 19.3969C19.1755 19.3969 17.7041 19.9603 16.5673 20.9794C15.4304 21.9986 14.7078 23.4022 14.5373 24.922C14.3668 26.4417 14.7604 27.9713 15.6431 29.2184C16.5257 30.4655 17.8354 31.3427 19.322 31.6826V38C14.6814 37.7032 10.3248 35.6549 7.12873 32.267C3.93263 28.8791 2.13403 24.403 2.09469 19.739C2.07459 17.0638 2.65391 14.4182 3.78986 11.9977C2.86287 11.6052 2.04502 10.9924 1.40687 10.2121C0.768714 9.43177 0.329429 8.50743 0.126913 7.51884C-0.0756029 6.53024 -0.0352668 5.50706 0.244441 4.53759C0.524149 3.56812 1.03483 2.68147 1.73241 1.95414C2.43 1.22681 3.29355 0.680649 4.24854 0.36278C5.20353 0.0449107 6.22129 -0.0351203 7.214 0.129592C8.20672 0.294305 9.14457 0.698814 9.94663 1.30822C10.7487 1.91762 11.3909 2.71362 11.8178 3.62753C14.365 2.27879 17.1854 1.53046 20.0643 1.43943C22.9433 1.34841 25.805 1.91709 28.4319 3.10223C28.9001 2.29159 29.5448 1.5975 30.3179 1.07178C31.091 0.546049 31.9725 0.202261 32.8966 0.0660753C33.8207 -0.0701105 34.7636 0.00482371 35.6548 0.285284C36.5459 0.565744 37.3625 1.04448 38.0434 1.68577C38.7243 2.32706 39.252 3.11433 39.5871 3.98881C39.9222 4.86329 40.0561 5.8024 39.9787 6.73604C39.9013 7.66967 39.6147 8.57372 39.1402 9.38069C38.6657 10.1877 38.0156 10.8767 37.2385 11.3964Z" fill="#BABABA"/>
            </svg>
          }
        </div>
        <label htmlFor={fileInputId} className='w-fit cursor-pointer mx-auto flex flex-col gap-3 items-center justify-center'>
        <div className='text-xs rounded-fifty border-2 border-black py-2 px-4'>
          {
            !errorUpload
            ?
            <div>
              {!uploadedImageUrl || !fileValue ? 
              uploading ? 
              <span className={`flex gap-2 items-center`}>Uploading <BeatLoader size={'10px'} color={`#2A2AB2`} /></span> : 
              <span>{actionText || 'Choose Business photo'}</span> : 
              <span className='flex gap-2 items-center'>
                Logo Uploaded
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.3" y="0.3" width="17.4" height="17.4" rx="8.7" fill="#3DDC84"/>
                  <g clip-path="url(#clip0_16055_34025)">
                  <path d="M11.5797 7.10775L8.12497 10.5623C8.10174 10.5856 8.07414 10.6041 8.04374 10.6167C8.01334 10.6293 7.98075 10.6358 7.94784 10.6358C7.91493 10.6358 7.88234 10.6293 7.85194 10.6167C7.82155 10.6041 7.79394 10.5856 7.77072 10.5623L6.43472 9.225C6.41149 9.20168 6.38388 9.18318 6.35349 9.17055C6.32309 9.15793 6.2905 9.15143 6.25759 9.15143C6.22468 9.15143 6.19209 9.15793 6.16169 9.17055C6.1313 9.18318 6.10369 9.20168 6.08047 9.225C6.05715 9.24823 6.03864 9.27583 6.02602 9.30623C6.01339 9.33662 6.00689 9.36921 6.00689 9.40213C6.00689 9.43504 6.01339 9.46763 6.02602 9.49803C6.03864 9.52842 6.05715 9.55602 6.08047 9.57925L7.41697 10.9155C7.55795 11.0562 7.74901 11.1353 7.94822 11.1353C8.14742 11.1353 8.33848 11.0562 8.47947 10.9155L11.934 7.46175C11.9572 7.43853 11.9757 7.41094 11.9883 7.38057C12.0009 7.3502 12.0074 7.31764 12.0074 7.28475C12.0074 7.25187 12.0009 7.21931 11.9883 7.18894C11.9757 7.15856 11.9572 7.13097 11.934 7.10775C11.9107 7.08443 11.8831 7.06593 11.8527 7.0533C11.8223 7.04068 11.7898 7.03418 11.7568 7.03418C11.7239 7.03418 11.6913 7.04068 11.6609 7.0533C11.6305 7.06593 11.6029 7.08443 11.5797 7.10775Z" fill="white"/>
                  </g>
                  <rect x="0.3" y="0.3" width="17.4" height="17.4" rx="8.7" stroke="#22B94D" stroke-width="0.6"/>
                  <defs>
                  <clipPath id="clip0_16055_34025">
                  <rect width="6" height="6" fill="white" transform="translate(6 6)"/>
                  </clipPath>
                  </defs>
                </svg>
              </span>
              }
            </div>
            :
            <p className={`text-brandRed1x text-xs`}>Error uploading Logo</p>
          }
        </div>
        <input required readonly={uploading} type="file" name={fileInputName} id={fileInputId} onChange={(e)=>{handleFileInput(e)}} onBlur={formik.handleBlur} className="hidden peer" accept=".jpg,.jpeg,.png,.gif,image/*" />
        </label>
        {formik.errors[fileInputId] && touched && fileValue
        ?
          <p className={`text-xs text-right text-brandRed1x py-2`}>*** {formik.errors[fileInputId]}</p>
          :
          <div>
            {
              (touched && fileValue && !uploadedImageUrl && !errorUpload)
              &&
              <div className={`flex items-center gap-3 justify-end py-2 flex-wrap`}>
                <p className='text-brandGray14x text-xs'>Use this image ?</p>
                <div className={`flex items-center gap-3 justify-end`}>
                  <button type='button' disabled={uploading} onClick={handleCancel} className='text-brandRed1x disabled:text-brandGray16x text-3xl'> <IoIosClose /></button>
                  <button type='button' disabled={uploading} onClick={handleFileUpload} className={`text-brandGreen1x disabled:text-brandGray16x`}> <GiCheckMark /></button>
                </div>
              </div>
            }
          </div>
        }
        
    </fieldset>
  )
}

export default FormFileInput