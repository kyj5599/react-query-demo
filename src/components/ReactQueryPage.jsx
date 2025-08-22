import React from "react";
import { usePostQuery } from "../hooks/usePosts";

function ReactQueryPage() {
  const { data, isLoading, isError, error, refetch } = usePostQuery();
  console.log("ddd", data, isLoading);
  console.log("error", isError, error);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
      <button onClick={refetch}>post 리스트 다시 들고오기</button>
    </div>
  );
}

export default ReactQueryPage;
