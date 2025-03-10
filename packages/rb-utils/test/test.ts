import React from "react";

type Props = {
  className?: string;
}

const Test = ({ className = '' }: Props) => {
  return (
    <div className={className}>
      Test
    </div>
  );
};

export default Test;