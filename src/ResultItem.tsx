import classNames from "classnames";
import React from "react";

interface Props {
  answer: number[];
  number: number[];
  round?: number;
  isLatest?: boolean;
}

const ResultItem: React.FC<Props> = ({ answer, number, round, isLatest }) => {
  const strikeCount = answer.filter((e, index) => e === number[index]).length;
  const ballCount = number.filter(e => answer.includes(e)).length - strikeCount;
  const outCount = 3 - strikeCount - ballCount;

  // 항상 총 3개의 결과(S + B + O = 3)가 1, 2, 3 단계로 순차 점등
  let stepIndex = 0;
  const nextDelayClass = () => {
    stepIndex += 1;
    return isLatest ? `delay-step-${stepIndex}` : "";
  };

  return (
    <div className={classNames(["result-item", "filled", isLatest && "latest-item"])}>
      {round && <span className="item-round">{round}회</span>}
      <div className="number-row">
        {number.map((e, index) => (
          <span key={index} className="num">{e}</span>
        ))}
      </div>
      <div className="scoreboard">
        <div className="score-row">
          <span className="score-label label-s">S:</span>
          <div className="lamp-group">
            {strikeCount > 0 &&
              Array(strikeCount)
                .fill(0)
                .map((_, idx) => (
                  <span
                    key={idx}
                    className={classNames(["lamp", "lamp-s", nextDelayClass()])}
                  />
                ))}
          </div>
        </div>

        <div className="score-row">
          <span className="score-label label-b">B:</span>
          <div className="lamp-group">
            {ballCount > 0 &&
              Array(ballCount)
                .fill(0)
                .map((_, idx) => (
                  <span
                    key={idx}
                    className={classNames(["lamp", "lamp-b", nextDelayClass()])}
                  />
                ))}
          </div>
        </div>

        <div className="score-row">
          <span className="score-label label-o">O:</span>
          <div className="lamp-group">
            {outCount > 0 &&
              Array(outCount)
                .fill(0)
                .map((_, idx) => (
                  <span
                    key={idx}
                    className={classNames(["lamp", "lamp-o", nextDelayClass()])}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
