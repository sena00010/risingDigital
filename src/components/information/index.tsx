import { useEffect, useState } from "react";
import axios from "axios";
import styles from './Information.module.css';

export default function Information() {
    const [data, setData] = useState<any>({});

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'https://recruitment-api.vercel.app/get-info',
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            );
            setData(response.data);
            console.log(response.data, 'response.data.data');
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div>Subscription expires on</div>
                <div>{data.expireTime}</div>
            </div>
            <div className={styles.secondBox}>
                <div>Last charge</div>
                <div>${data.lastChargeAmount} on {data.lastCharge}</div>
            </div>
            <div className={styles.box}>
                <div>Total Usage Data</div>
                <div>{data.totalDataUsage} GB</div>
            </div>
            <div className={styles.secondBox}>
                <div>Daily Usage Data</div>
                <div>{data.dailyUsage} GB</div>
            </div>
        </div>
    );
}
