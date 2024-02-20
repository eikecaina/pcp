

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.min.css";
import { ColDef, GridApi, IDateFilterParams, ITextFilterParams } from "ag-grid-community";
import { useMemo, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { DataFetcher } from "components/DataFetcherJson";
import { useTranslation } from "next-i18next";
import { buttons } from "polished";

interface SearchQuotationProps {
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const filterParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
  minValidYear: 2000,
  maxValidYear: 2021,
  inRangeFloatingFilterDateFormat: "Do MMM YYYY",
};

const SearchQuotation: React.FC<SearchQuotationProps> = ({
  isModalOpen,
  setModalIsOpen,
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: "Usuário", field: "user" },
    { headerName: "Cliente", field: "client" },
    { headerName: "Cotação", field: "quotation" },
    { headerName: "Ordem de Venda", field: "salesOrder" },
    {
      headerName: "Criada em",
      field: "create",
      filter: "agDateColumnFilter",
      filterParams: filterParams,
    },
  ]);

  function clearFilters() {
    if (gridRef.current && gridRef.current.api) {
      const gridApi: GridApi = gridRef.current.api;
      gridApi.setFilterModel(null);
    }
  }

  const containerStyle = useMemo(() => ({ width: "100%", height: "70vh" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      floatingFilter: true,
      filterParams: {
        buttons: ['clear'],
      } as ITextFilterParams,
      suppressMenu: true,
    }),
    []
  );

  const handleOk = () => {
    setModalIsOpen(false);
  };

  const handleCancel = () => {
    setModalIsOpen(false);
  };
  const { t } = useTranslation("layout");
  return (
    <Modal
      width={"100%"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closable={false}
      okText={t("generalButtons.openButton")}
      cancelText={t("generalButtons.cancelButton")}
      footer={[
        <Button key="back" onClick={clearFilters}>
          Limpar Filtros
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Abrir
        </Button>,
        <Button key="link" type="primary" onClick={handleOk}>
          Cancelar
        </Button>,
      ]}
    >
      <DataFetcher
        apiUrl="http://localhost:3000/api/getData"
        tipo="open-quotation"
      >
        {(rowData) => (
          <div className="ag-theme-alpine" style={containerStyle}>
            <div style={gridStyle}>
              <AgGridReact
                ref={gridRef}
                pagination={true}
                rowSelection="multiple"
                animateRows={true}
                sideBar={"columns"}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
              />
            </div>
          </div>
        )}
      </DataFetcher>
    </Modal>
  );
};

export default SearchQuotation;