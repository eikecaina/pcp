import { ColDef } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AgGridPage = () => {

    const gridRef = useRef();

    const [rowData, setRowData] = useState([
        { make: '', model: '', price: '' },
    ]);

    const [columnDefs, setColumnsDefs] = useState<ColDef[]>([
        { field: 'make', sortable: true, filter: true },
        { field: 'model' },
        { field: 'price', filter: true }
    ]);

    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(response => {
                return response.json();
            })
            .then(rowData => setRowData(rowData))
    }, []);

    const defaultColDefs = useMemo( () => ({
        filter: true,
        sortable: true,
    }), [])

    const pushMeClicked = useCallback((e) => {
        if (gridRef.current) {
            (gridRef.current as any).api.deselectAll();
        }
    }, [gridRef]);

    return (

        <div className='ag-theme-alpine-dark' style={{ height: 500, width: 500 }}>
            <button onClick={pushMeClicked}>Aperte</button>
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDefs}
                animateRows={true}
                rowSelection='multiple'
            />
        </div>
    );
};

export default AgGridPage;
