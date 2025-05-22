import type { Player } from "./MatchTypes";
type PlayerProps = {
    players: Player[],
    icon: string
}
export default function Players({players, icon}: PlayerProps) {
    return (
        <>
        {
                        players.map((player, index) => (
                            <div key={index} className='player' id={player.username}>
                                <p>
                                    <img src={icon} alt="users   avatar"></img>{player.username}
                                </p>
                                <p>Kills: {player.kills}</p>
                            </div>
                        ))
                    }
        </>
    )
}