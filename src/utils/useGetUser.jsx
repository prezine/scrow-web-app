import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import axios from 'axios';
import useForceUpdate from './useForceUpdate';
import useUser from '../hooks/stores/useUser';
import { useNavigate } from 'react-router-dom';


const useGetUser = () => {
    const [user, setUser] = useState(() => {
      const storedUserData = localStorage.getItem('panda_userData');
      return storedUserData !== null ? JSON.parse(storedUserData) : null;
    });
  
    const [business, setBusiness] = useState(() => {
      const storedBusinessData = localStorage.getItem('panda_businessData');
      return storedBusinessData !== null ? JSON.parse(storedBusinessData) : null;
    });

    const navigate = useNavigate()

    const [userFetched, setUserFetched] = useState(false);
    const [businessFetched, setBusinessFetched] = useState(false);

    const {setUserDataValue, setBusinessDataValue} = useUser()

    const allHeaders = {
        headers: {
          Authorization: `${import.meta.env.VITE_AUTHORIZATION}`,
          AppId: `${import.meta.env.VITE_APPID}`,
          Version: `${import.meta.env.VITE_APP_VERSION}`,
        },
      }
  
    useEffect(() => {
        // Monitor changes to local storage
        const storageHandler = () => {
          const storedUserData = localStorage.getItem('panda_userData');
          const storedBusinessData = localStorage.getItem('panda_businessData');
    
          setUser(storedUserData !== null ? JSON.parse(storedUserData) : null);
          setBusiness(storedBusinessData !== null ? JSON.parse(storedBusinessData) : null);
        };
    
        window.addEventListener('storage', storageHandler);
    
        return () => window.removeEventListener('storage', storageHandler);
      }, []);
  
    
    // if (user) console.log('User Data =>', user);
    // if (user && business) console.log('Business Data =>', business);
 
  
    const userData = user?.data?.user || null;
    const businessData = business?.data?.business || null;

    // this is the one that refreshes the data when you try to logout

    useEffect(() => {
        if (userFetched && user) {
          localStorage.setItem('panda_userData', JSON.stringify(user));
        }
      }, [userFetched, user]);
    
      useEffect(() => {
        if (businessFetched && business) {
          localStorage.setItem('panda_businessData', JSON.stringify(business));
        }
      }, [businessFetched, business]);

    if(user && !user.status || business && !business.status){
        // localStorage.removeItem('panda_userData')
        // localStorage.removeItem('panda_businessData')
    }

    const fetcher = async (url) => {
        try {
          const response = await axios.get(url, allHeaders);
          // console.log('fetcher called for:', response.data);
          return response.data;
        } catch (error) {
          console.error(error);
        }
      };

    useSWR(userData ? `${import.meta.env.VITE_BASEURL}/user/profile/fetch?userID=${userData.userID}` : null, fetcher, {
        onSuccess: (data) => {
          setUser(data);
            // set the value of user data in zustand so it can trigger a rerender of the consuming component
          setUserDataValue(userData)
          // console.log('Fetched user', data);
          if (!userFetched) {setUserFetched(true); useForceUpdate()}
        },
        refreshInterval: 1000,
    });
    
   useSWR(userData ? `${import.meta.env.VITE_BASEURL}/business/fetch?userID=${userData.userID}` : null, fetcher, {
    onSuccess: (data) => {
        setBusiness(data);
        // set the value of business data in zustand so it can trigger a rerender of the consuming component
        setBusinessDataValue(businessData)
        if (!businessFetched) setBusinessFetched(true);
    },
    refreshInterval: 1000,
    });

    // console.log(userData);
    const logout = () => {
      localStorage.removeItem('panda_userData');
      localStorage.removeItem('panda_businessData');
      setUser(null);
      setBusiness(null);
      setUserDataValue(null)
      setBusinessDataValue(null)

      navigate('/auth/login')
    };

    if(user && user.status == false){
      logout()
    }
  
    return {
      user,
      setUser,
      userData,
      business,
      setBusiness,
      businessData,
      logout,
    };
  };
  

export default useGetUser