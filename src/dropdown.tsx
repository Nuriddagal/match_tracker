import { useState, useRef, useEffect } from 'react';
import arrowDown from "./assets/arrowdown2.svg"
export function Dropdown() {
const [selectedItem, setSelectedItem] = useState<string>("All status")
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
    const selectedItemVisible = (e: MouseEvent,) =>{
        if(!e.currentTarget) return;
        const target = e.currentTarget as HTMLElement;
        const statusParent: HTMLElement[] | null = Array.from(target.querySelectorAll<HTMLElement>(`.container`));
        statusParent?.map((p) =>{
            p.querySelector('.match-status')
        })
        // const matchStatus: (HTMLElement | null)[] = statusParent?.map((p) => p.querySelector<HTMLElement>(".match-status"));
        // const matchStatusClasses: (string[] | undefined)[] | null | undefined = matchStatus?.map((s) => s?.className.split(" ") )
        // if(selectedItem === "All status") {
        //     statusParent?.map((p) => p.classList.remove("hide"))
        // };
        // if(!matchStatusClasses?.includes(selectedItem)){
        //     statusParent?.classList.toggle('hide')
        // }
    }
    document.addEventListener('mousedown', selectedItemVisible)
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