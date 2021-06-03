import React from "react";
import ResultItem from "./ResultItem";

interface Props {
  answer: number[];
  numberList: number[][];
}

const Result: React.FC<Props> = ({ answer, numberList }) => {
  return (
    <div className="result my-3 flex-fill">
      {numberList.map((e, index) => (
        <ResultItem key={index} answer={answer} number={e} />
      ))}
    </div>
  );
};

export default Result;
