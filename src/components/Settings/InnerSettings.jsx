import React from 'react'
import BusinessProfile from './Business/BusinessProfile'
import Settlement from './Business/Settlement'
import Team from './Business/Team/Team'
import UserProfile from './Business/UserProfile'
import Preferences from './Business/Preferences'
import SettingsResetPassword from './Security/SettingsResetPassword'
import TwoFA from './Security/TwoFA/TwoFA'
import ConnectApps from './General/ConnectApps'
import Referrals from './General/Referrals/Referrals'
import LaunchApps from './General/LaunchApps'
import EarlyAccessFeatures from './PlansAndSystems/EarlyAccessFeatures'
import BillingPlan from './PlansAndSystems/BillingPlan/BillingPlan'
import AuditLog from './Security/AuditLog/AuditLog'

const InnerSettings = ({tab, appId, setAuditTab}) => {

    const tabs = {
        "userProfile": {
            element:<UserProfile />
        },
        "businessProfile": {
            element:<BusinessProfile />
        },
        "team": {
            element:<Team />
        },
        "settlement": {
            element:<Settlement />
        },
        "preferences": {
            element:<Preferences />
        },
        "resetPassword": {
            element:<SettingsResetPassword />
        },
        "auditLog": {
            element:<AuditLog appId={appId} setAuditTab={setAuditTab} />
        },
        "twoFactorAuthentication": {
            element:<TwoFA />
        },
        "connectApps": {
            element:<ConnectApps />
        },
        "referrals": {
            element:<Referrals setAuditTab={setAuditTab} />
        },
        "launchApps": {
            element:<LaunchApps />
        },
        "billingPlan": {
            element:<BillingPlan />
        },
        "earlyAccessFeatures": {
            element:<EarlyAccessFeatures />
        }
    }

    return (
        <div className='w-full'>
            {tabs[`${tab}`] 
            ? 
            tabs[`${tab}`].element 
            : 
            <div className='w-full pt-8'>
                <h2 className='font-avenirHeavy text-20 pb-1 text-black'>This setting doesn't exist or has been removed.</h2>
                <h2 className='text-brandGray11x text-sm md:text-base pb-1'>Please go back to the main settings page.</h2>
            </div>
            }
        </div>
    )
}

export default InnerSettings