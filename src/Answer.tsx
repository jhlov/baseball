import React from "react";

interface Props {
  answer: number[];
}

const Answer: React.FC<Props> = ({ answer }) => {
  return (
    <div className="answer">
      <div className="answer-item">{answer[0]}</div>
      <div className="answer-item">{answer[1]}</div>
      <div className="answer-item">{answer[2]}</div>
    </div>
  );
};

export default Answer;
