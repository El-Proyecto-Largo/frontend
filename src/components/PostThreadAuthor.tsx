import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

interface AuthorProps {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  image?: string | null,
}

// TODO

export default function PostThreadAuthor({ authorId }: { authorId: string }) {
  async function getAuthor() {
    console.log(authorId)
    const response = await axios.get(`http://localhost:5000/api/users/${authorId}`);
    return response;
  }

  const {
    data: author,
    error,
    isLoading,
  } = useQuery(["authorData", authorId], getAuthor);

  if (isLoading ) {
    return <p>loading</p>
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <div>
      <figure>
        {author.data.image ? (
          <img src={author.data.image} className="object-cover h-32 w-32" />
        ) : <img src="/src/assets/default.png" className="object-cover h-32 w-32" />}
        <figcaption>{`${author.data.firstName} ${author.data.lastName}`}</figcaption>
      </figure>
    </div>
  )
}