import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import Numbers from "./Numbers";
import Result from "./Result";

const Game = () => {
  const [answerNumber, setAnswerNumber] = useState<number[]>([]);
  const [curNumber, setCurNumber] = useState<number[]>([]);
  const [numberList, setNumberList] = useState<number[][]>([]);
  const [clickEnabled, setClickEnabled] = useState<boolean>(true);

  useEffect(() => {
    console.log("mounted");
    updateAnswerNumber();
  }, []);

  const updateAnswerNumber = () => {
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
  };

  const init = () => {
    updateAnswerNumber();
    setCurNumber([]);
    setNumberList([]);
  };

  const onClickNumber = (number: number) => {
    if (curNumber.length === 3) {
      // 새로운 숫자가 들어옴
      setCurNumber([number]);
    } else if (!curNumber.includes(number)) {
      const newNumber = [...curNumber, number];
      setCurNumber(newNumber);

      if (newNumber.length === 3) {
        const newNumberList = [...numberList, newNumber];
        //console.log(newNumberList);
        setNumberList(newNumberList);
        setClickEnabled(false);
        setTimeout(() => {
          setClickEnabled(true);
        }, 1000);

        // 정답 체크
        if (answerNumber.join() === newNumber.join()) {
          setTimeout(() => {
            alert("승리!!!");
            init();
          }, 1000);
        } else if (newNumberList.length === 9) {
          // 실패 체크
          setTimeout(() => {
            alert("실패!!!");
            init();
          }, 1000);
        }
      }
    }
  };

  const onClickBack = () => {
    if (0 < curNumber.length && curNumber.length < 3) {
      setCurNumber(curNumber.slice(0, curNumber.length - 1));
    }
  };

  return (
    <div className="game d-flex flex-column">
      <h1 className="my-3">숫자 야구 게임</h1>
      <Answer number={curNumber} />
      <Result answer={answerNumber} numberList={numberList} />
      <Numbers
        clickEnabled={clickEnabled}
        onClickNumber={onClickNumber}
        isShowBackButton={0 < curNumber.length && curNumber.length < 3}
        onClickBack={onClickBack}
      />
    </div>
  );
};

export default Game;
