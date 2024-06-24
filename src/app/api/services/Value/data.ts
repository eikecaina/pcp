import { v4 as uuidv4 } from "uuid";
import api from "../api";
import { UUID } from "crypto";

interface FormData {
  id: UUID;
  value: string;
  charact: UUID;
  position: number;
  newApproved: boolean;
  repeatApproved: boolean;
  newCertificate: boolean;
  repeatCertificate: boolean;
}

export async function GetAllValue() {
  try {
    return await api.get(`/Value/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataFromId(id: number) {
  try {
    return await api.get(`/Value/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: formData.id,
    ds_Value: formData.value,
    cd_Caract: formData.charact,
    vl_Position: formData.position,
    id_Allow_New_Approved: formData.newApproved,
    id_Allow_Repeat_Approved: formData.repeatApproved,
    id_Allow_New_Certificate: formData.newCertificate,
    id_Allow_Repeat_Certificate: formData.repeatCertificate,
    cd_Audit_Modified_User: "Eike",
    cd_Audit_Created_User: "Eike",
  };

  try {
    const response = await api.post(`/Value`, rec);
    console.log(rec);
    console.log("Salvo");
    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    console.log(formData);
    throw error;
  }
}

export async function Update(formData: any) {
  try {
    const rec = {
      id: formData.id,
      ds_Value: formData.value,
      cd_Caract: formData.charact,
      vl_Position: formData.position,
      id_Allow_New_Approved: formData.newApproved,
      id_Allow_Repeat_Approved: formData.repeatApproved,
      id_Allow_New_Certificate: formData.newCertificate,
      id_Allow_Repeat_Certificate: formData.repeatCertificate,
      cd_Audit_Modified_User: "Eike",
      cd_Audit_Created_User: "Eike",
    };

    return await api.put(`/Value/Update`, rec).then((res) => {
      console.log(rec);
      console.log("Atualizado");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao Editar:", error);
  }
}

export async function Delete(formData: FormData) {
  const rec = {
    id: formData.id,
  };

  try {
    return await api.delete(`/Value/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}
