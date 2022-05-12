import prisma from "../../../utilities/prisma/client";

const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      break;
    case "POST":
      createContest(req, res);
      break;
    case "PUT":
      updateContest(req, res);
      break;
    case "DELETE":
      deleteContest(req, res);
      break;
    default:
      throw new Error(console.log(req.method));
  }
};

const createContest = async (req, res) => {
  const {
    contest_name,
    content,
    prize,
    start_period,
    end_period,
    spcialization,
    corporate_type,
  } = req.body;

  const result = await prisma.contest.create({
    data: {
      contest_name: contest_name,
      content: content,
      prize: prize,
      start_period: start_period,
      end_period: end_period,
      //분야와 규모정의
      spcialization: {
        connectOrCreate: spcialization.map((sp) => {
          return {
            where: { spcialization_name: sp },
            create: { spcialization_name: sp },
          };
        }),
      },
      corporate_type: {
        connectOrCreate: {
          where: { corporate_name: corporate_type },
          create: { corporate_name: corporate_type },
        },
      },
    },
  });
  res.json(result);
};

const updateContest = async (req, res) => {
  const { id } = req.body;
  const {
    contest_name,
    content,
    prize,
    start_period,
    end_period,
    profession,
    corporate_type,
  } = req.body;
  const result = await prisma.Contest.update({
    where: {
      id: id,
    },
    data: {
      contest_name: contest_name,
      content: content,
      prize: prize,
      start_period: start_period,
      end_period: end_period,
      //분야와 규모정의
      profession: {
        connectOrCreate: profession.map((d) => {
          return {
            where: { profession_name: d },
            create: { profession_name: d },
          };
        }),
      },
      corporate_type: {
        //이미 있는 회사 단위라면 id값을 가져온다.
        //만일 존재하지 않은 새로운 단위라면 데이터를 생성한다.
        connectOrCreate: {
          create: {
            corporate_name: corporate_type,
          },
          where: {
            corporate_name: corporate_type,
          },
        },
      },
    },
  });
  res.json(result);
};

//특정 아이디의 대회 정보를 삭제
const deleteContest = async (req, res) => {
  const { id } = req.body;
  const result = await prisma.Contest.delete({
    where: {
      id:  id,
    },
  });
  res.json(result);
};

export default handle;
