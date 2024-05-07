import { v4 as uuidv4 } from 'uuid';
import api from "../api";
import { UUID } from 'crypto';

interface FormData {
  id: UUID;
  familly: string;
  plan: string;
  idGroup: UUID;
  modifiedUser: string;
  createdUser: string;
}

export async function GetAllFamilly() {
  try {
    return await api.get(`/Familly/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataFromId(id: number) {
  try {
    return await api.get(`/Familly/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: uuidv4(),
    ds_Familly: formData.familly,
    ds_Familly_Planej: formData.plan,
    id_Group: formData.idGroup,
    cd_Audit_Modified_User: "Eike",
    cd_Audit_Created_User: "Eike"
  };

  try {
    const response = await api.post(`/Familly`, rec);
    console.log(rec);

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    console.log(formData);
    throw error;
  }
}

export async function Update(id: number, formData: any) {
  try {
    let data = {};
    let config = {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    };

    return await api.put(`/Familly/Update`, data, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Delete(formData: FormData) {
  const rec = {
    id: formData.id,
  }

  try {
    return await api.delete(`/Familly/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
   
    
  }
}