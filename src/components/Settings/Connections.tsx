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
  GetConnectionsByProcess,
  Save,
  Update,
} from "@/app/api/services/Connection/data";
import { UUID } from "crypto";
import { GetAllProcess } from "@/app/api/services/Process/data";
import { GetAllPeriod } from "@/app/api/services/Period/data";

const { Option } = Select;

interface Connection {
  id: UUID;
  cdProcessEntry: UUID;
  cdProcessExit: UUID;
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
  const [valueEntry, setValueEntry] = useState(1);
  const [valueOutput, setValueOutput] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [fetchData, setFetchData] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExitOpen, setIsModalExitOpen] = useState(false);
  const [connections, setConnection] = useState<Connection[]>([]);
  const [process, setProcess] = useState<Process[]>([]);
  const [processConnType, setProcessConType] = useState<ConnectionType[]>([]);
  const [period, setPeriod] = useState<Period[]>([]);
  const [selectedProcessId, setSelectedProcessId] = useState<any>();
  const [periods, setPeriods] = useState<Period[]>([]);
  const [form] = Form.useForm();
  const numEntry: any = 0;
  const numOut: any = 0;

  const clearInputs = () => {
    setFormData({});
    form.resetFields(["inputEntry"]);
    form.resetFields(["timeEntry"]);
    form.resetFields(["periodEntry"]);
    form.resetFields(["typeEntry"]);
    form.resetFields(["dayEntry"]);
    form.resetFields(["inputOutput"]);
    form.resetFields(["periodOutput"]);
    form.resetFields(["typeOutput"]);
    form.resetFields(["dayOutput"]);
    form.resetFields(["timeOutput"]);
  };

  const success = async () => {
    try {
      //if (formData.id) {
      //  await Update(formData);
      // } else {
      await Save(formData);
      // }
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

  const handleSelectProcessChange = async (selectedProcessId: UUID) => {
    const selectedProcess = process.find(
      (process) => process.id === selectedProcessId
    );
    if (selectedProcess) {
      setFormData({
        ...formData,
        id: selectedProcess.id,
        cdProcessExit: selectedProcess.id,
        cdProcessEntry: selectedProcess.id,
      });

      setSelectedProcessId(selectedProcess.id);
      setFetchData(true);
    }
  };

  const handleSelect = (fieldName: string, value: any) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    console.log(formData);
  };

  const handleInputNumberChange = (fieldName: string, value: number) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleOkExit = () => {
    setIsModalExitOpen(false);
  };

  const handleCancelExit = () => {
    setIsModalExitOpen(false);
  };

  const newFunctionEntry = () => {
    setValueEntry(2);
    setValueOutput(1);
  };

  const editFunctionEntry = () => {
    setValueEntry(2);
  };

  const newFunctionOutput = () => {
    setValueOutput(2);
    setValueEntry(1);
  };

  const editFunctionOutput = () => {
    setValueOutput(3);
  };

  const fetchPeriods = async () => {
    try {
      const response = await GetAllPeriod();
      const periodData = response.map(
        (period: { id: UUID; ds_Period: string }) => ({
          id: period.id,
          period: period.ds_Period,
        })
      );
      setPeriods(periodData);
    } catch (error) {
      console.error("Erro ao buscar periodos", error);
    }
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

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

  const fetchConnection = async () => {
    try {
      const response = await GetAllConnection();
      const connectionData = response.map(
        (connection: {
          id: UUID;
          cd_Process_Entry: UUID;
          cd_Process_Exit: UUID;
          vl_Time: number;
          cd_Period: UUID;
          cd_Process_Connection_Type: UUID;
          id_Elapsed_Day: boolean;
        }) => ({
          id: connection.id,
          cdProcessEntry: connection.cd_Process_Entry,
          cdProcessExit: connection.cd_Process_Exit,
          vlTime: connection.vl_Time,
          cdPeriod: connection.cd_Period,
          cdProcessConnectionType: connection.cd_Process_Connection_Type,
          idElapsedDay: connection.id_Elapsed_Day,
        })
      );
      setConnection(connectionData);
      console.log(formData);
    } catch (error) {
      console.error("Erro ao buscar conexões");
    }
  };

  useEffect(() => {
    if (fetchData) {
      fetchConnection();
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

  const fetchConnectionProcess = async () => {
    try {
      const response = await GetConnectionsByProcess(selectedProcessId);

      console.log(response);
    } catch (error) {
      console.log("n deu");
    }
  };

  useEffect(() => {
    fetchConnectionProcess();
  }, [fetchData]);

  const { t } = useTranslation("layout");
  return (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <Form.Item style={{ width: "50%" }} label="Processo">
          <Select
            style={formStyle("calc(100% - 8px)", "8px")}
            onChange={handleSelectProcessChange}
            value={formData.dsProcess}
          >
            {process.map((process) => (
              <Option key={process.id} value={process.id}>
                {process.dsProcess}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item style={{ width: "50%" }} label="Processos Entrada">
          <Select
            style={formStyle("calc(100% - 8px)", "8px")}
            onChange={handleSelectProcessChange}
            value={formData.dsProcess}
          ></Select>
        </Form.Item>
        <Form.Item style={{ width: "50%" }} label="Processos Saida">
          <Select
            style={{ width: "100%" }}
            onChange={handleSelectProcessChange}
            value={formData.dsProcess}
          ></Select>
        </Form.Item>
      </div>
      <Row gutter={10}>
        <Col span={12}>
          <Card bodyStyle={{ padding: 10 }} title={t("titles.entry")}>
            <Form form={form} layout="vertical">
              <Form.Item
                label="Processo de entrada"
                style={formStyle("calc(50% - 5px)", "5px")}
                name="inputEntry"
              >
                <Select
                  disabled={valueEntry === 1}
                  onChange={(value) => handleSelect("cdProcessEntry", value)}
                  value={formData.cdProcessEntry}
                >
                  {process.map((process) => (
                    <Option key={process.id} value={process.id}>
                      {process.dsProcess}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Processo de saida"
                style={formStyle("calc(50%)")}
              >
                <Select disabled value={formData.id}>
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
                name="timeEntry"
              >
                <InputNumber
                  disabled={valueEntry === 1}
                  style={{ width: "100%" }}
                  placeholder="0"
                  value={numOut}
                  onChange={(value) => handleInputNumberChange("vlTime", value)}
                />
              </Form.Item>
              <Form.Item
                name="periodEntry"
                label=" "
                style={formStyle("calc(20% - 5px)", "5px")}
              >
                <Select
                  disabled={valueEntry === 1}
                  onChange={(value) => handleSelect("cdPeriod", value)}
                >
                  {periods.map((period) => (
                    <Option key={period.id} value={period.id}>
                      {period.period}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="typeEntry"
                label={t("labels.type")}
                style={formStyle("60%")}
              >
                <Select
                  disabled={valueEntry === 1}
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
              <Form.Item name="dayEntry">
                <Checkbox
                  disabled={valueEntry === 1}
                  onChange={(e) =>
                    handleSelect("idElapsedDay", e.target.checked)
                  }
                >
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
            <Form form={form} layout="vertical">
              <Form.Item
                label="Processo de entrada"
                style={formStyle("calc(50% - 5px)", "5px")}
              >
                <Select disabled value={formData.id}>
                  {process.map((process) => (
                    <Option key={process.id} value={process.id}>
                      {process.dsProcess}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Processo de saida"
                style={formStyle("calc(50%)")}
                name="inputOutput"
              >
                <Select
                  disabled={valueOutput === 1}
                  onChange={(value) => handleSelect("cdProcessExit", value)}
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
                name="timeOutput"
              >
                <InputNumber
                  disabled={valueOutput === 1}
                  style={{ width: "100%" }}
                  placeholder="0"
                  value={numEntry}
                  onChange={(value) => handleInputNumberChange("vlTime", value)}
                />
              </Form.Item>
              <Form.Item
                name="periodOutput"
                label=" "
                style={formStyle("calc(20% - 5px)", "5px")}
              >
                <Select
                  disabled={valueOutput === 1}
                  onChange={(value) => handleSelect("cdPeriod", value)}
                >
                  {period.map((period) => (
                    <Option key={period.id} value={period.id}>
                      {period.period}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="typeOutput"
                label={t("labels.type")}
                style={formStyle("60%")}
              >
                <Select
                  disabled={valueOutput === 1}
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
              <Form.Item name="dayOutput">
                <Checkbox
                  disabled={valueOutput === 1}
                  onChange={(e) =>
                    handleSelect("idElapsedDay", e.target.checked)
                  }
                >
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
