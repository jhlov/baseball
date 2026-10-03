import React from "react";

interface Prop {
  clickEnabled: boolean;
  onClickNumber: Function;
  isShowBackButton: boolean;
  onClickBack: Function;
}

/**
 * 하단 숫자판
 */
const Numbers: React.FC<Prop> = ({
  clickEnabled,
  onClickNumber,
  isShowBackButton,
  onClickBack
}) => {
  return (
    <div className="numbers">
      <div className="numbers-toolbar">
        <span className="hint-text">서로 다른 3자리 숫자를 입력하세요</span>
        <button
          type="button"
          className={`btn-back ${isShowBackButton ? "visible" : ""}`}
          disabled={!isShowBackButton}
          onClick={() => onClickBack()}
          aria-label="한 글자 지우기"
        >
          지우기 ⌫
        </button>
      </div>

      <div className="numbers-grid">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <button
              type="button"
              key={index}
              className="keypad-btn"
              disabled={!clickEnabled}
              onClick={() => onClickNumber(index)}
            >
              {index}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Numbers;
