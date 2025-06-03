import clx from "clsx";
export const TextInputStyles = {
  labelStyle: clx(
    "flex flex-row items-center  gap-1 text-sm font-semibold text-gray-60 "
  ),
  inputStyle: clx(
    "flex  w-full rounded-lg border border-solid  bg-transparent px-3  py-2 text-base   transition-colors  disabled:cursor-not-allowed disabled:opacity-50 md:text-md md:leading-6 outline-none placeholder:font-light placeholder:text-sm"
  ),
  requiredInputStyle: clx("border-red-500 focus:ring-red-500"),
  errorMsg: clx("text-red-500 text-xs mt-1 "),
  showPasswordIcon: clx(
    "absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-xl text-gray-60"
  ),
};
export const getAditionalStyles = (className?: string) => {
  return clx(TextInputStyles.inputStyle, className);
};
