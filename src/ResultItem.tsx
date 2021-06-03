import React from "react";

interface Props {
  answer: number[];
  number: number[];
}

const ResultItem: React.FC<Props> = ({ answer, number }) => {
  const strike = () => {
    return answer.filter((e, index) => e === number[index]).length;
  };

  const ball = () => {
    return number.filter(e => answer.includes(e)).length - strike();
  };

  return (
    <div className="result-item">
      <div>
        {number.map((e, index) => (
          <span key={index}>{e}</span>
        ))}
      </div>
      <div>
        {strike()}S {ball()}B
      </div>
    </div>
  );
};

export default ResultItem;
