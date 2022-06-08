import React from "react";

export const ErrorM = ({ err }: { err: string }) => {
  return <>{err && <p role="alert">{err}</p>}</>;
};
