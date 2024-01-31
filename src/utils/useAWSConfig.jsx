import React from 'react'

const useAWSConfig = (directoryName) => {
    const config = { 
        bucketName: `${import.meta.env.VITE_BUCKET_NAME}`,
        dirName: directoryName || 'transactions/',
        region: `${import.meta.env.VITE_REGION}`,
        accessKeyId: `${import.meta.env.VITE_ACCESS_KEY_ID}`,
        secretAccessKey: `${import.meta.env.VITE_SECRET_ACCESS_KEY}`
    }
    
    return config
}

export default useAWSConfig