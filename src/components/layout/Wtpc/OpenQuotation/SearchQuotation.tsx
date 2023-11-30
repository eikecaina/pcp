import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import 'ag-grid-community/styles/ag-theme-alpine.min.css'; // Theme
import { ColDef } from 'ag-grid-community';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';


const SearchQuotation: React.FC = () => {
    const [rowData, setRowData] = useState([
        { editable: '',mission: '', company: '', location: '', date: '', time: '', rocket: '' },
    ]);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: 'Editavel', field: 'editable', maxWidth: 150 },
        { headerName: 'Missão', field: 'mission' },
        { headerName: 'Companhia', field: 'company' },
        { headerName: 'Data', field: 'date' },
        { headerName: 'Tempo', field: 'time' },
        { headerName: 'Foguete', field: 'rocket' },
        { headerName: 'Custo', field: 'price' },
    ]);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
        editable: true,
        floatingFilter: true

    }), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.ag-grid.com/example-assets/space-mission-data.json');
                const rowData = response.data;
                setRowData(rowData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    return (

        <div className='ag-theme-alpine' style={containerStyle}>
            <div style={gridStyle} >

                <AgGridReact
                    rowSelection='multiple'
                    animateRows={true}
                    sideBar={'columns'}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                />

            </div>
        </div>


    )
}

export default SearchQuotation
