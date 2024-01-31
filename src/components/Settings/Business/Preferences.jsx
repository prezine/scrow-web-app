import axios from 'axios'
import React, {useEffect, useState} from 'react'
import useUser from '../../../hooks/stores/useUser'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import ButtonPrimary from '../../Elements/Buttons/ButtonPrimary'
import FormSwitch from '../../Elements/Form/FormSwitch'
import LinkPrimaryIcon from '../../Elements/Links/LinkPrimaryIcon'
import WalletThresholdModal from './WalletThresholdModal'
import useSWR from 'swr'
import PageLoaderNoNav from '../../Elements/Loaders/PageLoaderNoNav'
import FetchErrorNoNav from '../../Errors/FetchErrorNoNav'
import Alert from '../../Elements/Alerts/Alert'

const Preferences = () => {

  const [submitting, setSubmitting] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [settingsFetched, setSettingsFetched] = useState(0)
  const [changing, setChanging] = useState(false)
  const [alertValues, setAlertValues] = useState({
    message: "",
    type: 'warning',
    duration: 2500
  });

  const { userDataValue } = useUser();
  const { requestHeaders } = useRequestHeaders();

  const fetcher = async (url) => axios.get(url, requestHeaders);

  const preferencesDataFetched = useSWR(`${import.meta.env.VITE_BASEURL}/setting/preferences/fetch?userID=${userDataValue && userDataValue.userID}`, fetcher, {
    onSuccess:(data)=>{
      setSettingsFetched(prev => prev + 1)
    }
  });


  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    allNotification: 0,
    login_notification: 0,
    product_notification: 0,
    update_announcement: 0,
    transaction_alert: 0,
    metric_report: 0,
    wallet_threshold: 0
  });

  const handleSubmit = () => {

    setOpenAlert(false);
    setSubmitting(true);
    const data = new FormData();
    data.append('userID', `${userDataValue && userDataValue.userID}`);
    data.append('login_notification', formData.login_notification);
    data.append('product_notification', formData.product_notification);
    data.append('update_announcement', formData.update_announcement);
    data.append('transaction_alert', formData.transaction_alert);
    data.append('metric_report', formData.metric_report);
    data.append('wallet_threshold', formData.wallet_threshold.toString().replaceAll(',', ''));

    

    try {
      // const formValues = Object.fromEntries(data.entries());
      // console.log(formValues);
      axios.post(`${import.meta.env.VITE_BASEURL}/setting/preferences/update?userID=${userDataValue && userDataValue.userID}`, data, requestHeaders)
        .then((res) => {
          // console.log(res);
          setChanging(false)
          if (res.data.status === false && res.data.data.message) {
            setOpenAlert(true);
            setAlertValues({ ...alertValues, message: `Something went wrong. Please try again Later`, type: `danger` });
          } else if (res.data.status === true && res.data.data.message) {
            setOpenAlert(true);
            setAlertValues({ ...alertValues, message: `${res.data.data.message}`, type: `success` });
            preferencesDataFetched.mutate();
          }
          setSubmitting(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  }


  const handleChange = (e) => {
    setChanging(true)
    if (e.target.type === 'checkbox') {
      setFormData({ ...formData, [e.target.name]: e.target.checked ? 1 : 0 });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    // console.log(settingsFetched);
    if (preferencesDataFetched.data && preferencesDataFetched.data.data.status && settingsFetched == 1) {
      let preference = preferencesDataFetched.data.data.data;
      setFormData({
        ...formData,
        login_notification: preference.login_notification,
        product_notification: preference.product_notification,
        update_announcement: preference.update_announcement,
        transaction_alert: preference.transaction_alert,
        metric_report: preference.metric_report,
        wallet_threshold: preference.wallet_threshold && new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(preference.wallet_threshold),
        allNotification:preference.login_notification && preference.product_notification && preference.update_announcement && preference.transaction_alert && preference.metric_report ? 1 : 0
      });
    }
  }, [settingsFetched]);

  useEffect(()=>{
    if(changing){
      handleSubmit()
    }
  }, [formData.allNotification,
      formData.login_notification, 
      formData.product_notification, 
      formData.metric_report,
      formData.update_announcement,
      formData.transaction_alert])

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleThresholdSubmit = (e) => {
    if (!formData.wallet_threshold) {
      return;
    }

    setOpenAlert(false);
    setSubmitting(true);
    const data = new FormData();
    data.append('userID', `${userDataValue && userDataValue.userID}`);
    data.append('wallet_threshold', formData.wallet_threshold.replaceAll(',', ''));

    try {
      axios.post(`${import.meta.env.VITE_BASEURL}/setting/preferences/update?userID=${userDataValue && userDataValue.userID}`, data, requestHeaders)
        .then((res) => {
          // console.log(res);
          setChanging(false)
          if (res.data.status === false && res.data.data.message) {
            setOpenAlert(true);
            setAlertValues({ ...alertValues, message: `Something went wrong. Please try again Later`, type: `danger` });
            closeModal();
          } else if (res.data.status === true && res.data.data.message) {
            setOpenAlert(true);
            setAlertValues({ ...alertValues, message: `${res.data.data.message}`, type: `success` });
            preferencesDataFetched.mutate();
            closeModal();
          }
          setSubmitting(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (!preferencesDataFetched.data) {
    return <PageLoaderNoNav />;
  }

  if (preferencesDataFetched.error) {
    return <FetchErrorNoNav />;
  }

  const handleToggleAll = () => {
    setChanging(true)
    for (const key in formData) {
      if (key !== 'wallet_threshold' && key !== 'allNotification') {
        if (formData.allNotification === 0) {
          setFormData(prevState => ({
            ...prevState,
            [key]: 1,
            allNotification: 1
          }));
        } else if (formData.allNotification === 1) {
          setFormData(prevState => ({
            ...prevState,
            [key]: 0,
            allNotification: 0
          }));
        }
      }
    }
  }
  

  const preferenceData = [
    {
      id:"",
      iconCircleColor:"fill-brandGreen1x",
      icon:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#3BB75E"/>
      <path d="M21.8474 10.9331C20.676 10.9331 19.7236 11.8855 19.7236 13.0569V17.476C19.7236 18.6474 20.676 19.5998 21.8474 19.5998C23.0189 19.5998 23.9713 18.6474 23.9713 17.476V13.0569C23.9713 11.895 23.0189 10.9331 21.8474 10.9331Z" fill="white"/>
      <path opacity="0.4" d="M27.2187 15.9141C26.1997 15.9141 25.3711 16.7426 25.3711 17.7617V19.2569C25.3711 19.4569 25.533 19.6188 25.733 19.6188H27.2282C28.2473 19.6188 29.0759 18.7903 29.0759 17.7712C29.0759 16.7522 28.2377 15.9141 27.2187 15.9141Z" fill="white"/>
      <path d="M16.0956 15.7998H11.6765C10.5051 15.7998 9.55273 16.7522 9.55273 17.9236C9.55273 19.095 10.5051 20.0474 11.6765 20.0474H16.0956C17.267 20.0474 18.2194 19.095 18.2194 17.9236C18.2194 16.7522 17.267 15.7998 16.0956 15.7998Z" fill="white"/>
      <path opacity="0.4" d="M16.371 10.6855C15.352 10.6855 14.5234 11.5141 14.5234 12.5332C14.5234 13.5522 15.352 14.3808 16.371 14.3808H17.8663C18.0663 14.3808 18.2282 14.2189 18.2282 14.0189V12.5236C18.2187 11.5236 17.3901 10.6855 16.371 10.6855Z" fill="white"/>
      <path d="M16.9812 21.5522C15.8098 21.5522 14.8574 22.5046 14.8574 23.6761V28.0951C14.8574 29.2665 15.8098 30.2189 16.9812 30.2189C18.1527 30.2189 19.105 29.2665 19.105 28.0951V23.6761C19.105 22.5046 18.1527 21.5522 16.9812 21.5522Z" fill="white"/>
      <path opacity="0.4" d="M13.1046 21.5522H11.6093C10.5903 21.5522 9.76172 22.3808 9.76172 23.3999C9.76172 24.4189 10.5903 25.2475 11.6093 25.2475C12.6284 25.2475 13.4569 24.4189 13.4569 23.3999V21.9046C13.4569 21.7142 13.295 21.5522 13.1046 21.5522Z" fill="white"/>
      <path d="M27.1522 21.1143H22.7332C21.5618 21.1143 20.6094 22.0666 20.6094 23.2381C20.6094 24.4095 21.5618 25.3619 22.7332 25.3619H27.1522C28.3237 25.3619 29.276 24.4095 29.276 23.2381C29.276 22.0666 28.3237 21.1143 27.1522 21.1143Z" fill="white"/>
      <path opacity="0.4" d="M22.4567 26.7334H20.9615C20.7615 26.7334 20.5996 26.8953 20.5996 27.0953V28.5905C20.5996 29.6096 21.4282 30.4382 22.4472 30.4382C23.4663 30.4382 24.2949 29.6096 24.2949 28.5905C24.3044 27.562 23.4758 26.7334 22.4567 26.7334Z" fill="white"/>
      </svg>,
      name:"Partners Slack",
      description:"Keep up with Pandascrow and get fast on-time support on slack",
      actionType:"link",
      link:'https://join.slack.com/t/pandascrowhq/shared_invite/zt-18ib5j3o0-jXSR1~3bS_8F0vr8LPGwMw',
      text:'Join Slack'
    },
    {
      id:"wallet_threshold",
      iconCircleColor:"fill-brandBlack2x",
      icon:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#161616"/>
      <path d="M25.537 21.4207C25.152 21.7965 24.932 22.3373 24.987 22.9148C25.0695 23.9048 25.977 24.629 26.967 24.629H28.7087V25.7198C28.7087 27.6173 27.1595 29.1665 25.262 29.1665H15.9945C16.2787 28.9282 16.5262 28.6348 16.7187 28.3048C17.0578 27.7548 17.2503 27.104 17.2503 26.4165C17.2503 24.3907 15.6095 22.7498 13.5837 22.7498C12.722 22.7498 11.9245 23.0523 11.292 23.5565V19.5507C11.292 17.6532 12.8412 16.104 14.7387 16.104H25.262C27.1595 16.104 28.7087 17.6532 28.7087 19.5507V20.8707H26.857C26.3437 20.8707 25.8762 21.0723 25.537 21.4207Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M11.292 20.3757V16.1866C11.292 15.0957 11.9612 14.124 12.9787 13.739L20.257 10.989C21.3937 10.5582 22.6128 11.4016 22.6128 12.6207V16.1041" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M29.6802 21.8056V23.694C29.6802 24.1981 29.2769 24.6106 28.7635 24.6289H26.9669C25.9769 24.6289 25.0694 23.9048 24.9869 22.9148C24.9319 22.3373 25.1519 21.7964 25.5369 21.4206C25.876 21.0722 26.3435 20.8706 26.8569 20.8706H28.7635C29.2769 20.8889 29.6802 21.3014 29.6802 21.8056Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M15.417 20H21.8337" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M17.2503 26.4167C17.2503 27.1042 17.0578 27.755 16.7187 28.305C16.5262 28.635 16.2787 28.9283 15.9945 29.1667C15.3528 29.7442 14.5095 30.0833 13.5837 30.0833C12.2453 30.0833 11.0812 29.3683 10.4487 28.305C10.1095 27.755 9.91699 27.1042 9.91699 26.4167C9.91699 25.2617 10.4487 24.2258 11.292 23.5567C11.9245 23.0525 12.722 22.75 13.5837 22.75C15.6095 22.75 17.2503 24.3908 17.2503 26.4167Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.9494 26.3984H12.2178" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.584 25.0601V27.8009" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>,      
      name:"Wallet threshold",
      description:"Get notified when your wallet balance is low",
      actionType:"button",
      text:'Manage'
    },
    {
      id:"login_notification",
      iconCircleColor:"fill-brandBlue3x",
      icon:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#2698D9"/>
      <path d="M17.2497 29.1668H22.7497C27.333 29.1668 29.1663 27.3335 29.1663 22.7502V17.2502C29.1663 12.6668 27.333 10.8335 22.7497 10.8335H17.2497C12.6663 10.8335 10.833 12.6668 10.833 17.2502V22.7502C10.833 27.3335 12.6663 29.1668 17.2497 29.1668Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <g opacity="0.4">
      <path d="M17.25 19.5508L20 22.3008L22.75 19.5508" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 22.3006V14.9673" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.5 24.1338C18.0658 25.3255 21.9342 25.3255 25.5 24.1338" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      </svg>,
      name:"Login notification",
      description:"Receive security alerts everytime your account is accessed",
      actionType:"toggle",
      switchId:"loginNotification",
      switchName:"loginNotification"
    },
    {
      id:"product_notification",
      iconCircleColor:"fill-brandDarkOrange4x",
      icon:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#D2830D"/>
      <path opacity="0.4" d="M10.8154 20.9169H14.2896C14.9863 20.9169 15.6188 21.311 15.9304 21.9344L16.7463 23.5752C17.2504 24.5835 18.1671 24.5835 18.3871 24.5835H21.6229C22.3196 24.5835 22.9521 24.1894 23.2638 23.566L24.0796 21.9252C24.3913 21.3019 25.0238 20.9077 25.7204 20.9077H29.1488" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M26.417 16.3335C27.9358 16.3335 29.167 15.1023 29.167 13.5835C29.167 12.0647 27.9358 10.8335 26.417 10.8335C24.8982 10.8335 23.667 12.0647 23.667 13.5835C23.667 15.1023 24.8982 16.3335 26.417 16.3335Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.833 10.8335H17.2497C12.6663 10.8335 10.833 12.6668 10.833 17.2502V22.7502C10.833 27.3335 12.6663 29.1668 17.2497 29.1668H22.7497C27.333 29.1668 29.1663 27.3335 29.1663 22.7502V18.1668" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>,
      name:"Product notification",
      description:"Be the first to know about Mono products updates",
      actionType:"toggle",
      switchId:"productNotification",
      switchName:"productNotification"
    },
    {
      id:"update_announcement",
      iconCircleColor:"fill-brandDarkViolet1x",
      icon:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#2A2AB3"/>
      <path d="M10.833 29.1665H29.1663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 14.5C15.4442 14.5 11.75 18.1942 11.75 22.75V29.1667H28.25V22.75C28.25 18.1942 24.5558 14.5 20 14.5Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M20 10.8335V11.7502" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M12.667 12.6665L13.5837 13.5832" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M27.3337 12.6665L26.417 13.5832" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>,
      name:"Updates & announcements",
      description:"Receive newsletters from Pandascrow",
      actionType:"toggle",
      switchId:"updates",
      switchName:"updates"
    },
    {
      id:"transaction_alert",
      iconCircleColor:"fill-brandRed3x",
      icon:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#FC5245"/>
      <path d="M29.167 14.5002V16.7185C29.167 18.1668 28.2503 19.0835 26.802 19.0835H23.667V12.676C23.667 11.6585 24.5012 10.8335 25.5187 10.8335C26.5178 10.8427 27.4345 11.246 28.0945 11.906C28.7545 12.5752 29.167 13.4918 29.167 14.5002Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.833 15.4168V28.2502C10.833 29.011 11.6947 29.4418 12.2997 28.9835L13.8672 27.8102C14.2338 27.5352 14.7472 27.5718 15.0772 27.9018L16.5988 29.4327C16.9563 29.7902 17.543 29.7902 17.9005 29.4327L19.4405 27.8927C19.7614 27.5718 20.2747 27.5352 20.6322 27.8102L22.1997 28.9835C22.8047 29.4327 23.6663 29.0018 23.6663 28.2502V12.6668C23.6663 11.6585 24.4913 10.8335 25.4997 10.8335H15.4163H14.4997C11.7497 10.8335 10.833 12.4743 10.833 14.5002V15.4168Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M14.5 17.25H20" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M15.1875 20.9165H19.3125" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>,
      name:"Transaction notification",
      description:"Receive transactions alerts on Pandascrow",
      actionType:"toggle",
      switchId:"transactionNotification",
      switchName:"transactionNotification"
    },
    {
      id:"metric_report",
      iconCircleColor:"fill-brandOrange2x",
      icon:<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#FF9800"/>
      <path d="M27.3337 16.5627V25.5002C27.3337 28.2502 25.6928 29.1668 23.667 29.1668H16.3337C14.3078 29.1668 12.667 28.2502 12.667 25.5002V16.5627C12.667 13.5835 14.3078 12.896 16.3337 12.896C16.3337 13.4643 16.5628 13.9777 16.9386 14.3535C17.3145 14.7293 17.8278 14.9585 18.3962 14.9585H21.6045C22.7412 14.9585 23.667 14.0327 23.667 12.896C25.6928 12.896 27.3337 13.5835 27.3337 16.5627Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M23.6663 12.896C23.6663 14.0327 22.7405 14.9585 21.6038 14.9585H18.3955C17.8272 14.9585 17.3138 14.7293 16.938 14.3535C16.5621 13.9777 16.333 13.4643 16.333 12.896C16.333 11.7593 17.2588 10.8335 18.3955 10.8335H21.6038C22.1722 10.8335 22.6855 11.0627 23.0614 11.4385C23.4372 11.8143 23.6663 12.3277 23.6663 12.896Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M16.333 20.9165H19.9997" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path opacity="0.4" d="M16.333 24.5835H23.6663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>,
      name:"Metrics report",
      description:"Receive monthly performance metrics in your email",
      actionType:"toggle",
      switchId:"metrics",
      switchName:"metrics"
    },
  ]

  if(preferencesDataFetched.data)



  return (
    <div className='sm:w-ninetyPercent md:w-eightyPercent mds:w-ninetyFivePercent lg:w-sixtyFivePercent max-w-lg mx-auto pb-10 pt-16 lg:pb-20 lg:pt-28'>
        <div className='flex xs:flex-col xs:items-start items-center justify-between gap-10 py-5'>
          <h1 className='text-xl font-avenirHeavy'>Notification</h1>
          <div className='flex xs:self-end bxs:flex-col bxs:items-end gap-2 items-center flex-wrap'>
            <p className='text-brandGray8x font-avenirMedium text-sm'>{formData.allNotification ? 'Disable all' : 'Enable all'}</p>
            <FormSwitch switchChecked={formData.allNotification} fieldsetId={'allNotificationWrap'} handleChange={handleToggleAll} switchId={'allNotification'} switchName={'allNotification'} />
          </div>
        </div>

        <div>
          {preferenceData.map((data, idx)=>{
            return <div key={idx} className={'py-5 first:border-y-0.5 border-b-0.5 border-brandGray2x last:border-0 flex flex-col md:flex-row md:items-center gap-10 justify-between'}>
                <div className='flex items-center gap-3'>
                  {data.icon}
                  <div>
                      <h3 className='font-avenirHeavy text-brandGray12x pb-1'>{data.name}</h3>
                      <p className='text-xs font-avenirMedium text-brandGray8x'>{data.description}</p>
                  </div>
                </div>
        
                <div className='self-end md:self-auto'>
                    {data.actionType == 'link'
                    &&
                    <LinkPrimaryIcon bgColor={'bg-transparent'} border={'border-2 border-brandGray2x'} textNoWrap icon={' '} link={data.link} text={data.text} fontSize={'text-sm'} textColor={'text-brandBlack1x'} />
                    }

                    {data.actionType == 'button'
                    &&
                    <ButtonPrimary handleClick={()=>setIsModalOpen(true)} bgColor={'bg-transparent'} border={'border-2 border-brandGray2x'} textNoWrap text={data.text} fontSize={'text-sm'} textColor={'text-brandBlack1x'} />
                    }

                    {data.actionType == 'toggle'
                    &&
                    <FormSwitch fieldsetId={data.switchId + 'Wrap'} switchChecked={formData[data.id]} switchId={data.switchId} switchName={data.id} onChange={handleChange} />
                    }
                    {/* {formData[data.id]} */}
                </div>
            </div>
          })}
        </div>
        
        <WalletThresholdModal submitting={submitting} formData={formData} setFormData={setFormData} wallet_threshold={formData.wallet_threshold} isModalOpen={isModalOpen} handleChange={handleChange} handleModal={()=>setIsModalOpen(false)} handleSubmit={handleThresholdSubmit} />
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default Preferences