import { useQuery } from "react-query";
import axios from "axios";
import PostCard from "@/components/PostCard";

const userLatitude = () => Number(localStorage.getItem('latitude') || -1);
const userLongitude = () => Number(localStorage.getItem('longitude') || -1);

async function getPosts() {
  const response = await axios.post("http://localhost:5000/api/findlocalposts", {
    latitude: userLatitude,
    longitude: userLongitude,
    distance: 2,
  });

  return response.data;
}

export default function SocialPage() {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery("postsData", getPosts);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error retrieving data.</p>
  }

  return (
    <>
      <div className="p-5 2xl:columns-6 xl:columns-5 lg:columns-4 sm:columns-3 columns-2 gap-4">
        {posts.map((post) => (
          <PostCard
            title={post.title}
            body={post.body}
            image={post.image}
            latitude={post.latitude}
            longitude={post.longitude}
            author={post.authorId}
            tags={post.tags}
          />
        ))}
      </div>
    </>
  );
}