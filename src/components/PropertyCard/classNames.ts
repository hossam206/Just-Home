import clx from "clsx";
export const peopertyCardStyles = {
  container: clx(
    "rounded-xl overflow-hidden border shadow-sm bg-white transition space-y-4 p-2 group"
  ),
  forRent: clx(
    "absolute top-3 left-2 bg-primary text-white text-xs px-3 py-1 rounded-full shadow z-20"
  ),
  editBtn: clx(
    "absolute -right-2 top-2 rounded-full text-gray-800 bg-gray-200 w-10 h-10 z-20 overflow-hidden cursor-pointer",
    "translate-x-full group-hover:-translate-x-3 transition-transform duration-300 ease-in-out",
    "flex items-center justify-center hover:bg-gray-800 hover:text-white"
  ),

  Location: clx(
    "flexRow justify-start gap-1 text-gray-70 hover:text-gray-80 cursor-pointer text-xs"
  ),
  FeatureContainer: clx(
    "flexRow  justify-between text-xs text-gray-70 px-2  pb-2 gap-2 "
  ),
};
