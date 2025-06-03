import { useEffect, RefObject } from "react";

type ClickOutsideProps<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T>;
  setTarget: React.Dispatch<React.SetStateAction<boolean>>;
  eventType?: "click" | "mousedown" | "touchstart";
};
export const useClickOutside = <T extends HTMLElement>({
  ref,
  setTarget,
  eventType = "click",
}: ClickOutsideProps<T>) => {
  useEffect(() => {
    if (!ref.current || !setTarget) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTarget(false);
      }
    };
    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, [ref, setTarget, eventType]);
};
