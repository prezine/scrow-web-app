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

const EditProduct = ({storeID, openAlert, currentProduct, alertValues, setOpenAlert, setAlertValues, closeModal, mutate}) => {

    const [submitting, setSubmitting] = useState(false)

    const {requestHeaders} = useRequestHeaders()

    const {userDataValue} = useUser()


    const formik = useFormik({
        initialValues:{
            is_limited: "",
            product_name:'',
            product_description:'',
            product_stockcount:'',
        },
    
        validationSchema:Yup.object({
            product_name: Yup.string()
              .min(4, 'name should be four or more characters')
              .required('name required'),
            product_description: Yup.string()
                .min(4, 'Description should be four or more characters')
                .required('Description required'),
            product_stockcount: Yup.number()
            .nullable(),
            is_limited:Yup.string()
              .required('Limit required'),
        })  
      })


    useEffect(() => {

        formik.setFieldValue('product_name', currentProduct && currentProduct.product_name)
        formik.setFieldValue('product_description', currentProduct && currentProduct.product_description)
        formik.setFieldValue('product_stockcount', currentProduct && currentProduct.product_stockcount)
        formik.setFieldValue('is_limited', currentProduct && currentProduct.is_limited)

    }, [currentProduct])
      
    

    

      
      const handleSubmit = (e) => {
        if(formik.errors.product_name || formik.errors.product_stockcount || formik.errors.product_description || formik.errors.is_limited || (formik.values.is_limited == '1' && !formik.values.product_stockcount)){
          return
        }
    
        setOpenAlert(false)
        setSubmitting(true)
        const formData = new FormData()
        formData.append('userID', `${userDataValue && userDataValue.userID}`)
        formData.append('storeID', storeID)
        formData.append('payref', currentProduct && currentProduct.payref)
        formData.append('is_limited', formik.values.is_limited)
        formData.append('product_name', formik.values.product_name)
        formData.append('product_description', formik.values.product_description)
        formData.append('product_stockcount', formik.values.product_stockcount)
        


    try {

        // const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);

        axios.post(`${import.meta.env.VITE_BASEURL}/store/product/update?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
        .then((res)=>{
            // console.log(res);
            if(res.data.status == false && res.data.data.message){
                setOpenAlert(true)
                setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                closeModal()
            }else if (res.data.status == true && res.data.data.message) {
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


  return (
    <div className={`bg-white relative m-auto rounded-ten py-8 px-5 md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent h-fit`}>
        <div className='text-center'>
            <h4 className='text-2xl md:text-3xl pb-1 text-brandGray14x font-avenirHeavy'>Edit Product</h4>
        </div>
        <form onSubmit={formik.handleSubmit} action="" className='flex flex-col gap-5 pt-8'>
            <div className=''>
                <FormInput handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.product_name} fieldError={formik.touched.product_name && formik.errors.product_name} inputLabel={`What item do you want to sell?`} inputPlaceholder={`Enter Product Name`} inputName={'product_name'} inputId={'product_name'} />
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
            <FormTextArea textAreaName={'product_description'} handleChange={formik.handleChange} handleBlur={formik.handleBlur} inputValue={formik.values.product_description} fieldError={formik.touched.product_description && formik.errors.product_description} textAreaId={'product_description'} textAreaLabel={`Can you describe clearly this Product for your Customers?`} textAreaPlaceholder={`Describe clearly this product you're listing for sale.`} textAreaRows={'8'} resize={false} />


            <div className='flex justify-end'>
                <ButtonPrimaryIcon handleClick={handleSubmit} disabled={submitting} disabledBgColor={'bg-brandGray16x'} type={'button'} icon={' '} text={'Update Product'} flexDirection={'flex-row-reverse'} />
            </div>
        </form>
    </div>
  )
}

export default EditProduct