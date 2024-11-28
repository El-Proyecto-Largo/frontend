import { useQuery } from "react-query";
import axios from "axios";

import PostCard from "@/components/PostCard";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import SocialBar from "@/components/SocialBar";

const userLatitude = Number(localStorage.getItem('latitude') || -1);
const userLongitude = Number(localStorage.getItem('longitude') || -1);

export interface PostDatabaseProps {
  title: string,
  body: string,
  image: string | null,
  latitude: number,
  longitude: number,
  authorId: string,
  tags: string[] | null,
  _id: string,
}

async function getPosts() {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/getlocalposts`, {
    latitude: userLatitude,
    longitude: userLongitude,
    distance: 12,
  });

  return response.data;
}

export default function SocialPage() {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery("postsData", getPosts);

  if (isLoading) return <LoadingPage />
  if (error) return <ErrorPage errorMessage={`${error}`}/>

  return (
    <>
      <div className="p-5 2xl:columns-6 xl:columns-5 lg:columns-4 sm:columns-3 columns-2 gap-4">
        {posts.map((post: PostDatabaseProps) =>
          <PostCard key={post._id}
            title={post.title}
            body={post.body}
            image={post.image}
            latitude={post.latitude}
            longitude={post.longitude}
            authorId={post.authorId}
            tags={post.tags}
            id={post._id}
          />
        )}
      </div>
    </>
  );
}