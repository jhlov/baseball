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

  const result = () => {
    const r = Array(strike())
      .fill(0)
      .map(_ => "S")
      .concat(
        Array(ball())
          .fill(0)
          .map(_ => "B")
      )
      .concat(
        Array(3 - strike() - ball())
          .fill(0)
          .map(_ => "OUT")
      );

    console.log(r);
    return r;
  };

  return (
    <div className="result-item">
      <div>
        {number.map((e, index) => (
          <span key={index}>{e}</span>
        ))}
      </div>
      <div>
        {result().map((e, index) => (
          <span key={index} className={e}>
            {e}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ResultItem;
