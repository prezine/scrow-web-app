import React, {useState} from 'react'
import FormInput from '../../../../Elements/Form/FormInput'
import ButtonPrimary from '../../../../Elements/Buttons/ButtonPrimary'
import FormSelect from '../../../../Elements/Form/FormSelect'
import FormOption from '../../../../Elements/Form/FormOption'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import useUser from '../../../../../hooks/stores/useUser';
import useRequestHeaders from '../../../../../utils/useRequestHeaders';



const VerificationKYCModal = ({openAlert, alertValues, setOpenAlert, setAlertValues, closeModal}) => {

  
  const {userDataValue} = useUser()

  const {requestHeaders} = useRequestHeaders()

  const [submitting, setSubmitting] = useState(false)

  const formik = useFormik({
    initialValues:{
      documentType:'',
      documentNumber:'',
      dateOfCompanybirth:''
    },

    validationSchema:Yup.object({
        documentNumber: Yup.string()
          .required('Registration number required'),
        documentType: Yup.string()
          .required("Please select an option"),                
        dateOfCompanybirth: Yup.date()
        .required('Date required')
        .max(new Date(), 'Date cannot be in the future'),          
    })  
  })

  
  
  
  const handleSubmit = (e) => {
    if(formik.errors.documentNumber || formik.errors.documentType || formik.errors.dateOfCompanybirth){
      return
    }
    setOpenAlert(false)
    setSubmitting(true)
    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('documentNumber', formik.values.documentNumber)
    formData.append('dateOfCompanybirth', formik.values.dateOfCompanybirth)
    formData.append('documentType', formik.values.documentType)

    try {

        // console.log(formik.values);

        axios.post(`${import.meta.env.VITE_BASEURL}/compliance/verification?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
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


  return (
    <>
      <div className='text-center'>
        <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Verification Information</h4>
        <p className='text-sm md:text-base text-brandGray4x font-spaceGroteskRegular'>The documents we ask for are based on your business profile</p>
      </div>
      <form action="" method='post' onSubmit={formik.handleSubmit} className="flex flex-col pt-10 gap-x-10 gap-y-5">

        <FormSelect handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.documentType && formik.errors.documentType} selectValue={formik.values.documentType} selectLabel={'What Document does your Incorporated business have?'} selectId={'documentType'} selectName={'documentType'}>
          <FormOption isDisabled isSelected value={''} optionName={'Select the document you have?'} />
          <FormOption value={'CAC'} optionName={'CAC'} />
          <FormOption value={'BN'} optionName={'BN'} />
        </FormSelect>

        <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} fieldError={formik.touched.documentNumber && formik.errors.documentNumber} inputValue={formik.values.documentNumber} inputId={'documentNumber'} inputName={'documentNumber'} inputLabel={'Enter the Document Registration Number'} inputPlaceholder={'Document Registration Number (e.g ABC-12345678)'} />

        <fieldset className={`gap-2.5 flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
            <label htmlFor="dateOfCompanybirth" className='text-xs font-spaceGroteskMedium text-brandGray14x'>{`Pick the Date you Registered this Business`}</label>
            <div className="relative w-full">
                <input type="date" name='dateOfCompanybirth' id='dateOfCompanybirth' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.dateOfCompanybirth} placeholder={`Choose date of your Business Incorporation`} className={`pl-12 pr-4 py-2.5 w-full font-spaceGroteskRegular text-sm text-black placeholder:text-brandGray32x rounded-five appearance-none bg-transparent h-38px border-2 ${formik.touched.dateOfCompanybirth && formik.errors.dateOfCompanybirth ? 'border-brandRed1x focus:border-brandRed1x' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2`} />
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
        </fieldset>

        <div className="col-span-1 mds:col-span-2 sm:col-span-2 pt-5 flex items-center justify-center">
          <ButtonPrimary handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} text={'Submit verification data'} type={'button'} bgColor={'bg-brandGreen1x'} />
        </div>
      </form>
    </>
  )
}

export default VerificationKYCModal