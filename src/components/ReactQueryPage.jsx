import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function ReactQueryPage() {
  const fetchPost = (queryData) => {
    const id = queryData.queryKey[1];
    return axios.get(`http://localhost:3004/posts/${id}`);
  };
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["posts", 1],
    queryFn: fetchPost,
    retry: 1,
    // staleTime: 60000, // 1분(60초) // 기본값은 0
    // gcTime: 10000, // 10초만 캐시가 유지 // stale < gctime
    select: (data) => {
      return data.data;
    },
    // enabled: false, // 기본값 true
    // refetchInterval: 3000,
    // refetchOnMount: false, // 기본값 true
    // refetchOnWindowFocus: true,
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
      {/* {data?.map((item) => (
        <div>{item.title}</div>
      ))} */}
      <button onClick={refetch}>post 리스트 다시 들고오기</button>
    </div>
  );
}

export default ReactQueryPage;
