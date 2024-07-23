import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
  ColDef,
  GridApi,
  IDateFilterParams,
  ITextFilterParams,
} from "ag-grid-community";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { useTranslation } from "react-i18next";
import Loading from "components/Loading";
import axios from "axios";

interface SearchQuotationProps {
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRowSelect: (rowData: any) => void;
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
  maxValidYear: 2024,
  inRangeFloatingFilterDateFormat: "DD MM YYYY",
};

const SearchQuotation: React.FC<SearchQuotationProps> = ({
  isModalOpen,
  setModalIsOpen,
  onRowSelect,
}) => {
  const { t } = useTranslation("layout");
  const gridRef = useRef<AgGridReact>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: t("labels.user"), field: "user" },
    { headerName: t("labels.client"), field: "ds_Customer" },
    { headerName: t("labels.quotation"), field: "ds_Quotation" },
    { headerName: t("labels.salesOrder"), field: "ds_Ov" },
    {
      headerName: t("labels.created"),
      field: "dt_Created",
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
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
         const response = await axios.get("http://localhost:3000/api/services/valuesMock");
         setRowData(response.data.result);
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
      }
    };
    fetchData();
  }, [isModalOpen]);

  const [selectedRow, setSelectedRow] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setLoading(true);
    onRowSelect(selectedRow);
    setTimeout(() => {
      setLoading(false);
      setModalIsOpen(false);
    }, 1000);
  };

  const handleRowSelected = () => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedData = selectedNodes?.map((node) => node.data) ?? [];
    setSelectedRow(selectedData);
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
          {t("generalButtons.cleanFilters")}
        </Button>,
        <Button key="link" type="primary" onClick={handleOk}>
          {t("generalButtons.cancelButton")}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOpen}>
          {t("generalButtons.openButton")}
        </Button>,
      ]}
    >
      <div className="ag-theme-quartz" style={containerStyle}>
        <div style={gridStyle}>
          <AgGridReact
            onRowSelected={handleRowSelected}
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
      {loading && <Loading />}
    </Modal>
  );
};

export default SearchQuotation;
