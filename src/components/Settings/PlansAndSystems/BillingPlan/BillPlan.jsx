import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useUser from '../../../../hooks/stores/useUser';
import useRequestHeaders from '../../../../utils/useRequestHeaders';
import Alert from '../../../Elements/Alerts/Alert';
import PlanCard from './PlanCard';



const BillPlan = ({mutate}) => {

    const {userDataValue} = useUser()

    const {requestHeaders} = useRequestHeaders()

    const [submitting, setSubmitting] = useState(false)

    const [openAlert, setOpenAlert] = useState(false)
    const [alertValues, setAlertValues] = useState({
      message:"",
      type:'warning',
      duration:2500
    })



    const plans = [
        {
            id:"Pandascrow-Basic",
            name:"Pandascrow Basic",
            price:"FREE",
            description:"For developers and small businesses in build phase",
            isPro:false,
            isPerMonth:false,
            isSubscribed: (userDataValue && userDataValue.account_plan) ? userDataValue.account_plan.toLowerCase() == 'pandascrow-basic' : false,
            features:[
                {
                    name:"Escrow Transaction",
                    description:"Create multiple Escrow Applications in App"
                },
                {
                    name:"Wallet Service",
                    description:"Fund Wallet, Send Cash, and Pay Bills"
                },
                {
                    name:"Customers Directory",
                    description:"See All Customers in a Table that have shopped from you"
                },
                {
                    name:"Storefront Basic",
                    description:"Host Products on your Store and Sell More"
                },
                {
                    name:"Developer Manager",
                    description:"Create App for API Integration"
                }
            ]
        },
        {
            id:"Pandascrow-Pro",
            name:"Pandascrow Pro",
            price:2500,
            description:"For developers and average or bigger businesses in growth phase",
            isPro:true,
            isPerMonth:true,
            isSubscribed: (userDataValue && userDataValue.account_plan) ? userDataValue.account_plan.toLowerCase() == 'pandascrow-pro' : false,
            features:[
                {
                    name:"Storefront Ads Support",
                    description:"Run Sponsored Ads on Pandascrow Storefront"
                },
                {
                    name:"Sub Domain",
                    description:"Connect your Storefront to your Domain"
                },
                {
                    name:"White Label API",
                    description:"Build on Pandascrow Infrastructure"
                },
                {
                    name:"Data Sync",
                    description:"Connect Pandascrow to your favorite Apps"
                },
                {
                    name:"Widget Customization ",
                    description:"Customize your Widgets to feels & look your way"
                },
                {
                    name:"CRM",
                    description:"Send SMS & Emails to Customers"
                },
                {
                    name:"Connect Apps",
                    description:"Connect Application within your Application"
                },
                {
                    name:"Virtual Card Integration",
                    description:"Create, Maintain and Manage you Virtual Card"
                },
                {
                    name:"Everything in Basic",
                    description:"All the Offers Available in Pandascrow Basic"
                },
            ]
        },
    ]

    
    // Add isDropped property to each feature object in the features array
    const plansWithDroppedFeatures = plans.map((plan) => {
        return {
            ...plan,
            isDropped:false
        };
    });

    const handleSubscription = (type) => {

        setOpenAlert(false)
        setSubmitting(true)
    
        const formData = new FormData()
        formData.append('userID', `${userDataValue && userDataValue.userID}`)
        formData.append('plan', `${type}`)

        try {
              const formValues = Object.fromEntries(formData.entries());
                console.log(formValues);
    
          axios.post(`${import.meta.env.VITE_BASEURL}/setting/billing/upgrade?userID=${userDataValue && userDataValue.userID}`, formData, requestHeaders)
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
              
          })
          .catch((err)=>{
              console.error(err);
          })
    
          
        } catch (error) {
            console.error(error)
        }
    }
    

  return (
    <div className='py-8'>

        {/* current plan subscribed to */}
        <div className='pb-5 pt-5'>
            <p className={`font-avenirHeavy text-lg`}>Current Plan</p>
        </div>
        <PlanCard handleSubscription={handleSubscription} data={plansWithDroppedFeatures.filter(plan => plan.isSubscribed == true)} />

        {/* free plan available and not subscribed */}
        {plansWithDroppedFeatures.filter(plan => plan.isSubscribed == false && plan.isPro == false).length > 0 &&
            <div className='pb-5 pt-10'>
                <p className={`font-avenirHeavy text-lg`}>Free Plan</p>
            </div>
        }
        <PlanCard handleSubscription={handleSubscription} data={plansWithDroppedFeatures.filter(plan => plan.isSubscribed == false && plan.isPro == false)} />


        {/* pro plans available and not subscribed */}
        {plansWithDroppedFeatures.filter(plan => plan.isSubscribed == false && plan.isPro == true).length > 0 &&
            <div className='pb-5 pt-10'>
                <p className={`font-avenirHeavy text-lg`}>Pro Plan(s)</p>
            </div>
        }
        <PlanCard handleSubscription={handleSubscription} data={plansWithDroppedFeatures.filter(plan => plan.isSubscribed == false && plan.isPro == true)} />

        <Alert open={openAlert} type={alertValues.type} message={alertValues.message} duration={alertValues.duration}  />

    </div>
  )
}

export default BillPlan