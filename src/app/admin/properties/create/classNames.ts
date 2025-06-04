import clx from "clsx";
export const createStyles = {
  container: clx(
    "max-w-5xl my-4 mx-auto p-6 bg-white border border-solid rounded-lg"
  ),
  labelStyle: clx(
    "flex flex-row items-center  gap-1 text-sm  text-gray-70 mb-1"
  ),
  selectStyle: clx(
    "w-full border border-gray-30 p-3 rounded-md text-sm font-normal  text-gray-80 outline-none"
  ),
  addImageDiv: clx(
    "flex w-full flex-col md:flex-row gap-4 items-start md:items-end col-span-12"
  ),
  addImageBtn: clx(
    "bg-green-700 text-white px-2 py-2 rounded-md text-sm font-thin"
  ),
  removeImgBtn: clx(
    "text-red-600 bg-red-100 flexRow block rounded-full hover:bg-red-500 cursor-pointer hover:text-white Transiion"
  ),
  addPropertyBtn: clx(
    " bg-green-700  text-white px-6 py-2 rounded-md !text-sm font-medium"
  ),
};
