import api from "../api";

interface FormData {
  group: string;
  email: string;
  desc: string;
  status: string;
  unlockDateTime: Date;
}

export async function GetAllGroup() {
  try {
    return await api.get(`/Group/GetAll`).then((r) => {
      return r.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function GetDataFromId(id: number) {
  try {
    return await api.get(`/Group/Get/${id}`).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(formData: FormData) {
  const rec = {
    ds_Group: formData.group,
    ds_Email: formData.email,
    ds_Desc: formData.desc,
    ds_Blocked: formData.status,
    dt_Auto_Unlocked: formData.unlockDateTime
  };

  try {
    const response = await api.post(`/Group`, formData);
    console.log("Salvo");

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar:", error);
    throw error;
  }
}

export async function Update(id: number, formData: any) {
  try {
    let data = {};
    let config = {
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    };

    return await api.put(`/Group/Update`, data, config).then((res) => {
      return res.data;
    });
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Delete() {
  try {
    let res = { success: true };
    let id = 1;
    return await api.delete(`/Group/Delete/${id}`).then((res) => {
      return res.data;
    });

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}
