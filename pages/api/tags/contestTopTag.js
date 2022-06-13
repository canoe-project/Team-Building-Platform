import { resolve } from "path";
import prisma from "../../../utilities/prisma/client";

const findTags = async (req, res) => {
  const result = await prisma.Tag.findMany({
    include: {
      _count: {
        select: { contest: true },
      },
    },
    take: 10,
    orderBy: {
      contest: { _count: "desc" },
    },
  });
  res.json(result);
  resolve();
};

export default findTags;
