/*
정도현
*/


import { resolve } from "path";
import prisma from "../../../utilities/prisma/client";

const getAccesstoken = async (req, res) => {
  const { userID } = req.query;

  const data = await prisma.Account.findMany({
    where: {
      userId: userID,
    },
  });

  res.json(data[0].access_token);
  resolve();
};
export default getAccesstoken;
