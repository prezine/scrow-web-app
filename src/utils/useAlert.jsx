import React from 'react'
import Alert from '../components/Elements/Alerts/Alert'

const useAlert = ({openAlert, }) => {

    // not functional
  return (
    <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />
  )
}

export default useAlert