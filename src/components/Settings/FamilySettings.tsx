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
import { Delete, Save, GetAllFamilly } from "@/app/api/services/Familly/data";
import { GetAllGroup } from "@/app/api/services/Group/data";

const { Option } = Select;

interface Group {
  id: UUID;
  group: string;
}

interface Familly {
  id: UUID;
  familly: string;
}

const FamilySttings: React.FC = () => {
  const [value, setValue] = useState(1);

  const [formData, setFormData] = useState<any>({});
  const [groups, setGroups] = useState<Group[]>([]);
  const [famillys, setFamillys] = useState<Familly[]>([]);

  const handleSelectFamillyChange = (id: Familly) => {
    setFormData({ ...formData, id: id });
  };

  const handleSelectGroupChange = (idGroup: Group) => {
    setFormData({ ...formData, idGroup: idGroup });
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const saveFamilly = async () => {
    try {
      await Save(formData);
    } catch (error) {
      console.log("Não foi possivel salvar");
    }
  };

  const deleteFamilly = async () => {
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
    async function fetchFamillys() {
      try {
        const response = await GetAllFamilly();
        const famillyData = response.result.map(
          (familly: { id: UUID; ds_Familly: string }) => ({
            id: familly.id,
            familly: familly.ds_Familly,
          })
        );
        setFamillys(famillyData);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    }

    fetchFamillys();
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
        <Form.Item style={{ width: "50%" }} label={t("labels.familly")}>
          <Select
            style={formStyle("calc(25% - 8px)", "8px")}
            disabled={value === 1}
            onChange={handleSelectFamillyChange}
          >
            {famillys.map((familly) => (
              <Option key={familly.id} value={familly.id}>
                {familly.familly}
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
                    onChange={(e) =>
                      handleInputChange("familly", e.target.value)
                    }
                  />
                </Form.Item>
                <Form.Item
                  style={formStyle("calc(33% - 8px", "8px")}
                  label={t("labels.planner")}
                >
                  <Input
                    onChange={(e) => handleInputChange("plan", e.target.value)}
                  />
                </Form.Item>
                <Form.Item style={formStyle("33%")} label={t("labels.group")}>
                  <Select onChange={handleSelectGroupChange}>
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
          <DeleteButton onClick={deleteFamilly} />
          <SaveButton onClick={saveFamilly} />
        </div>
      </Form>
    </>
  );
};

export default FamilySttings;
