import React from "react";
import Button from "react-bootstrap/Button";

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
      {isShowBackButton && (
        <Button
          variant="danger"
          className="btn-back"
          onClick={() => onClickBack()}
        >
          ←
        </Button>
      )}

      <div className="numbers-grid">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Button
              key={index}
              disabled={!clickEnabled}
              onClick={() => onClickNumber(index)}
            >
              {index}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Numbers;
