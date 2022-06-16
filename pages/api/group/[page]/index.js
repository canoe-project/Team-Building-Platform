/*
정도현
*/


import { resolve } from "path";
import prisma from "../../../../utilities/prisma/client";

const findContestPage = async (req, res) => {
  const { page, take, user } = req.query;

  const result = await prisma?.[`Team`].findMany({
    include: {
      team_article: true,
    },
    skip: parseInt((page - 1) * (take === undefined ? 12 : take)),
    take: parseInt(take === undefined ? 12 : take),
    orderBy: {
      createdAt: "asc",
    },
    where: {
      citizens: {
        some: { user_id: user },
      },
    },
  });
  res.json(result);
  resolve();
};

export default findContestPage;
