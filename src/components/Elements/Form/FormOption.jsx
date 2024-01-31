import React from 'react'

const FormOption = ( { value, optionName, isSelected, isDisabled } ) => {
  return (
    <option value={value} selected={ isSelected || false } disabled={ isDisabled || false} >{optionName}</option>
  )
}

export default FormOption