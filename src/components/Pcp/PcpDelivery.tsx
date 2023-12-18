import { FlagOutlined } from "@ant-design/icons";
import { Divider, List } from "antd";
import { DataFetcher } from "components/DataFetcherJson";

export const PcpDelivery: React.FC = () => {
  return (
    <DataFetcher apiUrl="http://localhost:3000/api/getData" tipo="data-example">
      {(dataExample) => (
        <>
          <Divider orientation="left">Entregas</Divider>
          <div
            style={{
              height: "100%",
              borderTop: "none",
              maxHeight: 165,
              margin: "0 5px 0 5px",
              overflowY: "auto",
            }}
          >
            <List
              style={{ height: 235 }}
              dataSource={dataExample}
              renderItem={(item, index) => (
                <List.Item
                  style={{
                    background: index % 2 === 0 ? "white" : "#f0f0f0",
                    padding: 10,
                  }}
                >
                  <FlagOutlined style={{ marginRight: 10, color: "blue" }} />
                  {`${item.dia} ${item.quantidade}`}
                </List.Item>
              )}
            ></List>
          </div>
        </>
      )}
    </DataFetcher>
  );
};
