import React, {useState} from 'react'
import KYCItem from './KYCItem'
import ModalWrap from '../../../Elements/Modal/ModalWrap'
import KYCModals from './KYCModals/KYCModals'
import useUser from '../../../../hooks/stores/useUser'
import Alert from '../../../Elements/Alerts/Alert'

const KYC = ({currentAccountType, handleSubmitClick, submitting}) => {
    const [currentModal, setCurrentModal] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })

    const {userDataValue} = useUser()

    const PersonalKYCData = [
        {
            kyc:'Personal KYC',
            description:'Please tell us a little about yourself',
            completed: userDataValue && userDataValue.kyc_status.personal == 1,
            active:userDataValue ? userDataValue.kyc_status.personal == 1 ? false : true : false
        },
        {
            kyc:'Settlement KYC',
            description:'Let us know where to send your payouts to',
            completed:userDataValue && userDataValue.kyc_status.settlement == 1,
            active:userDataValue ? userDataValue.kyc_status.settlement == 1 ? false : true : false
        },
    ]

    const BusinessKYCData = [
        {
            kyc:'Personal KYC',
            description:'Please tell us a little about yourself',
            completed: userDataValue && userDataValue.kyc_status.personal == 1,
            active:userDataValue ? userDataValue.kyc_status.personal == 1 ? false : true : false
        },
        {
            kyc:'Business KYC',
            description:'Please tell us some more about your business',
            completed:userDataValue && userDataValue.kyc_status.business == 1,
            active:userDataValue ? userDataValue.kyc_status.business == 1 ? false : true : false
        },
        {
            kyc:'Verification KYC',
            description:'The documents we ask for are based on your business profile',
            completed:userDataValue && userDataValue.kyc_status.verification == 1,
            active:userDataValue ? userDataValue.kyc_status.verification == 1 ? false : true : false
        },
        {
            kyc:'Settlement KYC',
            description:'Let us know where to send your payouts to',
            completed:userDataValue && userDataValue.kyc_status.settlement == 1,
            active:userDataValue ? userDataValue.kyc_status.settlement == 1 ? false : true : false
        },
    ]

    const KYCData = currentAccountType == 'personal' ? PersonalKYCData : BusinessKYCData

    const openModal = (index) => {
        setCurrentModal(index)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    
    const totalSteps = KYCData.length;
    const completedSteps = KYCData.filter((step) => step.completed).length;
    const percentageComplete = Math.floor((completedSteps / totalSteps) * 100);

  return (
    <div className='py-60px'>
        <div className='rounded-twenty bg-brandGray10x border-2 border-brandGray2x'>
            <div className='bg-white rounded-t-twenty px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-10'>
                <div className='flex items-center gap-5'>
                    <svg width="35" height="35" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14.5" cy="14.4375" r="14.4375" fill="#2A2AB3"/>
                        <path opacity="0.4" d="M11.5506 10.6975L17.7519 8.62811C20.5362 7.69998 22.0487 9.21936 21.1275 12.0037L19.0581 18.205C17.6694 22.3781 15.3869 22.3781 13.9981 18.205L13.3862 16.3625L11.5437 15.7506C7.37749 14.3687 7.37749 12.0931 11.5506 10.6975Z" fill="white"/>
                        <path d="M14.995 14.5955L17.6144 11.9692Z" fill="white"/>
                        <path d="M14.995 15.1111C14.8644 15.1111 14.7338 15.063 14.6306 14.9599C14.4313 14.7605 14.4313 14.4305 14.6306 14.2311L17.2431 11.6049C17.4425 11.4055 17.7725 11.4055 17.9719 11.6049C18.1713 11.8042 18.1713 12.1342 17.9719 12.3336L15.3594 14.9599C15.2563 15.0561 15.1256 15.1111 14.995 15.1111Z" fill="white"/>
                    </svg>
                    <p className='font-avenirHeavy'>Get Started with Pandascrow</p>
                </div>
                <p className='self-end lg:self-auto text-brandGray11x text-sm'>
                    <span>{userDataValue ? userDataValue.kyc_status.progress : 0}</span>% Complete
                </p>
            </div>

            <div className='rounded-b-twenty bg-brandGray10x px-8 py-4'>
                {KYCData.map((data, idx)=>{
                    
                    return <KYCItem key={idx} number={idx < 10 ? `${'0'+(idx+1)}` : idx+1} kyc={data.kyc} description={data.description} active={idx > 0 && KYCData[idx - 1].completed ? data.active : idx == 0 && data.active} completed={data.completed} handleClick={()=>openModal(idx)} />
                    
                    // uncomment below to activate all buttons/modals    

                    // return <KYCItem key={idx} number={idx < 10 ? `${'0'+(idx+1)}` : idx+1} kyc={data.kyc} description={data.description} active={true} completed={false} handleClick={()=>openModal(idx)} />

                })}
            </div>
        </div>
        
        <div className='pt-10 pb-5 flex flex-row'>
            <button onClick={handleSubmitClick} disabled={(userDataValue && (userDataValue.kyc_status.progress !== 100)) || submitting} className={`bg-black text-white active:translate-y-2 hover:shadow-sm transition-all duration-300 ease-in-out rounded-fifty disabled:bg-brandGray16x px-5 py-2.5 w-fit mx-auto`}>Submit Compliance</button>
        </div>

        <ModalWrap key={'kycModal'} id={'kycModal'} modalState={isModalOpen} handleModal={closeModal} >
            <div className='bg-white relative m-auto rounded-ten py-8 px-5 md:py-8 md:px-8 lg:px-14 z-50 w-ninetyFivePercent sm:w-sixtyFivePercent md:w-sixtyPercent lg:w-fiftyPercent h-fit'>
                <KYCModals key={'kycModal' + currentModal} index={currentModal} kycType={currentAccountType} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />
            </div>
        </ModalWrap>
        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default KYC