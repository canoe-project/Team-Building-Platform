/*
정도현
*/


import { resolve } from "path";
import prisma from "../../../../../../utilities/prisma/client";

const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getArticleId(req, res);
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

const getArticleId = async (req, res) => {
  const id = req.query.id;
  const category = req.query.category;

  const whereQuery = {
    contest_id: parseInt(id),
  };
  const selectQuery = {
    article_id: true,
  };
  const result = await prisma?.[`${category}Article`].findUnique({
    where: whereQuery,
    select: selectQuery,
  });
  res.json(result);
  resolve();
};

export default handle;
