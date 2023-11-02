import React, { useState,createContext } from 'react'
import Game from './Game';
import Login from './Login'
export const Score = createContext(undefined);
export default function App() {
    const [player, setplayer] = useState([])
    const [logged, setlogged] = useState(false)
    return (
        
        <Score.Provider value={{player,setplayer,logged,setlogged}} >
            {logged ? <Game /> : <Login /> }    
        </Score.Provider>
        
    )
}
