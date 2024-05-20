import {
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  RadioChangeEvent,
  Row,
  Select,
  Tree,
  message,
} from "antd";
import { DataFetcher } from "components/DataFetcherJson";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import { DeleteButton, RadioButtons, SaveButton } from "./ButtonsComponent";
import { useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import {
  Delete,
  GetAllValue,
  Save,
  Update,
} from "@/app/api/services/Value/data";
import { UUID } from "crypto";
import { GetAllCharact } from "@/app/api/services/Characteristc/data";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

interface Value {
  id: UUID;
  value: string;
  charact: UUID;
  position: number;
  newApproved: boolean;
  repeatApproved: boolean;
  newCertificate: boolean;
  repeatCertificate: boolean;
}

interface Charact {
  id: UUID;
  charact: string;
}

const ValueSettings: React.FC = () => {
  const { t } = useTranslation("layout");

  const [value, setValue] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [values, setValues] = useState<Value[]>([]);
  const [characts, setCharacts] = useState<Charact[]>([]);
  const [fetchData, setFetchData] = useState(true);

  const clearInputs = () => {
    setFormData({
      id: undefined,
      value: undefined,
      charact: undefined,
      position: undefined,
      newApproved: undefined,
      repeatApproved: undefined,
      newCertificate: undefined,
      repeatCertificate: undefined,
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
            clearInputs();
            setFetchData(true);
          } else {
            await Save(formData);
            clearInputs();
            setFetchData(true);
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
      content: "Deseja excluir a Família??",
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

  const onChange = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;
    if (selectedValue === 1) {
      setFormData({});
    }
    setValue(selectedValue);
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectValueChange = (selectedValueId: any) => {
    const selectedValue = values.find((value) => value.id === selectedValueId);
    if (selectedValue) {
      setFormData({
        ...formData,
        id: selectedValue.id,
        value: selectedValue.value,
        charact: selectedValue.charact,
        position: selectedValue.position,
        newApproved: selectedValue.newApproved,
        repeatApproved: selectedValue.repeatApproved,
        newCertificate: selectedValue.newCertificate,
        repeatCertificate: selectedValue.repeatCertificate,
      });
      console.log(formData);
    }
  };

  const handleSelectCaractChange = (selectedCharactId: UUID | string) => {
    const selectedCaract = characts.find(
      (charact) => charact.id === selectedCharactId
    );
    if (selectedCaract) {
      setFormData({
        ...formData,
        idCaract: selectedCharactId,
        charact: selectedCaract.charact,
      });
    }
  };

  useEffect(() => {
    if (fetchData) {
      async function fetchValues() {
        try {
          const response = await GetAllValue();
          const valueData = response.result.map(
            (value: {
              id: any;
              ds_Value: string;
              cd_Caract: any;
              vl_Position: number;
              id_Allow_New_Approved: boolean;
              id_Allow_Repeat_Approved: boolean;
              id_Allow_New_Certificate: boolean;
              id_Allow_Repeat_Certificate: boolean;
            }) => ({
              id: value.id,
              value: value.ds_Value,
              charact: value.cd_Caract,
              position: value.vl_Position,
              newApproved: value.id_Allow_New_Approved,
              repeatApproved: value.id_Allow_Repeat_Approved,
              newCertificate: value.id_Allow_New_Certificate,
              repeatCertificate: value.id_Allow_Repeat_Certificate,
            })
          );
          setValues(valueData);
          console.log(valueData);
        } catch (error) {
          console.error("Erro ao buscar grupos:", error);
        }
      }
      fetchValues();
      setFetchData(false);
    }
  }, [fetchData]);

  useEffect(() => {
    async function fetchCharacts() {
      try {
        const response = await GetAllCharact();
        const charactData = response.result.map(
          (charact: { id: UUID; ds_Caract: string }) => ({
            id: charact.id,
            charact: charact.ds_Caract,
          })
        );
        setCharacts(charactData);
      } catch (error) {
        console.error("Erro ao buscar grupos:", error);
      }
    }

    fetchCharacts();
  }, [handleSelectCaractChange]);

  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons onChange={onChange} value={value} />
        <div style={{ marginLeft: 15 }}></div>
        <Form.Item style={{ width: "50%" }} label={t("labels.values")}>
          <Select
            onChange={handleSelectValueChange}
            style={formStyle("calc(25% - 8px)", "8px")}
            disabled={value === 1}
            value={value === 2 ? formData.value : null}
          >
            {values.map((value) => (
              <Option key={value.id} value={value.id}>
                {value.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <Row gutter={10}>
        <Col span={12}>
          <Card
            title={t("titles.definitionFamily")}
            style={{ height: "450px", overflowX: "auto" }}
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
          </Card>
        </Col>
        <Col span={12}>
          <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
            <Form layout="vertical">
              <Form.Item style={formStyle("100%")} label={t("labels.name")}>
                <Input
                  value={formData.value}
                  onChange={(e) => handleInputChange("value", e.target.value)}
                />
              </Form.Item>
              <Form.Item
                style={formStyle("calc(50% - 8px)", "8px")}
                label={t("labels.charact")}
              >
                <Select
                  onChange={handleSelectCaractChange}
                  value={formData.charact}
                >
                  {characts.map((charact) => (
                    <Option key={charact.id} value={charact.id}>
                      {charact.charact}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item style={formStyle("50%")} label={t("labels.position")}>
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  value={formData.position}
                  onChange={(value) => handleInputChange("position", value)}
                />
              </Form.Item>
              <Divider orientation="left">{t("titles.condition")}</Divider>
              <div style={{ display: "grid" }}>
                <Checkbox
                  checked={formData.newApproved}
                  style={{ margin: "7px" }}
                  onChange={(e) =>
                    handleInputChange("newApproved", e.target.checked)
                  }
                >
                  {t("labels.newAprovattion")}
                </Checkbox>
                <Checkbox
                  checked={formData.repeatApproved}
                  style={{ margin: "7px" }}
                  onChange={(e) =>
                    handleInputChange("repeatApproved", e.target.checked)
                  }
                >
                  {t("labels.repetitionAprovattion")}
                </Checkbox>
                <Checkbox
                  checked={formData.newCertificate}
                  style={{ margin: "7px" }}
                  onChange={(e) =>
                    handleInputChange("newCertificate", e.target.checked)
                  }
                >
                  {t("labels.newCertificate")}
                </Checkbox>
                <Checkbox
                  checked={formData.repeatCertificate}
                  style={{ margin: "7px" }}
                  onChange={(e) =>
                    handleInputChange("repeatCertificate", e.target.checked)
                  }
                >
                  {t("labels.repetitionCertificate")}
                </Checkbox>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
      <div style={{ margin: 10, float: "right" }}>
        <DeleteButton onClick={confirmDelete} />
        <SaveButton onClick={success} />
      </div>
    </>
  );
};

export default ValueSettings;
