import { Button, Divider, Tree } from "antd";
import { DataFetcher } from "components/DataFetcherJson";

export const PcpProcess: React.FC = () => {
  return (
    <DataFetcher apiUrl="http://localhost:3000/api/getData" tipo="processos">
      {(treeData) => (
        <>
          <Divider orientation="left">Processos</Divider>
          <Tree
            style={{
              overflowY: "auto",
              height: '100%',
              maxHeight: 607,
              minHeight: 607,
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
            showLine={true}
            defaultExpandedKeys={["0-0-0"]}
            treeData={treeData}
          />
          <div style={{ padding: 10 }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignContent: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                type="primary"
                style={{ width: "calc(30% - 8px)", backgroundColor: "#95de64" }}
              >
                Confirmar
              </Button>
              <Button
                type="primary"
                style={{ width: "calc(30% - 8px)", backgroundColor: "#f5222d" }}
              >
                Excluir
              </Button>
            </div>
          </div>
        </>
      )}
    </DataFetcher>
  );
};
