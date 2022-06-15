// 배효운

import React from "react";
import Image from "next/image";

const ResumeName = (props) => {
  return (
    <>
      <Image
        src={
          props.image_url !== null
            ? props.image_url
            : `/asset/image/background/contest/default.svg`
        }
        alt="이미지"
        width={200}
        height={400}
      />
      <a>{props.resume_name}</a>
    </>
  );
};

const ResumeContainer = (props) => {
  return (
    <>
      {props.tags.map((resumeData, i) => {
        return (
          <ResumeName
            image_url={resumeData.image_url}
            resume_name={resumeData.resume_name}
            key={i}
          />
        );
      })}
    </>
  );
};

export default ResumeContainer;
