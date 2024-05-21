import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  TimePicker,
  message,
} from "antd";

import React, { useEffect, useRef, useState } from "react";
import { formStyle } from "./Style";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useTranslation } from "react-i18next";
import {
  Delete,
  GetAllGroup,
  Save,
  Update,
} from "@/app/api/services/Group/data";
import { UUID } from "crypto";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;

interface Group {
  id: UUID;
  group: string;
  desc: string;
  status: string;
  email: string;
}

const GroupSettings: React.FC = () => {
  const [value, setValue] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [groups, setGroups] = useState<Group[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [fetchData, setFetchData] = useState(true);

  const { t } = useTranslation("layout");
  const { Option } = Select;

  const clearInputs = () => {
    setFormData({
      id: undefined,
      group: undefined,
      desc: undefined,
      status: undefined,
      email: undefined,
    });
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
            Update(formData);
            setFetchData(true);
            clearInputs();
          } else {
            await Save(formData);
            setFetchData(true);
            clearInputs();
          }
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
      content: "Deseja excluir o Grupo?",
      okText: t("generalButtons.confirmButton"),
      cancelText: t("generalButtons.cancelButton"),
      async onOk() {
        try {
          await Delete(formData);
          setFetchData(true);
          clearInputs();
          message.success("Excluido com sucesso!");
        } catch (error) {
          message.error("Não foi possivel excluir!");
        }
      },
    });
  };

  const onChange = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;
    if (selectedValue === 1) {
      setFormData({});
    }
    setValue(selectedValue);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      if (fetchData) {
        try {
          const response = await GetAllGroup();
          const groupData = response.result.map((group: { id: any; ds_Group: string; ds_Desc: string; ds_Email: string; ds_Blocked: string; }) => ({
            id: group.id,
            group: group.ds_Group,
            desc: group.ds_Desc,
            email: group.ds_Email,
            status: group.ds_Blocked,
          }));
          setGroups(groupData);
        } catch (error) {
          console.error("Erro ao buscar grupos:", error);
        } finally {
          setFetchData(false);
        }
      }
    };
  
    fetchGroups();
  }, [fetchData]);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectGroupChange = (selectedGroupId: any) => {
    const selectedGroup = groups.find((group) => group.id === selectedGroupId);
    if (selectedGroup) {
      setFormData({
        ...formData,
        id: selectedGroup.id,
        group: selectedGroup.group,
        desc: selectedGroup.desc,
        email: selectedGroup.email,
        status: selectedGroup.status,
      });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, status: value });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15 }}></div>
        <Form.Item style={{ width: "50%" }} label={t("labels.group")}>
          <Select
            style={formStyle("calc(25% - 8px)", "8px")}
            disabled={value === 1}
            onChange={handleSelectGroupChange}
            value={value === 2 ? formData.group : null}
          >
            {groups.map((group) => (
              <Option key={group.id} value={group.id}>
                {group.group}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form layout="vertical">
        <div>
          <Input className="id-verification" hidden value={formData.id}></Input>
          <Row gutter={10}>
            <Col span={24}>
              <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
                <Form.Item
                  label={t("labels.name")}
                  style={formStyle("calc(33.33% - 8px)", "8px")}
                >
                  <Input
                    value={formData.group}
                    onChange={(e) => handleInputChange("group", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.state")}
                  style={formStyle("calc(33.33% - 8px)", "8px")}
                >
                  <Select
                    value={formData.status}
                    options={[{ value: "Ativo" }, { value: "Bloqueado" }]}
                    onChange={handleSelectChange}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.email")}
                  style={formStyle("calc(33.33%)")}
                >
                  <Input
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.description")}
                  style={{ marginBottom: 20 }}
                >
                  <TextArea
                    value={formData.desc}
                    style={{ resize: "none", height: "80px" }}
                    onChange={(e) => handleInputChange("desc", e.target.value)}
                  />
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </div>
      </Form>
      <div style={{ margin: 10, float: "right" }}>
        {contextHolder}
        <DeleteButton onClick={confirmDelete} />
        <SaveButton onClick={success} />
      </div>
    </>
  );
};

export default GroupSettings;
