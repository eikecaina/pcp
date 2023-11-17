import { NextApiHandler } from "next";

import { token } from "@wmo-dev/login-utils/handlers";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.send("Method Not Allowed");
  }

  return token(req, res);
};

export default handler;
