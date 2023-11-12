import axios from 'axios';
import React,{useState,useContext, useEffect} from 'react'
import {Score} from "./App"
import PlayerInfo from "./PlayerInfo"

export default function Game() {
    const [fliping, setfliping] = useState(false);
    const [all, setall] = useState([])
    const [record, setrecord] = useState([])
    const [number, setnumber] = useState(0) 
    const [stats, setstats] = useState(true)
    const [mLB, setmLB] = useState(false)
    const [mR, setmR] = useState(false)
    const players = useContext(Score)
    
    const {player,setplayer,logged,setlogged } = players

    useEffect(() => {
      const get = async() => {
           new Promise((resolve)=>{
           setTimeout(async() => {
           const {data} = await axios.get(`https://coinbackend.onrender.com/AllPlayers`).then((result)=> console.log(result)).catch((error)=> console.log(error))
           setall(data)
           
           resolve()
          }, 2000);
        })
      }
      get()
    }, [])
  
    const logout = () => {
      setplayer([])
      setlogged(false)
    }
    const next = () => {
      if (number >= record.length - 1) {
        setnumber(0)
      } else setnumber(number + 1)
    }
    const prev = () => {
      if (number <= 0) {
        setnumber(record.length - 1)
        
      } else setnumber(number - 1)
    }

    const flip = async(e,roll) => {
      e.preventDefault()
      const head = document.querySelector(".Heads")
      const tail = document.querySelector(".Tails")
      const face = document.querySelector(".coin")
      face.textContent=""
      face.style.color = "none"
      setfliping(true)
      head.style.pointerEvents = "none" 
      tail.style.pointerEvents = "none"
      await new Promise((resolve)=>{
         setTimeout (()=>{
        setfliping(false)
        head.style.pointerEvents = "auto"
        tail.style.pointerEvents = "auto"
        resolve()
       },2000)})
      
      const num = Math.floor(Math.random() * 2);
      console.log(num);
      if (roll === num) {
          const victory = {
            coloring:"green",
            status:"W"
          }
          face.style.fontSize = "40px"
          face.style.fontWeight = "bold"
          face.textContent = victory.status + "in"
          face.style.color = victory.coloring
          face.style.lineHeight = 6
          setrecord([...record,victory])
          const Ws = player[0][0].wins++;
         await axios.put(`https://coinbackend.onrender.com/API`,{username:player[0][0].userName,wins:Ws,loses:player[0][0].loses}).then((result)=> console.log(result)).catch((error)=> console.log(error))
      } else {
        const defeat = {
            coloring:"red",
            status:"L"
          }
          face.style.fontSize = "40px"
          face.style.fontWeight = "bold"
          face.textContent = defeat.status + "oss"
          face.style.color = defeat.coloring
          face.style.lineHeight = 6
          setrecord([...record,defeat])
          const Ls = player[0][0].loses++;
          await axios.put(`https://coinbackend.onrender.com/API`,{username:player[0][0].userName,loses:Ls,wins:player[0][0].wins}).then((result)=> console.log(result)).catch((error)=> console.log(error))
      }; 
    }
    return (
        <section className="Game" >
          <nav className="top">
            <div className="userInfo">
              <h1 className="user" onClick={()=>setstats(!stats)} >
                <div className="name">Hello, {player[0][0].userName}</div>
                { stats &&
              <> 
              <h1 className="Wins" >Wins:{player[0][0].wins}</h1>
              <h1 className="Games" >Games:{player[0][0].wins + player[0][0].loses}</h1>
              </>
              }
              </h1>
            </div>
            
          <button className="logout" onClick={()=>logout()} >logout</button>
          </nav>
           <article className="mid">
             {window.innerWidth <= `600` ? 
             <>
              <button className="MR"  onClick={()=>setmR(true)}>Record</button>
              {mR && 
              <div className="backscreen" >
                <button className="exit" onClick={()=>setmR(false)} >X</button>
             </div> }
             </> 
             : 
             <div className="record">
                <h1 className="title">Record</h1>
                <div className="records"   >
                  <button className="back" onClick={()=>prev()} > - </button>
                  { record.length > 0 && <div style={{color:record[number].coloring}}> {number + 1}:{record[number].status}</div>}
                  <button className="forward" onClick={()=>next()} > + </button> 
               </div>
             </div> }
             
             <div className="Coin">      
              <div className={`coin ${fliping ? `flip` :"test2"} `}></div>
            </div>
            {window.innerWidth <= "600" ? 
            <>
            <button className="MLB"  onClick={()=>setmLB(true)} >Leaderboard</button>
              {mLB && 
              <div className="backscreen" >
                <button className="exit" onClick={()=>setmLB(false)}  >X</button>
            </div> }
            </> 
            :
            <div className="LB">
              <h1 className="leaderboard" >Leaderboard</h1>
                {all.map((info,index,array)=>{
                let {wins,loses,userName} = info

                return (
                  <PlayerInfo games={wins + loses} percent={wins/(wins/loses)} wins={wins} username={userName} />
                )
                })}
            </div> }
            
           </article>
            <article className="bottom" >
              <div className="buttons">
                <button className="Heads" onClick={(e)=>flip(e,1)} >Heads</button>
                <button className="Tails" onClick={(e)=>flip(e,0)} >Tails</button>
              </div>
            </article>
        </section>
    )
}
