import prisma from "../../../utilities/prisma/client";

const handle = async (req, res) => {
  switch (req.method) {
    case "GET":
      break;
    case "POST":
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
model article 
  id               Int               @id @default(autoincrement())
  createdAt        DateTime          @default(now()) @map("created_at")
  updatedAt        DateTime          @updatedAt @map("updated_at")
  published        Boolean           @default(false)
  answer_article   answer_article?
  comment          comment[]
  content          content?
  contest_article  contest_article?
  free_article     free_article?
  notice_article   notice_article?
  question_article question_article?
  report           report[]
  team_article     team_article?
  */

/*
아레 참조 모델은 contest가 생성될 때 같이 생성 될 수도 혹은 없을 수 있는 값이며
향후 수정을 통해 추가될 수 있는 값이다.

program         program[]
skill_stack     skill_stack[]
spcialization   spcialization[]
certificate     certificate[]
corporate_type  corporate_type[]

*/

/*
아레 참조 모델은 contest가 생성된 이후에 들어갈 수 있는 모델이기 때문에 생성 당시에는 이 모델은 생성 값으로 넣지 않는다.

team            team[]
profile         profile[]
*/

/*
createArticle은 게시물 데이트를 생성한다.
*/
const createArticle = (req, res) => {};

export default handle;
