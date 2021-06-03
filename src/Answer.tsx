import React from "react";

interface Props {
  number: number[];
}

const Answer: React.FC<Props> = ({ number }) => {
  return (
    <div className="answer">
      <div className="answer-item">{number[0]}</div>
      <div className="answer-item">{number[1]}</div>
      <div className="answer-item">{number[2]}</div>
    </div>
  );
};

export default Answer;
