import React, { useState } from "react";
import Answer from "./Answer";
import Numbers from "./Numbers";

const Game = () => {
  const [curAnswer, setCurAnswer] = useState<number[]>([]);

  const onClickNumber = (number: number) => {
    if (!curAnswer.includes(number)) {
      const newArr = [...curAnswer, number];
      setCurAnswer(newArr);
      console.log(newArr);

      if (newArr.length === 3) {
        console.log("정답 체크");
      }
    }
  };

  return (
    <div className="game d-flex flex-column">
      <h1 className="my-3">숫자 야구 게임</h1>
      <Answer answer={curAnswer} />
      <div className="border m-1 flex-fill">결과</div>
      <Numbers onClickNumber={onClickNumber} />
    </div>
  );
};

export default Game;
