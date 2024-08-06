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
  const [selectedRow, setSelectedRow] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
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

  const [rowData, setRowData] = useState([
    {
      user: "Maria Silva",
      ds_Customer: "Tech Innovators",
      ds_Quotation: 2023001,
      ds_Ov: 2023456,
      dt_Created: "23/02/2024",
    },
    {
      user: "João Pereira",
      ds_Customer: "Alpha Solutions",
      ds_Quotation: 2023002,
      ds_Ov: 2023457,
      dt_Created: "15/03/2024",
    },
    {
      user: "Ana Costa",
      ds_Customer: "Beta Technologies",
      ds_Quotation: 2023003,
      ds_Ov: 2023458,
      dt_Created: "07/04/2024",
    },
    {
      user: "Carlos Souza",
      ds_Customer: "Gamma Enterprises",
      ds_Quotation: 2023004,
      ds_Ov: 2023459,
      dt_Created: "21/05/2024",
    },
    {
      user: "Fernanda Lima",
      ds_Customer: "Delta Corp",
      ds_Quotation: 2023005,
      ds_Ov: 2023460,
      dt_Created: "12/06/2024",
    },
    {
      user: "Pedro Santos",
      ds_Customer: "Omega Systems",
      ds_Quotation: 2023006,
      ds_Ov: 2023461,
      dt_Created: "03/07/2024",
    },
    {
      user: "Lucas Almeida",
      ds_Customer: "Epsilon Networks",
      ds_Quotation: 2023007,
      ds_Ov: 2023462,
      dt_Created: "18/08/2024",
    },
    {
      user: "Juliana Oliveira",
      ds_Customer: "Zeta Solutions",
      ds_Quotation: 2023008,
      ds_Ov: 2023463,
      dt_Created: "05/09/2024",
    },
    {
      user: "Rafael Mendes",
      ds_Customer: "Theta Technologies",
      ds_Quotation: 2023009,
      ds_Ov: 2023464,
      dt_Created: "14/10/2024",
    },
    {
      user: "Gabriela Rocha",
      ds_Customer: "Iota Innovations",
      ds_Quotation: 2023010,
      ds_Ov: 2023465,
      dt_Created: "27/11/2024",
    },
    {
      user: "Bruno Teixeira",
      ds_Customer: "Zeta Solutions",
      ds_Quotation: 2022001,
      ds_Ov: 2022456,
      dt_Created: "15/01/2022",
    },
    {
      user: "Larissa Andrade",
      ds_Customer: "Alpha Innovators",
      ds_Quotation: 2022002,
      ds_Ov: 2022457,
      dt_Created: "23/02/2022",
    },
    {
      user: "Rodrigo Fernandes",
      ds_Customer: "Tech Ventures",
      ds_Quotation: 2022003,
      ds_Ov: 2022458,
      dt_Created: "08/03/2022",
    },
    {
      user: "Bianca Cardoso",
      ds_Customer: "Delta Technologies",
      ds_Quotation: 2022004,
      ds_Ov: 2022459,
      dt_Created: "19/04/2022",
    },
    {
      user: "Eduardo Moreira",
      ds_Customer: "Epsilon Enterprises",
      ds_Quotation: 2022005,
      ds_Ov: 2022460,
      dt_Created: "05/05/2022",
    },
    {
      user: "Vivian Mendes",
      ds_Customer: "Gamma Innovations",
      ds_Quotation: 2022006,
      ds_Ov: 2022461,
      dt_Created: "14/06/2022",
    },
    {
      user: "Renato Lima",
      ds_Customer: "Lambda Corp",
      ds_Quotation: 2021001,
      ds_Ov: 2021456,
      dt_Created: "12/01/2021",
    },
    {
      user: "Helena Martins",
      ds_Customer: "Mu Technologies",
      ds_Quotation: 2021002,
      ds_Ov: 2021457,
      dt_Created: "21/02/2021",
    },
    {
      user: "Fábio Santos",
      ds_Customer: "Nu Solutions",
      ds_Quotation: 2021003,
      ds_Ov: 2021458,
      dt_Created: "10/03/2021",
    },
    {
      user: "Juliana Costa",
      ds_Customer: "Pi Innovators",
      ds_Quotation: 2021004,
      ds_Ov: 2021459,
      dt_Created: "25/04/2021",
    },
    {
      user: "Daniel Souza",
      ds_Customer: "Sigma Ventures",
      ds_Quotation: 2021005,
      ds_Ov: 2021460,
      dt_Created: "06/05/2021",
    },
    {
      user: "Mariana Rocha",
      ds_Customer: "Theta Solutions",
      ds_Quotation: 2021006,
      ds_Ov: 2021461,
      dt_Created: "18/06/2021",
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
