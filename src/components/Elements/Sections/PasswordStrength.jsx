import React, { useEffect, useState } from 'react'

const PasswordStrength = ({formik, testValueId}) => {

    const [minimumEight, setMinimumEight] = useState(0);
    const [oneUpper, setOneUpper] = useState(0);
    const [oneLower, setOneLower] = useState(0);
    const [oneNumber, setOneNumber] = useState(0);

    const strength = minimumEight + oneNumber + oneUpper + oneLower


    useEffect(() => {
        if (formik.values[testValueId].length >= 8) {
          setMinimumEight(1);
        }else{
          setMinimumEight(0);
        }
        if (/[A-Z]/.test(formik.values[testValueId])) {
          setOneUpper(1);
        }else{
          setOneUpper(0)
        }
        if (/[a-z]/.test(formik.values[testValueId])) {
          setOneLower(1);
        }else{
          setOneLower(0)
        }
        if (/[0-9]/.test(formik.values[testValueId])) {
          setOneNumber(1);
        }else{
          setOneNumber(0)
        }

        // setStrength(minimumEight + oneNumber + oneUpper + oneLower)
      }, [formik.values[testValueId]]);

  return (
    <div>
         {(formik.touched[testValueId] && formik.errors[testValueId]) && <p className="text-xs text-brandRed1x pb-2">{formik.errors[testValueId]}</p>}
        <div className={`bg-brandGray42x h-2 w-full`}>
          <div className={`transition-all duration-500 ease-in-out ${strength == 1 && 'bg-brandRed1x'} ${strength == 2 && 'bg-brandOrange2x'} ${strength == 3 && 'bg-brandGreen1x/50'} ${strength == 4 && 'bg-brandGreen1x'} h-full`} style={{width:`calc((${strength}/4) * 100%)`}} >
          </div>
        </div>
    </div>
  )
}

export default PasswordStrength