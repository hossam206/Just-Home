import clx from "classnames";
export const LoginStyles = {
  welcomeMsgContainer: clx(
    "flex flex-row items-center justify-center    gap-2 w-full "
  ),
  chooseLoginVia: clx(
    "flex flex-row items-center mx-auto gap-2 mt-6  w-full rounded-lg p-1 overflow-hidden bg-[#EFEFEF]"
  ),
  SocialBtn: clx(
    "border border-solid border-grayColor !rounded-full w-full font-medium   tracking-normal gap-2 px-3 py-3  !justify-start items-start text-sm text-black/70  hover:bg-gray-10 Transition "
  ),
  phoneInput: clx(
    " w-full bg-transparent outline-none h-full    border border-solid  bg-transparent outline-none text-base transition-colors disabled:cursor-not-allowed   placeholder:font-light placeholder:text-sm outline-none rounded-xl  "
  ),
  labelStyle: clx("text-sm mb-1 block"),
  loginVia: clx(
    "  text-sm w-full rounded-lg px-2 py-2  text-center cursor-pointer hover:opcity-70"
  ),
  forgetPassword: clx(
    " block  text-right hover:underline transition-all duration-500 ease-in-out  text-sm font-normal"
  ),
  wrongCredintials: clx(
    "items-start gap-1 p-2 rounded-lg bg-red-100 border  border-red-300 my-2  transition-opacity duration-300 ease-in-out "
  ),
};
