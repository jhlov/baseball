import React from "react";
import Button from "react-bootstrap/Button";

interface Prop {
  onClickNumber: Function;
}

/**
 * 하단 숫자판
 */
const Numbers: React.FC<Prop> = ({ onClickNumber }) => {
  return (
    <div className="numbers">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <Button key={index} onClick={() => onClickNumber(index)}>
            {index}
          </Button>
        ))}
    </div>
  );
};

export default Numbers;
