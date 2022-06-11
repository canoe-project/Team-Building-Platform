import { resolve } from "path";
import prisma from "../../../../utilities/prisma/client";

const CountPage = async (req, res) => {
  const { page, take, category, currentProfession, tag } = req.query;
  const result = await prisma?.[`${category}Article`].count({
    where: {
      ...(currentProfession !== undefined && {
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
    },
  });

  res.json(result);
  resolve();
};

export default CountPage;
