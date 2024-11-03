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

// TODO

export default function PostThreadMainCard({ title, body, image, latitude, longitude, authorId, tags, id }: PostCardProps) {
  return (
    <Card className="break-inside-avoid mb-5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {body}
        </CardDescription>

      </CardHeader>
      {image ? <CardContent><img src={image} className="object-cover h-48 w-48" /></CardContent> : <></>}
      <CardFooter>
        <div className="flex gap-2 flex-wrap">
          {tags ? tags.map((tag, index) => (<Badge key={index}>{tag}</Badge>)) : <></>}
        </div>
      </CardFooter>
    </Card>
  );
}