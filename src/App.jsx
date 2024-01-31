import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Transaction from './components/Transaction/Transaction'
import Wallet from './components/Wallet/Wallet'
import Customers from './components/Customers/Customers'
import Storefront from './components/Storefront/Storefront'
import Developers from './components/Developers/Developers'
import DeveloperApp from './components/Developers/DeveloperApp/DeveloperApp'
import Widgets from './components/Widgets/Widgets'
import Nav from './components/Navigation/Nav'
import useIsAuthPage from './hooks/stores/useIsAuthPage'
import Login from './components/Auth/Login/Login'
import Signup from './components/Auth/Signup/Signup'
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword'
import ResetPassword from './components/Auth/ForgotPassword/ResetPassword'
import LoginSSO from './components/Auth/Login/LoginSSO'
import VerifyOTP from './components/Auth/VerifyOTP/VerifyOTP'
import Settings from './components/Settings/Settings'
import Demo from './Demo'
import Store from './components/Storefront/Store/Store'
import DashboardPrivateRoute from './privateRoutes/DashboardPrivateRoute'
import VerifyEmail from './components/Auth/VerifyEmail/VerifyEmail'
import Payme from './components/Transaction/Payme/Payme'
import ErrorPageNotFound from './components/ErrorPageNotFound'
import CrowdPayDonate from './components/Transaction/CrowdPayDonate/CrowdPayDonate'


function App() {
  const isAuthPage = useIsAuthPage(state => state.isAuthPage)

  useEffect(() => {
      const currentLocation = window.location.pathname
      console.log(currentLocation);
      if(isAuthPage) {
      // if(isAuthPage && (currentLocation.includes('auth') || currentLocation.includes('payme'))) {
        document.body.style.overflow = 'auto'
      }else{
        document.body.style.overflow = 'hidden'
      }
  }, [isAuthPage])

  return (
    <div className="App flex font-avenirRegular">
      <div className='w-full'>
        <Routes>
          <Route element={<DashboardPrivateRoute />}>
            <Route path="" element={<Home />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="customers" element={<Customers />} />
            <Route path="store" >
              <Route path='' element={<Storefront />} />
              <Route path=':slug' element={<Store />} />
            </Route>
            <Route path="developers" >
              <Route path='' element={<Developers />} />
              <Route path='app' element={<Navigate to="/developers" replace />} />
              <Route path='app/:appId' element={<DeveloperApp />} />
            </Route>
            <Route path="widgets" element={<Widgets />} />
            <Route path='settings' element={<Settings />} />
          </Route>
          <Route path="/auth">
            <Route path='' element={<Navigate to="login" replace />} />
            <Route path='login' element={<Login />} />
            <Route path='login/sso' element={<LoginSSO />} />
            <Route path='join' >
              <Route path='' element={<Signup />} />
              <Route path=':referralCode' element={<Signup />} />
            </Route>
            <Route path='forgot/password' element={<ForgotPassword />} />
            <Route path='reset/password' >
              <Route path='' element={<ResetPassword />} />
              <Route path=':code' element={<ResetPassword />} />
            </Route>
            <Route path='verify/phone' element={<VerifyOTP />} />
            <Route path='verify/email' >
              <Route path='' element={<VerifyEmail />} />
              <Route path=':code' >
                <Route path='' element={<VerifyEmail />} />
                <Route path=':userID' element={<VerifyEmail />}/>
              </Route>
            </Route>
          </Route>
          <Route path='payme' >
              <Route path='' element={<Payme />} />
              <Route path=':nick' element={<Payme />} />
          </Route>
          <Route path='donate' >
              <Route path='' element={<CrowdPayDonate />} />
              <Route path=':token' element={<CrowdPayDonate />} />
          </Route>

          {/* delete before production */}

          <Route path="/demo" element={<Demo />} />
          <Route path='*' element={<ErrorPageNotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
