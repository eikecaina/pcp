import {
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

export const CriticalMaterials: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  return (
    <>
      <Radio.Group value={value} optionType="button" buttonStyle="solid">
        <Radio value={1} onChange={onChange}>
          Material
        </Radio>
        <Radio value={2} onChange={onChange}>
          Impacto
        </Radio>
      </Radio.Group>

      {value === 1 ? <Material /> : null}
      {value === 2 ? <Impact /> : null}
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
                style={formStyle("100%")}
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
                label="Prazo"
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

  return (
    <Form layout="vertical" style={{ marginTop: 10 }}>
      <Card title="Definição" bodyStyle={{ padding: 10 }}>
        <Form.Item style={formStyle("calc(20% - 5px)", "5px")} label="Material">
          <Select />
        </Form.Item>
        <Form.Item label="Familia" style={formStyle("calc(20% - 5px)", "5px")}>
          <Cascader
            showSearch={{ filter: searchOptions }}
            style={{ width: "100%" }}
            options={options}
            multiple
            maxTagCount="responsive"
          />
        </Form.Item>
        <Form.Item
          label="Família Selecionada"
          style={formStyle("calc(20% - 5px)", "5px")}
        >
          <Select />
        </Form.Item>
        <Form.Item
          label="Processo de liberação"
          style={formStyle("calc(20% - 5px)", "5px")}
        >
          <Select />
        </Form.Item>
        <Form.Item
          label="Processo impactado"
          style={formStyle("20%")}
        >
          <Select />
        </Form.Item>
      </Card>
    </Form>
  );
};
