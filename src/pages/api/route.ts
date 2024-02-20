import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Se o método da solicitação for GET, retornamos a mensagem "Hello"
    res.status(200).json({ message: "GET" });
  } else if (req.method === "DELETE") {
    // Se o método da solicitação for DELETE, retornamos a mensagem "Hello"
    res.status(200).json({ message: "DELETE" });
  } else if (req.method === "PUT") {
    // Se o método da solicitação for PUT, retornamos a mensagem "Hello"
    res.status(200).json({ message: "PUT" });
  } else if (req.method === "POST") {
    res.status(200).json({ message: "POST" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}



