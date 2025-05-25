// Импорты с React
import { useState, useRef, useEffect } from 'react';
// Импорт стрелки
import arrowDown from "./assets/arrowdown2.svg"

// Интерфейс для пропсов
interface dropdownProps{
    selectedItem: string,
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}
export function Dropdown({selectedItem, setSelectedItem}: dropdownProps) {
const [isOpen, setIsOpen] = useState(false);
// Доступ к DOM
const dropdownRef = useRef<HTMLDivElement>(null);
    // Массив статусов
    const items = ["All status", "Ongoing", "Finished", "Scheduled"];
    // Изменение статуса и закрытие меню
    const handleSelect = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

useEffect(() => {
    // Обрабатываем нажатие вне Dropdown
    const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
    }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

return (
    <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" aria-expanded={isOpen} onClick={() => setIsOpen(!isOpen)}>
                {selectedItem}
                <img className='dropdown-arrow' src={arrowDown} alt="arrow" aria-hidden={isOpen}/>
            </button>
    
        {isOpen && (
            <ul className="dropdown-menu" aria-hidden={!isOpen}>
                {items.map((item) => (
                    <li key={item}>
                    <button className="dropdown-item"
                    onClick={() => {handleSelect(item)}}>
                    {item}
                    </button>
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
}