import { useState } from "react"
import { useAuthContext } from "./useAuthContext"


const useLogin = () => {
    // error and isloading states
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    // dispatch function to update auth context
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch("api/user/login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
    
            const data = await response.json()

            if (!response.ok) {
                setError(data.error)
                setIsLoading(false)
            }
    
            if (response.ok) {
                dispatch({type: "LOGIN", payload: data})
    
                localStorage.setItem("user", JSON.stringify(data))
                setError(null)
                setIsLoading(false)
            }
        } catch (error) {
            console.log("error",error)
        }       
    }
    
    return { login, error, isLoading, setError }
}

export default useLogin