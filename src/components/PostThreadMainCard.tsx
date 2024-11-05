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

import { dateFromObjectId } from "@/lib/utils";

// TODO

export default function PostThreadMainCard({ title, body, image, latitude, longitude, authorId, tags, id }: PostCardProps) {
  return (
    <Card className="mb-5 grow">
      <CardHeader className="flex flex-col gap-2">
        <PostThreadAuthor authorId={authorId}/>
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