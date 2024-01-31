import React, {useRef, useState} from 'react'
import FormInput from '../../../../Elements/Form/FormInput'
import PhoneInput from '../../../../Elements/Form/PhoneInput'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'
import FormSelect from '../../../../Elements/Form/FormSelect'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useRequestHeaders from '../../../../../utils/useRequestHeaders'
import axios from 'axios'
import useUser from '../../../../../hooks/stores/useUser'
import ModalPicSwiper from './ModalPicSwiper'
import useIsOver13YearsOld from '../../../../../utils/useIsOver13YearsOld'
import GetState from '../../../../Elements/Form/GetState'


const PersonalKYCModal = ({openAlert, alertValues, setOpenAlert, setAlertValues, closeModal}) => {

  const {userDataValue} = useUser()
  const [submitting, setSubmitting] = useState(false)
  const [picsFetched, setPicsFetched] = useState(false)
  const [openPicSwiper, setOpenPicSwiper] = useState(false)
  const {requestHeaders} = useRequestHeaders()

  const [currentPic, setCurrentPic] = useState('')


  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  const MAX_FILE_SIZE = 1048576;  // 1 MB


  // console.log(minDate);
  // const minDate = new Date()
  // minDate.setFullYear(minDate.getFullYear() - 18);

  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      user_dp:'',
      dob:"",
      state:"",
      address:"",
      gender:""
    },

    validationSchema:Yup.object({
        name: Yup.string()
          .min(4, 'Fullname should be four or more characters')
          .required('Fullname required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Email Required'),
        gender: Yup.string()
          .required("Please select an option"),    
        state: Yup.string()
          .required("Please select an option"),
        phone:Yup.string()
          .min(4, 'Phone Number must be more than four (4) characters')
          .required('Password required'),   
        address:Yup.string()
          .required('Address required')
          .min(4, 'Address should be four or more characters') ,
        dob:Yup.date()
        .required('Date of birth required')
        .nullable()
        .max(new Date(), 'Birthday cannot be in the future')
        .test('age', 'You must be at least 13 years old to use our services', function (value) {
          return useIsOver13YearsOld(value);
        })   
    })  
  })

  const defaultGender = formik.values.gender ? formik.values.gender : userDataValue && userDataValue.gender ? userDataValue.gender : 'Female'

  const defaultPic = (defaultGender) ? (defaultGender.toLowerCase() == 'female') && 'https://api.pandascrow.io/assets/img/dp/dp-5.png' || (defaultGender.toLowerCase() == 'male') && 'https://api.pandascrow.io/assets/img/dp/dp-2.png' : 'https://api.pandascrow.io/assets/img/dp/dp-2.png'
  
  
  const handleSubmit = (e) => {
    if(formik.errors.email || formik.errors.name || formik.errors.gender || formik.errors.state || formik.errors.address || formik.errors.dob || formik.errors.gender ){
      console.log('Error in personal kyc fields');
      return
    }

    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('user_dp', currentPic)
    formData.append('name', formik.values.name)
    formData.append('email', formik.values.email)
    formData.append('phone', formik.values.phone)
    formData.append('dob', formik.values.dob)
    formData.append('gender', formik.values.gender)
    formData.append('state', formik.values.state)
    formData.append('address', formik.values.address)

    try {

        // console.log(formik.values);

        axios.post(`${import.meta.env.VITE_BASEURL}/compliance/personal?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
          // console.log(res);
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
    
    // console.log(formData)

  }


  return (
    <>
      <div className='text-center'>
        <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Personal Information</h4>
        <p className='text-sm md:text-base text-brandGray4x font-spaceGroteskRegular'>Please tell us a little about yourself</p>
      </div>
      <form action="" method='post' onSubmit={formik.handleSubmit} className="pt-10 flex flex-col gap-x-10 gap-y-5">
        <fieldset className='flex flex-col gap-3 pb-2'>
          <label htmlFor="user_dp" className='w-fit cursor-pointer mx-auto flex flex-col gap-3 items-center justify-center h-24 text-base'>
            {
              openPicSwiper
              ?
              <ModalPicSwiper setPicsFetched={setPicsFetched} gender={defaultGender} setOpenPicSwiper={setOpenPicSwiper} defaultPic={currentPic ? currentPic : (userDataValue && userDataValue.dp_url) ? userDataValue.dp_url : defaultPic} openPicSwiper={openPicSwiper} picsFetched={picsFetched} currentPic={currentPic} setCurrentPic={setCurrentPic}></ModalPicSwiper>
              :
              <div className='rounded-twenty object-cover z-30 h-20 w-20'>
                <img src={currentPic ? currentPic : (userDataValue && userDataValue.dp_url) ? userDataValue.dp_url : defaultPic} alt="Avatar" className='h-full w-full min-w-full rounded-twenty aspect-square object-cover' />
              </div>
            }

            {/* {userDataValue && userDataValue.dp_url} */}
          </label>
            <div className='w-fit mx-auto'>
              <button type='button' onClick={()=>setOpenPicSwiper(true)} className={` text-xs rounded-fifty border-2 ${formik.touched.dp_url && formik.errors.dp_url ? 'border-brandRed1x' : 'border-black'} py-2 px-4`}>
                Choose Profile photo
              </button>
            </div>
        </fieldset>

        <div onClick={()=>setOpenPicSwiper(false)} className={`${openPicSwiper ? 'visible opacity-100' : 'invisible opacity-0'} cursor-pointer transition-all duration-300 ease-in-out bg-black/60 z-20 rounded-ten backdrop-blur-sm absolute top-0 left-0 h-full w-full`}></div>
        
        <div className='flex flex-col md:flex-row gap-x-10 gap-y-5 md:items-end'>
          <div className="md:w-fiftyPercent flex flex-col gap-2.5">
            <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.name && formik.errors.name} inputValue={formik.values.name} inputId={'name'} inputName={'name'} />
          </div>
          <div className="md:w-fiftyPercent">
            <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.email && formik.errors.email} inputValue={formik.values.email} inputLabel="What's your email address" inputPlaceholder="Enter Email Address" inputType="email" inputName={'email'} inputId={'email'} />
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-x-10 gap-y-5 md:items-end'>
          <fieldset className={`gap-2.5 md:w-fiftyPercent flex flex-col col-span-1 md:col-span-2`}>
            <label htmlFor="phone" className='text-xs font-spaceGroteskMedium text-brandGray14x'>Enter your personal phone number</label>
            <PhoneInput onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className={`px-4 py-2 text-sm font-spaceGroteskRegular text-black placeholder:text-brandGray32x rounded-five border-2 ${formik.touched.phone && formik.errors.phone ? 'border-brandRed1x' : 'border-brandGray17x'} w-full`} placeholder="Enter Phone Number" name="phone" id="phone" />
          </fieldset>
          <fieldset className={`gap-2.5 md:w-fiftyPercent flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
              <label htmlFor="dob" className='text-xs font-spaceGroteskMedium text-brandGray14x'>{`What's your Date of Birth`}</label>
              <div className="relative w-full">
                  <input type="date" name='dob' id='dob' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dob} placeholder={`Select Birthday`} className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five appearance-none bg-transparent h-38px border-2 ${formik.touched.dob && formik.errors.dob ? 'border-brandRed1x' : 'border-brandGray17x'}`} />
                  <span className='absolute left-2 top-fiftyPercent -translate-y-fiftyPercent text-brandBlack1x text-sm font-avenirBlack'>
                  <svg className='h-4 w-4 pointer-events-none' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66663 1.6665V4.1665" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M13.3334 1.6665V4.1665" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path opacity="0.4" d="M2.91663 7.5752H17.0833" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M16.0083 13.1416L13.0583 16.0916C12.9416 16.2082 12.8333 16.4249 12.8083 16.5832L12.6499 17.7082C12.5916 18.1166 12.875 18.3999 13.2833 18.3416L14.4083 18.1833C14.5666 18.1583 14.7916 18.0499 14.9 17.9332L17.85 14.9833C18.3583 14.4749 18.6 13.8833 17.85 13.1333C17.1083 12.3916 16.5166 12.6332 16.0083 13.1416Z" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M15.5833 13.5664C15.8333 14.4664 16.5333 15.1664 17.4333 15.4164" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V7.08317C2.5 4.58317 3.75 2.9165 6.66667 2.9165H13.3333C16.25 2.9165 17.5 4.58317 17.5 7.08317V9.99984" stroke="#292D32" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                      <path opacity="0.4" d="M9.9962 11.4167H10.0037" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                      <path opacity="0.4" d="M6.91197 11.4167H6.91945" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                      <path opacity="0.4" d="M6.91199 13.9165H6.91947" stroke="#292D32" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  </span>
              </div>
              {/* {(formik.touched.dob && formik.errors.dob) && <p className='text-brandRed1x text-xs'>{formik.errors.dob}</p>} */}
          </fieldset>
        </div>

        <div className='flex flex-col md:flex-row gap-x-10 gap-y-5 md:items-end'>
          <div className="md:w-fiftyPercent flex flex-col gap-2.5">
            <FormSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.gender && formik.errors.gender} selectValue={formik.values.gender} selectName={'gender'} selectLabel={'Select your gender'} selectId={'gender'} >
              <option value="" selected disabled>Select your gender</option>
              <option value={'Male'} >Male</option>
              <option value={'Female'} >Female</option>
              {/* <option value={'prefer not to say'} >Prefer not to say</option> */}
            </FormSelect>
          </div>
          <div className="md:w-fiftyPercent flex flex-col gap-2.5">
            <FormSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.state && formik.errors.state} selectValue={formik.values.state} selectName={'state'} selectLabel={'What state do you live in?'} selectId={'state'} >
              <option value="" selected disabled>Select your state</option>
              <GetState stateName={(userDataValue && userDataValue.country) ? userDataValue.country : ''} />
            </FormSelect>
          </div>
        </div>

        <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.address && formik.errors.address} inputValue={formik.values.address} inputName={'address'} inputPlaceholder={'Enter your home address'} inputId={'address'} inputLabel={'Provide your home address'} />

        <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
          <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Update your profile'} type={'button'} bgColor={'bg-brandGreen1x'} />
        </div>
      </form>
    </>
  )
}

export default PersonalKYCModal