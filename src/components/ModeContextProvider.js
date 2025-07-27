
import { useState,createContext } from "react"
export const ModeContext = createContext()
export const ModeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem('username'))
    const toggleMode = (user) => {
        localStorage.setItem('username',user);
        if (user === 'admin') {
            setMode('admin')
        } else {
            setMode('user')
        }
    }
    return (
        <ModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    )
}

