import React from 'react'
import BusinessKYCModal from './BusinessKYCModal'
import PersonalKYCModal from './PersonalKYCModal'
import SettlementKYCModal from './SettlementKYCModal'
import VerificationKYCModal from './VerificationKYCModal'

const KYCModals = ({index, kycType, openAlert, alertValues, setOpenAlert, setAlertValues, closeModal}) => {
  return (
    <div>
        {
          kycType == 'personal'
          ?
          <div>
            {index === 0 && <PersonalKYCModal key={index} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />}
            {index === 1 && <SettlementKYCModal key={index} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />}
          </div>
          :
          <div>
            {index === 0 && <PersonalKYCModal key={index} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />}
            {index === 1 && <BusinessKYCModal key={index} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />}
            {index === 2 && <VerificationKYCModal key={index} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />}
            {index === 3 && <SettlementKYCModal key={index} openAlert={openAlert} alertValues={alertValues} setOpenAlert={setOpenAlert} setAlertValues={setAlertValues} closeModal={closeModal} />}
          </div>
        }
    </div>
  )
}

export default KYCModals