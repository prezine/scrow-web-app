import React from 'react'

const useIsFileObject = (object) => {
    return object instanceof File;
}

export default useIsFileObject