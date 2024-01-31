import React, { useLayoutEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useGetUser from '../utils/useGetUser'

const DashboardPrivateRoute = () => {

    const { user } = useGetUser()

    const location = useLocation()
    

    return (
        <div>
            {user ? 
            <Outlet /> 
            : 
            <Navigate to={'/auth/login'} state={{ from : location }} /> }
        </div>
    )
}

export default DashboardPrivateRoute