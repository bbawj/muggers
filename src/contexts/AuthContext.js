import React, { useContext, useState, useEffect } from 'react'
import {auth, db} from "../firebase"


const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [username, setUserName] = useState()
    const [loading,setLoading] = useState(true)
    
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
      }
    
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(true)
            db.collection("users").doc(user.uid).get().then(doc => {
                if (doc.exists){
                    setUserName(doc.data().username)
                    // console.log(username)
                }
            }).then(
                setLoading(false)
            )
            
        })
        return unsubscribe
    }, [])

    const value ={ 
        currentUser, signup ,login,logout, resetPassword, updateEmail,
        updatePassword, username, loading
    }

    return (
        <AuthContext.Provider value ={value}>
            {!loading && children}
  
        </AuthContext.Provider>
    )
}

