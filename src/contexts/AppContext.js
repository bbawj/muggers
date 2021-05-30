import React, { useContext, useState } from 'react'

const AppContext = React.createContext();

export function useApp(){
    return useContext(AppContext)
}


export function AppProvider( {children} ) {

    const [currentGroup, setCurrentGroup] = useState("")
    const [currentChannel, setCurrentChannel] = useState("")
    const [groupMembers, setGroupMembers ] = useState([])

    const value = {
        currentGroup, setCurrentGroup, currentChannel, setCurrentChannel, setGroupMembers,groupMembers
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
