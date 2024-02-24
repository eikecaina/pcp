import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.min.css";
import {
  ColDef,
  GridApi,
  IDateFilterParams,
  ITextFilterParams,
} from "ag-grid-community";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useTranslation } from "next-i18next";
import axios from "axios";

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
      field: "created",
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
        buttons: ["clear"],
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
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/route");
        setRowData(response.data.data);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };
    fetchData();
  }, [isModalOpen]);

  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpen = () => {
    setSelectedRow(selectedRow);    
  };

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
        <Button key="link" type="primary" onClick={handleOk}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOpen}>
          Abrir
        </Button>,
      ]}
    >
      <div className="ag-theme-alpine" style={containerStyle}>
        <div style={gridStyle}>
          <AgGridReact
            onRowSelected={(e) => {
              if (e.node.isSelected()) {
                setSelectedRow(e.data);
              }
            }}
            ref={gridRef}
            pagination={true}
            rowSelection="single"
            animateRows={true}
            sideBar={"columns"}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SearchQuotation;
