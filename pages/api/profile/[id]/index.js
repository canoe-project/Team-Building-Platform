import { resolve } from "path";
import prisma from "../../../../utilities/prisma/client";

const handle = async (req, res) => {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      await findProfilePage(req, res);
      return resolve();
    case "POST":
      await updateProfilePage(req, res);
      return resolve();
    case "PUT":
      await updateProfilePageViewCountIncrease(req, res);
      return resolve();
    case "DELETE":
      await updateProfilePageLikeCountIncrease(req, res);
      return resolve();
    default:
      throw new Error(console.log(req.method));
  }
};

const findProfilePage = async (req, res) => {
  const id = req.query.id;

  const whereQuery = {
    user: {
      name: id,
    },
  };

  const result = await prisma.Citizens.findMany({
    where: whereQuery,
    include: {
      user: true,
      tech_stack: true,
      profession: true,
      certificate: true,
      program: true,
      team: {
        include: {
          contest: true,
        },
      },
      profile: {
        include: {
          resume: true,
          contest: {
            include: {
              profession : true,
              tech_stack: true
            },
          },
        },
      },
      user_attention_profession: {
        include: {
          profession: true,
        },
      },
    },
  });

  return await res.json(result);
};

const updateProfilePage = async (req, res) => {
  const { ...rest } = req.body;
  const { id } = req.query;

  const updateQuery = {
    ...rest,
  };
  const whereQuery = {
    user_id: id,
  };
  const result = await prisma.Citizens.update({
    where: whereQuery,
    data: updateQuery,
  });
  res.json(result);
  return resolve();
};

const updateProfilePageLikeCountIncrease = async (req, res) => {
  const { ...rest } = req.body;
  const { id } = req.query;

  const updateQuery = {
    profile: {
      update: {
        like_count: {
          increment: 1,
        },
      },
    },
  };
  const whereQuery = {
    user_id: id,
  };
  const result = await prisma.Citizens.update({
    where: whereQuery,
    data: updateQuery,
  });
  res.json(result);
  return resolve();
};

const updateProfilePageViewCountIncrease = async (req, res) => {
  const { ...rest } = req.body;
  const { id } = req.query;

  const updateQuery = {
    profile: {
      update: {
        view_count: {
          increment: 1,
        },
      },
    },
  };
  const whereQuery = {
    user_id: id,
  };
  const result = await prisma.Citizens.update({
    where: whereQuery,
    data: updateQuery,
  });
  res.json(result);
  return resolve();
};

export default handle;
