import React, { useEffect, useRef } from "react";

interface Props {
  status: "win" | "lose" | null;
  round: number;
  answer: number[];
  onRestart: () => void;
}

const GameModal: React.FC<Props> = ({ status, round, answer, onRestart }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status) {
      // 모달이 열리면 재시작 버튼으로 자동 포커스 (Enter/Space로 바로 재시작 가능)
      btnRef.current?.focus();
    }
  }, [status]);

  if (!status) return null;

  const isWin = status === "win";

  return (
    <div className="game-modal-overlay" onClick={onRestart}>
      <div
        className="game-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={`modal-icon-wrapper ${isWin ? "win" : "lose"}`}>
          {isWin ? "🏆" : "⚾"}
        </div>

        <h2 className={`modal-title ${isWin ? "win" : "lose"}`}>
          {isWin ? "홈런! 승리했습니다!" : "아쉽네요! 게임 오버"}
        </h2>

        <p className="modal-desc">
          {isWin ? (
            <>
              축하합니다! <span className="highlight-round">{round}회</span> 만에 정답을 맞추셨어요! 🎉
            </>
          ) : (
            <>9회까지 승부를 가리지 못했습니다. 😢</>
          )}
        </p>

        <div className="modal-answer-box">
          <div className="answer-box-label">
            {isWin ? "맞춘 정답" : "숨겨진 정답"}
          </div>
          <div className="answer-digits">
            {answer.map((digit, idx) => (
              <span key={idx} className="digit-badge">
                {digit}
              </span>
            ))}
          </div>
        </div>

        <button
          ref={btnRef}
          className={`modal-btn-restart ${isWin ? "win" : "lose"}`}
          onClick={onRestart}
        >
          <span>{isWin ? "다시 플레이하기" : "한 번 더 도전하기"}</span>
          <span>🔄</span>
        </button>
      </div>
    </div>
  );
};

export default GameModal;
