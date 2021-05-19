import React, { useContext, useState, useEffect } from 'react'

const AppContext = React.createContext();

export function useApp(){
    return useContext(AppContext)
}


export function AppProvider( {children} ) {

    const [groupinfo, setGroupInfo] = useState({
        groupid: "",
        groupname: "",

    })

    const value = {
        groupinfo, setGroupInfo
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
