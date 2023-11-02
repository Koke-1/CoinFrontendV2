import React, { useState } from 'react'

export default function PlayerInfo({username,percent,games,wins}) {
    const [more, setmore] = useState(true)
    return (
        <div className="player">
         <div className="nameHolder" >
             <h1 onClick={()=> setmore(!more)}>{username}:{`${percent}%`} </h1> 
         </div>
         {more &&
             <div className="extraHolder" >
             <h2> Games:{games}</h2>
             <h2>Wins:{wins}</h2>
         </div>} 
        </div>
    )
}
