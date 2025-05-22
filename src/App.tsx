import { useState, useEffect} from 'react'
import teamIcon from "./assets/icon.svg"
import arrow from "./assets/arrow.svg"
import './App.css'
interface Player {
  "kill": number,
  "username": string
}
interface Team {
  "name": string,
  "place": number,
  "players": [Player],
  "points": number,
  "total_kills": number
}
interface Matches {
    "awayScore": number,
    "awayTeam": Team,
    "homeScore": number,
    "homeTeam": Team,
    "status": string,
    "time": string,
    "title": string
}
interface JsonData {
  "data": {
    "matches": [Matches]
  },
  "ok": boolean
}
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
      if(matches.length === 0) {
        setMatches(dataOfMatches.data.matches);
      }
    }catch(err){
      console.error(err)
    }
    }
    fetchData()
  }, [matches])
  return (
    <>
      <main>
        <section className="container">
          <header className="container__header header">
            <div className="header__wrapper">
              <span className="header__team-icon">
                <img src={teamIcon} alt="The badge identifying the team looks like a crown." className="icon"/>
                <p className="command-name">Command #1</p>
              </span>
              <div className="scorebar">
                <p className="score">0 : 0</p>
                <span className="match-status">live</span>
              </div>
              <span className="header__team-icon">
                <p className="command-name">Command #2</p>
                <img src={teamIcon} alt="The badge identifying the team looks like a crown." className="icon"/>
              </span>
            </div>
            <span className="container__opener"><img src={arrow} alt="arrow button" className="arrow" /></span>
          </header>
          <div className="container__team">
            <div className="team-away">
            <div className="player-container">
              {
                matches[0].homeTeam.players.map((player, index) => (
                  <div key={index} className='player' id={player.username}>
                    <p>{player.username}</p>
                    <p>{player.kill}</p>
                  </div>
                ))
              }
            </div>
            <div className="stat-info">
              <span className="stat" id="points">{matches[0].awayTeam.points}</span>
              <span className="stat" id="place">{matches[0].awayTeam.place}</span>
              <span className="stat" id="total_kill">{matches[0].awayTeam['total_kills']}</span>
            </div>
              </div>
          <div className='team-home'>
            <div className="player-container">
              {
                matches[0].homeTeam.players.map((player, index) => (
                  <div key={index} className='player' id={player.username}>
                    <p>{player.username}</p>
                    <p>{player.kill}</p>
                  </div>
                ))
              }
            </div>
            <div className="stat-info">
              <span className="stat" id="points">{matches[0].homeTeam.points}</span>
              <span className="stat" id="place">{matches[0].homeTeam.place}</span>
              <span className="stat" id="total_kill">{matches[0].homeTeam['total_kills']}</span>
            </div>
          </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
