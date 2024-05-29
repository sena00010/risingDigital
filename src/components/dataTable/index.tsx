import '@mantine/core/styles.css';
import 'mantine-react-table/styles.css';
import {
    type MRT_ColumnDef,
    MRT_Table,
    useMantineReactTable,
} from 'mantine-react-table';
import { useEffect, useMemo, useState } from 'react';
import axios from "axios";
import {Select} from "@mantine/core";
import styles from "@/app/dashboard/page.module.css";
interface Transactions {
    type: string;
    location: string;
    rental: string;
    ipcount: string;
    purpose: string;
    date: string;
}

const DataTable = () => {
    const dateFormatter = (date: string) => {
        if (date != undefined)
            return (
                date?.split('T')[0].split('-')[2] +
                '.' +
                date?.split('T')[0].split('-')[1] +
                '.' +
                date?.split('T')[0].split('-')[0]
            );
    };
    const [data, setData] = useState<any>([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'https://recruitment-api.vercel.app/get-table',
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            );
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(data,'data');
    }, []);

    // Should be memoized or stable
    const columns = useMemo<MRT_ColumnDef<Transactions>[]>(
        () => [
            {
                accessorKey: 'type', // access nested data with dot notation
                header: 'Type',
            },
            {
                accessorKey: 'location',
                header: 'Location',
            },
            {
                accessorKey: 'rental',
                header: 'Rental Period',
            },
            {
                accessorKey: 'ipcount', // normal accessorKey
                header: 'Number of IP',
            },
            {
                accessorKey: 'purpose',
                header: 'Spesific Purpose',
            },
            { accessorFn: (row) => dateFormatter(row.date),
                accessorKey: 'date',
                header: 'Date',
            },
            {
                accessorFn: (row) => {
                    return (
                        <Select
                            placeholder="Action"
                            data={['Processing', 'In Progress', 'Completed']}
                            rightSection={<img className={styles.image} src="/Vector.png" alt="image" />}
                        />
                    );
                },
                accessorKey: 'actions',
                header: 'Actions',
            },

        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data,
        enableColumnActions: false,
        enableColumnFilters: false,
        enablePagination: false,
        enableSorting: false,
        mantineTableProps: {
            highlightOnHover: false,
            striped: 'odd',
            withColumnBorders: true,
            withRowBorders: true,
            withTableBorder: true,
        },
    });

    //using MRT_Table instead of MantineReactTable if we do not want any of the toolbar features
    return <MRT_Table table={table} />;
};

export default DataTable;
