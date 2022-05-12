import prisma from "../../../utilities/prisma/client";

const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      findOneTechStack(req, res);
      break;
    case "POST":
      createTechStack(req, res);
      break;
    case "PUT":
      updateTechStack(req, res);
      break;
    case "DELETE":
      deleteTechStack(req, res);
      break;
    default:
      throw new Error(console.log(req.method));
  }
};

const findOneTechStack = async (req, res) => {
  const { name } = req.body;
  const { type } = req.query;
  const teckStackFindQuery = {
    ...(await typeNaming(type, name)),
  };

  const result = await prisma?.[type].findUnique({
    where: teckStackFindQuery,
  });

  res.json(result);
};

const createTechStack = async (req, res) => {
  const { name, description, imageUrl } = req.body;
  const { type } = req.query;

  const techStackCreateQuery = {
    ...(await typeNaming(type, name)),
    ...(description !== undefined && { description: description }),
    ...(imageUrl !== undefined && { image_url: imageUrl }),
  };
  const result = await prisma?.[type].create({ data: techStackCreateQuery });

  res.json(result);
};

const updateTechStack = async (req, res) => {
  const { id, name, description, imageUrl } = req.body;
  const { type } = req.query;
  const techStackUpdateQuery = {
    ...(name !== undefined && (await typeNaming(type, name))),
    ...(description !== undefined && { description: description }),
    ...(imageUrl !== undefined && { image_url: imageUrl }),
  };

  const result = await prisma?.[type].update({
    where: { id: id },
    data: techStackUpdateQuery,
  });

  res.json(result);
};

const deleteTechStack = async (req, res) => {
  const { id } = req.body;
  const { type } = req.query;
  const result = await prisma?.[type].delete({
    where: {
      id: id,
    },
  });
  res.json(result);
};

const typeNaming = async (type, name) => {
  switch (type) {
    case "Role":
      return { role_name: name };
    case "Tag":
      return { tag_name: name };
    case "TechStack":
      return { tech_stack_name: name };
    case "Program":
      return { program_name: name };
    case "Profession":
      return { profession_name: name };
    case "Certification":
      return { certificate_name: name };
    default:
      throw new Error(console.log(type));
  }
};

export default handle;
