"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { FaTimesCircle } from "react-icons/fa";
import { toasterStyles } from "./classNames";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ToasterProps } from "@/src/types/Toaster";

export type Status = "success" | "error";

const Toaster = ({ status, description, ...props }: ToasterProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!status || !description?.trim()) return;

    const toastOptions = {
      icon:
        status === "success" ? (
          <IoMdCheckmarkCircleOutline size={24} className="text-green-600" />
        ) : (
          <FaTimesCircle size={24} className="text-red-700" />
        ),
    };

    const content = (
      <div className="flex items-start gap-3">
        {toastOptions.icon}
        <div>
          <div className="font-semibold">
            {props.title || (status === "success" ? "Success" : "Error")}
          </div>
          <div>{description}</div>
        </div>
      </div>
    );

    toast[status === "success" ? "success" : "error"](content);
  }, [mounted, theme, status, description, props.title]);

  if (!mounted) return null;

  return (
    <Sonner
      className="toaster group flex flex-row items-start justify-start"
      toastOptions={{
        classNames: {
          toast: toasterStyles.toastContainerStyles,
          description: "group-[.toaster]:text-muted-foreground text-sm",
          success: "!bg-green-50 !border-green-600 !text-green-800",
          error: "!bg-red-100 !border-red-300 !text-red-600",
        },
      }}
      {...props}
    />
  );
};

export default Toaster;
