import { NextApiHandler } from "next";

import { logout } from "@wmo-dev/login-utils/handlers";

const handler: NextApiHandler = (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 405;
    return res.send("Method Not Allowed");
  }

  return logout(req, res);
};

export default handler;
