import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { MdDoNotDisturbAlt } from "react-icons/md";
import PostCard from "./Post";
import LoadingSpin from "../../components/normal/LoadingSpin";

/**
 * foruser
 * following
 * allposts
 *
 * username is for profile based posts?
 */
const Posts = ({ feedtype, username, userId }) => {
  const isDev = import.meta.env.MODE === "development";

  const postEndpoint = () => {
    switch (feedtype) {
      case "foruser":
        return isDev
          ? "/api/posts/all"
          : `${import.meta.env.VITE_API_BASE_URL}/api/posts/all`;
      case "following":
        return isDev
          ? "/api/posts/following"
          : `${import.meta.env.VITE_API_BASE_URL}/api/posts/following`;
      case "allposts":
        return `/api/posts/user/${username}`;
      default:
        return isDev
          ? "/api/posts/all"
          : `${import.meta.env.VITE_API_BASE_URL}/api/posts/all`;
    }
  };

  const URL = postEndpoint();

  const getPostsFn = async () => {
    try {
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error(data.error || "Fetching feed post went wrong");
      }

      const data = await res.json();

      return data;
    } catch (e) {
      throw new Error(e);
    }
  };
  const {
    data: posts,
    isloading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsFn,
  });

  useEffect(() => {
    refetch();
  }, [feedtype, refetch, username]);

  return (
    <>
      {(isloading || isRefetching) && (
        <div className="flex flex-col w-full items-center justify-center">
          <LoadingSpin />
        </div>
      )}
      {!isloading && !isRefetching && posts?.length === 0 && (
        <p className="text-center my-4 text-white/70 ">
          <MdDoNotDisturbAlt className="text-center my-2 text-white/50 w-full text-4xl" />
          Currently unavailable!
        </p>
      )}

      {!isloading && !isRefetching && posts && (
        <div className="">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
