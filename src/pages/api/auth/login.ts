import { NextApiHandler } from "next";

import { login } from "@wmo-dev/login-utils/handlers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.send("Method Not Allowed");
  }

  return login(req, res);
};

export default handler;
