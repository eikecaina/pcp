import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ColDef,
  GridApi,
  IDateFilterParams,
  ITextFilterParams,
  RowSelectedEvent,
} from "ag-grid-community";
import { SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { useTranslation } from "react-i18next";
import Loading from "components/Loading";
import { GetAllQuotation } from "@/app/api/services/Quotation/data";
import { UUID } from "crypto";
import { formatDateBr } from "@/components/utilsDays";

interface SearchQuotationProps {
  isModalOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onRowSelect: (rowData: any) => void;
}

type Quotation = {
  user: string;
  customer: string;
  quotation: number;
  ov: number;
  created: Date;
};

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
  const [selectedRow, setSelectedRow] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: t("labels.user"),
      field: "user",
      suppressHeaderMenuButton: true,
    },
    {
      headerName: t("labels.client"),
      field: "customer",
      suppressHeaderMenuButton: true,
    },
    {
      headerName: t("labels.quotation"),
      field: "quotation",
      suppressHeaderMenuButton: true,
    },
    {
      headerName: t("labels.salesOrder"),
      field: "ov",
      suppressHeaderMenuButton: true,
    },
    {
      headerName: t("labels.created"),
      field: "created",
      filter: "agDateColumnFilter",
      filterParams: filterParams,
      suppressHeaderMenuButton: true,
    },
  ]);
  const [rowData, setRowData] = useState<Quotation[]>([]);
  const [selectedData, setSelectedData] = useState();

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

  const handleRowSelected = (event: RowSelectedEvent) => {
    setSelectedData(event.data);

    onRowSelect(selectedData);
  };

  useEffect(() => {
    handleRowSelected;
    console.log("Data: ", selectedData);
  }, [handleRowSelected]);

  const handleOpen = () => {
    if (selectedRow) {
      console.log("Dados da linha selecionada:", selectedRow);
    } else {
      console.log("Nenhuma linha selecionada.");
    }
    setModalIsOpen(false);
  };

  async function getAllQuotation() {
    const response = await GetAllQuotation();

    const quotationData = response.map(
      (quotation: {
        id: UUID;
        ds_customer: string;
        ds_sales_order: number;
        dt_created: Date;
        user: string;
        ds_quotation: number;
      }) => ({
        id: quotation.id,
        user: "Eike",
        customer: quotation.ds_customer,
        quotation: quotation.ds_quotation,
        ov: quotation.ds_sales_order,
        created: formatDateBr(quotation.dt_created),
      })
    );
    setRowData(quotationData);
  }

  useEffect(() => {
    getAllQuotation();
  }, []);

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
            paginationPageSize={20}
            paginationPageSizeSelector={[20, 30, 50]}
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
