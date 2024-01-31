import React from 'react'

const FormSwitch = ({fieldsetId, handleChange, switchName, switchId, switchChecked, ...rest}) => {
  return (
    <fieldset id={fieldsetId} className="relative inline-block w-11 mr-2 align-middle select-none transition duration-200 ease-in toggle-wrap">
        <input onChange={handleChange} {...rest} checked={switchChecked || ''} type="checkbox" name={switchName} id={switchId} className="toggle-checkbox absolute checked:left-6 left-1 peer top-fiftyPercent -translate-y-fiftyPercent block w-4 h-4 rounded-full bg-white appearance-none cursor-pointer"/>
        <label htmlFor={switchId} className="toggle-label block overflow-hidden h-6 rounded-full bg-brandGray15x peer-checked:bg-brandGreen1x cursor-pointer"></label>
    </fieldset>
  )
}

export default FormSwitch