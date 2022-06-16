/*
정도현
*/

import { useState, useEffect, Fragment } from "react";
import { Avatar } from "@material-ui/core";
import Link from "next/link";
const reqCitizen = async (team, role) => {
  const data = await fetch(`${process.env.HOSTNAME}/api/role/${role}/${team}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    return response.json();
  });

  return data;
};

const Role = ({ team, role, className }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    reqCitizen(team, role)
      .then((data) => {
        setUserInfo(data);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <Fragment>
      {userInfo.map((user) => {
        return (
          <Link
            href={`${process.env.HOSTNAME}/profile/${user.user.name}`}
            passHref
            key={user.name}
          >
            <Avatar
              className={className}
              src={user.user.image}
              sx={{ width: 8, height: 8 }}
            ></Avatar>
          </Link>
        );
      })}
    </Fragment>
  );
};

export default Role;
