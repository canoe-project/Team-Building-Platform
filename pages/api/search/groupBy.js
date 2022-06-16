/*
정도현
*/


import { resolve } from "path";
import elastic from "../../../utilities/elasticsearch/elasticsearch";

const searchES = async (req, res) => {
  const { index, filed, size } = req.query;
  try {
    const client = await elastic();
    let results = [];
    const body = await client.search({
      index: index,
      body: {
        aggs: {
          group_by_state: {
            terms: {
              field: filed,
            },
          },
        },
        size: size,
      },
    });
    let hits = body.aggregations.group_by_state;

    return res.send(hits.buckets);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
};

export default searchES;
