import { Checkbox, ColorPicker, DatePicker, Form, Table, theme } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import type { ColorPickerProps } from "antd";
import { generate, green, presetPalettes, red } from "@ant-design/colors";

type Presets = Required<ColorPickerProps>["presets"][number];

const { RangePicker } = DatePicker;

interface DataType {
  key: React.Key;
  name: string;
  exibir: React.ReactNode;
  tempo: React.ReactNode;
  abrev: string;
  quebra: React.ReactNode;
  cor: React.ReactNode;
}

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
  }));

const PlanningMap: React.FC = () => {
  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
  });

  const columns: TableColumnsType<DataType> = [
    {
      width: 30,
      title: "Exibir",
      dataIndex: "exibir",
      key: "exibir",
    },
    {
      width: 30,
      title: "Tempo",
      dataIndex: "tempo",
      key: "tempo",
    },
    {
      width: 250,
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      width: 30,
      title: "Abrev",
      dataIndex: "abrev",
      key: "abrev",
    },
    {
      width: 30,
      title: "Quebra",
      dataIndex: "quebra",
      key: "quebra",
    },
    {
      width: 30,
      title: "Cor",
      dataIndex: "cor",
      key: "cor",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      exibir: <Checkbox />,
      tempo: <Checkbox />,
      name: "DT - PROD Bobinagem AT",
      abrev: "AT",
      quebra: <Checkbox />,
      cor: (
        <ColorPicker
          presets={presets}
          size="small"
          showText={(color) => <span>{color.toHexString()}</span>}
        />
      ),
    },
    {
      key: "2",
      exibir: <Checkbox />,
      tempo: <Checkbox />,
      name: "DT - PROD Fechamento",
      abrev: "FECH",
      quebra: <Checkbox />,
      cor: (
        <ColorPicker
          presets={presets}
          size="small"
          showText={(color) => <span>{color.toHexString()}</span>}
        />
      ),
    },
    {
      key: "3",
      exibir: <Checkbox />,
      tempo: <Checkbox />,
      name: "DT - PROD Bobinagem BT CHAPA",
      abrev: "BT",
      quebra: <Checkbox />,
      cor: (
        <ColorPicker
          presets={presets}
          size="small"
          showText={(color) => <span>{color.toHexString()}</span>}
        />
      ),
    },
  ];

  return (
    <>
      <Form.Item label="Data">
        <RangePicker />
      </Form.Item>
      <Table
        style={{ maxHeight: 500, overflowX: "auto" }}
        pagination={false}
        dataSource={data}
        columns={columns}
      />
    </>
  );
};

export default PlanningMap;
