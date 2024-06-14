import {
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tree,
  message,
} from "antd";
import React, { useState } from "react";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import {
  DeleteButton,
  EditButton,
  NewButton,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Delete, Save, Update } from "@/app/api/services/Resource/data";

const { TextArea } = Input;

const ResourceSettings: React.FC = () => {
  const [value, setValue] = useState(1);
  const [formData, setFormData] = useState<any>([]);
  const [fetchData, setFetchData] = useState(true);

  const clearInputs = () => {
    setFormData({});
  };

  const success = () => {
    message
      .open({
        type: "loading",
        content: "Salvando..",
        duration: 2.5,
      })
      .then(async () => {
        try {
          if (formData.id) {
            await Update(formData);
          } else {
            await Save(formData);
            clearInputs();
          }
          setFetchData(true);
          message.success("Salvo com sucesso!", 2.5);
        } catch (error) {
          message.error("Não foi possível salvar");
        }
      });
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: t("generalButtons.deleteButton"),
      icon: <ExclamationCircleOutlined />,
      content: "Deseja excluir o Valor?",
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
      async onOk() {
        try {
          await Delete(formData);
          clearInputs();
          setFetchData(true);
          message.success("Excluido com sucesso!");
        } catch (error) {
          message.error("Não foi possivel excluir!");
        }
      },
    });
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectValueChange = () => {
    console.log(formData);
  };

  const newFunction = () => {
    setValue(1);
    clearInputs();
  };

  const editFunction = () => {
    setValue(3);
  };

  const { t } = useTranslation("layout");
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: 15 }}></div>
        <SelectRadio
          style={formStyle("calc(25% - 8px)", "8px")}
          type={t("labels.list")}
          value={value}
        />
      </div>
      <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
        <Form layout="vertical">
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item style={formStyle("calc(25% - 5px)", "5px")} label="ID">
                <CustomInputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(25% - 5px)", "5px")}
                label={t("labels.name")}
              >
                <Input />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(25% - 5px)", "5px")}
                label={t("labels.dailyAvailability")}
              >
                <Select />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(25% - 5px)")}
                label={t("labels.calendar")}
              >
                <Select />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(100% - 5px)", "5px")}
                label={t("labels.description")}
              >
                <TextArea style={{ height: 100, resize: "none" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Card
                title="Famílias que o recurso está disponivel"
                bodyStyle={{ padding: 10 }}
              >
                <div
                  style={{
                    height: "220px",
                    overflowX: "auto",
                  }}
                >
                  <Tree
                    checkable
                    style={{
                      height: "100%",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    showLine={true}
                    defaultExpandedKeys={["0-0-0"]}
                  />
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                bodyStyle={{ padding: 10 }}
                title="Processos que consomem o recurso"
              >
                <div
                  style={{
                    height: "220px",
                    overflowX: "auto",
                  }}
                >
                  <Tree
                    checkable
                    style={{
                      height: "100%",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    showLine={true}
                    defaultExpandedKeys={["0-0-0"]}
                  />
                </div>
              </Card>
            </Col>
          </Row>
          <div style={{ margin: 10, float: "right" }}>
            <NewButton onClick={newFunction} />
            <EditButton onClick={editFunction} />
            <DeleteButton onClick={confirmDelete} />
            <SaveButton onClick={success} />
          </div>
        </Form>
      </Card>
    </>
  );
};

export default ResourceSettings;
