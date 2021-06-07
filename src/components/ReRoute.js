import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from '../contexts/AuthContext'

export function ReRoute({component: Component, ...rest}) {

    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                // return currentUser? <Component {...props} />: <Redirect to="/login" />
                if (currentUser){
                    return <Redirect to="/dashboard" />
                } else{
                    return <Redirect to="/login" />
                }
                
            }}
            >
        </Route>
    )
}

export function ReRouteUsername({component: Component, ...rest}) {

    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                // return currentUser? <Component {...props} />: <Redirect to="/login" />
                if (currentUser && currentUser.displayName){
                    return <Redirect to="/dashboard" />
                } else{
                    return <Component {...props} />
                }
                
            }}
            >
        </Route>
    )
}

