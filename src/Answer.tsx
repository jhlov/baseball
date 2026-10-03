import React from "react";

interface Props {
  number: number[];
}

const Answer: React.FC<Props> = ({ number }) => {
  return (
    <div className="answer">
      {[0, 1, 2].map((idx) => {
        const val = number[idx];
        const isFilled = val !== undefined;
        return (
          <div key={idx} className={`answer-item ${isFilled ? "has-value" : "empty"}`}>
            {isFilled ? val : <span className="placeholder-dot">·</span>}
          </div>
        );
      })}
    </div>
  );
};

export default Answer;
