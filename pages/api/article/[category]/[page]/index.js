import { resolve } from "path";
import prisma from "../../../../../utilities/prisma/client";

const findContestPage = async (req, res) => {
  const { page, take, category, currentProfession, contest, tag, sort, prize } =
    req.query;
  const orderQuery = [];
  if (prize !== undefined) {
    orderQuery.push({
      contest: {
        prize: prize,
      },
    });
  }
  orderQuery.push({
    article: {
      createdAt: sort === undefined ? "desc" : sort,
      // createdAt: "desc",
    },
  });

  const result = await prisma?.[`${category}Article`].findMany({
    include: {
      ...articleIncludeOption(category),
    },
    skip: parseInt((page - 1) * (take === undefined ? 1 : take)),
    take: parseInt(take === undefined ? 1 : take),
    orderBy: orderQuery,
    where: {
      ...(currentProfession !== null &&
        currentProfession !== undefined && {
          contest: {
            profession: {
              some: { name: currentProfession },
            },
          },
        }),
      ...(tag !== undefined && {
        contest: {
          Tag: {
            some: { name: tag },
          },
        },
      }),
      ...(contest !== undefined && {
        contest_id: parseInt(contest),
      }),
    },
  });

  res.json(result);
  resolve();
};

const articleIncludeOption = (type) => {
  switch (type) {
    case "Contest":
      return {
        contest: {
          include: {
            profession: true,
          },
        },
      };
    case "Team":
      return {
        team: {
          include: {
            role: true,
            citizens: true,
            profession: true,
          },
        },
        article: {
          include: {
            content: {
              select: {
                title: true,
              },
            },
          },
        },
      };
    default:
      throw new Error(console.log(type));
  }
};

export default findContestPage;
