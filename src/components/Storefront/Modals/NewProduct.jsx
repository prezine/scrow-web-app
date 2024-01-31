import React, { useEffect, useState } from 'react'
import ButtonPrimaryIcon from '../../Elements/Buttons/ButtonPrimaryIcon'
import FormInput from '../../Elements/Form/FormInput'
import FormSelect from '../../Elements/Form/FormSelect'
import FormTextArea from '../../Elements/Form/FormTextArea'
import PhoneInput from '../../Elements/Form/PhoneInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import axios from 'axios'
import useUser from '../../../hooks/stores/useUser'
import useAmountFormat from '../../../utils/useAmountFormat'
import {IoIosTrash, IoIosClose} from 'react-icons/io'
import {GiCheckMark} from 'react-icons/gi'
import {BsExclamationCircleFill} from 'react-icons/bs'
import {TbFaceIdError} from 'react-icons/tb'
import useFileUpload from '../../../utils/CloudinaryUpload/useFileUpload'
import slugify from 'react-slugify'
import { BeatLoader } from 'react-spinners'

const NewProduct = ({storeID, openAlert, alertValues, setOpenAlert, setAlertValues, closeModal, mutate}) => {

    const [submitting, setSubmitting] = useState(false)
    const [equalToFive, setEqualToFive] = useState(false)
    // const [selectingFiles, setSelectingFiles] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState([])
    const [errorUpload, setErrorUpload] = useState(false)

    const {requestHeaders} = useRequestHeaders()

    const {userDataValue} = useUser()

    const [images, setImages] = useState([])

    const formik = useFormik({
        initialValues:{
            is_digital: 1,
            is_limited: "",
            product_name:'',
            product_amount:'',
            product_description:'',
            product_options:'',
            product_stockcount:'',
            image_url:"",
            digital_product_url:""
        },
    
        validationSchema:Yup.object({
            product_name: Yup.string()
              .min(4, 'name should be four or more characters')
              .required('name required'),
            product_description: Yup.string()
                .min(4, 'Description should be four or more characters')
                .required('Description required'),
            product_amount: Yup.number()
            .transform((value, originalValue) => {
              // Remove commas from the value
              if (typeof originalValue === "string") {
                return originalValue.replace(/,/g, "");
              }
              return originalValue;
            })
            .test("is-number", "Invalid number", (value) => {
              if (value) {
                // Check if the transformed value is a valid number
                return !isNaN(Number(value));
              }
              return true;
            })
            .transform((value, originalValue) => {
              // Convert the transformed value to a number
              return parseFloat(value);
            })
            .required("Amount required"),
            product_options: Yup.string()
                .required('Options required'),
            product_stockcount: Yup.number()
            .nullable(),
            //   doesn't work properly
            //   product_stockcount: Yup.number().when("is_limited", {
            //     is: '1',
            //     then: Yup.number().required("stock is required for limited items"),
            //     otherwise: Yup.number(),
            //   }),
            is_limited:Yup.string()
              .required('Limit required'),
            image_url: Yup.string()
            .nullable(),
            digital_product_url:  Yup.string()
            .test('is-url', 'Invalid URL format', (value) => {
                if (value && typeof value === 'string') {
                  // Test if the value is a valid URL
                  const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
                  return urlRegex.test(value);
                }
                return true; // Skip validation if value is empty or not a string
              })
                .required('This field is required when is_digital is true.')
        })  
      })


    useEffect(() => {

        setEqualToFive(false)
        if(images.length >= 5 ){
            setEqualToFive(true)
            return
        }
        let temp = []

        formik.values.image_url && formik.values.image_url.forEach((file) => {
            temp.push(
                {'image':file,
                is_uploaded:false,
                is_uploading:false,
                is_deleted:false,
                is_twoMBMax:file.size <= import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE,
                public_id:'',
                delete_token:'',
                imageUrl:'',
                is_error_uploading:false
            }
            )
        });
        let five = [...images, ...temp.slice(0, (5 - images.length))]
        setImages([...five])
        // console.log('temp', temp);  
        // console.log('images', five);  
        // console.log('images.length', images.length);   
    
    }, [formik.values.image_url])
      
    

    

      
      const handleSubmit = (e) => {
        if(formik.errors.product_name || (formik.values.is_digital == 1 && !formik.values.digital_product_url) || formik.errors.product_stockcount || formik.errors.product_description || formik.errors.is_limited || (formik.values.is_limited == '1' && !formik.values.product_stockcount) || formik.errors.customer_phone || formik.errors.product_amount ){
          return
        }
    
        setOpenAlert(false)
        setSubmitting(true)
        const formData = new FormData()
        formData.append('userID', `${userDataValue && userDataValue.userID}`)
        formData.append('storeID', storeID)
        formData.append('is_image', (images && images.length > 0) ? 1 : 0)
        formData.append('is_digital', formik.values.is_digital)
        formData.append('is_limited', formik.values.is_limited)
        formData.append('digital_product_url', formik.values.is_digital == 1 ? formik.values.digital_product_url : "")
        formData.append('product_name', formik.values.product_name)
        formData.append('product_amount', formik.values.product_amount.replaceAll(',', ''))
        formData.append('product_options', formik.values.product_options)
        formData.append('product_description', formik.values.product_description)
        formData.append('product_stockcount', formik.values.product_stockcount)
        const imageUrls = images.map(obj => obj.imageUrl)
        formData.append('image_url', images && images.length > 0 && imageUrls.join(','))


    try {

        // const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);

        axios.post(`${import.meta.env.VITE_BASEURL}/store/product/add?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            // console.log(res);
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                closeModal()
            }else if (res.data.status == true && res.data.data.message) {
                formik.resetForm()
                setImages([])
                setUploadedImageUrl([])
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
                mutate()
                closeModal()
            }

            setSubmitting(false)
            
        })
        .catch((err)=>{
            console.error(err);
        })
        
    } catch (error) {
        console.error(error)
    }
    
    }


    const deleteElement = (index) => {
        const newArray = [...images]; // Create a new array using the spread operator
        newArray.splice(index, 1); // Remove the element at the specified index
        setImages(newArray); // Update the state with the new array
      };

    const errorIcon = <BsExclamationCircleFill fill='#D95126' color='#FFFFFF' className='text-white' />
    
    const handleCancel = () => {
        formik.setFieldValue('image_url', '')
        setUploadedImageUrl('')
        setImages([])
    }

    const handleFileUpload = async (file_to_upload, file_type, subDirectory, index) => {
        setErrorUpload(false)
        setUploading(true)
        // setUploadedImageUrl([])
        setImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages[index] = {
              ...updatedImages[index],
              'is_uploading': true,
              'is_error_uploading':false
            };
            return updatedImages;
          });
        const file = file_to_upload;
  
        // Create a FormData object to send the file to the server
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`);
        formData.append('public_id', `${import.meta.env.VITE_CLOUDINARY_ROOT_DIR}/${subDirectory}/${slugify(file.name)}${Math.floor(1000 + Math.random() * 9000)}`); // Specify the folder and image name
        formData.append('max_file_size', `${import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE}`)

        try {
          // Send a POST request to the Cloudinary upload API
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/${file_type}/upload`,
            formData
          );
      
          // Get the URL of the uploaded image from the response
          const imageUrl = response.data.secure_url;
        //   console.log('response => ', response);
        //   console.log('imageUrl => ', imageUrl);
        //   console.log('public_id => ', response.data.public_id);
        //   console.log('delete_token => ', response.data.delete_token);

          
      
          // Do something with the uploaded image URL (e.g., store it in state)
          setUploadedImageUrl(prevImageUrl => [...prevImageUrl, imageUrl]);
          // console.log('uploadedImageUrl', uploadedImageUrl)
          setImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages[index] = {
              ...updatedImages[index],
              'is_uploaded': true,
              'is_uploading': false,
              'is_deleted': false,
              'public_id': response.data.public_id,
              'delete_token': response.data.delete_token,
              'imageUrl': imageUrl,
              'is_error_uploading':false
            };
            return updatedImages;
          });

        //   setPublicID(response.data.public_id)
          setUploading(false)
        //   setDeleteToken(response.data.delete_token)
        } catch (error) {
          console.error('Error uploading image:', error);
          setErrorUpload(true)
          setUploading(false)
          setImages(prevImages => {
            const updatedImages = [...prevImages];
            updatedImages[index] = {
              ...updatedImages[index],
              'is_error_uploading': true,
              'is_uploading' : false
            };
            return updatedImages;
          });
        }
      };

    const handleMultipleUpload = async () => {
    try {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            if(!image.is_uploaded){
                await handleFileUpload(image.image, 'image', 'store/uploads', i);
            }
        }
        } catch (error) {
        console.error('Error uploading images:', error);
        }
    }

    // console.log('images', images)

    const deleteAsset = async (deleteToken) => {

      // console.log(deleteToken);
        
        if(deleteToken){
  
          try {
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/delete_by_token`,
              { token: deleteToken },
              { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.data.result === 'ok') {
              // console.log('Asset deleted successfully');
            } else {
              console.error('Failed to delete asset');
            }
          } catch (error) {
            console.error(error);
            throw new Error('Failed to delete asset');
          }
        }
        else{
          return
        }
      };

    


  return (
    <div className={`bg-white relative m-auto rounded-ten py-8 px-5 md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent h-fit`}>
        <div className='text-center'>
            <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Add New Product</h4>
        </div>
        <form onSubmit={formik.handleSubmit} action="" className='flex flex-col gap-5'>
            <div className='pt-5 text-xs font-spaceGroteskMedium text-brandGray14x'>
                <p className='py-2.5'>Is this Product</p>
                <div className="bg-brandGray24x py-1 px-2 rounded-ten w-fit flex flex-row font-spaceGroteskMedium">
                  <label htmlFor="digital" className={`${formik.values.is_digital == 1 ? 'bg-white' : 'bg-transparent'} rounded-ten py-2 cursor-pointer px-6 trans-all-500-ease-in-out`}>
                    Digital
                    <input type="checkbox" className='hidden is_digital-check' id='digital' name='is_digital' onChange={(e)=>{formik.setFieldValue('is_digital', e.target.value)}} value={1} />
                  </label>
                  <label htmlFor="physical" className={`${formik.values.is_digital == 0 ? 'bg-white' : 'bg-transparent'} rounded-ten py-2 cursor-pointer px-6 trans-all-500-ease-in-out`}>
                    Physical
                    <input type="checkbox" className='hidden is_digital-check' id='physical' name='is_digital' onChange={(e)=>{formik.setFieldValue('is_digital', e.target.value); }} value={0} />
                  </label>
                </div>
            </div>
            {
                formik.values.is_digital == 1
                &&
                <fieldset className={`gap-2.5 w-full flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                    <p className='text-xs font-spaceGroteskMedium text-brandGray14x text-left'>{`Enter URL to Digital Product`}</p>
                    <label htmlFor='digital_product_url' className={`relative w-full flex flex-row items-center gap-0.5 text-sm text-brandGray14x px-4 py-2.5 rounded-five appearance-none bg-transparent border-2 ${(formik.touched.digital_product_url && formik.errors.digital_product_url || (formik.touched.digital_product_url && formik.values.is_digital == 1 && !formik.values.digital_product_url)) ? 'border-brandRed1x focus-within:border-brandRed1x' : 'border-brandGray16x focus-within:border-black'} focus-within:border-2`}>
                    <span className='font-avenirHeavy'>https://</span>
                    <input type="text" name='digital_product_url' id='digital_product_url' onChange={formik.handleChange} onBlur={formik.handleBlur} required placeholder={`url`} value={formik.values.digital_product_url} className='w-full focus:outline-none font-spaceGroteskLight text-sm text-black placeholder:text-brandGray32x rounded-r-five bg-transparent' />
                    </label>
                    {/* {formik.errors.digital_product_url} */}
                </fieldset>
            }
            <div className='w-full flex flex-col md:flex-row gap-5 md:gap-10 md:items-end'>
                <div className='md:w-fiftyPercent'>
                    <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.product_name} fieldError={formik.touched.product_name && formik.errors.product_name} inputLabel={`What item do you want to sell?`} inputPlaceholder={`Enter Product Name`} inputName={'product_name'} inputId={'product_name'} />
                </div>
                <div className='md:w-fiftyPercent'>
                    <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                        <label htmlFor="product_amount" className='text-xs font-spaceGroteskMedium text-brandGray14x'>{`How much do you want to sell for?`}</label>
                        <div className="relative w-full">
                            <input type="text" name='product_amount' id='product_amount' onChange={(e) => {useAmountFormat(e, formik, 'product_amount')}} onBlur={formik.handleBlur} value={formik.values.product_amount} placeholder='Enter Product Amount' className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five border-2 ${formik.touched.product_amount && formik.errors.product_amount ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2`} />
                            <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>NGN</span>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-5 md:gap-10 md:items-end'>
                <div className='md:w-fiftyPercent'>
                    <FormSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} selectValue={formik.values.is_limited} inputValue={formik.values.is_limited} fieldError={formik.touched.is_limited && formik.errors.is_limited} selectLabel={`Is Item limited?`} selectName={'is_limited'} selectId={'is_limited'} >
                        <option selected disabled value="">Choose</option>
                        <option value="1">Yes, Limited</option>
                        <option value="0">No, Unlimited</option>
                    </FormSelect>
                </div>
                <div className='md:w-fiftyPercent'>
                    <FormInput readOnly={formik.values.is_limited == '0'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.product_stockcount} fieldError={(formik.touched.product_stockcount && formik.errors.product_stockcount) || (formik.values.is_limited == '1' && !formik.values.product_stockcount)} inputPlaceholder={formik.values.is_limited == '0' ? 'Disabled for unlimited' :`e.g 10`} inputLabel={`How many quantity?`} inputName={'product_stockcount'} inputId={'product_stockcount'} inputType={'number'} />
                </div>
            </div>
            <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.product_options} fieldError={formik.touched.product_options && formik.errors.product_options} inputLabel={`Enter Product Options`} inputPlaceholder={`E.g (Small, Medium, Large)`} inputName={'product_options'} inputId={'product_options'} />
            <FormTextArea textAreaName={'product_description'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.product_description} fieldError={formik.touched.product_description && formik.errors.product_description} textAreaId={'product_description'} textAreaLabel={`Can you describe clearly this Product for your Customers?`} textAreaPlaceholder={`Describe clearly this product you're listing for sale.`} textAreaRows={'8'} resize={false} />

            <fieldset>
              <label htmlFor='image_url' className='text-xs font-avenirRegular flex flex-row gap-3 items-center py-2.5 px-4 w-fit bg-brandBlack1x text-white rounded-fifty' >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0586 7.97484L10.0002 2.9165L4.94189 7.97484" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        <path opacity="0.4" d="M10 17.0831V3.05811" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Upload Product Image(s)
              </label>
              <input type="file" name='image_url' id='image_url' readOnly={uploading} multiple onChange={(e)=>formik.setFieldValue('image_url', Array.from(e.target.files))} onBlur={formik.handleBlur} className='hidden' />
            </fieldset>

            {/* {
                formik.values.image_url && console.log(formik.values.image_url)
            } */}

            <div className={`grid xs:grid-cols-2 bxs:grid-cols-3 grid-cols-5 gap-8 py-4`}>
                {
                    formik.values.image_url && images && images.map((file, idx) => {
                    return <div key={idx} className='rounded-ten w-full relative'>
                        <img src={(file.image instanceof Blob || file.image instanceof File) ? URL.createObjectURL(file.image) : ''} alt="" className='aspect-square z-10 w-full rounded-ten border-2 border-brandGreen4x' />
                            <div className='absolute top-0 left-0 rounded-ten bg-black/50 h-full w-full z-20 p-1'>
                                
                            </div>
                            <div className={`absolute left-1 top-1 z-30`}>
                                {file.is_twoMBMax ? '' : <div className='w-fit h-fit bg-white rounded-full'>{errorIcon}</div>}
                            </div>
                            {
                                file.is_uploading
                                ?
                                <div className='absolute bottom-1 right-1 bg-white p-0.5 h-fit drop-shadow-lg rounded-five z-30'>
                                    <BeatLoader size={'10px'} color={`#2A2AB2`} />
                                </div>
                                :
                                <div>
                                    {
                                        file.is_error_uploading
                                        ?
                                        <button type={'button'} onClick={()=>deleteElement(idx)} className={`absolute bottom-1 right-1 bg-white p-0.5 drop-shadow-lg aspect-square rounded-five z-30`}>
                                            <TbFaceIdError size={'20px'} color='#D95126' />
                                        </button>
                                        :
                                        <div>
                                            {
                                                !file.is_uploaded 
                                                ?
                                                <button type={'button'} onClick={()=>deleteElement(idx)} className='absolute bottom-1 right-1 bg-white p-0.5 drop-shadow-lg aspect-square rounded-five z-30'>
                                                    <IoIosTrash size={'20px'} />
                                                </button>
                                                :
                                                <div className={`flex gap-2 absolute bottom-1 right-1 items-center`}>
                                                  <svg className='bg-white p-0.5 drop-shadow-lg aspect-square rounded-five z-30' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                                  <button type={'button'} onClick={()=>{deleteAsset(file.delete_token); deleteElement(idx)}} className='bg-white p-0.5 drop-shadow-lg aspect-square rounded-five z-30'>
                                                      <IoIosTrash size={'20px'} />
                                                  </button>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            }
                    </div>
                    })
                }
            </div>
            {(equalToFive && images.length == 5) && <p className='text-xs text-brandRed1x text-right'>*** Max 5 files</p>}
            {(images && images.filter(image => !image.is_twoMBMax).length > 0) && <div className='text-xs text-brandRed1x text-right flex gap-2 justify-end w-full'><span>{errorIcon}</span> Image(s) greater than 2mb (delete) </div>}
            {
                (images && images.length > 0 && images.filter(image => !image.is_twoMBMax).length == 0) && images.filter(image => image.is_uploaded).length !== images.length
                &&
                <div className={`flex items-center gap-3 justify-end pb-2 flex-wrap`}>
                    <p className='text-brandGray14x text-xs'>Use {(images.length >= 1 && images.filter(image => !image.is_uploaded).length == 1) ? 'this image' : 'these images'} ?</p>
                    <div className={`flex items-center gap-3 justify-end`}>
                        <button type='button' disabled={uploading} onClick={handleCancel} className='text-brandRed1x disabled:text-brandGray16x text-3xl'> <IoIosClose /></button>
                        <button type='button' disabled={uploading} onClick={handleMultipleUpload} className={`text-brandGreen1x disabled:text-brandGray16x`}> <GiCheckMark /></button>
                    </div>
                </div>
            }
            <div className='flex justify-end'>
                <ButtonPrimaryIcon handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} type={'button'} icon={' '} text={'Create New Product'} flexDirection={'flex-row-reverse'} />
            </div>
        </form>
    </div>
  )
}

export default NewProduct