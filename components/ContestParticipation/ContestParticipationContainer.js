/*
정도현
*/


import React from "react";

const ContestParticipations = (props) => {
  return (
    <>
      <li>{props.name}</li>
      <header>
        {props.start_period.substring(0, 10) +
          " ~ " +
          props.end_period.substring(0, 10)}
      </header>
    </>
  );
};

const ContestParticipationContainer = (props) => {
  return (
    <>
      {props.datas.map((contestParticipationData, i) => {
        return (
          <ContestParticipations
            name={contestParticipationData.name}
            start_period={contestParticipationData.start_period}
            end_period={contestParticipationData.end_period}
            key={i}
          />
        );
      })}
    </>
  );
};

export default ContestParticipationContainer;
