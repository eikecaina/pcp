import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import 'ag-grid-community/styles/ag-theme-alpine.min.css';
import { ColDef } from 'ag-grid-community';
import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import {  Modal } from 'antd';

interface SearchQuotationProps {
    isModalOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchQuotation: React.FC<SearchQuotationProps> = ({ isModalOpen, setModalIsOpen }) => {

    const [rowData, setRowData] = useState([
        { quotation: '', salesOrder: '', user: '', client: '', create: '', open: '' },
    ]);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: 'Usuário', field: 'user' },
        { headerName: 'Cliente', field: 'client' },
        { headerName: 'Cotação', field: 'quotation' },
        { headerName: 'Ordem de Venda', field: 'salesOrder' },
        { headerName: 'Criada em', field: 'create' },
    ]);
    const containerStyle = useMemo(() => ({ width: '100%', height: '60vh' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
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

    const handleOk = () => {
        setModalIsOpen(false);
    };

    const handleCancel = () => {
        setModalIsOpen(false);
    };

    return (
        <Modal
            width={'100%'}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            okText={"Abrir"}
            cancelText={"Cancelar"}
        >
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
        </Modal>
    )
}

export default SearchQuotation
