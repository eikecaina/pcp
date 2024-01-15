import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

type ResponseData = {
  message: string;
  jsonData?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const jsonFilePath = "src/pages/api/dataBase.json";

  try {
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

    res.status(200).json({ message: "API OK!", jsonData });
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
    res.status(500).json({
      message: "Erro ao ler o arquivo JSON",
      jsonData: undefined,
    });
  }
}
