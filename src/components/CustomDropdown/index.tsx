import {useState} from "react";
import styles from './customDropdown.module.css';

 const CustomDropdown = ({ onChange }:any) => {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const options = ['Processing', 'In Progress', 'Completed'];

    const handleOptionClick = (option:any) => {
        setSelectedOption(option);
        setOpen(false);
        onChange(option);
    };

    return (
        <div className={styles.dropdown}>
            <div
                className={styles.selectedOption}
                onClick={() => setOpen(!open)}
            >
                <span className={open?styles.actionTextOpen:styles.actionText} >
                    {selectedOption || 'Action'}
                </span>
                <img
                    className={styles.dropdownIcon}
                    src={open ? '/Vector@2x.png' : '/Vector.png'}
                    alt="dropdown icon"
                />
            </div>
            {open && (
                <div className={styles.options}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={styles.option}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default CustomDropdown