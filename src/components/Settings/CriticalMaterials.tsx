import {
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Tabs,
  TabsProps,
  Tree,
} from "antd";
import React, { useState } from "react";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { formStyle } from "./Style";
import { DataFetcher } from "components/DataFetcherJson";
import { searchOptions } from "./SearchFilter";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

export const CriticalMaterials: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Material",
      children: <Material />,
    },
    {
      key: "2",
      label: "Impacto",
      children: <Impact />,
    },
  ];
  return (
    <>
      <Tabs type="line" defaultActiveKey="1" items={items} />
    </>
  );
};

export const Material: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  const [valueMaterial, setValueMaterial] = useState(1);

  const onChangeMaterial = (e: RadioChangeEvent) => {
    setValueMaterial(e.target.value);
  };

  return (
    <>
      <Form style={{ marginTop: 10 }} layout="vertical">
        <Row gutter={10}>
          <Col span={12}>
            <Card bodyStyle={{ padding: 10 }} title="Características">
              <div style={{ marginTop: 5, width: "100%" }}>
                <RadioButtons value={value} onChange={onChange} />
              </div>
              <div
                style={{
                  margin: "5px 0px 10px 0px",
                  height: 250,
                  overflowY: "auto",
                }}
              >
                <DataFetcher
                  apiUrl="http://localhost:3000/api/getData"
                  tipo="processos"
                >
                  {(treeData) => (
                    <>
                      <Tree
                        checkable
                        style={{
                          height: "100%",
                          maxHeight: 207,
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        showLine={true}
                        defaultExpandedKeys={["0-0-0"]}
                        treeData={treeData}
                      />
                    </>
                  )}
                </DataFetcher>
              </div>
              <SelectRadio
                style={formStyle("97%")}
                type="Nome"
                value={value}
                onChange={onChange}
              />
              <div style={{ margin: 10, float: "right" }}>
                <DeleteButton />
                <SaveButton />
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              style={{ height: 527 }}
              title="Material Crítico"
              bodyStyle={{ padding: 10 }}
            >
              <div style={{ marginTop: 5, width: "100%" }}>
                <RadioButtons
                  value={valueMaterial}
                  onChange={onChangeMaterial}
                />
              </div>
              <SelectRadio
                style={formStyle("calc(50% - 5px)", "5px")}
                type="Material Crítico"
                value={valueMaterial}
                onChange={onChangeMaterial}
              />
              <Form.Item label="Nome" style={formStyle("50%")}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Prazo (dias)"
                style={{
                  width: "calc(30% - 5px)",
                  marginRight: 5,
                  display: "inline-block",
                  marginBottom: 0,
                }}
              >
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
              <Form.Item
                label="Classe"
                style={{
                  width: "70%",
                  display: "inline-block",
                  marginBottom: 0,
                }}
              >
                <Input />
              </Form.Item>
              <Checkbox style={{ marginTop: 5, width: "100%" }}>
                Prazo sob consulta
              </Checkbox>
              <div
                style={{
                  margin: 10,
                  bottom: 8,
                  position: "absolute",
                  right: 6,
                }}
              >
                <DeleteButton />
                <SaveButton />
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export const Impact: React.FC = () => {
  const options = [];
  for (let i = 0; i < 7; i++) {
    options.push({ value: i, label: "Família " + i });
  }

  const [value, setValue] = useState(1);

  const handleChange = () => {
    setValue(value === 1 ? 2 : 1);
  };

  return (
    <Form layout="vertical" style={{ marginTop: 10 }}>
      <Card title="Definição" bodyStyle={{ padding: 10 }}>
        <div>
          <Button
            onClick={handleChange}
            type="primary"
            style={{ margin: "5px 0px 10px 0px" }}
            icon={<EditOutlined />}
          >
            Editar
          </Button>
        </div>
        <Form.Item style={formStyle("calc(50% - 5px)", "5px")} label="Material">
          <Select disabled={value === 2} />
        </Form.Item>
        <Form.Item label="Familia" style={formStyle("calc(50% - 5px)", "5px")}>
          <Cascader
            disabled={value === 1}
            showSearch={{ filter: searchOptions }}
            style={{ width: "100%" }}
            options={options}
            multiple
            maxTagCount="responsive"
          />
        </Form.Item>
        <Form.Item
          label="Família Selecionada"
          style={formStyle("calc(33.33% - 5px)", "5px")}
        >
          <Select />
        </Form.Item>
        <Form.Item
          label="Processo de liberação"
          style={formStyle("calc(33.33% - 5px)", "5px")}
        >
          <Select />
        </Form.Item>
        <Form.Item label="Processo impactado" style={formStyle("33.33%")}>
          <Select />
        </Form.Item>
      </Card>
      <div style={{ float: "right", marginTop: 10 }}>
        <Button type="primary" icon={<SaveOutlined />}>
          Salvar
        </Button>
      </div>
    </Form>
  );
};