import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
    <div className="flex gap-3 items-center">
      <Avatar>
        <AvatarImage src={author?.data.image}/>
        <AvatarFallback>{author?.data.firstName[0] + author?.data.lastName[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h3>{`${author?.data.firstName} ${author?.data.lastName}`}</h3>
        <p className="text-sm text-muted-foreground">@{author?.data.username}</p>
      </div>

    </div>
  )
}