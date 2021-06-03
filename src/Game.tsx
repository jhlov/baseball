import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import Numbers from "./Numbers";
import Result from "./Result";

const Game = () => {
  const [answerNumber, setAnswerNumber] = useState<number[]>([]);
  const [curNumber, setCurNumber] = useState<number[]>([]);
  const [numberList, setNumberList] = useState<number[][]>([]);

  useEffect(() => {
    console.log("mounted");
    const arr: number[] = [];

    // 정답
    for (let i = 0; i < 3; ++i) {
      const n = Math.floor(Math.random() * 10);
      if (!arr.includes(n)) {
        arr.push(n);
      } else {
        i -= 1;
        continue;
      }
    }

    setAnswerNumber(arr);
  }, []);

  const onClickNumber = (number: number) => {
    // 새로운 숫자가 들어옴
    if (curNumber.length === 3) {
      setCurNumber([number]);
    } else if (!curNumber.includes(number)) {
      const newNumber = [...curNumber, number];
      setCurNumber(newNumber);

      if (newNumber.length === 3) {
        const newNumberList = [...numberList, newNumber];
        //console.log(newNumberList);
        setNumberList(newNumberList);
      }
    }
  };

  return (
    <div className="game d-flex flex-column">
      <h1 className="my-3">숫자 야구 게임</h1>
      <Answer number={curNumber} />
      <Result answer={answerNumber} numberList={numberList} />
      <Numbers onClickNumber={onClickNumber} />
    </div>
  );
};

export default Game;
