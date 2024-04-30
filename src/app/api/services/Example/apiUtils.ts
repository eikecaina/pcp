import axios from "axios";

export async function saveDataForm(id: number, formData: any) {
  try {
    await axios.post(`http://localhost:3000/api/route?id=${id}`, formData);
    return true;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}
