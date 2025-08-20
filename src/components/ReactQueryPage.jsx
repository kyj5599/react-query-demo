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
    select: (data) => {
      return data.data;
    },
    gcTime: 5000, // 5초
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
