import React from 'react'

const useRequestHeaders = () => {
    const requestHeaders = {
        headers: {
          Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
          AppId: `${import.meta.env.VITE_APPID}`,
          Version: `${import.meta.env.VITE_APP_VERSION}`,
        },
      }

    return {requestHeaders}
}

export default useRequestHeaders