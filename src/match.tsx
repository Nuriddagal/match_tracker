// Типы (Typescript)
import type { Matches } from "./MatchTypes"
// Компонента
import Team from "./team"
// SVG для UI
import arrow from './assets/arrow.svg'
import devider from './assets/divider.svg'
import teamIcon from './assets/icon.svg';
import userIcon from './assets/avatar_global.svg';

interface MyProps {
    match:Matches,
    classNames?: string[],
    ind: number
}
export default function Match({match, classNames, ind}: MyProps) {
    const windowWidth: number = window.innerWidth
    const opener = (e: React.MouseEvent<HTMLElement>): void => {
        const arrow: Element | null = e.currentTarget.querySelector(".arrow");
        const parent: Element | null = e.currentTarget.closest(".container");
        
        parent?.classList.toggle("open");
        arrow?.classList.toggle("turning");
    }
    console.log(windowWidth)
    return(
    <>
    <section className={`container ${classNames !== undefined?classNames[0]: ""}`} key={ind}>
        <header onClick={opener} className="container__header">
            <div className="header__wrapper">
                <div className="header__team-icon">
                    <img src={teamIcon} alt="The badge identifying the team looks like a crown." className="icon"/>
                    <p className="command-name">{match.awayTeam.name}</p>
                </div>
                <div className="scorebar">
                    <p className="score">{match.awayScore} : {match.homeScore}</p>
                    <p className={`match-status ${match.status}`}>{match.status}</p>
                </div>
                <div className="header__team-icon">
                    <p className="command-name">{match.homeTeam.name}</p>
                    <img src={teamIcon} alt="The badge identifying the team looks like a crown." className="icon"/>
                </div>
            </div>
            <span className="container__opener"><img src={arrow} alt="arrow button" className={`arrow ${classNames !== undefined?classNames[1]: ""}`} /></span>
        </header>
        <div className="container__team">
            <Team team={match.awayTeam} icon={userIcon}></Team>
    {windowWidth <= 768 && <div className="versus-text"><img className="devider" src={devider} alt="Versus svg" /></div>}
            <Team team={match.homeTeam} icon={userIcon}></Team>
        </div>
        </section>
    </>
    )
}
