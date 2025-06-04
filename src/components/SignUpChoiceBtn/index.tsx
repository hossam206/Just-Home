import React from "react";
import { SignUpChoiceBtnStyles } from "./classNames";

import Image from "next/image";
import Button from "../UI/Button";

type SignUpChoiceBtnProps = {
  name: string;
  Img: string;
  func?: () => void;
};

const SignUpChoiceBtn: React.FC<SignUpChoiceBtnProps> = ({
  name,
  Img,
  func,
}) => {
  return (
    <Button onClick={func} className={SignUpChoiceBtnStyles.SocialBtn}>
      <Image src={Img} alt={name} width={20} height={20} />
      <span className="block">{name}</span>
    </Button>
  );
};

export default React.memo(SignUpChoiceBtn);
