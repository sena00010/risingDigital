'use client';
import React, { useState, useEffect } from "react";
import styles from "./customDropdown.module.css";

const CustomDropdown = ({ onChange }: any) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const options = ["Processing", "In Progress", "Completed"];

    const handleOptionClick = (option: any) => {
        setSelectedOption(option);
        onChange(option);
        setIsDropdownOpen(false);
    };

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isDropdownOpen && !target.closest("." + styles.dropdownContainer)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);
    return (
        <div className={styles.dropdownContainer}>
            <select
                value={selectedOption || "Actions"}
                onChange={(e) => handleOptionClick(e.target.value)}
                className={styles.dropdown}
                onClick={handleDropdownClick}
            >
                {!selectedOption &&
                    <option value="Actions" disabled hidden>Actions</option>}
                {options.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            {isDropdownOpen ?
                <img className={styles.icon} src="/Vector@2x.png" alt="image"/> :
                <img className={styles.icon} src="/Vector.png" alt="image"/>}

        </div>
    );
};

export default CustomDropdown;
