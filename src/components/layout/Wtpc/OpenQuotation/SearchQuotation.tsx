import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-alpine.min.css';
import { ColDef } from 'ag-grid-community';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';


const SearchQuotation: React.FC = () => {
    const [rowData, setRowData] = useState([
        { quotation: '', salesOrder: '', client: '', create: '' },
    ]);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: 'Cliente', field: 'client', flex: 2 },
        { headerName: 'Cotação', field: 'quotation' },
        { headerName: 'Ordem de Venda', field: 'salesOrder' },
        { headerName: 'Criada em', field: 'create' },
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
                const response = await axios.get('http://localhost:8080/');
                const rowData = response.data.registros.find(item => item.tipo === 'open-quotation')?.dados || []; 
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
