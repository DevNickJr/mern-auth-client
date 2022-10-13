import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchWorkourt } = useWorkoutsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem("user")

        //dispatch logout action
        dispatch({type: "LOGOUT"})

        // workout dispatch
        dispatchWorkourt({type:"CLEAR"})

        // send logout req to backend
        // fetch("api/user/logout", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json"}
        // })
    }
    return { logout }
}