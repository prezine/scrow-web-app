import React, {useState} from 'react'
import axios from 'axios'
import slugify from 'react-slugify'

const useFileUpload = (file_to_upload, file_type, subDirectory) => {
    const [uploading, setUploading] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState('')
    const [errorUpload, setErrorUpload] = useState(false)
    const [publicID, setPublicID] = useState('')
    const [deleteToken, setDeleteToken] = useState('')

    const handleFileUpload = async () => {
        setErrorUpload(false)
        setUploading(true)
        setUploadedImageUrl('')
        deleteAsset()
        const file = file_to_upload;
  
        // Create a FormData object to send the file to the server
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`);
        formData.append('public_id', `${import.meta.env.VITE_CLOUDINARY_ROOT_DIR}/${subDirectory}/${slugify(file.name)}${Math.floor(1000 + Math.random() * 9000)}`); // Specify the folder and image name
        formData.append('max_file_size', `${import.meta.env.VITE_CLOUDINARY_MAX_FILE_SIZE}`)

        try {
          // Send a POST request to the Cloudinary upload API
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/${file_type}/upload`,
            formData
          );
      
          // Get the URL of the uploaded image from the response
          const imageUrl = response.data.secure_url;
          // console.log('response => ', response);
          // console.log('imageUrl => ', imageUrl);
          // console.log('public_id => ', response.data.public_id);
      
          // Do something with the uploaded image URL (e.g., store it in state)
          setUploadedImageUrl(imageUrl);
          setPublicID(response.data.public_id)
          setUploading(false)
          setDeleteToken(response.data.delete_token)
        } catch (error) {
          console.error('Error uploading image:', error);
          setErrorUpload(true)
          setUploading(false)
        }
      };
  
    const deleteAsset = async () => {

        
        if(deleteToken){
  
          try {
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/delete_by_token`,
              { token: deleteToken },
              { headers: { 'Content-Type': 'application/json' } }
            );
        
            if (response.data.result === 'ok') {
              // console.log('Asset deleted successfully');
            } else {
              console.error('Failed to delete asset');
            }
          } catch (error) {
            console.error(error);
            throw new Error('Failed to delete asset');
          }
        }
        else{
          return
        }
      };

    return {
        uploading,
        setUploading,
        uploadedImageUrl,
        setUploadedImageUrl,
        publicID,
        setPublicID,
        deleteToken,
        setDeleteToken,
        errorUpload,
        setErrorUpload,
        deleteAsset,
        handleFileUpload
    }
}

export default useFileUpload