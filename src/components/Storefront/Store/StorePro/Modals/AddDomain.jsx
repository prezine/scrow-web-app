import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import useUser from '../../../../../hooks/stores/useUser'
import useRequestHeaders from '../../../../../utils/useRequestHeaders'
import CopyButtonWithText from '../../../../Elements/Buttons/CopyButtonWithText'

const AddDomain = ({type, domain, modalState, closeModal, setOpenAlert, setAlertValues, alertValues, mutate}) => {

    const [step, setStep] = useState(1)

    const {userDataValue} = useUser()

    const {requestHeaders} = useRequestHeaders()

    const stepsData = [
        {
            current:1,
            info:"Connect domain name"
        },
        {
            current:2,
            info:"Update host A Record"
        },
    ]

    const formik = useFormik({
        initialValues:{
            domain_url:"",
        },
        validationSchema:Yup.object({
            domain_url: Yup
            .string()
            // .url('Invalid URL format')
            .required('Domain URL required'),
        })
    })

    const dummyDomains = [
        {
            host:"@",
            record:"A",
            pointTo:"162.159.153.4"
        },
        {
            host:"@",
            record:"B",
            pointTo:"162.159.153.5"
        }
    ]
  

       
  const handleSubmit = (e) => {
      setStep(2)
    if(formik.errors.domain_url || formik.values.domain_url == ''){
      return
    }

    setOpenAlert(false)
    setSubmitting(true)

    const formData = new FormData()
    formData.append('userID', `${userDataValue && userDataValue.userID}`)
    formData.append('domain_url', `https://${formik.values.domain_url}`)
    
    try {
        //   const formValues = Object.fromEntries(formData.entries());
        //     console.log(formValues);

    //   axios.post(`${import.meta.env.VITE_BASEURL}/app/update?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
    //   .then((res)=>{
    //     console.log(res);
    //       if(res.data.status == false && res.data.data.message){
    //           setOpenAlert(true)
    //           setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
    //           closeModal()
    //           console.log(res.data.data.message);
    //       }else if (res.data.status == true && res.data.data.message) {
    //           formik.resetForm()
    //           setOpenAlert(true)
    //           setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`success` })
    //           mutate()
    //           closeModal()
    //       }

    //       setSubmitting(false)
          
    //   })
    //   .catch((err)=>{
    //       console.error(err);
    //   })

    setSubmitting(false)
      
    } catch (error) {
        console.error(error)
    }
  }

  const handleSubmitTwo = () => {
    closeModal()
  }

  return (
    <div className={`text-center h-fit flex px-4 sm:px-8 md:px-10 py-10 z-50 w-seventyPercent mx-auto my-auto`}>
        <div className='flex flex-col items-center h-fit w-full'>
            <div className='py-5 flex pb-18 max-w-lg'>
                {
                    stepsData.map((data, idx)=>{
                        return <div className={`${idx == 0 && 'pr-16'} ${idx == 1 && 'pl-16'} px-16 relative`}>
                            <div className={`flex flex-col items-center `}>
                                <div onClick={()=>setStep(data.current)} className={`cursor-pointer ${(data.current == step || step > data.current ) ? 'bg-brandGreen1x text-white' : 'bg-white text-black'} transition-colors duration-300 ease-in-out font-avenirHeavy rounded-full text-xl py-1 px-3 relative w-fit`}>
                                    {data.current}
                                    <div className={`${idx == 0 ? 'hidden' : `${(data.current == step || step > data.current )? 'bg-brandGreen1x' : 'bg-white'}` } transition-colors duration-300 ease-in-out w-16 h-0.5 absolute right-hundredPercent top-fiftyPercent -translate-y-fiftyPercent`}></div>
                                    <div className={`${idx == (stepsData.length - 1) ? 'hidden' : `${(data.current == step || step > data.current )? 'bg-brandGreen1x' : 'bg-white'}` } transition-colors duration-300 ease-in-out w-16 h-0.5 absolute left-hundredPercent top-fiftyPercent -translate-y-fiftyPercent`}></div>
                                </div>
                            </div>

                            <div className={`absolute text-xs text-white top-oneFiftyPercent left-0 h-10 px-4 w-full`}>
                                {data.info}
                            </div>
                        </div>
                    })
                }
            </div>
            
           <div className='max-w-lg'>
                <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.8751 56.1667H38.7501V86.1667C38.7501 93.1667 42.5418 94.5834 47.1668 89.3334L78.7084 53.5001C82.5834 49.1251 80.9584 45.5001 75.0834 45.5001H62.2084V15.5001C62.2084 8.50006 58.4168 7.08339 53.7918 12.3334L22.2501 48.1667C18.4168 52.5834 20.0418 56.1667 25.8751 56.1667Z" stroke="#3BB75E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <p className='text-white pt-8 pb-5 text-xl font-avenirBlack'>{step == 1 && 'Connect Domain'} {step == '2' && 'Update A Record'}</p>
                {/* <p className={`text-white`}>The URL  is invalid, be sure it's correct and try again</p> */}
           </div>
            
            {
                step == 1
                &&
                <form action="" className='flex flex-col gap-7 w-full py-5 max-w-lg mx-auto'>
                    <fieldset className={`gap-2.5 w-full flex flex-col col-span-1 mds:col-span-2 sm:col-span-2`}>
                            {/* <p className='text-sm font-avenirMedium text-black text-left'>{`Website URL`}</p> */}
                            <label htmlFor='domain_url' className={`relative w-full flex flex-row items-center gap-0.5 text-sm text-brandBlack1x px-4 py-2.5 rounded-five appearance-none bg-white border ${(formik.touched.domain_url && !domain || formik.touched.domain_url && formik.errors.domain_url) ? 'border-brandRed1x focus-within:border-brandRed1x' : 'border-brandGray16x focus-within:border-black'} focus-within:border-2`}>
                            <span className='font-avenirHeavy'>https://</span>
                            <input type="text" name='domain_url' id='domain_url' onChange={formik.handleChange} onBlur={formik.handleBlur} required placeholder={`example.com/domain`} value={formik.values.domain_url} className='w-full focus:outline-none font-spaceGroteskLight text-sm text-black placeholder:text-brandGray32x rounded-r-five bg-transparent' />
                            </label>
                    </fieldset>
                    {/* {formik.errors.domain_url} */}
                    <div className='pb-5'>
                        <button type='button' onClick={handleSubmit} className='text-black bg-white border-2 border-white py-2 px-4 rounded-fifty hover:border-brandGreen1x transition-colors duration-300 ease-in-out text-sm'>Connect Domain</button>
                    </div>
              </form>
            }
            {
                step == 2
                &&
                <div className='py-5 w-full'>
                    <div className='w-full overflow-x-auto bg-brandGray2x'>
                        <div className='w-full py-6'>

                        </div>
                        <table className='w-full table-auto text-left bg-white'>
                            <thead className='font-avenirHeavy'>
                                <tr>
                                    <td className='py-2.5 px-3 bg-white border-r-0.5 border-r-brandGray13x'>Host Name</td>
                                    <td className='py-2.5 px-3 bg-white border-r-0.5 border-r-brandGray13x'>Record</td>
                                    <td className='py-2.5 px-3 bg-white'>Point to / IP Address</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dummyDomains.map((domain, idx) => {
                                        return <tr key={idx} className='border-t-0.5 border-t-brandGray13x'>
                                            <td className='px-3 py-1.5 border-r-0.5 border-r-brandGray13x'> 
                                                {domain.host}
                                            </td>
                                            <td className='px-3 py-1.5 border-r-0.5 border-r-brandGray13x'> 
                                                {domain.record}
                                            </td>
                                            <td className='px-3 py-1.5 flex gap-2 items-center'> 
                                                {domain.pointTo}
                                                <div className='px-2'>
                                                    <CopyButtonWithText text={domain.pointTo} />
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            {
                step == 2
                &&
                <div className='py-5'>
                    <button type='button' onClick={handleSubmitTwo} className='text-black bg-white border border-white py-2 px-4 rounded-fifty hover:border-brandGreen1x transition-colors duration-300 ease-in-out text-sm'>Yes, I'm done Setting up my DNS</button>
                </div>
            }
        </div>
    </div>
  )
}

export default AddDomain