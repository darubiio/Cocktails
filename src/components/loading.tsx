import React from "react";

export const Loading = ({ loading }: { loading: boolean }) => {
  return <>{loading && <p>Loading...</p>}</>;
};
