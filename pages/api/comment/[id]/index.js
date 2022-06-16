/*
정도현
*/


import { resolve } from "path";
import prisma from "../../../../utilities/prisma/client";

//팀별 팀역힐

const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      await getComment(req, res);
      return resolve();
    case "POST":
      await postComment(req, res);
      return resolve();
    case "PUT":
      return resolve();
    case "DELETE":
      break;
    default:
      throw new Error(console.log(req.method));
  }
};

const getComment = async (req, res) => {
  const { id } = req.query;
  const whereQuery = {
    id: parseInt(id),
  };
  const includeQuery = {
    comment: {
      include: {
        citizens: {
          include: { user: true },
        },
      },
    },
  };
  const data = await prisma.Article.findMany({
    where: whereQuery,
    include: includeQuery,
  });

  res.json(data);
};

const postComment = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  const whereQuery = {
    id: parseInt(id),
  };
  const createQuery = { ...rest };
  const data = await prisma.Article.update({
    where: whereQuery,
    data: createQuery,
  });

  res.json(data);
};

export default handle;
