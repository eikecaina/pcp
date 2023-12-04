import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-alpine.min.css';
import { ColDef } from 'ag-grid-community';
import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Button, TourProps } from 'antd';

interface ButtonRendererProps {
    onClick: () => void;
}

const ButtonRenderer: React.FC<ButtonRendererProps> = ({ onClick }) => {
    return <Button type="primary" onClick={onClick}>Abrir</Button>;
};

const SearchQuotation: React.FC = () => {
    const ref1 = useRef<HTMLButtonElement>(null);
    const ref2 = useRef<HTMLButtonElement>(null);
    const ref3 = useRef<HTMLButtonElement>(null);

    const steps: TourProps['steps'] = [
        {
            title: 'Upload File',
            description: 'Put your files here.',
            target: () => ref1.current!,
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref2.current!,
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref3.current!,
        },
    ];

    const [rowData, setRowData] = useState([
        { quotation: '', salesOrder: '', user: '', client: '', create: '', open: '' },
    ]);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: 'Usuário', field: 'user', flex: 2 },
        { headerName: 'Cliente', field: 'client', flex: 4 },
        { headerName: 'Cotação', field: 'quotation' },
        { headerName: 'Ordem de Venda', field: 'salesOrder' },
        { headerName: 'Criada em', field: 'create' },
        {
            headerName: 'Abrir',
            field: 'open',
            cellRenderer: ButtonRenderer,
            cellRendererParams: {
                onClick: () => console.log('Botão clicado!'),
            },
            floatingFilter: false,
            flex: 1,
            filter: false,
            sortable: false,
            lockPosition: "right",
            resizable: false,
        },
    ]);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 3,
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
                    pagination={true}
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
