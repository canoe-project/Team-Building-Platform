import prisma from "../../../utilities/prisma/client";

const permissionChecker = async (req, res) => {
  //요청 데이터 가져오기
  const { userId } = req.body;

  //   //쿼리 객체 생성
  const queryToFindCitizens = {
    where: {
      user_id: userId,
    },
  };

  const result = await prisma.citizens
    .findUnique(queryToFindCitizens)
    .then(async (result) => {
      return result !== null
        ? result
        : await prisma.citizens.create({
            data: {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          });
    });
  res.json(result);
};

export default permissionChecker;
