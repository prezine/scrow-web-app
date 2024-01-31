import React, {useRef, useState} from 'react'
import FormInput from '../../../../Elements/Form/FormInput'
import PhoneInput from '../../../../Elements/Form/PhoneInput'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'
import FormTextArea from '../../../../Elements/Form/FormTextArea'
import FormFileInput from '../../../../Elements/Form/FormFileInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useUser from '../../../../../hooks/stores/useUser';
import useRequestHeaders from '../../../../../utils/useRequestHeaders';
import axios from 'axios';
import useFormatPhoneNumber from '../../../../../utils/useFormatPhoneNumber';
import useFormatPhoneTest from '../../../../../utils/useFormatPhoneTest';
import useIsFileObject from '../../../../../utils/useIsFileObject'
import useFileUpload from '../../../../../utils/CloudinaryUpload/useFileUpload'


const BusinessKYCModal = ({openAlert, alertValues, setOpenAlert, setAlertValues, closeModal}) => {

  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()


  const [submitting, setSubmitting] = useState(false)

  const [data, setData] = useState({
    is_sme:0
  })


  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  const MAX_FILE_SIZE = 1048576;  // 1 MB

  const phases = [
    {
      name:'Incorporated Business',
      id:'incorporated',
      value:0,
      requirements:[
        "Provide incorporated document",
        "Upload Regulatory Document",
        "Provide Settlement account"
      ]
    },
    {
      name:'Small Business',
      id:'small',
      value:1,
      requirements:[
        "Submit BVN",
        "Provide Settlement account"
      ]
    },
  ]


  const formik = useFormik({
    initialValues:{
      businessname:'',
      businessemail:'',
      businessphone:'',
      businesslogo:"",
      is_sme:0,
      businessaddress:'',
      businessbio:''
    },

    validationSchema:Yup.object({
        businessname: Yup.string()
          .min(4, 'Business should be four or more characters')
          .required('Business required'),
        businessemail: Yup.string()
          .email('Invalid email address')
          .required('Email Required'),
        businessphone:Yup.string()
          .required('Password required')
          .min(11, 'Phone number must be at least 11 digits')
            .max(14, 'Phone number must not be more than 14 digits')
            .test('isValid', 'Invalid phone number', function(value) {
              const formattedPhoneNumber = useFormatPhoneTest(value);
              return formattedPhoneNumber.length >= 11 && formattedPhoneNumber.length <= 14;
            }),   
        businessaddress:Yup.string()
          .required('Address required')
          .min(4, 'Address should be four or more characters') ,
        businessbio:Yup.string()
          .required('Bio required')
          .min(4, 'Bio should be four or more characters') ,
        businesslogo : Yup.mixed()
          .nullable()
          .test('fileSize', 'File size too large. Max size is 2mb', (value) => {
            return value && value.size <= import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE;
          })

            
    })  
  })


  const handleChange = (e) => {
      setData({...data, [e.target.name]:e.target.value})
  }

  
  const handleSubmit = (e) => {
    if(formik.errors.businessname || formik.errors.businessemail || formik.errors.businessphone || formik.errors.businessaddress || formik.errors.businessbio){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('is_sme', data.is_sme)
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('businessname', formik.values.businessname)
    formData.append('businessemail', formik.values.businessemail)
    formData.append('businessphone', formik.values.businessphone)
    formData.append('businessaddress', formik.values.businessaddress)
    formData.append('businessbio', formik.values.businessbio)
    formData.append('businesslogo', uploadedImageUrl ? uploadedImageUrl : useIsFileObject(formik.values.businesslogo) ? '' : formik.values.businesslogo)


    try {

        // console.log(formik.values);

        axios.post(`${import.meta.env.VITE_BASEURL}/compliance/business?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                closeModal()
                console.log(res.data.data.message);
            }else if (res.data.status == true && res.data.data.message) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
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

  
  const handlePhoneInputChange = (e, handleChange) => {
    const formattedPhoneNumber = useFormatPhoneNumber(e.target.value, e);
    handleChange({ target: { name: 'businessphone', value: formattedPhoneNumber } });
  }

  const {uploading, uploadedImageUrl, errorUpload, handleFileUpload, setErrorUpload, setUploadedImageUrl} = useFileUpload(formik.values.businesslogo, 'image', 'business')

  const handleCancel = () => {
    formik.setFieldValue('businesslogo', '')
    setUploadedImageUrl('')
  }


  return (
    <>
      <div className='text-center'>
        <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Business Information</h4>
        <p className='text-sm md:text-base text-brandGray4x font-spaceGroteskRegular'>Please tell us some more about your business</p>
      </div>
      <form action="" method='post' onSubmit={formik.handleSubmit} className="pt-10 flex flex-col gap-x-10 gap-y-5">
        
      <FormFileInput formik={formik} fileValue={formik.values.businesslogo} errorUpload={errorUpload} setErrorUpload={setErrorUpload} setUploadedImageUrl={setUploadedImageUrl} handleCancel={handleCancel} handleFileUpload={handleFileUpload} uploading={uploading} uploadedImageUrl={uploadedImageUrl} actionText={'Choose Shop Icon'} fileInputId={'businesslogo'} fileInputName={'businesslogo'} handleBlur={formik.handleBlur} fieldError={formik.touched.businesslogo && formik.errors.businesslogo} />

        <fieldset className='pt-5 text-xs font-spaceGroteskMedium text-brandGray14x'>
              <p className='py-2.5'>Choose your Business Phase</p>
              <div className=" py-1 px-2 rounded-ten w-full flex flex-col lg:flex-row gap-x-10 gap-y-5">
                {phases.map((type, idx)=>{
                  return <label key={idx} htmlFor={type.id} className={`${data.is_sme == type.value ? 'border-brandDarkViolet1x text-brandDarkViolet1x' : 'border-brandGray17x text-brandGray20x'} border-2 rounded-ten flex flex-col gap-2 relative lg:w-fiftyPercent py-2 cursor-pointer px-6 trans-all-500-ease-in-out`}>
                    <input type="checkbox" className='hidden is_sme-check' id={type.id} name='is_sme' onChange={handleChange} value={type.value} />
                    <span className={`${data.is_sme == type.value ? 'text-brandDarkViolet1x' : 'text-brandGray14x'}`}>{type.name}</span>
                    <div className='font-avenirBook'>
                      <span className='text-xs font-avenirMedium'>KYC Requirements: </span>
                      <ul>
                        {type.requirements.map((requirement, i)=>{
                          return <li key={i} className='list-disc list-inside text-xxs font-avenirRoman'>{requirement}</li>
                        })}
                      </ul>
                    </div>

                    <div className={`${data.is_sme == type.value ? 'border-brandDarkViolet1x border-4' : 'border-brandGray17x border-2'} absolute h-4 w-4 rounded-fifty trans-all-500-ease-in-out top-2 right-2`}></div>
                  </label>
                })}
              </div>
          </fieldset>
        
        <div className='flex flex-col md:flex-row gap-x-10 gap-y-5 md:items-end'>
          <div className="md:w-fiftyPercent flex flex-col gap-2.5">
            <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.businessname && formik.errors.businessname} inputValue={formik.values.businessname}inputLabel={'What is your incorporated business name?'} inputPlaceholder={'Enter your business name'} inputId={'businessname'} inputName={'businessname'} />
          </div>
          <div className="md:w-fiftyPercent">
            <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.businessemail && formik.errors.businessemail} inputValue={formik.values.businessemail}inputLabel="Provide us your business email" inputPlaceholder="Enter your business email address" inputType="email" inputName={'businessemail'} inputId={'businessemail'} />
          </div>
        </div>

        <fieldset className={`gap-2.5 flex flex-col col-span-1 md:col-span-2`}>
          <label htmlFor="businessphone" className='text-xs font-spaceGroteskMedium text-brandGray14x'>What is your support phone number?</label>
          <PhoneInput onChange={(e) => handlePhoneInputChange(e, formik.handleChange)}  onBlur={formik.handleBlur} value={formik.values.businessphone} className={`px-4 py-2.5 font-spaceGroteskRegular text-xs text-black placeholder:text-brandGray32x rounded-five border-2 ${formik.touched.businessphone && formik.errors.businessphone ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2 w-full`} placeholder="Enter your business phone number" name="businessphone" id="businessphone" />
        </fieldset>

        <div>
          <FormInput inputId={'businessaddress'} inputName={'businessaddress'} inputPlaceholder={'Enter your business office address'} inputLabel={'Where is your business located?'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.businessaddress && formik.errors.businessaddress} inputValue={formik.values.businessaddress} />
        </div>

        <div>
          <FormTextArea maxLength={500} textAreaId={'businessbio'} textAreaName={'businessbio'} textAreaPlaceholder={'We are a Shoe factory company that manufacture leader with using...'} textAreaLabel={'Explain what your business does in 500 words or less'}  handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.businessbio && formik.errors.businessbio} inputValue={formik.values.businessbio} />
        </div>

        <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
          <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Update your business info'} type={'submit'} bgColor={'bg-brandGreen1x'} />
        </div>
      </form>
    </>
  )
}

export default BusinessKYCModal