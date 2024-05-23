import {
  Card,
  Col,
  Form,
  Input,
  Modal,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
  message,
} from "antd";

import { formStyle } from "./Style";
import { DataFetcher } from "components/DataFetcherJson";
import {
  DeleteButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UUID } from "crypto";
import {
  Delete,
  Save,
  GetAllFamily,
  Update,
  GetDataFromId,
} from "@/app/api/services/Family/data";
import { GetAllGroup } from "@/app/api/services/Group/data";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Group {
  id: UUID;
  group: string;
}

interface Family {
  id: UUID;
  family: string;
  plan: string;
  group: UUID;
}

const FamilySttings: React.FC = () => {
  const [value, setValue] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [groups, setGroups] = useState<Group[]>([]);
  const [familys, setFamilys] = useState<Family[]>([]);
  const [fetchData, setFetchData] = useState(true);

  const clearInputs = () => {
    setFormData({
      family: "",
      plan: "",
      group: "",
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
      content: "Deseja excluir a Família?",
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

  const handleSelectFamilyChange = async (selectedFamilyId: UUID) => {
    try {
      const selectedFamily = await GetDataFromId(selectedFamilyId);
      if (selectedFamily) {
        setFormData({
          ...formData,
          id: selectedFamily.id,
          group: selectedFamily.id_Group,
          plan: selectedFamily.ds_Family_Planej,
          family: selectedFamily.ds_Family,
        });
      }
      console.log(formData);
    } catch (error) {
      console.error("Erro ao buscar dados da família:", error);
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectGroupChange = (selectedGroupId: UUID) => {
    const selectedGroup = groups.find((group) => group.id === selectedGroupId);
    console.log(selectedGroup);

    if (selectedGroup) {
      setFormData({
        ...formData,
        idGroup: selectedGroupId,
        group: selectedGroup.group,
      });
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await GetAllGroup();
      const groupData = response.result.map(
        (group: { id: UUID; ds_Group: string }) => ({
          id: group.id,
          group: group.ds_Group,
        })
      );
      setGroups(groupData);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
    }
  };

  const fetchFamilys = async () => {
    try {
      const response = await GetAllFamily();
      const familyData = response.result.map(
        (family: {
          id: UUID;
          ds_Family: string;
          id_Group: UUID;
          ds_Family_Planej: string;
        }) => ({
          id: family.id,
          family: family.ds_Family,
          group: family.id_Group,
          plan: family.ds_Family_Planej,
        })
      );
      setFamilys(familyData);
    } catch (error) {
      console.error("Erro ao buscar famílias:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (fetchData) {
      fetchFamilys().then(() => setFetchData(false));
    }
  }, [fetchData]);

  const onChange = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;
    if (selectedValue === 1) {
      setFormData({});
    }
    setValue(selectedValue);
  };

  const { t } = useTranslation("layout");
  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15 }}></div>
        <Form.Item style={{ width: "50%" }} label={t("labels.family")}>
          <Select
            style={formStyle("calc(25% - 8px)", "8px")}
            disabled={value === 1}
            value={value === 2 ? formData.family : null}
            onChange={handleSelectFamilyChange}
          >
            {familys.map((family) => (
              <Option key={family.id} value={family.id}>
                {family.family}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form layout="vertical">
        <div>
          <Row gutter={10}>
            <Col span={24}>
              <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
                <Form.Item
                  style={formStyle("calc(33% - 8px", "8px")}
                  label={t("labels.name")}
                >
                  <Input
                    value={formData.family}
                    onChange={(e) =>
                      handleInputChange("family", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(33% - 8px", "8px")}
                  label={t("labels.planner")}
                >
                  <Input
                    value={formData.plan}
                    onChange={(e) => handleInputChange("plan", e.target.value)}
                  />
                </Form.Item>
                <Form.Item style={formStyle("33%")} label={t("labels.group")}>
                  <Select
                    onChange={handleSelectGroupChange}
                    value={formData.group}
                  >
                    {groups.map((group) => (
                      <Option key={group.id} value={group.id}>
                        {group.group}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                style={{ marginTop: 10 }}
                title={t("titles.valuesFamily")}
                bodyStyle={{ height: "300px", overflowX: "auto", padding: 5 }}
              >
                <Tree
                  checkable
                  style={{
                    height: "100%",
                    maxHeight: 607,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  showLine={true}
                  defaultExpandedKeys={["0-0-0"]}
                />
                <div style={{ padding: 10 }}>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "space-evenly",
                    }}
                  ></div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ margin: 10, float: "right" }}>
          <DeleteButton onClick={confirmDelete} />
          <SaveButton onClick={success} />
        </div>
      </Form>
    </>
  );
};

export default FamilySttings;
