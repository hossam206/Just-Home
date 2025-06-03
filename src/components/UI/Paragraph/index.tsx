import React from "react";
import {
  alignStyles,
  colorStyles,
  getParagraphStyles,
  sizeStyles,
} from "./classNames";

type ParagraphProps = {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof sizeStyles;
  color?: keyof typeof colorStyles;
  align?: keyof typeof alignStyles;
};

const Paragraph = ({
  children,
  className = "",
  size = "md",
  color = "dark",
  align = "center",
}: ParagraphProps) => {
  const combinedStyles = getParagraphStyles(size, color, align, className);
  return <p className={combinedStyles}>{children}</p>;
};

export default Paragraph;
