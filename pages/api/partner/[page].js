import { resolve } from "path";
import prisma from "../../../utilities/prisma/client";

const findPartnerPage = async (req, res) => {
    const page = req.query.page;
    const take = req.query.take;
  
    const result = await prisma.Citizens.findMany({
      skip: parseInt((page - 1) * take),
      take: parseInt(take),
      include:{
          user:true,
          tech_stack:true,
          profession:true,
          profile:true,
          user_attention_profession: {
            include: {
              profession: true,
            },
          },
      }
    });
  
    res.json(result);
    resolve();
  };


  export default findPartnerPage;