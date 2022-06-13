import { resolve } from "path";
import prisma from "../../../../utilities/prisma/client";

const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      return await findTags(req, res);
    case "POST":
      break;
    case "PUT":
      break;
    case "DELETE":
      break;
    default:
      throw new Error(console.log(req.method));
  }
};

const findTags = async (req, res) => {
  const { type, select } = req.query;

  const result = await prisma?.[type].findMany({
    ...(select !== undefined && { select: { [select]: true, name: true } }),
  });
  res.json(result);
  resolve();
};

export default handle;
