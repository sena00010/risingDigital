import { LineChart } from '@mantine/charts';
import styles from './chart.module.css';
export default function Chart() {
     const data = [
        {
            date: 'Mar 22',
            perNetwork:20,
        },
        {
            date: 'Mar 23',
            perNetwork:15,

        },
        {
            date: 'Mar 24',
            perNetwork:25,

        },
        {
            date: 'Mar 25',
            perNetwork:10,

        },
        {
            date: 'Mar 26',
            perNetwork:5,

        },
    ];
    return (
        <LineChart
            className={styles.chart}
            h={500}
            w={1080}
            data={data}
            dataKey="date"
            series={[
                { name:'perNetwork', color: 'blue.6' },

            ]}
            curveType="natural"
            tickLine="none"
            gridAxis="none"
            withDots={false}
        />
    );
}