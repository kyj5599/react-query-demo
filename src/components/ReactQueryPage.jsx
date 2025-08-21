import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function ReactQueryPage() {
  const fetchPost = () => {
    return axios.get("http://localhost:3004/posts");
  };
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPost,
    // retry: 에러 시도 3번(총 4회)
    retry: 1,
    staleTime: 60000, // 1분(60초) // 기본값은 0
    gcTime: 10000, // 10초만 캐시가 유지 // stale < gctime
    select: (data) => {
      return data.data;
    },
  });
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
      {data.map((item) => (
        <div>{item.title}</div>
      ))}
    </div>
  );
}

export default ReactQueryPage;
