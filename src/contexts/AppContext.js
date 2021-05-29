import React, { useContext, useState, useRef } from 'react'

const AppContext = React.createContext();

export function useApp(){
    return useContext(AppContext)
}


export function AppProvider( {children} ) {

    const [currentGroup, setCurrentGroup] = useState("")
    const [currentChannel, setCurrentChannel] = useState("")
    const currentTest = useRef("")

    const value = {
        currentGroup, setCurrentGroup, currentChannel, setCurrentChannel, currentTest
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
