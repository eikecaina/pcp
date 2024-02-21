import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface Data {
  id: number;
  client: string;
  quotation: number;
  salesOrder: number;
}

let savedData: Data[] = [];
let countId: number = 1;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { client, quotation, salesOrder } = req.body;
      const id = countId++;
      savedData.push({ id, client, quotation, salesOrder });
      saveDataJson(savedData);
      savedData = [];
      res.status(200).json({ message: "Dados salvos com sucesso" });
      break;
    case "GET":
      try {
        const { id: queryId } = req.query;
        if (queryId) {
          const selectedId = savedData.find(
            (item) => item.id === parseInt(queryId as string)
          );
          if (selectedId) {
            res.status(200).json({ data: selectedId });
            return;
          } else {
            const dataFromFile = await getDataFromFile();
            const selectedFromFile = dataFromFile.find(
              (item) => item.id === parseInt(queryId as string)
            );
            if (selectedFromFile) {
              res.status(200).json({ data: selectedFromFile });
              return;
            } else {
              res
                .status(404)
                .json({ error: `Nenhum dado encontrado para o ID ${queryId}` });
              return;
            }
          }
        } else {
          const dataFromFile = await getDataFromFile();
          res.status(200).json({ data: dataFromFile });
          return;
        }
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
        res.status(500).json({ error: "Erro ao obter os dados" });
      }
      break;
    default:
      res.status(405).json({ error: "Method not allowe" });
      break;
  }
}

function saveDataJson(data: Data[]) {
  const filePath = path.join(process.cwd(), "src", "pages", "api", "data.json");
  const existingData = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf-8")
    : "";
  const newData = existingData ? JSON.parse(existingData) : [];
  newData.push(...data);

  fs.writeFile(filePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Erro ao salvar os dados:", err);
    } else {
      console.log("Dados salvos no arquivo data.json");
    }
  });
}

async function getDataFromFile(): Promise<Data[]> {
  const filePath = path.join(process.cwd(), "src", "pages", "api", "data.json");

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}
