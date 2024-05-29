'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from "@/components/dataTable";
import Information from "@/components/information";
import Chart from "@/components/chart";
import styles from './page.module.css'
import Sidebar from "@/components/sideBar";

const DashboardPage = () => {
    const router = useRouter();
    const [showDashboard, setShowDashboard] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
    }, []);
    const handlePageChange = (page:any) => {
        if (page === 'My Proxies') {
            setShowDashboard(false);
        } else {
            setShowDashboard(true);
        }
    };
    return (
        <div className={styles.main}>
            <div>
                <Sidebar/>
            </div>
         <div className={styles.container}>
             <div className={styles.topInfo}>
                 <p>Special Offer! Get Complete Free Proxy 10 MB Proxy, without credit card. <span
                     className={styles.underline}>Start Free Trial</span></p>
                 <img className={styles.image} src="/Icon.png" alt="image"/>
             </div>
             <h1>Proxies & Scraping Infrastructure</h1>
             <div className={styles.tabs}>
                 <div className={styles.pageChanger}>
                     <div onClick={() => handlePageChange('My Proxies')}>My Proxies</div>
                     <div onClick={() => handlePageChange('Dashboard')}>Dashboard</div>
                 </div>
                 <div className={styles.divider}></div>
             </div>

             {showDashboard ? (
                 <>
                     <Information/>
                     <Chart/>
                     <DataTable/>
                 </>
             ) : (
                 <>
                     <div>BU SAYFA MEVCUT DEĞİL</div>
                 </>
             )}
         </div>

        </div>
    );
};

export default DashboardPage;
