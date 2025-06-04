import React, { useMemo } from "react";
type errorProps = {
  error: unknown;
};
export const HandleError = ({ error }: errorProps) => {
  const formattedError = useMemo(() => {
    if (!error) return "Unknown error occurred";

    if (typeof error === "string") {
      return error;
    }

    if (error instanceof Error) {
      return error.message;
    }

    // Handle API response errors
    if (typeof error === "object" && error !== null) {
      if ("message" in error && typeof error.message === "string") {
        return error.message;
      }

      try {
        return JSON.stringify(error, null, 2);
      } catch {
        return "An error occurred, but it couldn't be processed.";
      }
    }

    return "An unexpected error occurred.";
  }, [error]); // Only recompute when `error` changes

  return (
    <div>
      <span className="text-xs text-red-600">{formattedError}</span>
    </div>
  );
};
