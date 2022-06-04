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

const Role = ({ team, role }) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    console.log({ team, role });
    reqCitizen(team, role)
      .then((data) => {
        console.log(data);
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
          >
            <Avatar src={user.user.image}></Avatar>
          </Link>
        );
      })}
    </Fragment>
  );
};

export default Role;