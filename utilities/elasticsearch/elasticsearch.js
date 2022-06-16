/*
정도현
*/

import { Client } from "@elastic/Elasticsearch";
//connect to Elasticsearch

const client = async () => {
  const ESS_USER_NAME = process.env.ESS_USER_NAME;
  const ESS_PASSWORD = process.env.ESS_PASSWORD;
  const ESS_HOST = process.env.ESS_HOST;
  if (!ESS_HOST || !ESS_USER_NAME || !ESS_PASSWORD) {
    return "ERR_ENV_NOT_DEFINED";
  }
  return new Client({
    auth: {
      username: ESS_USER_NAME,
      password: ESS_PASSWORD,
    },
    node: ESS_HOST,
  });
};
export default client;
