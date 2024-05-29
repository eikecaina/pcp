import api from "../api";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

interface FormData {
  id: UUID;

}

export async function GetAllDay() {
  try {
    return await api.get(`/CalendarDay/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao Buscar:", error);
  }
}

export async function GetDataFromId(id: UUID) {
  try {
    return await api.get(`/CalendarDay/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    id: uuidv4(),
    cd_Audit_Created_User: "Eike",
    cd_Audit_Modified_User: "Eike",
  };

  try {
    const response = await api.post(`/CalendarDay`, rec);
    console.log(rec);

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    console.log(formData);
    throw error;
  }
}

export async function Update(formData: FormData) {
  try {
    let data = {
      id: formData.id,
      cd_Audit_Created_User: "Eike",
      cd_Audit_Modified_User: "Eike",
    };

    return await api.put(`/CalendarDay/Update`, data).then((res) => {
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
    return await api.delete(`/CalendarDay/Delete/${rec.id}`).then((res) => {
      console.log("Deletado com sucesso");
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao deletar:", error);
  }
}
