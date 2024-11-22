import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge";

import { PostCardProps } from "./PostCard";

import PostThreadAuthor from "./PostThreadAuthor";

import { dateFromObjectId, getUserData } from "@/lib/utils";
import PostControls from "./PostControls";
import { useState, useEffect } from "react";

// TODO

export default function PostThreadMainCard({ title, body, image, latitude, longitude, authorId, tags, id }: PostCardProps) {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    setUserData(getUserData());
  }, []);

  return (
    <Card className="mb-5 grow">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex flex-1 flex-row justify-between">
          <PostThreadAuthor authorId={authorId} />
          {userData["userId"] === authorId ? <PostControls id={id} type="main"/> : <></>}
        </div>
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-row flex-wrap gap-1">
          {tags ? tags.map((tag, index) => (<Badge key={index}>{tag}</Badge>)) : <></>}
        </div>
      </CardHeader>

      <CardContent className="gap-2">
        {body}
        {image ? <img src={image} className="rounded-sm object-scale-down mt-3"/> : <></>}
      </CardContent>

      <CardFooter className="">
        <CardDescription>
          {`${dateFromObjectId(id).toLocaleTimeString()} · ${dateFromObjectId(id).toDateString()} `}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}