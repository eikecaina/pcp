import { Card, Col, Form, Input, Row, Select } from "antd";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import ButtonsComponent from "./ButtonsComponent";

const CharacteristicsSettings: React.FC = () => {
  return (
    <>
      <Form layout="vertical">
        <Card bodyStyle={{ padding: 10 }}>
          <ButtonsComponent />
          <Row gutter={5}>
            <Col span={24}>
              <div>
                <Form.Item
                  label="Grupo"
                  style={formStyle("calc(33.33% - 8px)", "8px")}
                >
                  <Select />
                </Form.Item>
                <Form.Item
                  label="Nome"
                  style={formStyle("calc(33.33% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Exibição"
                  style={formStyle("calc(33.33% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Posição"
                  style={formStyle("calc(33.33% - 8px)", "8px")}
                >
                  <CustomInputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Descrição"
                  style={formStyle("calc(33.33% - 8px)", "8px")}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tipo"
                  style={formStyle("calc(33.33% - 8px)", "8px")}
                >
                  <Select />
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
};

export default CharacteristicsSettings;
