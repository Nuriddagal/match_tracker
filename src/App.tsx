import { useState, useEffect} from 'react'
import teamIcon from "./assets/icon.svg"
import arrow from "./assets/arrow.svg"
import userIcon from "./assets/avatar_global.svg"
import matchTracker from "./assets/Match_Tracker.svg"
import type { Matches, JsonData } from './MatchTypes'
import Match from './match'
import { Dropdown } from './dropdown'
import './App.css'
const Icons = {userIcon, teamIcon, arrow}
function App() {
  const [selectedItem, setSelectedItem] = useState<string>("All status")
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
        <header className="header">
          <div>
            <img src={matchTracker} alt="match tracker text" />
            <Dropdown selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
          </div>
          <div>

          </div>
        </header>
        {selectedItem === "All status" && matches.map((match, index) => (
          <Match match={match} icons={Icons} ind={index} classNames={index===2?["open", "turning"] : undefined}/>
        ))}
        {selectedItem !== "All status" && matches.filter((match) => match.status === selectedItem).map((match, index) => (
          <Match match={match} icons={Icons} ind={index} classNames={index===2?["open", "turning"] : undefined} />
        ))}
      </main>
    </>
  )
}

export default App
