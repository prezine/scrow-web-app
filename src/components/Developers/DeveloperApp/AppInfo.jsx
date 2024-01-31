import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import useUser from '../../../hooks/stores/useUser'
import formatDateTimeMonthText from '../../../utils/FormatDateTimeMonthText'
import useRequestHeaders from '../../../utils/useRequestHeaders'
import Alert from '../../Elements/Alerts/Alert'
import ButtonPrimaryIcon from '../../Elements/Buttons/ButtonPrimaryIcon'
import CopyButton from '../../Elements/Buttons/CopyButton'
import ConfirmDelete from '../../Elements/Cards/ConfirmAction/ConfirmDelete'
import FormSwitch from '../../Elements/Form/FormSwitch'
import ModalWrap from '../../Elements/Modal/ModalWrap'
import NoLogoSquare from '../../Elements/Sections/NoLogoSquare'
import AddDeveloperCredit from './Modals/AddDeveloperCredit'
import EditApp from './Modals/EditApp'
import WebHookModal from './Modals/WebHookModal'


const AppInfo = ({mutate, appData, appName, appId, appDescription, walletBalance, walletCurrency, developerCredits, displayName, product, scope, created, publicKey, secretKey, encryptionKey, apiCalls, appIcon, isLive, webhook_url}) => {
    const [pKVisible, setPKVisible] = useState(false)
    const [sKVisible, setSKVisible] = useState(false)
    const [eKVisible, setEKVisible] = useState(false)
    const [wHVisible, setWHVisible] = useState(false)
    const [isWebHookModalOpen, setIsWebHookModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddFundModalOpen, setIsAddFundModalOpen] = useState(false)
    const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState(false)
    const [checked, setChecked] = useState(isLive)
    const [submitting, setSubmitting] = useState(false)
    const [clickedGoLive, setClickedGoLive] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const navigate = useNavigate()

    const [confirmDelete, setConfirmedDelete] = useState(false)

    const {userDataValue} = useUser()
    const {requestHeaders} = useRequestHeaders()

    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })


    useEffect(() => {
        if(deleted){
            setTimeout(() => {
                navigate('/developers')
            }, 1000);
        }
        }, [deleted])


    useEffect(() => {
        if(clickedGoLive){
            handleGoLive()
        }
    }, [checked])
        
    const handleDelete = () => {
        setIsConfirmDeleteModal(true)
    }

    const handleDeleteConfirmed = (id) => {
        setOpenAlert(false)
        const formData = new FormData()
        formData.append('userID', `${userDataValue && userDataValue.userID}`)
        formData.append('appid', id)
        console.log('yes');
        try {
            console.log('hello');
            setSubmitting(true)
            axios.post(`${import.meta.env.VITE_BASEURL}/app/delete?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
            .then((res)=>{
            // console.log('delete res =>', res);
                if(res.data.status == false && res.data.data.message){
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                    setIsConfirmDeleteModal(false)
                }else if (res.data.status == true && res.data.data.message) {
                    setOpenAlert(true)
                    setAlertValues({...alertValues, message:res.data.data.message, type:`success` })
                    setDeleted(true)
                    setIsConfirmDeleteModal(false)
                }
    
                setSubmitting(false)
                
            })
            .catch((err)=>{
                console.error(err);
            })
            
        } catch (error) {
            console.error(error)
        }
    }

    const handleGoLive = () => {
        
        setOpenAlert(false)
        setSubmitting(true)
    
        const formData = new FormData()
        formData.append('userID', `${userDataValue && userDataValue.userID}`)
        formData.append('appid', appId)
        formData.append('is_live', checked ? 1 : 0)
    
        try {
            //   const formValues = Object.fromEntries(formData.entries());
            //     console.log(formValues);
    
          axios.post(`${import.meta.env.VITE_BASEURL}/app/go-live?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
          .then((res)=>{
            console.log(res);
              if(res.data.status == false && res.data.data.message){
                  setOpenAlert(true)
                  setAlertValues({...alertValues, message:`Something went wrong. Please try again Later`, type:`danger` })
                  console.log(res.data.data.message);
              }else if (res.data.status == true && res.data.data.message) {
                  setOpenAlert(true)
                  setAlertValues({...alertValues, message:`${res.data.data.message}`, type:`success` })
                  mutate()
              }
    
              setSubmitting(false)
              setClickedGoLive(false)
              
          })
          .catch((err)=>{
              console.error(err);
          })
    
          
        } catch (error) {
            console.error(error)
        }
      }
    

   
    
 
  
    return (
    <div id="" className="z-10 pb-14 bg-brandOtpGray rounded-t-none rounded-ten">
        <div className="w-full">
            <div className={`w-full h-full flex flex-col lg:flex-row lg:divide-x  divide-brandGray2x border-b-0.5 border-b-brandGray2x`}>
                <div className={`flex gap-10 items-start justify-between px-8 md:px-10 py-10 lg:w-fortyPercent`}>
                    <div>
                        <div className='flex gap-2 items-center'>
                            <p className='capitalize text-sm text-brandGray11x'>Developer Credit</p>
                            <button className={`active:animate-spin`} onClick={mutate} >
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M8.68572 3.46336C8.17822 3.31169 7.61822 3.21252 6.99988 3.21252C4.20572 3.21252 1.94238 5.47586 1.94238 8.27002C1.94238 11.07 4.20572 13.3334 6.99988 13.3334C9.79405 13.3334 12.0574 11.07 12.0574 8.27586C12.0574 7.23752 11.7424 6.26919 11.2057 5.46419" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9.40922 3.60329L7.72339 1.66663" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M9.40919 3.60339L7.44336 5.03839" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className='py-2'>
                            {/* <p className='text-2xl font-avenirHeavy text-left'>NGN 0</p> */}
                            <p className='text-2xl font-avenirHeavy text-left'>{walletCurrency} {new Intl.NumberFormat('en', {maximumFractionDigits:2}).format(developerCredits)}</p>
                        </div>
                    </div>
                    <div>
                        <button type='button' onClick={()=>setIsAddFundModalOpen(true)} className='font-avenirMedium text-brandDarkViolet1x text-xs'>+ ADD FUNDS</button>
                    </div>
                </div>
                <div className="h-fit flex flex-col py-5 px-8 md:px-10 lg:w-sixtyPercent">
                    <div className="w-full py-5 flex gap-5"> 
                        {
                            appIcon
                            ?
                                <img className="h-14 object-contain appicon" src={appIcon} alt={appName && appName + 'Logo'} />
                            :
                                <NoLogoSquare />
                        }
                        <p className='text-sm text-brandGray46x'>{appDescription}</p>
                    </div>
                    <div className="w-full py-5 flex xs:flex-col flex-row gap-5 items-center sm:justify-end">
                        <button onClick={()=>setIsEditModalOpen(true)} type="button" data-modal="edit_app_pop" className="open-trans-modal bg-white rounded-ten flex flex-row w-fit h-fit border border-brandGray16x items-center justify-center gap-3 px-5 py-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.0495 3.00002L4.2078 10.2417C3.94947 10.5167 3.69947 11.0584 3.64947 11.4334L3.34114 14.1334C3.2328 15.1084 3.9328 15.775 4.89947 15.6084L7.5828 15.15C7.9578 15.0834 8.4828 14.8084 8.74114 14.525L15.5828 7.28335C16.7661 6.03335 17.2995 4.60835 15.4578 2.86668C13.6245 1.14168 12.2328 1.75002 11.0495 3.00002Z" stroke="#182CD1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.4" d="M9.9082 4.20898C10.2665 6.50898 12.1332 8.26732 14.4499 8.50065" stroke="#182CD1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.4" d="M2.5 18.334H17.5" stroke="#182CD1" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                            <p className="text-brandBlue1x">Edit</p>
                        </button>
                        <button onClick={()=>handleDelete(appId)} type="button" data-modal="delete_app_popup" className="open-trans-modal bg-white rounded-ten flex w-fit h-fit flex-row border border-brandGray16x items-center justify-center gap-3 px-5 py-2">
                            <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5 6.48047C18.17 6.15047 14.82 5.98047 11.48 5.98047C9.5 5.98047 7.52 6.08047 5.54 6.28047L3.5 6.48047" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.34" d="M9 5.47L9.22 4.16C9.38 3.21 9.5 2.5 11.19 2.5H13.81C15.5 2.5 15.63 3.25 15.78 4.17L16 5.47" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M19.3504 9.64062L18.7004 19.7106C18.5904 21.2806 18.5004 22.5006 15.7104 22.5006H9.29039C6.50039 22.5006 6.41039 21.2806 6.30039 19.7106L5.65039 9.64062" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.34" d="M10.8301 17H14.1601" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path opacity="0.34" d="M10 13H15" stroke="#D95126" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                            <p className="text-brandRed1x">Delete</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col lg:flex-row lg:divide-x  divide-brandGray2x">
                <div className="w-full flex flex-col md:flex-row lg:flex-col lg:w-fortyPercent divide-y md:divide-y-0  lg:divide-y pb-20 pt-11 divide-brandGray2x">
                    <div className="flex flex-col gap-12 px-8 md:px-10 pb-11 w-full md:w-fiftyPercent lg:w-full">
                        <div>
                            <h2 className="text-brandGray20x">Total API Call</h2>
                            <div className="flex flex-row justify-between items-end">
                                <p className="text-black font-avenirBlack text-lg w-ninetyPercent md:w-auto pr-10 sm:pr-0">{apiCalls || '0'}</p>
                                <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="21" cy="20.5" r="20.5" fill="#060463"/>
                                    <path d="M21.6185 13.2705L26.2074 15.3082C27.5296 15.8916 27.5296 16.856 26.2074 17.4393L21.6185 19.4771C21.0974 19.7105 20.2418 19.7105 19.7207 19.4771L15.1318 17.4393C13.8096 16.856 13.8096 15.8916 15.1318 15.3082L19.7207 13.2705C20.2418 13.0371 21.0974 13.0371 21.6185 13.2705Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path opacity="0.4" d="M13.833 19.5549C13.833 20.2083 14.323 20.9627 14.9219 21.2272L20.203 23.576C20.6075 23.7549 21.0663 23.7549 21.463 23.576L26.7441 21.2272C27.343 20.9627 27.833 20.2083 27.833 19.5549" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path opacity="0.4" d="M13.833 23.4438C13.833 24.1672 14.2608 24.8205 14.9219 25.1161L20.203 27.465C20.6075 27.6438 21.0663 27.6438 21.463 27.465L26.7441 25.1161C27.4052 24.8205 27.833 24.1672 27.833 23.4438" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-brandGray20x">App ID</h2>
                            <div className="flex flex-row justify-between items-end gap-4">
                                <p className="text-black font-avenirBlack text-lg sm:text-xl overflow-x-auto overflow-y-hidden md:overflow-hidden w-ninetyPercent md:w-full pr-10 sm:pr-0 print-appid">{appId || 'appId'}</p>
                                <CopyButton text={appId} ariaLabel={'Copy app ID'} />
                            </div>
                        </div>
                    </div>
                    <div className="pt-11 md:pt-0 lg:pt-11 px-8 md:px-10 w-full md:border-l md:border-brandGray2x lg:border-0 md:w-fiftyPercent lg:w-full">
                        <table className="w-full table-auto text-brandGray20x">
                            <tbody>
                                <tr>
                                    <td className="py-3 text-brandGray20x">Display Name</td>
                                    <td className="text-black py-3 text-right print-displayname">{displayName}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 text-brandGray20x">Product</td>
                                    <td className="text-black py-3 text-right print-product">{product}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 text-brandGray20x">Scope</td>
                                    <td className="text-black py-3 text-right print-scope">{scope}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 text-brandGray20x">Created</td>
                                    <td className="text-black py-3 text-right print-datecreated">{formatDateTimeMonthText(created)}</td>
                                </tr>
                                <tr>
                                    <td className="py-3 text-brandGray20x">
                                        <p className='font-avenirMedium xs:whitespace-normal whitespace-nowrap'>App Status {checked ? <span className='whitespace-nowrap text-brandGreen1x'>(Live)</span> : <span className='text-brandRed1x whitespace-nowrap'>(Not Live)</span>}</p>
                                    </td>
                                    <td className="text-black py-3 text-right print-datecreated">
                                        <div className='flex gap-2 items-center justify-end '>
                                            <FormSwitch readOnly={submitting} switchId={'appStatus'} switchName={'appStatus'} switchChecked={checked} handleChange={()=>{setClickedGoLive(true); setChecked(prevChecked => !prevChecked)}} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="lg:w-sixtyPercent md:pt-11 pb-20">
                    <div className='px-8 md:px-10 pb-8'>
                        <h1 className="font-avenirBlack text-black text-2xl pb-5">App Keys</h1>
                        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 md:items-center py-18px border-t border-brandGray16x">
                            <h2 className="text-brandGray20x">Public Key</h2>
                            <div className="flex flex-row px-4 md:w-sixtyPercent justify-between border border-brandGray16x divide-x divide-brandGray16x rounded-ten ">
                                <input type={`${pKVisible ? 'text' : 'password'}`} data-key-visible="hidden" defaultValue={`${publicKey ? publicKey : 'kjciowdiwie92829399293fvkejir'}`} className="publicKey py-2 w-full pr-4 bg-transparent overflow-x-auto border-transparent focus:border-transparent focus:ring-0 bind-publickey" readOnly />
                                <button type='button' onClick={()=>setPKVisible(prevPKVisible => !prevPKVisible)} aria-label='View Public key' data-key-type="publicKey" className="keyViewer cursor-pointer w-12 py-2 flex flex-row relative justify-center items-center">
                                    <p className={`eye-slash ${pKVisible ? 'block' : 'hidden'} text-3xl absolute left-fiftyPercent top-fiftyPercent -translate-x-fiftyPercent -translate-y-fiftyPercent`}>/</p>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M11.6845 8.99945C11.6845 10.4845 10.4845 11.6845 8.99945 11.6845C7.51445 11.6845 6.31445 10.4845 6.31445 8.99945C6.31445 7.51445 7.51445 6.31445 8.99945 6.31445C10.4845 6.31445 11.6845 7.51445 11.6845 8.99945Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.00086 15.2016C11.6484 15.2016 14.1159 13.6416 15.8334 10.9416C16.5084 9.88406 16.5084 8.10656 15.8334 7.04906C14.1159 4.34906 11.6484 2.78906 9.00086 2.78906C6.35336 2.78906 3.88586 4.34906 2.16836 7.04906C1.49336 8.10656 1.49336 9.88406 2.16836 10.9416C3.88586 13.6416 6.35336 15.2016 9.00086 15.2016Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 md:items-center py-18px border-t border-brandGray16x">
                            <h2 className="text-brandGray20x">Secret Key</h2>
                            <div className="flex flex-row px-4 md:w-sixtyPercent justify-between border border-brandGray16x divide-x divide-brandGray16x rounded-ten ">
                                <input type={`${sKVisible ? 'text' : 'password'}`} data-key-visible="hidden" defaultValue={`${secretKey ? secretKey : 'lpciowdiwie9896659399293fvkejir'}`} className="secretKey py-2 w-full pr-4 bg-transparent overflow-x-auto border-transparent focus:border-transparent focus:ring-0 bind-secretkey" readOnly />
                                <button type='button' onClick={()=>setSKVisible(prevSKVisible => !prevSKVisible)} aria-label='View Secret key' data-key-type="secretKey" className="keyViewer cursor-pointer w-12 py-2 flex flex-row relative justify-center items-center">
                                    <p className={`eye-slash ${sKVisible ? 'block' : 'hidden'} text-3xl absolute left-fiftyPercent top-fiftyPercent -translate-x-fiftyPercent -translate-y-fiftyPercent`}>/</p>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M11.6845 8.99945C11.6845 10.4845 10.4845 11.6845 8.99945 11.6845C7.51445 11.6845 6.31445 10.4845 6.31445 8.99945C6.31445 7.51445 7.51445 6.31445 8.99945 6.31445C10.4845 6.31445 11.6845 7.51445 11.6845 8.99945Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.00086 15.2016C11.6484 15.2016 14.1159 13.6416 15.8334 10.9416C16.5084 9.88406 16.5084 8.10656 15.8334 7.04906C14.1159 4.34906 11.6484 2.78906 9.00086 2.78906C6.35336 2.78906 3.88586 4.34906 2.16836 7.04906C1.49336 8.10656 1.49336 9.88406 2.16836 10.9416C3.88586 13.6416 6.35336 15.2016 9.00086 15.2016Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 md:items-center py-18px border-t border-brandGray16x">
                            <h2 className="text-brandGray20x">Encryption Key</h2>
                            <div className="flex flex-row px-4 md:w-sixtyPercent justify-between border border-brandGray16x divide-x divide-brandGray16x rounded-ten ">
                                <input type={`${eKVisible ? 'text' : 'password'}`} data-key-visible="hidden" defaultValue={`${encryptionKey ? encryptionKey : 'frgiowdiwie928293293fv75ejir'}`} className="encryptionKey py-2 w-full pr-4 bg-transparent overflow-x-auto border-transparent focus:border-transparent focus:ring-0 bind-encryptionkey" readOnly />
                                <button type='button' onClick={()=>setEKVisible(prevEKVisible => !prevEKVisible)} aria-label='View Encryption key' data-key-type="encryptionKey" className="keyViewer cursor-pointer w-12 py-2 flex flex-row relative justify-center items-center">
                                    <p className={`eye-slash ${eKVisible ? 'block' : 'hidden'} text-3xl absolute left-fiftyPercent top-fiftyPercent -translate-x-fiftyPercent -translate-y-fiftyPercent`}>/</p>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" d="M11.6845 8.99945C11.6845 10.4845 10.4845 11.6845 8.99945 11.6845C7.51445 11.6845 6.31445 10.4845 6.31445 8.99945C6.31445 7.51445 7.51445 6.31445 8.99945 6.31445C10.4845 6.31445 11.6845 7.51445 11.6845 8.99945Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.00086 15.2016C11.6484 15.2016 14.1159 13.6416 15.8334 10.9416C16.5084 9.88406 16.5084 8.10656 15.8334 7.04906C14.1159 4.34906 11.6484 2.78906 9.00086 2.78906C6.35336 2.78906 3.88586 4.34906 2.16836 7.04906C1.49336 8.10656 1.49336 9.88406 2.16836 10.9416C3.88586 13.6416 6.35336 15.2016 9.00086 15.2016Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* webhook */}
                    <div className="w-full pt-8 mx-auto px-8 md:px-10 border-t border-t-brandGray2x">

                        { !webhook_url
                            ?
                                <div className="flex flex-col pt-8 items-center w-full ">
                                    <div className="flex flex-row w-20 h-20 items-center justify-center rounded-fiftyPercent bg-brandLightBlue1x">
                                        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M22.9451 41.6169C33.227 41.6169 41.5622 33.2817 41.5622 22.9998C41.5622 12.7179 33.227 4.38281 22.9451 4.38281C12.6632 4.38281 4.32812 12.7179 4.32812 22.9998C4.32812 33.2817 12.6632 41.6169 22.9451 41.6169Z" fill="#FF9800" />
                                            <path d="M29.0512 21.6969H25.8863V14.3246C25.8863 12.6118 24.9554 12.2581 23.8198 13.5427L23.0007 14.4735L16.0751 22.3485C15.1257 23.4283 15.5166 24.3033 16.9501 24.3033H20.115V31.6757C20.115 33.3884 21.0459 33.7422 22.1815 32.4576L23.0007 31.5267L29.9262 23.6517C30.8757 22.5719 30.4847 21.6969 29.0512 21.6969Z" fill="#FF9800" /> </svg>
                                    </div>
                                    <h3 className="text-black font-avenirBlack text-xl pt-18px text-center">No Webhooks available</h3>
                                    <h2 className="text-brandGray20x pb-4 text-center">Add Webhook to receive events</h2>
                                    <ButtonPrimaryIcon handleClick={()=>setIsWebHookModalOpen(true)} text={'Add webhook'} />
                                </div>
                            :
                                <div>
                                    <h1 className="font-avenirBlack text-black text-2xl pb-8 pt-2">Webhook</h1>
                                    <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 md:items-center py-18px border-y border-brandGray16x">
                                        <h2 className="text-brandGray20x">Webhook URL</h2>
                                        <div className="flex flex-row px-4 md:w-sixtyPercent justify-between border border-brandGray16x divide-x divide-brandGray16x rounded-ten ">
                                            <input type={`${wHVisible ? 'text' : 'password'}`} data-key-visible="hidden" value={`${webhook_url ? webhook_url : 'https://example.com/webhook'}`} className="webhook-url py-2 w-full pr-4 bg-transparent overflow-x-auto border-transparent focus:border-transparent focus:ring-0 bind-webhook-url" readOnly />
                                            <button type='button' onClick={()=>setWHVisible(prevWHVisible => !prevWHVisible)} aria-label='View webhook url' data-key-type="webhook-url" className="keyViewer cursor-pointer w-12 py-2 flex flex-row relative justify-center items-center">
                                                <p className={`eye-slash ${wHVisible ? 'block' : 'hidden'} text-3xl absolute left-fiftyPercent top-fiftyPercent -translate-x-fiftyPercent -translate-y-fiftyPercent`}>/</p>
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.4" d="M11.6845 8.99945C11.6845 10.4845 10.4845 11.6845 8.99945 11.6845C7.51445 11.6845 6.31445 10.4845 6.31445 8.99945C6.31445 7.51445 7.51445 6.31445 8.99945 6.31445C10.4845 6.31445 11.6845 7.51445 11.6845 8.99945Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M9.00086 15.2016C11.6484 15.2016 14.1159 13.6416 15.8334 10.9416C16.5084 9.88406 16.5084 8.10656 15.8334 7.04906C14.1159 4.34906 11.6484 2.78906 9.00086 2.78906C6.35336 2.78906 3.88586 4.34906 2.16836 7.04906C1.49336 8.10656 1.49336 9.88406 2.16836 10.9416C3.88586 13.6416 6.35336 15.2016 9.00086 15.2016Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <button type='button' id={'Update webhook'} onClick={()=>setIsWebHookModalOpen(true)} className={`py-5 text-left text-brandDarkViolet1x font-avenirBlack text-sm md:text-base`} >+ Update Webhook</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>

        <ModalWrap key={'webHookModal'} id={'webHookModal'} modalState={isWebHookModalOpen} handleModal={()=>setIsWebHookModalOpen(false)} >
            <WebHookModal appid={appId} mutate={mutate} modalState={isWebHookModalOpen} type={webhook_url == '' ? 'Add' : 'Update'} webhook={webhook_url} closeModal={()=>setIsWebHookModalOpen(false)} openAlert={openAlert} alertValues={alertValues} setAlertValues={setAlertValues} setOpenAlert={setOpenAlert} />
        </ModalWrap>

        <ModalWrap key={'addFundModal'} id={'addFundModal'} modalState={isAddFundModalOpen} handleModal={()=>setIsAddFundModalOpen(false)} >
            <AddDeveloperCredit walletCurrency={walletCurrency} walletBalance={walletBalance} appid={appId} mutate={mutate} modalState={isAddFundModalOpen} closeModal={()=>setIsAddFundModalOpen(false)} openAlert={openAlert} alertValues={alertValues} setAlertValues={setAlertValues} setOpenAlert={setOpenAlert} />
        </ModalWrap>

        <ModalWrap key={'editAppModal'} id={'editAppModal'} modalState={isEditModalOpen} handleModal={()=>setIsEditModalOpen(false)} >
            <EditApp name={appName} mutate={mutate} appData={appData[0]} closeModal={()=>setIsEditModalOpen(false)} openAlert={openAlert} alertValues={alertValues} setAlertValues={setAlertValues} setOpenAlert={setOpenAlert} />
        </ModalWrap>

        <ConfirmDelete modalState={isConfirmDeleteModal} submitting={submitting} closeModal={()=>setIsConfirmDeleteModal(false)} setConfirmed={setConfirmedDelete} confirmed={confirmDelete} deleteConfirmedAction={()=>handleDeleteConfirmed(appId)} ></ConfirmDelete>

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />


    </div>
  )
}

export default AppInfo