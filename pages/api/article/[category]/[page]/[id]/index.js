import { resolve } from "path";
import prisma from "../../../../../../utilities/prisma/client";

const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      await findArticleID(req, res);
      return;
    case "POST":
      await createArticle(req, res);
      return resolve();
    case "PUT":
      await updateArticle(req, res);
      return resolve();
    case "DELETE":
      break;
    default:
      throw new Error(console.log(req.method));
  }
};

const findArticleID = async (req, res) => {
  const id = req.query.id;
  const category = req.query.category;

  const whereQuery = {
    article_id: parseInt(id),
  };
  const includeQuery = {
    article: { include: { content: true } },
    [category.toLowerCase()]: {
      include: { ...articleIncludeOption(category) },
    },
    citizens: true,
  };
  const result = await prisma?.[`${category}Article`].findUnique({
    where: whereQuery,
    include: includeQuery,
  });

  await res.json(result);
  resolve();
};

const createArticle = async (req, res) => {
  const { ...rest } = req.body;
  const category = req.query.category;

  const createQuery = {
    ...rest,
  };
  const result = await prisma?.[`${category}Article`].create({
    data: createQuery,
  });

  await res.json(result);
  resolve();
};

const updateArticle = async (req, res) => {
  const id = req.query.id;
  const category = req.query.category;

  const { title, content, tag, include, ...rest } = req.body;

  const updateQuery = {
    ...(title !== undefined && { title: title }),
    ...(content !== undefined && { content: content }),
    ...(tag !== undefined && { tag: tag }),
    ...rest,
  };
  const whereQuery = {
    article_id: parseInt(id),
  };

  const result = await prisma?.[`${category}Article`].update({
    where: whereQuery,
    data: updateQuery,
  });
  res.json(result);
  return resolve();
};

export default handle;

const articleIncludeOption = (type) => {
  switch (type) {
    case "Contest":
      return { team: true, Tag: true, tech_stack: true, profession: true };
    case "Team":
      return {
        tech_stack: true,
        profession: true,
        role: { include: { team: true, citizens: true } },
        citizens: true,
      };
    default:
      throw new Error(console.log(type));
  }
};
