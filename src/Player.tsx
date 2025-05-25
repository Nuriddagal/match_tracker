// Типы (Typescript)
import type { Player } from "./MatchTypes";
// Интерфейс для пропсов
type PlayerProps = {
    players: Player[],
    icon: string
}
// Экспорт компоненты по умолчанию
export default function Players({players, icon}: PlayerProps) {
    return (
        <>
        {
                        players.map((player, index) => (
                            <div key={index} className='player' id={player.username}>
                                <p>
                                    <img src={icon} alt="users   avatar"></img><span className="player-name">{player.username}</span>
                                </p>
                                <p>Kills: {player.kills}</p>
                            </div>
                        ))
                    }
        </>
    )
}