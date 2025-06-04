import clx from "clsx";

export const HeaderStyles = {
  container: clx(
    "relative   bg-no-repeat bg-cover md:bg-center min-h-screen text-white flex flex-col"
  ),
  contetDiv: clx(
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "p-4 md:p-10 flex flex-col items-center justify-center space-y-4",
    "w-full max-w-[90%] md:max-w-2xl text-center"
  ),
  guidText: clx(
    "rounded-full py-2  w-fit px-2 md:px-4  text-center block text-xs border border-solid border-white"
  ),
  sellORrent: clx(
    "border-b-2 border-white hover:text-white pb-1 cursor-pointer"
  ),
  inputDiv: clx(
    "flex flex-row justify-between items-center gap-2 w-full bg-white rounded-full px-2 py-1 mt-4 shadow-md"
  ),
  inputStyle: clx(
    "bg-transparent w-full border-none text-sm placeholder:text-gray-60 text-black"
  ),
};
