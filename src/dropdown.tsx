import { useState, useRef, useEffect } from 'react';
import arrowDown from "./assets/arrowdown2.svg"
interface dropdownProps{
    selectedItem: string,
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}
export function Dropdown({selectedItem, setSelectedItem}: dropdownProps) {
const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

    const items = ["All status", "Ongoing", "Finished", "Scheduled"];

    const handleSelect = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
    }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedItem]);

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