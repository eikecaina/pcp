import { Card, Col, Divider, Form, Input, Row, Select } from "antd";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
} from "./ButtonsComponent";

const CharacteristicsSettings: React.FC = () => {
  return (
    <>
      <Form layout="vertical">
        <Card bodyStyle={{ padding: 0 }}>
          <Row gutter={5}>
            <Col span={24}>
              <Divider orientation="left">Definição</Divider>
              <div style={{ margin: 10 }}>
                <Form.Item
                  label="Grupo"
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Select />
                </Form.Item>
                <Form.Item
                  label="Nome"
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Exibição"
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Posição"
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <CustomInputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Descrição"
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tipo"
                  style={formStyle("calc(50% - 8px)", "8px")}
                >
                  <Select />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <div style={{ margin: 10, float: "right" }}>
            <NewButton />
            <EditButton />
            <DeleteButton />
            <SaveButton />
          </div>
        </Card>
      </Form>
    </>
  );
};

export default CharacteristicsSettings;
