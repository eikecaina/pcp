import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  RadioChangeEvent,
  Row,
  Select,
  message,
} from "antd";
import { formStyle } from "./Style";
import { DeleteButton, RadioButtons, SaveButton } from "./ButtonsComponent";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Delete,
  GetAllCharact,
  GetAllCharactType,
  Save,
  Update,
} from "@/app/api/services/Characteristc/data";
import { UUID } from "crypto";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface Charact {
  id: UUID;
  charact: string;
  exib: string;
  desc: string;
  type: UUID;
  position: number;
}

interface CharactType {
  id: UUID;
  charactType: string;
}

const CharacteristicsSettings: React.FC = () => {
  const [value, setValue] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [characts, setCharact] = useState<Charact[]>([]);
  const [charactType, setCharactType] = useState<CharactType[]>([]);
  const [fetchData, setFetchData] = useState(true);

  const { Option } = Select;

  const clearInputs = () => {
    setFormData({
      id: undefined,
      charact: undefined,
      exib: undefined,
      desc: undefined,
      type: undefined,
      position: undefined,
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

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSelectChange = (selectedCharactId: any) => {
    const selectedCharact = characts.find(
      (charact) => charact.id === selectedCharactId
    );
    if (selectedCharact) {
      setFormData({
        ...formData,
        id: selectedCharact.id,
        charact: selectedCharact.charact,
        exib: selectedCharact.exib,
        desc: selectedCharact.desc,
        type: selectedCharact.type,
        position: selectedCharact.position,
      });
    }
  };

  const handleSelectTypeChange = (type: string) => {
    setFormData({ ...formData, type: type });
  };

  const handleSelectNumberChange = (value: number | null) => {
    setFormData({ ...formData, position: value });
  };

  const { t } = useTranslation("layout");

  const fetchCaract = async () => {
    try {
      const response = await GetAllCharact();
      const charactData = response.result.map((charact: { id: UUID; ds_Caract: string; ds_Exib: string; ds_Desc: string; cd_Caract_Type: UUID; vl_Position: number; }) => ({
        id: charact.id,
        charact: charact.ds_Caract,
        exib: charact.ds_Exib,
        desc: charact.ds_Desc,
        type: charact.cd_Caract_Type,
        position: charact.vl_Position,
      }));
      setCharact(charactData);
      console.log(charactData);
    } catch (error) {
      console.error("Erro ao buscar características:", error);
    }
  };
  
  const fetchCaractType = async () => {
    try {
      const response = await GetAllCharactType();
      const charactTypeData = response.result.map((charactType: { id: UUID; ds_Caract_Type: string; }) => ({
        id: charactType.id,
        charactType: charactType.ds_Caract_Type,
      }));
      setCharactType(charactTypeData);
    } catch (error) {
      console.error("Erro ao buscar tipos de características:", error);
    }
  };
  
  useEffect(() => {
    if (fetchData) {
      fetchCaract().then(() => setFetchData(false));
    }
  }, [fetchData]);
  
  useEffect(() => {
    fetchCaractType();
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <RadioButtons
          onChange={onChange}
          value={value}
          style={{ marginRight: 5 }}
        />
        <Form.Item
          style={{ width: "50%", marginLeft: 10 }}
          label={t("labels.charact")}
        >
          <Select
            onChange={handleSelectChange}
            style={formStyle("calc(25% - 8px)", "8px")}
            disabled={value === 1}
            value={value === 2 ? formData.charact : null}
          >
            {characts.map((charact) => (
              <Option key={charact.id} value={charact.id}>
                {charact.charact}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div style={{ marginLeft: 15 }}></div>
      </div>
      <Form layout="vertical">
        <div>
          <Row gutter={5}>
            <Col span={24}>
              <Card title={t("titles.definition")} bodyStyle={{ padding: 10 }}>
                <Form.Item
                  label={t("labels.name")}
                  style={formStyle("calc(28.33% - 8px)", "8px")}
                >
                  <Input
                    value={formData.charact}
                    onChange={(e) => {
                      handleInputChange("charact", e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.exhibition")}
                  style={formStyle("calc(28.33% - 8px)", "8px")}
                >
                  <Input
                    value={formData.exib}
                    onChange={(e) => {
                      handleInputChange("exib", e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={t("labels.position")}
                  style={formStyle("calc(15% - 8px)", "8px")}
                >
                  <InputNumber
                    value={formData.position}
                    min={1}
                    style={{ width: "100%" }}
                    onChange={handleSelectNumberChange}
                  />
                </Form.Item>
                <Form.Item label={t("labels.type")} style={formStyle("28.33%")}>
                  <Select
                    value={formData.type}
                    style={{ width: "100%" }}
                    onChange={handleSelectTypeChange}
                  >
                    {charactType.map((charactType) => (
                      <Option key={charactType.id} value={charactType.id}>
                        {charactType.charactType}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label={t("labels.description")}
                  style={formStyle("100%")}
                >
                  <TextArea
                    value={formData.desc}
                    style={{ height: 150, resize: "none" }}
                    onChange={(e) => handleInputChange("desc", e.target.value)}
                  />
                </Form.Item>
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

export default CharacteristicsSettings;
