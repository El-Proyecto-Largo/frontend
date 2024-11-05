import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import PostThreadMainCard from "@/components/PostThreadMainCard";
import PostThreadReplyCard, { ReplyProps } from "@/components/PostThreadReplyCard";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { useState } from "react";
import { PostDatabaseProps } from "./SocialPage";
import PostThreadAuthor from "@/components/PostThreadAuthor";
import PostPageBar from "@/components/PostPageBar";

// TODO

export default function PostPage() {
  const { id } = useParams();

  const [mainPost, setMainPost] = useState<null | PostDatabaseProps>(null);

  async function getPost() {
    const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
    return response;
  }

  async function getReplies() {
    const response = await axios.get(`http://localhost:5000/api/posts/${id}/replies`);
    return response;
  }

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useQuery("postData", getPost, {
    onSuccess: (post) => {
      setMainPost(post.data[0]);
    }
  });

  const {
    data: replies,
    error: repliesError,
    isLoading: repliesLoading,
  } = useQuery("repliesData", getReplies)

  if (postLoading || repliesLoading) return <LoadingPage />
  if (postError || repliesError) return <ErrorPage errorMessage={`Error!`} />

  return (
    <>
      <PostPageBar />
      <div className="p-5">
        {mainPost ?
          <div>
            <PostThreadMainCard
              key={mainPost._id}
              title={mainPost.title}
              body={mainPost.body}
              image={mainPost.image}
              latitude={mainPost.latitude}
              longitude={mainPost.longitude}
              authorId={mainPost.authorId}
              tags={mainPost.tags}
              id={mainPost._id}
            />
          </div> : <></>}
        <div className="flex flex-col gap-3">
          {replies?.data.map((reply: ReplyProps) =>
            <div key={reply._id}>
              <PostThreadReplyCard body={reply.body} image={reply.image} authorId={reply.authorId} id={reply._id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}