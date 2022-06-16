/*
정도현
*/


import { resolve } from "path";
import prisma from "../../../../../utilities/prisma/client";

//팀별 팀역힐

const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getCitizens(req, res);
      return resolve();
    case "POST":
      return resolve();
    case "PUT":
      return resolve();
    case "DELETE":
      break;
    default:
      throw new Error(console.log(req.method));
  }
};

const getCitizens = async (req, res) => {
  const { role, team } = req.query;
  const whereQuery = {
    team: {
      some: {
        id: parseInt(team),
      },
    },
    Role: { some: { id: parseInt(role) } },
  };
  const includeQuery = {
    user: {
      select: { image: true, name: true },
    },
  };
  const data = await prisma.Citizens.findMany({
    where: whereQuery,
    include: includeQuery,
  });

  return res.json(data);
};

export default handle;
