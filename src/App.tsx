import { useState, useEffect} from 'react'
import teamIcon from "./assets/icon.svg"
import arrow from "./assets/arrow.svg"
import userIcon from "./assets/avatar_global.svg"
import type { Matches, JsonData } from './MatchTypes'
import Match from './match'
import './App.css'
const Icons = {userIcon, teamIcon, arrow}
function App() {
  const [matches, setMatches] = useState<Matches[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("https://app.ftoyd.com/fronttemp-service/fronttemp")
      
      if(!response.ok){
        throw new Error(`http error ${response.status}`);
      }
      const dataOfMatches: JsonData = await response.json()
        setMatches(dataOfMatches.data.matches);
    }catch(err){
      console.error(err)
    }
    }
    fetchData()
  }, [])
  if(matches.length === 0){
    return <p>Loading...</p>
  }
  return (
    <>
      <main>
        {matches.map((match, index) => (
          <Match match={match} icons={Icons} ind={index} classNames={index===2?["open", "turning"] : undefined}></Match>
        ))}
      </main>
    </>
  )
}

export default App
