import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

/**
 * foruser
 * following
 * allposts
 */
const Posts = ({ feedtype, username, userId }) => {
  const postEndpoint = () => {
    switch (feedtype) {
      case "foruser":
        return "api/posts/all";
      case "following":
        return "api/posts/following";
      case "allposts":
        return `api/posts/user/${username}`;
      default:
        return "api/posts/all";
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
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsFn,
  });


  

  return <div>Posts</div>;
};

export default Posts;
