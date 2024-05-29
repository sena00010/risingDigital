import React from 'react';
import styles from './sideBar.module.css';
const Sidebar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Çıkış işlemi gerçekleştirilmiştir. Başarıyla giriş sayfasına yönlendiriliyorsunuz.');
        window.location.href = '/login';
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.iconContainer}>
                <img className={styles.logo} src="/Rising Logo.png" alt="image"/>
            </div>
            <div className={styles.homeContainer}>
                <img className={styles.icon} src="/home.png" alt="image"/>
            </div>
            <div className={styles.iconContainer}>
                <img className={styles.icon} src="/cart.png" alt="image"/>
            </div>
            <div className={styles.iconContainer}>
                <img className={styles.icon} src="/profile.png" alt="image"/>
            </div>
            <div className={styles.iconContainer} onClick={handleLogout}>
                <img className={styles.icon} src="/logout-04.png" alt="image"/>
            </div>
        </div>
    );
};

export default Sidebar;
