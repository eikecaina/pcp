import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

const dataFilePath = './data.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const formData = req.body;
    fs.writeFile(dataFilePath, JSON.stringify(formData), (err) => {
      if (err) {
        console.error('Erro ao salvar os dados do formulário:', err);
        res.status(500).json({ error: "Erro ao salvar os dados do formulário" });
        return;
      }
      console.log('Dados do formulário salvos com sucesso.');
      res.status(200).json({ message: "Dados do formulário salvos com sucesso!" });
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
