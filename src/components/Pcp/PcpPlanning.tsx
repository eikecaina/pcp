import CustomInputNumber from "components/CustomInputNumber";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

import dayjs from "dayjs";
import { DatePicker, Divider, Form, Input, Radio, Select, Space } from "antd";

export const PcpPlanning: React.FC = () => {
  return (
    <>
      <Divider orientation="left">Planejamento</Divider>
      <Form style={{ margin: 15 }}>
        <Radio.Group defaultValue={1}>
          <Space direction="vertical" style={{ marginBottom: 15 }}>
            <Radio value={1} disabled>
              Automático
            </Radio>
            <Radio value={2} disabled>
              Manual
            </Radio>
          </Space>
        </Radio.Group>

        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            style={{ display: "inline-block", width: "calc(50% - 8px)" }}
            label="Inicio"
            rules={[{ required: true }]}
          >
            <DatePicker
              defaultValue={dayjs("00/00/0000", dateFormatList[0])}
              format={dateFormatList[0]}
              disabled
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
            rules={[{ required: true }]}
          >
            <DatePicker
              defaultValue={dayjs("00/00/0000", dateFormatList[0])}
              format={dateFormatList[0]}
              disabled
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          label="Duração"
          style={{ display: "inline-block", width: "calc(60% - 8px)" }}
        >
          <CustomInputNumber value={1102} disabled style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(40% - 8px)",
            margin: "0 8px",
          }}
        >
          <Select value={"Minutos"} disabled />
        </Form.Item>
        <Form.Item
          label="Recurso"
          style={{ display: "inline-block", width: "99%" }}
        >
          <Input
            value={"TS - Elétrico - Rodrigo (lauffer)"}
            disabled
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </>
  );
};
