import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({component: Component, ...rest}) {

    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                // return currentUser? <Component {...props} />: <Redirect to="/login" />
                if (!currentUser){
                    return <Redirect to="/login" />
                } else if (!currentUser.displayName){
                    return <Redirect to="/username" />
                } else{
                    return <Component {...props} />
                }
                
            }}
            >
        </Route>
    )
}
