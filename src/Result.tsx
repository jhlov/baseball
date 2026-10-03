import React from "react";
import ResultItem from "./ResultItem";

interface Props {
  answer: number[];
  numberList: number[][];
}

const Result: React.FC<Props> = ({ answer, numberList }) => {
  return (
    <div className="result my-2 flex-fill">
      {Array(9)
        .fill(0)
        .map((_, index) => {
          const item = numberList[index];
          if (item) {
            return (
              <ResultItem
                key={index}
                round={index + 1}
                answer={answer}
                number={item}
                isLatest={index === numberList.length - 1}
              />
            );
          }
          return (
            <div key={index} className="result-item empty-slot">
              <span className="round-label">{index + 1}회</span>
            </div>
          );
        })}
    </div>
  );
};

export default Result;
