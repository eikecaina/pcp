import axios from "axios";

export async function saveDataForm(id: number, formData: any) {
  try {
    console.log(id)
    console.log(formData)
    await axios.post(`http://localhost:3000/api/route?id=${id}`, formData);
    console.log(formData);
    return true;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}
