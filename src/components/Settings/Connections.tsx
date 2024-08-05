import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  DeleteButton,
  EditButton,
  NewButton,
  RadioButtons,
  SaveButton,
  SelectRadio,
} from "./ButtonsComponent";
import { formStyle } from "./Style";
import CustomInputNumber from "components/CustomInputNumber";
import { useTranslation } from "react-i18next";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import {
  Delete,
  GetAllConnection,
  GetAllConnectionType,
  Save,
  Update,
} from "@/app/api/services/Connection/data";
import { UUID } from "crypto";
import { GetAllProcess } from "@/app/api/services/Process/data";
import { GetAllPeriod } from "@/app/api/services/Period/data";

const { Option } = Select;

interface Connection {
  id: UUID;
  cdInputProcess: UUID;
  cdOutputProcess: UUID;
  vlTime: number;
  cdPeriod: UUID;
  cdProcessConnectionType: UUID;
  idElapsedDay: boolean;
}

interface Process {
  id: UUID;
  dsProcess: string;
}

interface ConnectionType {
  id: UUID;
  dsProcessConnectionType: string;
}

interface Period {
  id: UUID;
  period: string;
}

export const Connections: React.FC = () => {
  const [value, setValue] = useState(2);
  const [valueEntry, setValueEntry] = useState(2);
  const [valueOutput, setValueOutput] = useState(2);
  const [formData, setFormData] = useState<any>({});
  const [fetchData, setFetchData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);
  const [connections, setConnection] = useState<Connection[]>([]);
  const [process, setProcess] = useState<Process[]>([]);
  const [processConnType, setProcessConType] = useState<ConnectionType[]>([]);
  const [period, setPeriod] = useState<Period[]>([]);

  const clearInputs = () => {
    setFormData({});
  };

  const success = async () => {
    try {
      if (formData.id) {
        await Update(formData);
      } else {
        await Save(formData);
      }
      clearInputs();
      setFetchData(true);
      message.success("Salvo com sucesso!");
    } catch (error) {
      message.error("Não foi possível salvar");
    }
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelectConnectionChange = (selectedConnectionId: UUID) => {
    const selectedConnection = connections.find(
      (connection) => connection.id === selectedConnectionId
    );
    if (selectedConnection) {
      setFormData({
        ...formData,
        id: selectedConnection.id,
        cdInputProcess: selectedConnection.cdInputProcess,
        cdOutputProcess: selectedConnection.cdOutputProcess,
        vlTime: selectedConnection.vlTime,
        cdPeriod: selectedConnection.cdPeriod,
        cdProcessConnectionType: selectedConnection.cdProcessConnectionType,
        idElapsedDay: selectedConnection.idElapsedDay,
      });
    }
    console.log(formData);
  };

  const handleSelect = (fieldName: string, value: UUID) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleInputNumberChange = (fieldName: string, value: number) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const showModalExit = () => {
    setIsModalExitOpen(true);
  };

  const handleOkExit = () => {
    setIsModalExitOpen(false);
  };

  const handleCancelExit = () => {
    setIsModalExitOpen(false);
  };

  const newFunctionEntry = () => {
    setValueEntry(1);
    clearInputs();
  };

  const editFunctionEntry = () => {
    setValueEntry(3);
  };

  const newFunctionOutput = () => {
    setValueOutput(1);
    clearInputs();
  };

  const editFunctionOutput = () => {
    setValueOutput(3);
  };

  const fetchConnection = async () => {
    try {
      const response = await GetAllConnection();
      const connectionData = response.map(
        (connection: {
          id: UUID;
          cd_Input_Process: UUID;
          cd_Output_Process: UUID;
          vl_Time: number;
          cd_Period: UUID;
          cd_Process_Connection_Type: UUID;
          id_Elapsed_Day: boolean;
        }) => ({
          id: connection.id,
          cdInputProcess: connection.cd_Input_Process,
          cdOutputProcess: connection.cd_Output_Process,
          vlTime: connection.vl_Time,
          cdPeriod: connection.cd_Period,
          cdProcessConnectionType: connection.cd_Process_Connection_Type,
          idElapsedDay: connection.id_Elapsed_Day,
        })
      );
      setConnection(connectionData);
    } catch (error) {
      console.error("Erro ao buscar conexões");
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchConnection();
    }
  }, [fetchData]);

  const fetchProcess = async () => {
    try {
      const response = await GetAllProcess();
      const processData = response.map(
        (process: { id: UUID; ds_Process: string }) => ({
          id: process.id,
          dsProcess: process.ds_Process,
        })
      );
      setProcess(processData);
    } catch (error) {}
  };

  useEffect(() => {
    if (fetchData) {
      fetchProcess();
    }
  }, [fetchData]);

  const fetchPeriod = async () => {
    try {
      const response = await GetAllPeriod();
      const periodData = response.map(
        (period: { id: UUID; ds_Period: string }) => ({
          id: period.id,
          period: period.ds_Period,
        })
      );
      setPeriod(periodData);
    } catch (error) {
      console.error("Erro ao buscar periodos", error);
    }
  };

  useEffect(() => {
    fetchPeriod();
  }, []);

  const fetchProcessConnType = async () => {
    try {
      const response = await GetAllConnectionType();
      const typeData = response.map(
        (type: { id: UUID; ds_Process_Connection_Type: string }) => ({
          id: type.id,
          dsProcessConnectionType: type.ds_Process_Connection_Type,
        })
      );
      setProcessConType(typeData);
    } catch (error) {}
  };
  useEffect(() => {
    if (fetchData) {
      fetchProcessConnType();
    }
  }, [fetchData]);

  const { t } = useTranslation("layout");
  return (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <Form.Item style={{ width: "50%" }} label="Processos Entrada">
          <Select
            style={formStyle("calc(100% - 8px)", "8px")}
            onChange={handleSelectConnectionChange}
            value={value === 1 ? null : formData.dsProcess}
            disabled={value === 1}
          >
            {process.map((process) => (
              <Option key={process.id} value={process.id}>
                {process.dsProcess}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ width: "50%" }} label="Processo">
          <Select
            style={formStyle("calc(100% - 8px)", "8px")}
            onChange={handleSelectConnectionChange}
            value={value === 1 ? null : formData.dsProcess}
            disabled={value === 1}
          >
            {process.map((process) => (
              <Option key={process.id} value={process.id}>
                {process.dsProcess}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ width: "50%" }} label="Processos Saida">
          <Select
            style={{ width: "100%" }}
            onChange={handleSelectConnectionChange}
            value={value === 1 ? null : formData.dsProcess}
            disabled={value === 1}
          >
            {process.map((process) => (
              <Option key={process.id} value={process.id}>
                {process.dsProcess}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Row gutter={10}>
        <Col span={12}>
          <Card bodyStyle={{ padding: 10 }} title={t("titles.entry")}>
            <Form layout="vertical">
              <Form.Item
                label={t("labels.process")}
                style={formStyle("calc(100%)")}
              >
                <Select
                  disabled={valueEntry === 1}
                  value={formData.cdInputProcess}
                  onChange={(value) => handleSelect("cdInputProcess", value)}
                >
                  {process.map((process) => (
                    <Option key={process.id} value={process.id}>
                      {process.dsProcess}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={t("labels.time")}
                style={formStyle("calc(20% - 5px)", "5px")}
              >
                <InputNumber
                  disabled={valueEntry === 1}
                  style={{ width: "100%" }}
                  placeholder="0"
                  value={formData.vlTime}
                  onChange={(value) => handleInputNumberChange("vlTime", value)}
                />
              </Form.Item>
              <Form.Item label=" " style={formStyle("calc(20% - 5px)", "5px")}>
                <Select
                  disabled={valueEntry === 1}
                  value={formData.cdPeriod}
                  onChange={(value) => handleSelect("cdPeriod", value)}
                >
                  {period.map((period) => (
                    <Option key={period.id} value={period.id}>
                      {period.period}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label={t("labels.type")} style={formStyle("60%")}>
                <Select
                  disabled={valueEntry === 1}
                  value={formData.cdProcessConnectionType}
                  onChange={(value) =>
                    handleSelect("cdProcessConnectionType", value)
                  }
                >
                  {processConnType.map((processConnType) => (
                    <Option key={processConnType.id} value={processConnType.id}>
                      {processConnType.dsProcessConnectionType}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Checkbox disabled={valueEntry === 1}>
                  {t("labels.elapsedDays")}
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button disabled onClick={showModal} type="primary">
                  {t("labels.rules")}
                </Button>
              </Form.Item>
              <div style={{ margin: 10, float: "right" }}>
                <NewButton onClick={newFunctionEntry} />
                <EditButton onClick={editFunctionEntry} />
                <DeleteButton onClick={confirmDelete} />
                <SaveButton onClick={success} />
              </div>
            </Form>
          </Card>
        </Col>

        <Col span={12}>
          <Card bodyStyle={{ padding: 10 }} title={t("titles.output")}>
            <Form layout="vertical">
              <Form.Item label={t("labels.process")} style={formStyle("100%")}>
                <Select
                  disabled={valueOutput === 1}
                  value={formData.cdOutputProcess}
                  onChange={(value) => handleSelect("cdOutputProcess", value)}
                >
                  {process.map((process) => (
                    <Option key={process.id} value={process.id}>
                      {process.dsProcess}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={t("labels.time")}
                style={formStyle("calc(20% - 5px)", "5px")}
              >
                <InputNumber
                  disabled={valueEntry === 1}
                  style={{ width: "100%" }}
                  placeholder="0"
                  value={formData.vlTime}
                  onChange={(value) => handleInputNumberChange("vlTime", value)}
                />
              </Form.Item>
              <Form.Item label=" " style={formStyle("calc(20% - 5px)", "5px")}>
                <Select
                  disabled={valueEntry === 1}
                  value={formData.cdPeriod}
                  onChange={(value) => handleSelect("cdPeriod", value)}
                >
                  {period.map((period) => (
                    <Option key={period.id} value={period.id}>
                      {period.period}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label={t("labels.type")} style={formStyle("60%")}>
                <Select
                  disabled={valueEntry === 1}
                  value={formData.cdProcessConnectionType}
                  onChange={(value) =>
                    handleSelect("cdProcessConnectionType", value)
                  }
                >
                  {processConnType.map((processConnType) => (
                    <Option key={processConnType.id} value={processConnType.id}>
                      {processConnType.dsProcessConnectionType}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Checkbox disabled={valueEntry === 1}>
                  {t("labels.elapsedDays")}
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button disabled onClick={showModal} type="primary">
                  {t("labels.rules")}
                </Button>
              </Form.Item>
              <div style={{ margin: 10, float: "right" }}>
                <NewButton onClick={newFunctionOutput} />
                <EditButton onClick={editFunctionOutput} />
                <DeleteButton onClick={confirmDelete} />
                <SaveButton onClick={success} />
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
      <Modal
        title={t("titles.entryCondition")}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={850}
      >
        <div style={{ display: "flex", margin: "15px 0px 0px 0px" }}>
          <div style={{ marginRight: 15 }}>
            <Button type="primary">{t("generalButtons.newButton")}</Button>
          </div>
          <Form.Item
            label={t("labels.rules")}
            style={formStyle("calc(40% - 2px)", "6px")}
          >
            <Select />
          </Form.Item>
        </div>
        <Row gutter={10}>
          <Col span={12}>
            <Card title={t("titles.entryAction")} bodyStyle={{ padding: 10 }}>
              <div>
                <Form.Item>
                  <Radio value={1}>{t("labels.none")}</Radio>
                </Form.Item>
                <Form.Item>
                  <Radio value={2}>
                    {t("labels.completionProcess")}
                    <DatePicker
                      style={{ marginLeft: 10 }}
                      format={"DD/MM/YYYY"}
                    />
                  </Radio>
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("titles.exitAction")} bodyStyle={{ padding: 10 }}>
              <Form.Item>
                <Checkbox>
                  {t("labels.start")}
                  <DatePicker
                    style={{ marginLeft: 10 }}
                    format={"DD/MM/YYYY"}
                    showTime
                  />
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>{t("labels.elapsedDays")}</Checkbox>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Modal>
      <Modal
        title={t("labels.outputCondition")}
        open={isModalExitOpen}
        onOk={handleOkExit}
        onCancel={handleCancelExit}
        width={850}
      >
        <div style={{ display: "flex", margin: "15px 0px 0px 0px" }}>
          <div style={{ marginRight: 15 }}>
            <Button type="primary">{t("generalButtons.newButton")}</Button>
          </div>
          <Form.Item
            label={t("labels.rules")}
            style={formStyle("calc(40% - 2px)", "6px")}
          >
            <Select />
          </Form.Item>
        </div>
        <Row gutter={10}>
          <Col span={12}>
            <Card title={t("titles.entryAction")} bodyStyle={{ padding: 10 }}>
              <div>
                <Form.Item>
                  <Radio value={1}>{t("labels.none")}</Radio>
                </Form.Item>
                <Form.Item>
                  <Radio value={2}>
                    {t("labels.completionProcess")}
                    <DatePicker
                      style={{ marginLeft: 10 }}
                      format={"DD/MM/YYYY"}
                    />
                  </Radio>
                </Form.Item>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card title={t("titles.exitAction")} bodyStyle={{ padding: 10 }}>
              <Form.Item>
                <Checkbox>
                  {t("labels.start")}
                  <DatePicker style={{ marginLeft: 10 }} showTime />
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox>{t("labels.elapsedDays")}</Checkbox>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
