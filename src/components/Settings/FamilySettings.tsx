import {
  Card,
  Col,
  Form,
  Input,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
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
} from "@/app/api/services/Family/data";
import { GetAllGroup } from "@/app/api/services/Group/data";

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

  const handleSelectFamilyChange = (selectedFamilyId: any) => {
    const selectedFamily = familys.find(
      (family) => family.id === selectedFamilyId
    );
    if (selectedFamily) {
      setFormData({
        ...formData,
        id: selectedFamily.id,
        group: selectedFamily.group,
        plan: selectedFamily.plan,
        family: selectedFamily.family,
      });
    }
    console.log(formData);
  };

  const handleSelectGroupChange = (selectedGroupId: UUID | string) => {
    const selectedGroup = groups.find((group) => group.id === selectedGroupId);
    if (selectedGroup) {
      setFormData({
        ...formData,
        idGroup: selectedGroupId,
        group: selectedGroup.group,
      });
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const saveFamily = async () => {
    try {
      if (formData.id) {
        Update(formData);
      } else {
        await Save(formData);
      }
    } catch (error) {
      console.log("Não foi possivel salvar");
    }
  };

  const deleteFamily = async () => {
    try {
      await Delete(formData);
    } catch (error) {
      console.log("Não foi possivel deletar");
    }
  };

  useEffect(() => {
    async function fetchGroups() {
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
    }

    fetchGroups();
  }, []);

  useEffect(() => {
    async function fetchFamilys() {
      try {
        const response = await GetAllFamily();
        const familyData = response.result.map(
          (family: {
            id: UUID;
            ds_Family: string;
            ds_Family_Planej: string;
            id_Group: Group;
          }) => ({
            id: family.id,
            family: family.ds_Family,
            group: family.id_Group,
            plan: family.ds_Family_Planej,
          })
        );
        setFamilys(familyData);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    }

    fetchFamilys();
  }, []);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
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
                          maxHeight: 607,

                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        showLine={true}
                        defaultExpandedKeys={["0-0-0"]}
                        treeData={treeData}
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
                    </>
                  )}
                </DataFetcher>
              </Card>
            </Col>
          </Row>
        </div>
        <div style={{ margin: 10, float: "right" }}>
          <DeleteButton onClick={deleteFamily} />
          <SaveButton onClick={saveFamily} />
        </div>
      </Form>
    </>
  );
};

export default FamilySttings;
