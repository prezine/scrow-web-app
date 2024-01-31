import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/stores/useUser'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import AuthInput from '../../Auth/Elements/Form/AuthInput'
import Alert from '../../Elements/Alerts/Alert'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import useGetUser from '../../../utils/useGetUser'

const EarlyAccessFeatures = () => {

  const {userDataValue} = useUser()

  const {user} = useGetUser()

  const {requestHeaders} = useRequestHeaders()

  const [submitting, setSubmitting] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message:"",
    type:'warning',
    duration:2500
  })

  const [mount, setMount] = useState(false)


  const validationSchema = Yup.object({           
    name: Yup.string()
      .min('4', "Name must be at least four letters")         
      .required("Name Required"),                
    email: Yup.string()
      .required("Email Required") 
      .min('4', "Email must be at least four letters")         
      .email('Enter a valid email')            
  });

  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
    },
    validationSchema
  });

  useEffect(() => {
    
      setMount(true)

      return ()=>{
        setMount(false)
      }


  }, [])


  useEffect(() => {
    
      formik.setFieldValue('name', userDataValue &&  userDataValue.name)
      formik.setFieldValue('email', userDataValue && userDataValue.email)
      // console.log(formik.values);


  }, [mount])
  




  const handleSubmit = (e) => {
    if(formik.errors.name || formik.errors.email){
      return
    }
    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('name', formik.values.name)
    formData.append('email', formik.values.email)
    try {

        // console.log(formik.values);

        // const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);

        axios.post(`${import.meta.env.VITE_BASEURL}/setting/early-access?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`danger` })
                console.log(res.data.data.message);
            }else if (res.data.status == true && res.data.data.message) {
                setOpenAlert(true)
                setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
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



  return (
    <div className='w-full pb-16 pt-24'>
        <form method="post" action="" className='sm:w-ninetyPercent md:w-eightyPercent mds:w-ninetyFivePercent lg:w-sixtyFivePercent max-w-lg mx-auto flex flex-col gap-5'>
          
          <div className="">
            <AuthInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.name} fieldError={formik.touched.name && formik.errors.name} paddingY={'py-3'} inputLabel={'Your Name'} inputName={'name'} inputId={'name'}/>
          </div>
          <div className="">
            <AuthInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.email} fieldError={formik.touched.email && formik.errors.email} paddingY={'py-3'} inputLabel={'Your Email'} inputName={'email'} inputId={'email'} inputType={'email'} />
          </div>

          <div className='text-center font-avenirLight text-brandGray41x text-xs'>
            <p>Help pandascrow developers test beta versions of our apps and features using the Pandascrow app. Download Pandascrow on the App Store for iPhone, iPad, Mac, and Apple TV or Google Play Store for Android.</p>
          </div>

          <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
            <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} paddingY={'py-3'} text={'Request Access'} type={'button'} width={'w-full'} />
          </div>

        </form>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default EarlyAccessFeatures