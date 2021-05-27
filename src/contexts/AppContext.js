import React, { useContext, useState, useEffect } from 'react'

const AppContext = React.createContext();

export function useApp(){
    return useContext(AppContext)
}


export function AppProvider( {children} ) {

    const [currentGroup, setCurrentGroup] = useState("")
    const [currentChannel, setCurrentChannel] = useState("")

    const value = {
        currentGroup, setCurrentGroup, currentChannel, setCurrentChannel
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
