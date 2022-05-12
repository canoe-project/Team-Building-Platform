import prisma from "../../../utilities/prisma/client";
import moment from "moment";
const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      break;
    case "POST":
      createContestArticle(req, res);
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

/*
createdAt        DateTime          @default(now()) @map("created_at")
updatedAt        DateTime          @updatedAt @map("updated_at")
published        Boolean           @default(false)
answer_article   answer_article?
comment          comment[]
content          content?
contest_article  contest_article?
*/

/*
id Int      @id @default(autoincrement())
  article_id  Int      @unique
  citizens_id Int
  contestId   Int
  article     article  @relation(fields: [article_id], references: [id])
  citizens    citizens @relation(fields: [citizens_id], references: [id])
  contest     contest  @relation(fields: [contestId], references: [id])

  @@index([citizens_id], map: "contest_article_citizens_id_fkey")
  @@index([contestId], map: "contest_article_contestId_fkey")
*/

/*
contest
ㄴ
  contestArticle
  ㄴ
    article
    ㄴ
      comment
      content
대회를 생성후 게시물을 생성 
이때 contestArticle이 생성이 된다면 동시에 article와 content를 생성하라
*/

const createContestArticle = async (req, res) => {
  //요청 데이터 가져오기
  const {
    content,
    title,
    userID,
    contest_name,
    prize,
    start_period,
    end_period,
    profession,
    corporate_type,
  } = req.body;

  //쿼리 객체 생성
  const contestArticleCreateQuery = {
    article: {
      create: {
        updatedAt: moment().utc().toISOString(),
        content: {
          create: {
            title: title,
            body: content,
          },
        },
      },
    },
    citizens: {
      connect: {
        id: userID,
      },
    },
    contest: {
      create: {
        //대회 이름, 내용, 상금, 시작 날짜,종료 날짜
        contest_name: contest_name,
        content: content.slice(20),
        prize: prize,
        start_period: start_period,
        end_period: end_period,
        //분야
        profession: {
          connectOrCreate: profession.map((d) => {
            return {
              where: { profession_name: d },
              create: { profession_name: d },
            };
          }),
        },
        //회사 규모
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
    },
  };

  const result = await prisma.ContestArticle.create({
    data: contestArticleCreateQuery,
  });

  res.json(result);
};

export default handle;
