import { makeCxFunc } from "@packages/rb-utils/parserUtils";

import style from "./Button.module.scss";

type Props = {
  className?: string;
}

const cx = makeCxFunc(style);

const Button = ({ className = '' }: Props) => {
  return (
    <div className={cx('button', className)}>
      Button
    </div>
  );
};

export default Button;