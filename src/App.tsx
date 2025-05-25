// 1. Импорты из React
import { useState, useEffect } from 'react';

// 2. Типы (TypeScript)
import type { Matches, JsonData } from './MatchTypes';

// 3. Компоненты 
import { Dropdown } from './dropdown';
import Match from './match';

// 4. SVG для UI
import alert from './assets/alert-triangle.svg'
import matchTracker from './assets/Match_Tracker.svg';
import refresh from './assets/Refresh.svg';


// 5. Стили
import './App.css';
import './mediaForApp.css'

// Объект для передачи иконок в дочерние компоненты

function App() {
  // Текущий выбранный фильтр статуса матчей 
  const [selectedItem, setSelectedItem] = useState<string>("All status")
  // Список матчей, полученных с API
  const [matches, setMatches] = useState<Matches[]>([])
  // Статус fetch'a
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [load, setLoad] = useState<string>('')
  const [isErr, setIsErr] = useState<boolean>(false)
    const fetchData = async () => {
      setIsFetching(true)
      setLoad('rotate')
      try{
        const response = await fetch("https://app.ftoyd.com/fronttemp-service/fronttemp")
      if(!response.ok){
        setIsErr(true)
        throw new Error(`http error ${response.status}`);
      }

        // Парсинг и сохранение данных матчей
      const dataOfMatches: JsonData = await response.json()
        setMatches(dataOfMatches.data.matches);
    }catch(err){
      setIsErr(true)
      console.error(err)
    } finally{ 
      setIsFetching(false)
      setLoad('')
    }
    }
  useEffect(() => {
    // Вызов функции
    fetchData()
  }, [])
  // Загрузочное состояние при отсутствии данных
  if(matches.length === 0){
    return <p className='loading'>Loading...</p>
  }

  return (
    <>
      <main>
        <header className="header">
          <div className='dropdown-container'>
            {/* Логотип и название приложения */}
            <img src={matchTracker} alt="match tracker text" className='tracker-logo'/>
            {/* Фильтр для матчей */}
            <Dropdown selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
          </div>
          <div className="button-container">
            {isErr && <div className="troble-container"><img src={alert} alt="" />Ошибка: не удалось загрузить информацию</div>}
            {/* Кнопка обновления данных */}
            <button className='refresh' type='button' onClick={fetchData}disabled={isFetching}><p>Refresh</p> <img src={refresh} alt="a load sign" className={`load ${load}`}/></button>
          </div>
        </header>
        {/* Отображение всех матчей при выборе "All status" */}
        {selectedItem === "All status" && matches.map((match, index) => (
          <Match match={match} ind={index} classNames={index===2?["open", "turning"] : undefined}/>
        ))}
        {/* Отображение отфильтрованных матчей по статусу */}
        {selectedItem !== "All status" && matches.filter((match) => match.status === selectedItem).map((match, index) => (
          <Match match={match} ind={index} classNames={index===2?["open", "turning"] : undefined} />
        ))}
      </main>
    </>
  )
}

export default App
