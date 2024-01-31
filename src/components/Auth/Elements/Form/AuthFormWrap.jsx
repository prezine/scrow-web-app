import React from 'react'

const AuthFormWrap = ({handleSubmit, children, gap}) => {
  return (
    <form onSubmit={handleSubmit} method={'post'} className={`bg-white rounded-ten flex flex-col ${gap || 'gap-10'} px-6 sm:px-8 lg:px-10 py-16 drop-shadow-xl`}>
        {children}
    </form>
  )
}

export default AuthFormWrap