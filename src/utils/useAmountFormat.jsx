import React from 'react'

const useAmountFormat = (e, formik, id) => {

    // console.log(e.target.value.length);

    if(e.target.value.length == 1){
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(e.target.value)) {
            formik.setFieldValue(`${id}`, e.target.value)
        }
        else{
            formik.setFieldValue(`${id}`, '')
            e.preventDefault();
        }
    } else if (e.target.value || ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) !== -1) {
        // console.log('Happening middle');
        let cleaned = parseFloat(e.target.value.trim().replaceAll(',', ''));
        let formattedAmount = new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(cleaned);
        formik.setFieldValue(`${id}`, formattedAmount);
    } else {
        // console.log('Happening there');
        formik.setFieldValue(`${id}`, '');
    }
      
}

export default useAmountFormat