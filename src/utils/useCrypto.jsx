import React from 'react'
import CryptoJS from 'crypto-js';

const useCrypto = () => {

    
  let Sha256 = CryptoJS.SHA256;
  let Hex = CryptoJS.enc.Hex;
  let Utf8 = CryptoJS.enc.Utf8;
  let Base64 = CryptoJS.enc.Base64;
  let AES = CryptoJS.AES;

  let secret_key = import.meta.env.VITE_CRYPTO_SECRET_KEY
  let secret_iv = import.meta.env.VITE_CRYPTO_SECRET_IV

  let key = Sha256(secret_key).toString(Hex).substr(0,32); // Use the first 32 bytes (see 2.)
  let ivkey = Sha256(secret_iv).toString(Hex).substr(0,16);

  const encryptData = (value) => {
    // Encryption
      let encrypted = AES.encrypt(value, Utf8.parse(key), {
          iv: Utf8.parse(ivkey),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      }).toString(); // First Base64 encoding, by default (see 1.)

      return encrypted
    }

    const decryptData = (value) =>  {
        // Decryption
        let decrypted = AES.decrypt(value, Utf8.parse(key), {
            iv: Utf8.parse(ivkey),
        }).toString(Utf8); 
        
        return decrypted
    }

  return {encryptData, decryptData}
}

export default useCrypto