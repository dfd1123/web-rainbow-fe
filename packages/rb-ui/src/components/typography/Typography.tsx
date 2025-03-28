import React, { HTMLAttributes, ReactNode, createElement } from "react";

import { makeCxFunc } from "@packages/rb-utils/parserUtils";

import {
  TypographyType,
  TypographyColorType,
} from "@/constants/sematicCssVariables.c";

import style from "./Typography.module.scss";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  tag?: "h" | "p" | "span" | "font" | "label";
  hLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  type?: TypographyType;
  color?: TypographyColorType;
  children: ReactNode;
}

type TypographyHProps = Omit<TypographyProps, "tag">;
type TypographyPProps = Omit<TypographyProps, "tag" | "hLevel">;
type TypographySpanProps = Omit<TypographyProps, "tag" | "hLevel">;
type TypographyFontProps = Omit<TypographyProps, "tag" | "hLevel">;
type TypographyLabelProps = Omit<TypographyProps, "tag" | "hLevel">;

const cx = makeCxFunc(style);

/**
 * `Typography` 컴포넌트는 텍스트 스타일을 적용하기 위한 컴포넌트입니다.
 *
 * @param {string} [props.className] - 컴포넌트 클래스명
 * @param {string} [props.tag='span'] - 컴포넌트 태그
 * @param {number} [props.hLevel=1] - h 태그의 레벨
 * @param {TypographyType} [props.type] - 텍스트 스타일
 * @param {TypographyColorType} [props.color] - 텍스트 색상
 * @param {ReactNode} [props.children] - 컴포넌트 자식 노드
 * @returns 텍스트 스타일 컴포넌트
 */
const Typography = ({
  className,
  tag = "span",
  hLevel = 1,
  type,
  color,
  children,
}: TypographyProps) => {
  //logic

  return createElement(
    tag === "h" ? `${tag}${hLevel}` : tag,
    {
      className: cx("typography", className, type),
      style: {
        color: color ? `var(--rb-${color})` : undefined,
      },
    },
    children,
  );
};

export const H = (props: TypographyHProps) => <Typography {...props} tag="h" />;
export const P = (props: TypographyPProps) => <Typography {...props} tag="p" />;
export const Span = (props: TypographySpanProps) => (
  <Typography {...props} tag="span" />
);
export const Font = (props: TypographyFontProps) => (
  <Typography {...props} tag="font" />
);
export const Label = (props: TypographyLabelProps) => (
  <Typography {...props} tag="label" />
);

Typography.H = H;
Typography.P = P;
Typography.Span = Span;
Typography.Font = Font;
Typography.Label = Label;

export type {
  TypographyProps,
  TypographyHProps,
  TypographyPProps,
  TypographySpanProps,
  TypographyFontProps,
  TypographyLabelProps,
  TypographyType,
  TypographyColorType,
};
export default Typography;
