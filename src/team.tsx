import type { Team} from "./MatchTypes";
import Players from "./Player";
interface MyProperties {
    team: Team,
    icon: string,
}
export default function Team ({team, icon}: MyProperties) {
    return(
        <>
        <div className="team" >
                <div className="player-container">
                    <Players players={team.players} icon={icon}></Players>
                </div>
                <div className="stat-info">
                    <p className="stat" id="points">Points: +{team.points}</p>
                    <p className="stat" id="place">Place:{team.place}</p>
                    <p className="stat" id="total_kill">Total kills: {team.total_kills}</p>
                </div>
            </div>
        </>
    )
}
