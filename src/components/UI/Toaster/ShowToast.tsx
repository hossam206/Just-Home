import React from "react";
import { toast } from "sonner";

const ShowToast = (
  status: "success" | "error",
  title: string,
  description: string
): void => {
  const content = (
    <div>
      <div className="font-bold capitalize">{title}</div>
      <div className="font-medium">{description}</div>
    </div>
  );

  if (status == "success") {
    toast.success(content);
  } else {
    toast.error(content);
  }
};

export default ShowToast;
