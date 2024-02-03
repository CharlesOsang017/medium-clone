import React from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../../loading/Loading";
import PostCard from "./PostCard";

const Posts = () => {
  const { data, loading } = useFetch("posts");
  // console.log(data)
  return (
    <div className='flex flex-col gap-[2.5rem]'>
      {loading ? (
        <Loading />
      ) : (
        data.map((post, i) => <PostCard post={post} key={i} />)
      )}
    </div>
  );
};

export default Posts;
