/*
정도현
*/


import React from "react";

const Teams = (props) => {
  return (
    <>
      <li>팀 번호 : {props.id}</li>
      <header>{props.contest[0]?.name}에 참가한 팀</header>
    </>
  );
};

const TeamsContainer = (props) => {
  return (
    <>
      {props.datas.map((teamData, i) => {
        return <Teams contest={teamData.contest} id={teamData.id} key={i} />;
      })}
    </>
  );
};

export default TeamsContainer;
