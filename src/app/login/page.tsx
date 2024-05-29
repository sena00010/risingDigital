'use client';
import {useEffect, useState} from 'react';
import styles from './page.module.css';
import axios from "axios";
import { useRouter } from 'next/navigation';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setError('Username and password cannot be empty.');
        } else {
            setError('');
            try {
                const response = await axios.post(
                    'https://recruitment-api.vercel.app/login',
                    {
                        username,
                        password
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                localStorage.setItem('token', response.data.jwt);
                router.push('/dashboard');
            } catch (err){
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, []);

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Login</h2>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.inputGroup}>
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <input
                        type="text"
                        id="username"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
