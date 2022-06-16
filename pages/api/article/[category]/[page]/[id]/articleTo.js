/*
정도현
*/


import { resolve } from "path";
import prisma from "../../../../../../utilities/prisma/client";

const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getContestId(req, res);
      return;
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

const getContestId = async (req, res) => {
  const id = req.query.id;
  const category = req.query.category;

  const whereQuery = {
    article_id: parseInt(id),
  };
  const includeQuery = {
    [category.toLowerCase()]: true,
  };
  const result = await prisma?.[`${category}Article`].findUnique({
    where: whereQuery,
    include: includeQuery,
  });
  res.json(result);
  resolve();
};

export default handle;
