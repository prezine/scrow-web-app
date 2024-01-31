import React from 'react'
import { NavLink } from 'react-router-dom'

const AltActionTwo = ({text, link}) => {
  return (
    <div className="py-4 text-center">
        <NavLink to={link} className={`text-brandBlue1x font-avenirMedium text-sm md:text-base`}>
            {text || 'Use single sign-on (SSO) instead'}
        </NavLink>
    </div>
  )
}

export default AltActionTwo