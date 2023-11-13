import React, { useContext,useState,useEffect} from 'react'
import axios from 'axios'
import {Score} from "./App"
import LoadingScene from './LoadingScene'
export default function Login() {
    const [Toggle, setToggle] = useState(false)
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState(false)
    const [Loading, setLoading] = useState(false)
    const players = useContext(Score)
    const user = document.querySelector(".user")
    const pass = document.querySelector(".pass")
    const {player,setplayer,logged,setlogged } = players

    const register = async(e) => {    
        e.preventDefault()
        try {
        await axios.post("https://coinbackend.onrender.com/API",{username:username,password:password}).then((result)=> console.log(result)).catch((error)=> console.log(error))
        user.value = ""
        pass.value = ""
        setToggle(false)
        
        } catch (error) {
          console.log(error);
        } }
    const login = async(e) => {
      e.preventDefault()
        setLoading(true)
        user.style.border = "1px solid black"
        pass.style.border = "1px solid black"
        user.value = ""
        pass.value = "" 
        seterror(false)
      try {
        const {data} =  await axios.get(`https://coinbackend.onrender.com/API`,{params:{userName:username,password:password}})
        console.log(data);
      
        if (data.length <= 0) {
          setLoading(false)
          alert("Incorrect Username/Password")
          
        } else {
          player.push(data)
          if (player) {
            console.log("WORKED",data.data);
          }
          setlogged(true)

        }
      } catch (error) {
        seterror(true)
      }  
    }
    const Switch = () => {
      setToggle(!Toggle)
    }

    return (
        <section className="Forms" >
          {Loading ? <LoadingScene/> : <> <nav>
                <button onClick={() => Switch()}>{Toggle ? "Login" : "Register"}</button>
            </nav>
            <article className="Title">
                <h1>Competitive Coin Flipping</h1>
                <svg xmlns="http://www.w3.org/2000/svg"
     width="30%" height="50%" className="Coin"
     viewBox="0 0 400 300">
          <path id="Unnamed"
        fill="gold" stroke="black" stroke-width="1"
        d="M 201.09,207.64
           C 201.42,206.97 202.00,193.00 202.00,193.00
             202.00,193.00 181.00,192.25 181.00,192.25
             181.00,192.25 167.17,187.50 167.17,187.50
             167.17,187.50 157.32,184.42 155.27,178.36
             148.55,175.09 148.73,167.64 148.73,167.64
             148.73,167.64 146.68,155.22 147.64,148.36
             148.68,140.91 149.00,137.00 149.00,137.00
             149.00,137.00 150.70,128.64 153.00,124.00
             154.75,120.48 158.36,114.86 160.25,111.25
             163.79,104.46 176.17,101.08 176.17,101.08
             176.17,101.08 191.44,99.02 191.44,99.02
             191.44,99.02 203.25,98.00 203.25,98.00
             203.25,98.00 204.55,84.18 204.55,84.18
             204.55,84.18 214.73,84.36 214.73,84.36
             214.73,84.36 213.50,108.83 213.50,108.83
             213.50,108.83 214.58,116.74 207.67,116.33
             200.34,115.90 187.51,116.06 183.45,119.64
             179.27,123.33 175.39,126.01 172.67,131.33
             169.61,137.31 166.25,147.75 166.25,147.75
             166.25,147.75 166.11,162.11 172.36,168.36
             171.93,175.93 191.17,174.08 191.17,174.08
             191.17,174.08 195.49,173.87 204.67,174.33
             211.70,174.69 210.83,183.50 210.83,183.50
             210.83,183.50 209.83,207.83 209.83,208.17
             209.83,208.50 200.76,208.30 201.09,207.64 Z
           M 181.00,43.42
           C 222.19,38.41 266.42,60.49 287.55,96.00
             298.00,113.57 302.23,132.73 302.00,153.00
             301.87,163.90 298.17,178.93 293.99,189.00
             289.47,199.90 282.96,210.35 274.91,219.00
             265.59,229.02 254.39,237.62 242.00,243.52
             223.69,252.22 207.14,255.23 187.00,255.00
             139.50,254.44 95.39,220.14 84.13,174.00
             82.66,167.98 81.08,159.14 81.00,153.00
             80.77,132.84 84.79,114.63 94.87,97.00
             107.71,74.54 130.43,56.71 155.00,48.74
             164.36,45.71 171.45,44.81 181.00,43.42 Z
           M 179.00,50.42
           C 218.05,45.67 259.53,66.36 279.55,100.00
             289.18,116.19 293.21,134.31 293.00,153.00
             292.90,161.38 290.63,172.03 288.00,180.00
             283.93,192.30 278.62,201.95 270.38,212.00
             261.53,222.80 249.47,231.80 237.00,238.03
             220.74,246.16 203.03,249.21 185.00,249.00
             132.30,248.38 85.08,204.46 85.00,151.00
             84.97,133.43 89.11,116.32 97.87,101.00
             110.78,78.43 133.06,61.54 158.00,54.43
             166.16,52.10 170.84,51.61 179.00,50.42 Z" />
            </svg>
            </article>
            <article className="Form" >
              <form onSubmit={Toggle ? register : login} >
                <h1>{Toggle ? "Register" : "Login"}</h1>
                <label htmlFor="">Username</label>
                <input required className="user" type="text" onChange={(e)=>setusername(e.currentTarget.value)} />
                <label htmlFor="">Password</label>
                <input required className="pass" type="password" onChange={(e)=>setpassword(e.currentTarget.value)} />
                <button type="submit">Enter</button>
                {
                  error && <h1 style={{color:"black",backgroundColor:"red",}} >Incorrect Password/Username</h1>
                }
            </form>
            </article> </> }
            
        </section>
    )
}
