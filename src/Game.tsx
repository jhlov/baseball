import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import GameModal from "./GameModal";
import Numbers from "./Numbers";
import Result from "./Result";

const Game = () => {
  const [answerNumber, setAnswerNumber] = useState<number[]>([]);
  const [curNumber, setCurNumber] = useState<number[]>([]);
  const [numberList, setNumberList] = useState<number[][]>([]);
  const [clickEnabled, setClickEnabled] = useState<boolean>(true);
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | null>(null);

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
    setGameStatus(null);
    setClickEnabled(true);
    setTimeout(() => {
      window.focus();
      gameRef.current?.focus();
    }, 50);
  };

  const onClickNumber = (number: number) => {
    if (gameStatus) return;

    if (curNumber.length === 3) {
      // 새로운 숫자가 들어옴
      setCurNumber([number]);
    } else if (!curNumber.includes(number)) {
      const newNumber = [...curNumber, number];
      setCurNumber(newNumber);

      if (newNumber.length === 3) {
        const newNumberList = [...numberList, newNumber];
        setNumberList(newNumberList);
        // 순차 판정 애니메이션 동안 클릭 잠금 (1.8초)
        setClickEnabled(false);
        setTimeout(() => {
          setClickEnabled(true);
        }, 1800);

        // 정답 체크 (결과 램프 3단계 점등 완료 후 모달 표시)
        if (answerNumber.join() === newNumber.join()) {
          setTimeout(() => {
            setGameStatus("win");
          }, 1900);
        } else if (newNumberList.length === 9) {
          // 실패 체크
          setTimeout(() => {
            setGameStatus("lose");
          }, 1900);
        }
      }
    }
  };

  const onClickBack = () => {
    if (gameStatus) return;
    if (0 < curNumber.length && curNumber.length < 3) {
      setCurNumber(curNumber.slice(0, curNumber.length - 1));
    }
  };

  const gameRef = React.useRef<HTMLDivElement>(null);
  const handlersRef = React.useRef({ onClickNumber, onClickBack, clickEnabled, gameStatus });
  handlersRef.current = { onClickNumber, onClickBack, clickEnabled, gameStatus };

  useEffect(() => {
    // 마운트 시 게임 컨테이너로 포커스 자동 이동
    window.focus();
    gameRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // 모달이 열려있거나 키를 꾹 누르고 있을 때의 연속 트리거 방지
      if (handlersRef.current.gameStatus || e.repeat) return;

      // 0~9 숫자 키패드 지원
      if (/^[0-9]$/.test(e.key)) {
        if (handlersRef.current.clickEnabled) {
          e.preventDefault();
          handlersRef.current.onClickNumber(parseInt(e.key, 10));
        }
      } else if (e.key === "Backspace") {
        e.preventDefault();
        handlersRef.current.onClickBack();
      }
    };

    // window 단일 리스너 등록
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={gameRef}
      tabIndex={-1}
      className="game d-flex flex-column"
      style={{ outline: "none" }}
    >
      <h1 className="game-title">
        <span className="icon">⚾</span> 숫자 야구 게임
      </h1>
      <Answer number={curNumber} />
      <Result answer={answerNumber} numberList={numberList} />
      <Numbers
        clickEnabled={clickEnabled}
        onClickNumber={onClickNumber}
        isShowBackButton={0 < curNumber.length && curNumber.length < 3}
        onClickBack={onClickBack}
      />

      <GameModal
        status={gameStatus}
        round={numberList.length}
        answer={answerNumber}
        onRestart={init}
      />
    </div>
  );
};

export default Game;
